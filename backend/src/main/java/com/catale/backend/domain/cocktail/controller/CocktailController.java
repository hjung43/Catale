package com.catale.backend.domain.cocktail.controller;

import com.catale.backend.domain.cocktail.service.CocktailService;
import com.catale.backend.domain.member.dto.SignupRequestDto;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.service.MemberService;
import com.catale.backend.global.format.code.ApiResponse;
import com.catale.backend.global.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Cocktail 컨트롤러", description = "Cocktail Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cocktail")
public class CocktailController {

    private final ApiResponse response;
    private final MemberService memberService;
    private final CocktailService cocktailService;

//    @Operation(summary = "칵테일 전체 조회", description = "칵테일 리스트 전체 조회")
//    @GetMapping
//    public ResponseEntity<?> getAllCocktailList(
//            @Parameter(hidden = true) Authentication authentication,
//            @PageableDefault(page = 0, size = 10) SpringDataWebProperties.Pageable page) {
//
////        Member me = memberService.findMember(authentication.getName());
////        Long memberId = me.getId();
////        return response.success(ResponseCode.MEMBER_SIGNUP_SUCCESS, cocktailService.getAllCocktailList(page));
//
//    }
}
