const CACHE_NAME = "epoch-tool-v1";

const urlsToCache = [
  "/",
  "./index.html",
  "./style.css",
  "./main.js"
];

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );

});

self.addEventListener("activate", event => {
  console.log("Service Worker Activated");
});

self.addEventListener("fetch", event => {

  const url = new URL(event.request.url);

  // tools ko cache mat karo
  if (url.pathname.startsWith("/docs/tools/")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );

});