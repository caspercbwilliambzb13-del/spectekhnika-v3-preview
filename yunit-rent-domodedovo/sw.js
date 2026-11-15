const CACHE_NAME = 'sta-shell-v4-yunit-rent-domodedovo';
const APP_FILES = ["./", "./index.html", "./styles.css", "./app.js", "./config.js", "./manifest.json", "./icon-192.png", "./icon-512.png", "./logo.png", "./assets/bulldozer.jpg", "./assets/crane.jpg", "./assets/excavator.jpg", "./assets/lift-18.jpg", "./assets/lift-22.jpg", "./assets/lift-28.jpg"];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok && new URL(event.request.url).origin === self.location.origin) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
