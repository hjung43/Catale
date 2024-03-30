self.addEventListener("fetch", function (event) {
  // GET 요청만 처리하고 나머지 요청은 무시
  if (event.request.method !== "GET") {
    return;
  }

  // 확장 프로그램 요청인지 확인
  if (event.request.url.startsWith("chrome-extension://")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 캐시에서 요청을 찾음
      if (response) {
        return response; // 캐시에서 응답 반환
      }

      // 캐시에 없는 경우, 네트워크로 요청을 전달하고 응답을 캐시에 추가
      return fetch(event.request).then(function (networkResponse) {
        // 응답을 복제하여 캐시에 추가
        var responseToCache = networkResponse.clone();

        // Content-Type에 따라 적절한 캐시 이름 지정
        var cacheName;
        if (event.request.url.endsWith(".css")) {
          cacheName = "css-cache";
        } else if (event.request.url.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
          cacheName = "image-cache";
        } else if (event.request.url.endsWith(".json")) {
          cacheName = "json-cache";
        } else {
          cacheName = "default-cache";
        }

        // caches.open(cacheName).then(function (cache) {
        //   cache.put(event.request, responseToCache);
        // });

        return networkResponse; // 네트워크 응답 반환
      });
    })
  );
});

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("png-cache").then(function (cache) {
      return cache.addAll([
        "/src/assets/bartender/임시바배경.png", // 이미지 폴더를 캐시에 추가
        "/src/assets/bartender/고양이말풍선.png", // 이미지 폴더를 캐시에 추가
        "/src/assets/lottie/Cocktail1.json", // 이미지 폴더를 캐시에 추가
        "/src/assets/lottie/Cocktail2.json", // 이미지 폴더를 캐시에 추가
        // 추가적으로 필요한 리소스들을 여기에 추가할 수도 있습니다.
        "/src/pages/cocktailpage/CocktailDetailPage.module.css",
        "/src/pages/cocktailpage/CocktailReviewPage.module.css",
        "/src/pages/SearchPage.module.css",
        // "/src/pages/SearchPage.jsx",
        "/src/components/search/Nonmedallist.module.css",
        "/src/components/search/Medallist.module.css",
        // "/src/components/search/Medallist.jsx",
        // "/src/components/search/Nonmedallist.jsx",
      ]);
    })
  );
});

// self.addEventListener('fetch', function(event) {
//     // GET 요청만 처리하고 나머지 요청은 무시
//     if (event.request.method !== 'GET') {
//       return;
//     }

//     event.respondWith(
//       caches.match(event.request).then(function(response) {
//         return response || fetch(event.request);
//       })
//     );
//   });
