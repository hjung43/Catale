package com.catale.backend.domain.diary.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DiaryMonthResponseDto {
    private Long id;
    private Long cocktailId;
    private int mood;

    private int color1;
    private int color2;
    private int color3;
    private int glass;

    private LocalDateTime createdAt;
}
