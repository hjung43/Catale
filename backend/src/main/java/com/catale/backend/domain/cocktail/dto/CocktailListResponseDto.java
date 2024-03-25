package com.catale.backend.domain.cocktail.dto;

import lombok.*;

@Getter
@Setter
//@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CocktailListResponseDto {

    private Long id;
    private String name;
    private String color1;
    private String color2;
    private String color3;
    private int glass;
    private boolean isLike;

    public CocktailListResponseDto(Long id, String name, String color1, String color2, String color3, int glass) {
        this.id = id;
        this.name = name;
        this.color1 = color1;
        this.color2 = color2;
        this.color3 = color3;
        this.glass = glass;
    }

}
