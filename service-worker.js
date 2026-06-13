const CACHE_NAME = "mini-tool-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./main.js",
  "./tools.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {

  const url = new URL(event.request.url);

  // 🔥 tools ko cache nahi karna (dynamic loading)
  if (url.pathname.includes("/tools/")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );

});