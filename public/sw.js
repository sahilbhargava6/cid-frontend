const CACHE_NAME = 'cid-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/Consider_it_done_LOGO_4.webp'
];

self.addEventListener('install', event => {
  // Skip waiting so the new SW activates immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Claim clients immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Never intercept in development (localhost / 127.0.0.1)
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    return; // Let the browser handle it normally
  }

  // Never intercept Next.js internal requests, HMR, or WebSocket upgrades
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/__next') || event.request.mode === 'websocket') {
    return;
  }

  // Never intercept API calls
  if (url.pathname.startsWith('/api/') || url.hostname !== self.location.hostname) {
    return;
  }

  // Cache-first for production static assets only
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
