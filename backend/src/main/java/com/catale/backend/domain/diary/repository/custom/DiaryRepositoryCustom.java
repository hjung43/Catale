package com.catale.backend.domain.diary.repository.custom;

import com.catale.backend.domain.diary.dto.DiaryGetResponseDto;
import com.catale.backend.domain.diary.dto.DiaryMonthResponseDto;
import com.catale.backend.domain.image.entity.Image;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DiaryRepositoryCustom {

    Optional<List<DiaryMonthResponseDto>> getDiraryMonth(int year, int month, Long memberId);

    Optional<DiaryGetResponseDto> getDiaryDetail(Long diaryId);

}
