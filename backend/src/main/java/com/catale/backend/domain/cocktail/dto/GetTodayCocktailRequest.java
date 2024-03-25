package com.catale.backend.domain.cocktail.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GetTodayCocktailRequest {

    private int mood;

    private String comment;

    private String reason;

    private int emotion1;

    private int emotion2;

    private int emotion3;

}
