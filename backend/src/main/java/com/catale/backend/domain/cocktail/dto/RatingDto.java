package com.catale.backend.domain.cocktail.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RatingDto {
    @NotNull
    private int memberId;

    @NotNull
    private int cocktailId;

    @NotNull
    private int rating;

}
