package com.catale.backend.domain.cocktail.repository.custom;

import com.catale.backend.domain.cocktail.dto.CocktailGetLikeResponseDto;
import com.catale.backend.domain.cocktail.dto.CocktailGetResponseDto;
import com.catale.backend.domain.cocktail.dto.CocktailListResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static com.catale.backend.domain.cocktail.entity.QCocktail.cocktail;
import static com.catale.backend.domain.like.entity.QLike.like;

@RequiredArgsConstructor
public class CocktailRepositoryImpl implements CocktailRepositoryCustom {
    private final JPAQueryFactory query;

    @Override
    public Optional<List<CocktailListResponseDto>> getCocktails() {
        return Optional.ofNullable(query.select(Projections.constructor(CocktailListResponseDto.class,
                        cocktail.id, cocktail.name, cocktail.color1, cocktail.color2, cocktail.color3, cocktail.glass))
                .from(cocktail)
                        .where(cocktail.isDeleted.eq(false))
                        .orderBy(cocktail.likeCount.desc())
                .fetch());
    }

    @Override
    public Optional<List<CocktailGetLikeResponseDto>> getLikeCoctails(Long memberId) {
        return Optional.ofNullable(query.select(Projections.constructor(CocktailGetLikeResponseDto.class,
                cocktail.id, cocktail.name, cocktail.color1, cocktail.color2, cocktail.color3, cocktail.glass))
                .from(like)
                .leftJoin(cocktail).on(like.cocktail.id.eq(cocktail.id))
                .where(like.member.id.eq(memberId)
                        .and(like.isDeleted.eq(false))
                        .and(cocktail.isDeleted.eq(false)))
                        .orderBy(like.createdAt.desc())
                .fetch());
    }



}
