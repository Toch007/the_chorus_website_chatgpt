// Empty service worker to prevent 404 errors
self.addEventListener("install", () => {
  console.log("Service worker installed");
});

self.addEventListener("fetch", (event) => {
  // Pass through all requests - no caching for development
  event.respondWith(fetch(event.request));
});
