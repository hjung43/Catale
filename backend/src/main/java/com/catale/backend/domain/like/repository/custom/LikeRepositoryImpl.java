package com.catale.backend.domain.like.repository.custom;

import com.catale.backend.domain.like.dto.LikeResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import static com.catale.backend.domain.like.entity.QLike.like;

@RequiredArgsConstructor
public class LikeRepositoryImpl implements LikeRepositoryCustom{
    private final JPAQueryFactory query;
    @Override
    public Optional<LikeResponseDto> getIsLike(Long memberId, Long cocktailId) {
        return Optional.ofNullable(query.select(Projections.constructor(LikeResponseDto.class, like.id, like.member.id, like.cocktail.id))
                .from(like)
                .where(like.cocktail.id.eq(cocktailId)
                        .and(like.member.id.eq(memberId))
                        .and(like.isDeleted.eq(false)))
                        .fetchOne());
    }

}
