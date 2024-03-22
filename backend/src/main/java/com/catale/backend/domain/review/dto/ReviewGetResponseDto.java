package com.catale.backend.domain.review.dto;

import com.catale.backend.domain.review.entity.Review;
import lombok.Data;

@Data
public class ReviewGetResponseDto {

    private Long id;

    private Long cocktailId;

    private Long memberId;

    private String content;

    private int rate;

    private int sweet;

    private int bitter;

    private int sour;

    private int sparking;



    public ReviewGetResponseDto(Review review){
        this.id = review.getId();
        this.cocktailId = review.getCocktail().getId();
        this.memberId = review.getMember().getId();
        this.content = review.getContent();
        this.rate = review.getRate();
        this.sweet = review.getSweet();
        this.bitter = review.getBitter();
        this.sour = review.getSour();
        this.sparking = review.getSparking();

    }
}
