var dataCacheName = 'ACSG-v1';
var cacheName = 'ACSG-final-1';
var filesToCache = [
  '/',
  '/index.html',
  '/castle.png',
  '/codes.png',
  '/councils.png',
  '/health.png',
  '/house.png',
  '/ic_close.png',
  '/ic_x.png',
  '/laundry.png',
  '/logo.png',
  '/p6.png',
  '/peer.png',
  '/seafront.png',
  '/staff.png',
  '/uwc.png',
  '/wifi.png',
  '/favicon.ico',
  '/w3.css'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
