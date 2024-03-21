package com.catale.backend.domain.diary.repository.custom;

import com.catale.backend.domain.diary.dto.DiaryMonthResponseDto;

import java.util.List;
import java.util.Optional;

public interface DiaryRepositoryCustom {

    Optional<List<DiaryMonthResponseDto>> getDiraryMonth(int year, int month, Long memberId);

}
