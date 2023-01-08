const { StaleWhileRevalidate, CacheFirst } = require("workbox-strategies");
const { registerRoute, Route } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const imageRoute = new Route(({ request, sameOrigin }) => {
  return sameOrigin && request.destination === "image";
}, new CacheFirst());

// Register the new route
registerRoute(imageRoute);

registerRoute(
  //what will be cached
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    //the name of where the assets are cached
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
