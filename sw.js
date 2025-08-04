// Simple Service Worker for caching
const CACHE_NAME = 'aq-accounting-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/js/transparent-header.js',
  '/assets/images/logo.webp',
  '/assets/images/logo-90.webp',
  '/assets/images/hero-200.webp',
  '/assets/images/hero-350.webp',
  '/assets/images/hero-400.webp',
  '/assets/blobs/meshbg.svg'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Probaj da dodaš fajlove u keš, ali ne prekidaj instalaciju ako neki fajl ne postoji
        return Promise.allSettled(
          urlsToCache.map(url => {
            return cache.add(url).catch(error => {
              console.warn(`Failed to cache: ${url}`, error);
              return null; // Nastavi dalje i bez ovog fajla
            });
          })
        );
      })
      .catch(error => {
        console.error('Service worker installation failed:', error);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
