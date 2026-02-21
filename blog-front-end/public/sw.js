const CACHE_NAME = 'site-assets-v1';
const DYNAMIC_CACHE = 'dynamic-data-v1';
const OFFLINE_URL = '/offline';
const MAX_DYNAMIC_ITEMS = 50;

// ۱. نصب و پیش‌کش کردن صفحه آفلاین
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(new Request(OFFLINE_URL, { cache: 'reload' })))
  );
  self.skipWaiting();
});

// ۲. تمیزکاری کش‌های قدیمی
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME && key !== DYNAMIC_CACHE)
            .map((key) => caches.delete(key))
      );
    })
  );
});

const limitCacheSize = async (name, maxItems) => {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    limitCacheSize(name, maxItems);
  }
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || !url.protocol.startsWith('http')) return;
  if (url.pathname.includes('/_next/static/webpack/') || url.pathname.includes('hot-update')) return;

  // اگر آنلاین هستیم، اولویت با شبکه است و سرویس ورکر دخالت سختگیرانه نمی‌کند
  event.respondWith(
    fetch(request)
      .then(async (networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) return networkResponse;

        // صفحه آفلاین را در کش داینامیک ذخیره نمی‌کنیم
        if (url.pathname !== OFFLINE_URL) {
          const cache = await caches.open(DYNAMIC_CACHE);
          await cache.delete(request);
          cache.put(request, networkResponse.clone());
          event.waitUntil(limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_ITEMS));
        }

        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) return cachedResponse;

        if (request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      })
  );
});