// Service Worker para Contacts App PWA
const CACHE_NAME = 'contacts-app-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Fetch event - hybrid strategy (cache first for assets, network first for API)
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Network first for API calls
  if (request.url.includes('/api/') || request.method !== 'GET') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cache = caches.open(CACHE_NAME)
          cache.then((c) => c.put(request, response.clone()))
          return response
        })
        .catch(() => {
          return caches.match(request)
        })
    )
    return
  }

  // Cache first for static assets
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response
      }

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        const cache = caches.open(CACHE_NAME)
        cache.then((c) => c.put(request, response.clone()))
        return response
      })
    })
  )
})
