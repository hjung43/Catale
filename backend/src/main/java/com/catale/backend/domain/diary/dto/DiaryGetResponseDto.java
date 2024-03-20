package com.catale.backend.domain.diary.dto;

import com.catale.backend.domain.diary.entity.Diary;
import lombok.Data;

@Data
public class DiaryGetResponseDto {
    private Long id;
    private Long memberId;
    private Long cocktailId;
    private int mood;
    private String comment;
    private String reason;
    private int month;
    private int emotion1;
    private int emotion2;
    private int emotion3;

    public DiaryGetResponseDto(Diary diary){
        this.id = diary.getId();
        this.memberId = diary.getMember().getId();
        this.cocktailId = diary.getCocktail().getId();
        this.mood = diary.getMood();
        this.comment = diary.getComment();
        this.reason = diary.getReason();
        this.month = diary.getMonth();
        this.emotion1 = diary.getEmotion1();
        this.emotion2 = diary.getEmotion2();
        this.emotion3 = diary.getEmotion3();
    }
}
