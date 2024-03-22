package com.catale.backend.domain.cocktail.repository.custom;

import com.catale.backend.domain.cocktail.dto.CocktailGetResponseDto;
import com.catale.backend.domain.cocktail.dto.CocktailListResponseDto;
import com.catale.backend.domain.cocktail.dto.CocktailGetLikeResponseDto;

import java.util.List;
import java.util.Optional;

public interface CocktailRepositoryCustom {
    Optional<List<CocktailListResponseDto>> getCocktails();
    Optional<List<CocktailGetLikeResponseDto>> getLikeCoctails(Long memberId);

}
