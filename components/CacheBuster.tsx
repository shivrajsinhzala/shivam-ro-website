'use client';

import { useEffect } from 'react';

// Update version tag on every build deployment
const CURRENT_SITE_VERSION = '2026-07-26-v1.2.0';

export default function CacheBuster() {
  useEffect(() => {
    try {
      // 1. Unregister all stale Service Workers
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
            console.log('[CacheBuster] Unregistered legacy service worker');
          }
        });
      }

      // 2. Clear Cache Storage API caches
      if ('caches' in window) {
        caches.keys().then((names) => {
          for (const name of names) {
            caches.delete(name);
            console.log('[CacheBuster] Cleared CacheStorage:', name);
          }
        });
      }

      // 3. Version check & hard reload if version mismatch
      const storedVersion = localStorage.getItem('shivam_app_version');
      if (storedVersion !== CURRENT_SITE_VERSION) {
        localStorage.setItem('shivam_app_version', CURRENT_SITE_VERSION);
        console.log('[CacheBuster] New site version detected. Purging cache and reloading...');
        
        // Force reload from server bypassing HTTP cache
        window.location.reload();
      }
    } catch (e) {
      console.warn('[CacheBuster] Cache eviction note:', e);
    }
  }, []);

  return null;
}
