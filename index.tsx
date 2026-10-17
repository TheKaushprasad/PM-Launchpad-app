import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// The site used to put pages after a "#" (thenoobpm.com/#/dashboard). Old bookmarks
// and emailed links still arrive that way, so move them onto the real path.
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1));
}

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