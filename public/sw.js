const CACHE_NAME = 'break-timer-v1';

const STATIC_RESOURCES = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

const AUDIO_RESOURCES = [
  'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1fb4ef3937.mp3',
  'https://cdn.pixabay.com/download/audio/2021/10/25/audio_f8364c8b05.mp3',
  'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d9046b0a0d.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Cache static resources
      cache.addAll(STATIC_RESOURCES);
      
      // Cache audio files
      return Promise.all(
        AUDIO_RESOURCES.map(url =>
          fetch(url)
            .then(response => {
              if (!response.ok) throw new Error(`Failed to fetch ${url}`);
              return cache.put(url, response);
            })
            .catch(error => console.error('Audio caching failed:', error))
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then(async (response) => {
        // Clone the response as it can only be consumed once
        const responseToCache = response.clone();

        // Cache new requests except browser-sync in development
        if (!event.request.url.includes('browser-sync')) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, responseToCache);
        }

        return response;
      });
    })
  );
});