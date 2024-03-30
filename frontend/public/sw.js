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
        "/src/pages/SearchPage.jsx",
        "/src/components/search/Nonmedallist.module.css",
        "/src/components/search/Medallist.module.css",
        "/src/components/search/Medallist.jsx",
        "/src/components/search/Nonmedallist.jsx",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // 캐시에 해당 요청이 존재하는 경우
      if (response) {
        return response; // 캐시된 리소스를 반환
      }

      // 캐시에 해당 요청이 없는 경우, 원본 서버에서 리소스를 가져옴
      return fetch(event.request).then(function (response) {
        // 복제하여 캐시에 추가
        var responseToCache = response.clone();
        caches.open("png-cache").then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        // Response 객체의 headers 속성을 사용하여 Content-Type 설정
        var contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/css")) {
          // CSS 파일인 경우, Content-Type을 명시적으로 설정
          return new Response(response.body, {
            headers: {
              "Content-Type": "text/css",
            },
          });
        } else if (contentType && contentType.includes("image/png")) {
          // PNG 파일인 경우, Content-Type을 명시적으로 설정
          return new Response(response.body, {
            headers: {
              "Content-Type": "image/png",
            },
          });
        } else {
          return response; // 그 외의 경우, 기존 Response 그대로 반환
        }
      });
    })
  );
});
