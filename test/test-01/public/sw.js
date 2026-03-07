// Service Worker básico con estrategia "cache first" para activos estáticos.
// "cache first" significa que al solicitar un recurso se intenta devolver
// primero la versión almacenada en caché; si no existe, se va a la red.
// Es útil para recursos estáticos y para mejorar rendimiento offline.
// En una app médica conviene usar cache-first para assets estáticos (UI,
// iconos, hojas de estilo) pero no para datos clínicos sensibles, que
// deberían sincronizarse y refrescarse desde la red (stale-while-revalidate
// o network-first en datos críticos).

const CACHE_NAME = 'medicare-static-v1'
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.tsx'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached
      return fetch(req).then((res) => {
        // opcional: cache de recursos GET
        if (req.method === 'GET') {
          const copy = res.clone()
          caches.open(CACHE_NAME).then((c) => c.put(req, copy))
        }
        return res
      })
    })
  )
})
