
const ASSETS = [
    "/",
    "/chat",
    "/js/chat.bundle.js",
    "/js/index.bundle.js",
    "/socket.io/socket.io.js", // Optional while not using webpack for socket.io
    "/manifest.webmanifest",
    "/images/VSRN1920x1920.png",
    "/images/maskable_icon.png",
    "/images/VSRNsquare.jpg"
]
const CACHE_NAME = "offline-cache"

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).then(response => {
            if (response) {
                return response
            }
            return caches.match(event.request).then((response) => response)
        }, (err) => {
            console.log(err)
            return caches.match(event.request).then((response) => response)
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