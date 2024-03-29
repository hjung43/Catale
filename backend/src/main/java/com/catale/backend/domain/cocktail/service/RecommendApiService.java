package com.catale.backend.domain.cocktail.service;

import com.catale.backend.domain.cocktail.dto.CocktailListResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import org.springframework.web.reactive.function.client.WebClient;

@Log4j2
@Component
@RequiredArgsConstructor
public class RecommendApiService {

      private final WebClient webClient = WebClient.builder()
                                                   .baseUrl("https://api.silvstone.xyz:8000/recommend")
                                                   .build();

      /* 오늘의 칵테일과 유사한 칵테일 추천결과 반환 */
      public Mono<List<Long>> getTodayCocktailResponse(Long cocktailId) {
            log.info("apiService 진입");
            return this.webClient.get()
                                 .uri("/today/{cocktailId}", cocktailId)
                                 .retrieve()
                                 .bodyToMono(new ParameterizedTypeReference<List<Long>>() {});
      }

      /* 유저별 개인 맞춤 칵테일 추천결과 반환 */
      public Mono<List<Long>> getMemberRecommendResponse(Long memberId) {
            return this.webClient.get()
                    .uri("/personal/{memberId}", memberId)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<Long>>() {});
      }
}
