import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

// Import the expiration plugin
import { ExpirationPlugin } from "workbox-expiration";

//caches says where they should be cached
precacheAndRoute(self.__WB_MANIFEST);

//
const cacheName = "static-resources";
const matchCallback = ({ request }) => {
  console.log(request);
  return (
    // CSS
    request.destination === "style" ||
    // JavaScript
    request.destination === "script"
  );
};

//settings the route
registerRoute(
  //first takes the matchcallback function
  matchCallback,
  //then makes a new object stale while revalidate
  new StaleWhileRevalidate({
    //takes previously define cache name
    cacheName,
    //plugin array
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Register route for caching images
// The cache first strategy is often the best choice for images because it saves bandwidth and improves performance.
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "my-image-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);
