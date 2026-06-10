const CACHE_NAME = "simple-youtube-player-v1"
const CACHE_URLS = ["/", "/watch/", "/hide/", "/manifest.webmanifest", "/icon.svg"]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_URLS)))
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName)),
        ),
      ),
  )
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== location.origin) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone()

        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone))

        return response
      })
      .catch(() => caches.match(event.request)),
  )
})
