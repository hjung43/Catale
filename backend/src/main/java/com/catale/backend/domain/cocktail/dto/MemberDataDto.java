package com.catale.backend.domain.cocktail.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDataDto {

    private List<RatingDto> ratings;
    private List<PreferenceDto> preferences;

}
