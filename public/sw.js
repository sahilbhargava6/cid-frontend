const CACHE_NAME = 'cid-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/Consider_it_done_LOGO_4.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
