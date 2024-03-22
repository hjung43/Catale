package com.catale.backend.domain.like.dto;

import com.catale.backend.domain.like.entity.Like;
import lombok.Data;

@Data
public class LikeResponseDto {

    private Long id;
    private Long memberId;
    private Long cocktailId;

    public LikeResponseDto (Like like){
        this.id = like.getId();
        this.memberId = like.getMember().getId();
        this.cocktailId = like.getCocktail().getId();
    }
}
