// Caching static assets for offline capability and faster loads
const CACHE_NAME = 'syntaxable-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/syntaxable.png',
  '/manifest.json'
];

// Perform installation caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Cache fallback and network-first fetch strategy
self.addEventListener('fetch', (event) => {
  // Only intercept HTTP/S GET requests (skip chrome extensions, websockets, and database API requests)
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
