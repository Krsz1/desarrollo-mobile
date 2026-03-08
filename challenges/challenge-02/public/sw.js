/* Simple Service Worker
     - Caché estático minimal para que la PWA funcione offline
     - Estrategias por tipo de recurso:
         HTML -> Network First (mantener contenido actualizado)
         JS/CSS -> Cache First (rápido, raramente cambia en runtime)
         Images -> Stale-While-Revalidate (mostrar caché, refrescar en segundo plano)
         APIs -> Network First (datos en tiempo real)
*/

const CACHE_NAME = "pwa-cache-v1";
// Archivos mínimos que queremos disponibles offline.
const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/basura.png",
    "/interfaz.png",
];

// Instalación: precache de los assets estáticos.
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
});

// Intercepta peticiones y aplica una estrategia según el tipo de recurso.
self.addEventListener("fetch", (event) => {
    const request = event.request;

    // HTML → Network First
    if (request.headers.get("accept")?.includes("text/html")) {
        event.respondWith(networkFirst(request));
        return;
    }

    // JS / CSS → Cache First
    if (request.destination === "script" || request.destination === "style") {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Images → Stale While Revalidate
    if (request.destination === "image") {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }

    // API → Network First
    if (request.url.includes("/api/")) {
        event.respondWith(networkFirst(request));
        return;
    }
});

// Cache First: intenta la caché primero, si no hay, va a la red.
const cacheFirst = async (request) => {
    const cached = await caches.match(request);
    return cached || fetch(request);
};

// Network First: intenta la red y actualiza caché; si falla, devuelve caché.
const networkFirst = async (request) => {
    try {
        const response = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
        return response;
    } catch (err) {
        return caches.match(request);
    }
};

// Stale While Revalidate: devuelve caché si existe y actualiza en background.
const staleWhileRevalidate = async (request) => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    const networkFetch = fetch(request).then((response) => {
        cache.put(request, response.clone());
        return response;
    });

    return cached || networkFetch;
};
