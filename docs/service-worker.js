const CACHE_NAME = "epoch-tool-v1";

const urlsToCache = [
  "/",
  "./index.html",
  "./style.css",
  "./main.js"
];

// Install + Cache
self.addEventListener("install", event => {
  console.log("Service Worker Installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate (optional but recommended)
self.addEventListener("activate", event => {
  console.log("Service Worker Activated");
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});