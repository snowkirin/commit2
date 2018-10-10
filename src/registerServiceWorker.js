/* eslint-disable no-console */

const updated = () => {
  console.log('Has new content!');
  // use window.location.reload(true) to get new cache
};

const register = async path => {
  const registration = await navigator.serviceWorker.register(path);
  console.log('SW registred!');

  const cacheList = await caches.keys();
  cacheList.forEach(async cacheName => {
    if (!cacheName.includes('-temp')) return;

    const tempCache = await caches.open(cacheName);
    const tempCachesKeys = await tempCache.keys();
    if (tempCachesKeys.length > 0) {
      updated();
    }
  });

  registration.onupdatefound = () => updated();
};

const { NODE_ENV, BASE_URL } = process.env;

if (NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    register(`${BASE_URL}service-worker.js`);
  }
}

/*
import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      );
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updated(reg) {
      console.log('New content is available; please refresh.');
      reg.update();
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    }
  });
}
*/
