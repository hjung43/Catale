package com.catale.backend.domain.cocktail.controller;

import com.catale.backend.domain.cocktail.dto.CocktailGetLikeResponseDto;
import com.catale.backend.domain.cocktail.dto.CocktailGetResponseDto;
import com.catale.backend.domain.cocktail.dto.CocktailListResponseDto;
import com.catale.backend.domain.cocktail.entity.Cocktail;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Tag(name = "Cocktail 컨트롤러", description = "Cocktail Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cocktail")
public class CocktailController {

    private final ApiResponse response;
    private final MemberService memberService;
    private final CocktailService cocktailService;

    @Operation(summary = "칵테일 전체 조회", description = "칵테일 리스트 전체 조회")
    @GetMapping("/cocktail")
    public ResponseEntity<?> getAllCocktailList(
            @Parameter(hidden = true) Authentication authentication,
            @PageableDefault(page = 0, size = 10) SpringDataWebProperties.Pageable page) {

        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        List<CocktailListResponseDto> list = cocktailService.getAllCocktails(memberId);
        return new ResponseEntity<List<CocktailListResponseDto>>(list,HttpStatus.OK);
//        return response.success(ResponseCode.MEMBER_SIGNUP_SUCCESS, cocktailService.getAll
    }
    @Operation(summary = "내가 좋아요한 칵테일 조회", description = "내가 좋아요한 칵테일 리스트 조회")
    @GetMapping("/cocktail/like")
    public ResponseEntity<?> getLikcCocktailList(@Parameter(hidden = true) Authentication authentication,
                                                 @PageableDefault(page = 0, size = 10) SpringDataWebProperties.Pageable page){
        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        List<CocktailGetLikeResponseDto> list = cocktailService.getLikeCocktails(memberId);
        return new ResponseEntity<List<CocktailGetLikeResponseDto>>(list,HttpStatus.OK);
    }
    @Operation(summary = "칵테일 상세 조회", description = "칵테일 상세 조회")
    @GetMapping("/cocktail/{cocktailId}")
    public ResponseEntity<?> getCocktailDetail( @Parameter(hidden = true) Authentication authentication, @PathVariable Long cocktailId){

        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        CocktailGetResponseDto cocktail = cocktailService.getCocktailDetail(memberId, cocktailId);
        return new ResponseEntity<CocktailGetResponseDto>(cocktail, HttpStatus.OK);
    }

}
