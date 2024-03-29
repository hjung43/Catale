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
                                                   .baseUrl("https://api.silvstone.xyz:8000/api/v1/recommend")
                                                   .build();

      public Mono<List<Long>> getTodayCocktailResponse(Long cocktailId) {
            return this.webClient.get()
                                 .uri("/{cocktailId}", cocktailId)
                                 .retrieve()
                                 .bodyToMono(new ParameterizedTypeReference<List<Long>>() {});
      }

      public Mono<List<Long>> getMemberRecommendResponse(Long memberId) {
            return this.webClient.get()
                    .uri("/{memberId}", memberId)
                    .retrieve()
                    .bodyToMono(new ParameterizedTypeReference<List<Long>>() {});
      }
}
