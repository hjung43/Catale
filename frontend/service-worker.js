// service-worker.js

const CACHE_NAME = "my-cache-v1";
const urlsToCache = [
  "/",
  "/src/assets/bartender/고양이말풍선.png",
  "/src/assets/bartender/연필.png",
  "/src/assets/bartender/오늘의칵테일.png",
  "/src/assets/bartender/유저말풍선.png",
  "/src/assets/bartender/임시바배경.png",
  "/src/assets/bartender/파란말풍선.png",
  "/src/assets/bartender/emo1.png",
  "/src/assets/bartender/emo2.png",
  "/src/assets/bartender/emo3.png",
  "/src/assets/bartender/emo4.png",
  "/src/assets/bartender/emo5.png",
  "/src/assets/bartender/emobox.png",
  "/src/assets/glass/glass1.png",
  "/src/assets/glass/glass2.png",
  "/src/assets/glass/glass3.png",
  "/src/assets/glass/glass4.png",
  "/src/assets/glass/glass5.png",
  "/src/assets/glass/glass6.png",
  "/src/assets/glass/glass7.png",
  "/src/assets/lottie/Cocktail1.json",
  "/src/assets/lottie/Cocktail2.json",
  "/src/assets/lottie/Cocktail2.json",
  "/src/pages/WelcomePage.module.css",
  "/src/components/search/Medallist.module.css",
  "/src/components/search/Nonmedallist.module.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
