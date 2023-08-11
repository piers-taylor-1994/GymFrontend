const cacheName = "gymapp-cache-v1";

const currentCaches = {
    data: cacheName + '-data'
}

let jwt = '';

const hasHeader = function (headers, pattern) {
    return headers.has('content-type') && headers.get('content-type').match(pattern);
}

self.addEventListener('install', event => {
    console.log('[Service Worker] Install');
    // precache our static resources for this build of the app here

})

self.addEventListener('message', event => {
    if(event.data && event.data.type === "STORE-TOKEN"){
        jwt = event.data.token;
    }

    if(event.data && event.data.type === "CLEAR-TOKEN"){
        jwt = '';
        clients.matchAll().then(all => {
            if(all[0] && all[0].focused){
                all[0].navigate(all[0].url);
            }
        })
    }
})

self.addEventListener('activate', event => {
    var expectedCacheNames = new Set(Object.values(currentCaches));

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (expectedCacheNames.has(cacheName) == false)
                        return caches.delete(cacheName);
                })
            );
        })
    );
    event.waitUntil(self.clients.claim());
})

const destinations = ['', 'image'];

self.addEventListener('fetch', event => {
    if(event.request.url.endsWith('auth/logon')){
        return fetch(event.request);
    }
    if(destinations.includes(event.request.destination) == false){
        return fetch(event.request);
    }

    let cache = currentCaches.data;

    event.respondWith(
        caches.open(cache).then(cache => {
            return cache.match(event.request).then(response => {
                if (response) return response;

                if(event.request.url.indexOf("cdn.jsdelivr.net/npm") > 0){
                    return fetch(event.request);
                }
                
                if(jwt !== ''){
                    let headers = new Headers(event.request.headers);
                    if(headers.get("Authorization") === null)
                        headers.append('Authorization', 'Bearer ' + jwt);
                    return fetch(event.request, {
                        mode: 'cors',
                        headers: headers
                    });
                }else{
                    return fetch(event.request);
                }
            })
        })
    );
})