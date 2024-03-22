package com.catale.backend.domain.like.repository.custom;

import com.catale.backend.domain.like.dto.LikeResponseDto;

import java.util.Optional;

public interface LikeRepositoryCustom {
    Optional<LikeResponseDto> getIsLike(Long memberId, Long cocktailId);
}
