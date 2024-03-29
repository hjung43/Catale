package com.catale.backend.domain.member.dto;

import jakarta.validation.constraints.Pattern;
import  lombok.*;
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NicknameRequestDto {

//    private Long memberId;
    //닉네임 수정 dto
    @Pattern(regexp = "^[a-zA-Z0-9_]{3,10}$",
            message = "닉네임은 영문자, 숫자 및 언더바(_)를 포함할 수 있으며 3~10자 이내여야 합니다.")
    private String name;
}
