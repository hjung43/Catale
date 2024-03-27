package com.catale.backend.domain.review.repository.custom;

import com.catale.backend.domain.review.dto.ReviewGetResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ReviewRepositoryCustom {
    Optional<List<ReviewGetResponseDto>> findByCocktailId(Long CocktailId, Pageable page);
}