import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

// lib/seo pulls in every lesson, project, assignment and interview question, so it loads as its own
// chunk. The prerendered HTML already carries the right tags for the page a visitor lands on, so
// that first time it waits until the browser is idle instead of competing with the page's own downloads.
let loadedOnce = false;
const whenIdle = () => new Promise<void>((resolve) => {
  const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(() => resolve(), { timeout: 4000 }) : setTimeout(resolve, 1500));
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
});

// Keeps the tab title, description and canonical link in step with the current page.
export const SeoMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let stale = false;
    const ready = loadedOnce ? Promise.resolve() : whenIdle();
    loadedOnce = true;
    ready.then(() => import('../lib/seo')).then(({ getRouteMeta, SITE_URL }) => {
      if (stale) return;
      const meta = getRouteMeta(pathname);
      const url = `${SITE_URL}${meta.canonicalPath === '/' ? '/' : meta.canonicalPath}`;

      document.title = meta.title;
      setMeta('name', 'description', meta.description);
      setMeta('property', 'og:title', meta.title);
      setMeta('property', 'og:description', meta.description);
      setMeta('property', 'og:url', url);
      setMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow');

      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    });
    return () => { stale = true; };
  }, [pathname]);

  return null;
};
