import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// The site used to put pages after a "#" (thenoobpm.com/#/dashboard). Old bookmarks
// and emailed links still arrive that way, so move them onto the real path.
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1));
}

// Pages load as separate chunks. A tab left open across a deploy asks for chunk files that no
// longer exist, so reload once to pick up the new build (the guard stops a loop if the server is down).
window.addEventListener('vite:preloadError', (event) => {
  try {
    const last = Number(sessionStorage.getItem('chunk_reload_at') || 0);
    if (Date.now() - last < 10_000) return;
    sessionStorage.setItem('chunk_reload_at', String(Date.now()));
  } catch {
    return; // Without storage there is no loop guard; let the error screen offer a refresh instead.
  }
  event.preventDefault();
  window.location.reload();
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);