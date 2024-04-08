package com.catale.backend.domain.cocktail.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PreferenceDto {

    /* 각 member들의 선호도 data */

    @NotNull
    private int memberId;

    @NotNull
    @Min(0)
    @Max(5)
    private int alc;

    @NotNull
    @Min(0)
    @Max(5)
    private int sweet;

    @NotNull
    @Min(0)
    @Max(5)
    private int sour;

    @NotNull
    @Min(0)
    @Max(5)
    private int bitter;

    @NotNull
    @Min(0)
    @Max(5)
    private int sparking;
}
