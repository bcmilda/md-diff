// MD-Diff Service Worker — offline cache
const CACHE = 'mddiff-v1';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.6/marked.min.js'
];

// Instalace — precachujeme všechny soubory
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => {
        // CDN je cross-origin, musíme no-cors
        const locals  = PRECACHE.filter(u => !u.startsWith('http'));
        const remotes = PRECACHE.filter(u => u.startsWith('http'));
        return cache.addAll(locals).then(() =>
          Promise.allSettled(
            remotes.map(url =>
              fetch(url, { mode: 'no-cors' })
                .then(r => cache.put(url, r))
                .catch(() => {})
            )
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Aktivace — vymaž staré cache verze
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch — cache-first pro HTML/assets, network-first pro zbytek
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Přeskočit non-GET requesty a Firebase/API volání
  if (event.request.method !== 'GET') return;
  if (url.hostname.includes('firebase') ||
      url.hostname.includes('googleapis') ||
      url.hostname.includes('anthropic') ||
      url.hostname.includes('identitytoolkit')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Aktualizace na pozadí (stale-while-revalidate)
        const networkFetch = fetch(event.request)
          .then(response => {
            if (response && response.status === 200) {
              const clone = response.clone();
              caches.open(CACHE).then(c => c.put(event.request, clone));
            }
            return response;
          })
          .catch(() => {});
        return cached;
      }

      // Není v cache — zkus síť, při chybě fallback na index.html
      return fetch(event.request)
        .then(response => {
          if (response && response.status === 200 && event.request.method === 'GET') {
            const clone = response.clone();
            caches.open(CACHE).then(c => c.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
