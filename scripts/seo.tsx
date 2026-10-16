// Build-time SEO helpers.
//   npx tsx scripts/seo.tsx outlines   -> data/lessonOutlines.json (headings of every lesson; run before vite build)
//   npx tsx scripts/seo.tsx prerender  -> dist/<page>/index.html with real titles and text, plus dist/sitemap.xml
//
// The app is a single-page React app, so without this every URL returns the same
// empty HTML. Search engines and link previews read these files instead.
import fs from 'fs';
import path from 'path';
import { renderToStaticMarkup } from 'react-dom/server';
import { LESSONS, MODULES } from '../constants';
import { REAL_WORLD_PROJECTS } from '../data/realWorldProjects';
import { getRouteMeta, indexablePaths, lessonTopic, SITE_NAME, SITE_URL } from '../lib/seo';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, 'dist');
const FREE_DAYS = 7; // Days 0-7 are readable without an account (components/LessonDetail.tsx).

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'");

const sortedLessons = [...LESSONS].sort((a, b) => a.day - b.day);

function lessonHeadings(content: React.ReactNode): string[] {
  const html = renderToStaticMarkup(<>{content}</>);
  return [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)]
    .map((m) => decode(m[1].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function writeOutlines() {
  const outlines: Record<number, string[]> = {};
  for (const l of sortedLessons) outlines[l.day] = lessonHeadings(l.content);
  const file = path.join(ROOT, 'data', 'lessonOutlines.json');
  fs.writeFileSync(file, `${JSON.stringify(outlines, null, 2)}\n`);
  console.log(`[seo] wrote ${path.relative(ROOT, file)} (${sortedLessons.length} lessons)`);
}

const shell = (inner: string) =>
  `<main style="max-width:760px;margin:0 auto;padding:32px 16px;font-family:Inter,system-ui,sans-serif;color:#18181b;line-height:1.6">${inner}</main>`;

const link = (href: string, text: string) => `<a href="${href}">${esc(text)}</a>`;

const courseList = () =>
  `<ol>${sortedLessons
    .map((l) => `<li>${link(`/dashboard/day/${l.day}`, `Day ${l.day}: ${lessonTopic(l.title)}`)}</li>`)
    .join('')}</ol>`;

// Visible text placed inside <div id="root">. React replaces it as soon as the app loads.
function bodyFor(p: string): string {
  // The landing page is designed to animate in, so it gets the head tags only.
  if (p === '/') return '';

  if (p === '/dashboard') {
    return shell(
      `<h1>Product Management Course: 45-Day Roadmap</h1><p>${esc(getRouteMeta(p).description)}</p>` +
        `<h2>Modules</h2><ul>${MODULES.map((m) => `<li>${link(`/dashboard/${m.id}`, m.title)}: ${esc(m.description)}</li>`).join('')}</ul>` +
        `<h2>All lessons</h2>${courseList()}` +
        `<p>${link('/projects', 'Real-world PM projects')} · ${link('/jobs', 'PM jobs in India')} · ${link('/resources', 'Resources')} · ${link('/tools', 'Free AI career tools')}</p>`,
    );
  }

  const day = p.match(/^\/dashboard\/day\/(\d+)$/);
  if (day) {
    const i = sortedLessons.findIndex((l) => l.day === Number(day[1]));
    const lesson = sortedLessons[i];
    const prev = sortedLessons[i - 1];
    const next = sortedLessons[i + 1];
    const body =
      lesson.day <= FREE_DAYS
        ? renderToStaticMarkup(<>{lesson.content}</>)
        : `<h2>In this lesson</h2><ul>${lessonHeadings(lesson.content).map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` +
          `<p>Sign up free to read the full lesson.</p>`;
    return shell(
      `<p>${link('/dashboard', 'Product Management Course')} › Day ${lesson.day}</p>` +
        `<h1>Day ${lesson.day}: ${esc(lessonTopic(lesson.title))}</h1><p>${esc(lesson.preview)}</p>${body}` +
        `<p>${prev ? link(`/dashboard/day/${prev.day}`, `← Day ${prev.day}: ${lessonTopic(prev.title)}`) : ''} ${
          next ? link(`/dashboard/day/${next.day}`, `Day ${next.day}: ${lessonTopic(next.title)} →`) : ''
        }</p>`,
    );
  }

  const mod = p.match(/^\/dashboard\/([a-z]+)$/);
  const info = mod && MODULES.find((m) => m.id === mod[1]);
  if (info) {
    const lessons = sortedLessons.filter((l) => l.category === info.category);
    return shell(
      `<h1>${esc(info.title)} for Product Managers</h1><p>${esc(info.description)}</p>` +
        `<ul>${lessons.map((l) => `<li>${link(`/dashboard/day/${l.day}`, `Day ${l.day}: ${lessonTopic(l.title)}`)}</li>`).join('')}</ul>`,
    );
  }

  if (p === '/projects') {
    return shell(
      `<h1>Real-World Product Management Projects</h1><p>${esc(getRouteMeta(p).description)}</p><ul>${REAL_WORLD_PROJECTS.map(
        (x) => `<li>${link(`/projects/${x.id}`, x.title)}: ${esc(x.summary)}</li>`,
      ).join('')}</ul>`,
    );
  }

  const proj = p.match(/^\/projects\/([\w-]+)$/);
  const project = proj && REAL_WORLD_PROJECTS.find((x) => x.id === proj[1]);
  if (project) {
    return shell(
      `<p>${link('/projects', 'Real-world PM projects')}</p><h1>${esc(project.title)}</h1>` +
        `<p>${esc(project.company)} · ${esc(project.difficulty)} · about ${project.estimatedHours} hours</p><p>${esc(project.summary)}</p>`,
    );
  }

  const meta = getRouteMeta(p);
  return shell(`<h1>${esc(meta.title.replace(` | ${SITE_NAME}`, ''))}</h1><p>${esc(meta.description)}</p>`);
}

function replaceHead(html: string, p: string): string {
  const meta = getRouteMeta(p);
  const url = `${SITE_URL}${meta.canonicalPath}`;
  const swap = (re: RegExp, value: string) => {
    if (!re.test(html)) throw new Error(`[seo] index.html is missing ${re}`);
    html = html.replace(re, value);
  };
  swap(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`);
  swap(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(meta.description)}" />`);
  swap(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(meta.title)}" />`);
  swap(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(meta.description)}" />`);
  swap(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`);
  swap(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  return html;
}

function prerender() {
  const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const paths = indexablePaths();

  // Untouched copy for every other URL (vercel.json rewrites to it), so a page we
  // did not prerender never shows another page's title or text.
  fs.writeFileSync(path.join(DIST, 'app.html'), template);

  for (const p of paths) {
    const html = replaceHead(template, p).replace('<div id="root"></div>', `<div id="root">${bodyFor(p)}</div>`);
    const out = p === '/' ? path.join(DIST, 'index.html') : path.join(DIST, p, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
  }

  const today = new Date().toISOString().slice(0, 10);
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
  console.log(`[seo] prerendered ${paths.length} pages and sitemap.xml`);
}

const mode = process.argv[2];
if (mode === 'outlines') writeOutlines();
else if (mode === 'prerender') prerender();
else {
  console.error('usage: tsx scripts/seo.tsx <outlines|prerender>');
  process.exit(1);
}
