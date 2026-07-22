const CACHE_NAME = 'cid-pwa-cache-v2';
const urlsToCache = [
  '/manifest.json',
  '/Consider_it_done_LOGO_4.webp'
];

self.addEventListener('install', event => {
  // Skip waiting so the new SW activates immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Clean up old caches and claim clients immediately
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Never intercept in development
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    return;
  }

  // Never intercept Next.js chunks, HMR, or WebSocket upgrades
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/__next') || event.request.mode === 'websocket') {
    return;
  }

  // Never intercept API calls or external requests
  if (url.pathname.startsWith('/api/') || url.hostname !== self.location.hostname) {
    return;
  }

  // Navigation requests (HTML pages): always network-first
  // This ensures fresh HTML with correct chunk references after deployments
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Static assets (images, fonts, manifest): cache-first
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
