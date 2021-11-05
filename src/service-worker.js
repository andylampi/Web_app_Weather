self.addEventListener('install', function(event) {
    // Perform install steps
    });
    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
    './css/index.css',
    './manifest.json'
    ];
    self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
    console.log('Opened cache');
    return cache.addAll(urlsToCache);
    })
    );
    });
    self.addEventListener('fetch', function(event) {
    event.respondWith(
    caches.match(event.request)
    .then(function(response) {
    // Cache hit - return response
    if (response) {
    return response;
    }
    
    var fetchRequest = event.request.clone(); return fetch(fetchRequest).then( function(response) {
    });
    self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['pages-cache-v1'];
    event.waitUntil(
    caches.keys().then(function(cacheNames) {
    return Promise.all(
    cacheNames.map(function(cacheName) {
    if (cacheWhitelist.indexOf(cacheName) === -1) {
    return caches.delete(cacheName);
    }
    if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
    return;
    }
    })
    );
    })
    );
    });