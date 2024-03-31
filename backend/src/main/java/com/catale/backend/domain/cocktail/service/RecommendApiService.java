package com.catale.backend.domain.cocktail.service;

import com.catale.backend.domain.cocktail.dto.CocktailListResponseDto;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
public class RecommendApiService {

      private final WebClient webClient = WebClient.builder()
                                                   .baseUrl("https://fastapi.silvstone.xyz/rec")
                                                   .build();

      public List<Long> getTodayCocktailResponse(Long cocktailId) {
            return webClient.get()
                              .uri("/today/{cocktail_id}", cocktailId)
                              .retrieve()
                              .bodyToMono(new ParameterizedTypeReference<List<Long>>() {})
                              .block();

      }

      public Mono<List<Long>> getMemberRecommendResponse(Long memberId) {
            return this.webClient.get()
                    .uri("/{memberId}", memberId)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<Long>>() {});
      }
}
