import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteMeta, SITE_URL } from '../lib/seo';

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

// Keeps the tab title, description and canonical link in step with the current page.
export const SeoMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
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
  }, [pathname]);

  return null;
};
