const CACHE_NAME = "lifeline-ai-v1"
const urlsToCache = [
  "/",
  "/chat",
  "/how-it-works",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
]

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    }),
  )
})

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Background sync for offline emergency data
self.addEventListener("sync", (event) => {
  if (event.tag === "emergency-sync") {
    event.waitUntil(syncEmergencyData())
  }
})

async function syncEmergencyData() {
  // Sync emergency protocols and data when back online
  try {
    const response = await fetch("/api/emergency-protocols")
    const data = await response.json()

    // Store in IndexedDB for offline access
    const db = await openDB()
    const tx = db.transaction(["protocols"], "readwrite")
    await tx.objectStore("protocols").put(data)
  } catch (error) {
    console.log("Emergency data sync failed:", error)
  }
}

// IndexedDB helper
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("LifelineAI", 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains("protocols")) {
        db.createObjectStore("protocols", { keyPath: "id" })
      }
    }
  })
}
