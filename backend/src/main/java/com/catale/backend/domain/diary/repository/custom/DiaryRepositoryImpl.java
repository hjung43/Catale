package com.catale.backend.domain.diary.repository.custom;

import com.catale.backend.domain.diary.dto.DiaryGetResponseDto;
import com.catale.backend.domain.diary.dto.DiaryMonthResponseDto;
import com.catale.backend.domain.diary.entity.QDiary;
import com.catale.backend.domain.member.dto.MemberInfoDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static com.catale.backend.domain.cocktail.entity.QCocktail.cocktail;
import static com.catale.backend.domain.diary.entity.QDiary.diary;
import static com.catale.backend.domain.image.entity.QImage.image;
import static com.catale.backend.domain.member.entity.QMember.member;

@RequiredArgsConstructor
public class DiaryRepositoryImpl implements DiaryRepositoryCustom{
    private final JPAQueryFactory query;
    @Override
    public Optional<List<DiaryMonthResponseDto>> getDiraryMonth(int year, int month, Long memberId) {
        return Optional.ofNullable(query.select(
                        Projections.constructor(DiaryMonthResponseDto.class, diary.id, cocktail.id, diary.mood, cocktail.color1, cocktail.color2, cocktail.color3, cocktail.glass, diary.createdAt))
                .from(diary)
                .leftJoin(cocktail).on(diary.cocktail.id.eq(cocktail.id))
                .where(diary.createdAt.year().eq(year)
                        .and(diary.createdAt.month().eq(month))
                        .and(diary.member.id.eq(memberId))
                        .and(diary.isDeleted.eq(false)))
                .fetch());
    }

    @Override
    public Optional<DiaryGetResponseDto> getDiaryDetail(Long diaryId) {
        return Optional.ofNullable(query.select(
                Projections.constructor(DiaryGetResponseDto.class, diary.id, member.id,diary.mood,
                        diary.comment, diary.reason, diary.emotion1, diary.emotion2, diary.emotion3,
                        diary.createdAt, cocktail.id, cocktail.image, cocktail.name, cocktail.alc,
                        cocktail.sweet, cocktail.sour, cocktail.bitter, cocktail.sparking, cocktail.color1,
                        cocktail.color2, cocktail.color3, cocktail.glass, cocktail.content,
                        cocktail.ingredient, cocktail.base, cocktail.likeCount, cocktail.fruit))
                .from(diary)
                .leftJoin(cocktail).on(diary.cocktail.id.eq(cocktail.id))
                .where(diary.id.eq(diaryId)
                .and(diary.isDeleted.eq(false)))
                .fetchOne()
        );

    }
}
