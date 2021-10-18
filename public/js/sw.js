
const ASSETS = [
    "/",
    "/chat",
    "/js/chat.bundle.js",
    "/js/index.bundle.js",
    "/manifest.json",
    "/images/VSRN1920x1920.png",
    "/images/maskable_icon.png",
    "/images/VSRNsquare.jpg"
]
const CACHE_NAME = "offline-cache"

self.addEventListener("fetch", event => {
    console.log("You fetched")
    event.respondWith(
        fetch(event.request).catch(err => {
            console.log(err)
            self.caches.open(CACHE_NAME).then(cache => {
                caches.match(event.request).then(response => response)
            })
        })
    )
})

self.addEventListener("install", event => {
    console.log("installing...")
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(ASSETS)
            })
            .catch(err => {
                console.log("Error: "+ err)
            })
    )
})