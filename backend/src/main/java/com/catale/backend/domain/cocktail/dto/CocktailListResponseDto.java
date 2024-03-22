package com.catale.backend.domain.cocktail.dto;

import lombok.*;

@Getter
@Setter
//@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CocktailListResponseDto {
    private Long id;
    private String name;
    private int color1;
    private int color3;
    private int glass;
    private boolean isLike;

    public CocktailListResponseDto(Long id, String name, int color1, int color3, int glass) {
        this.id = id;
        this.name = name;
        this.color1 = color1;
        this.color3 = color3;
        this.glass = glass;
    }

}
