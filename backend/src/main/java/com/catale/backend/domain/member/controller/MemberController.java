package com.catale.backend.domain.member.controller;

import com.catale.backend.domain.member.dto.EmailValidationRequestDto;
import com.catale.backend.domain.member.dto.LoginRequestDto;
import com.catale.backend.domain.member.dto.SignupRequestDto;
import com.catale.backend.domain.member.service.MemberService;
import com.catale.backend.global.format.code.ApiResponse;
import com.catale.backend.global.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Member 컨트롤러", description = "Member Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

    private final ApiResponse response;
    private final MemberService memberService;

    @Operation(summary = "일반 회원가입", description = "일반 회원가입")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequestDto requestDto,
                                    BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return response.fail(bindingResult);
        }

        Long savedId = memberService.create(requestDto);
        return response.success(ResponseCode.MEMBER_SIGNUP_SUCCESS, savedId);

    }

    @Operation(summary = "일반 로그인", description = "일반 로그인")
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto requestDto,
                                   BindingResult bindingResult,
                                   HttpServletResponse httpServletResponse) {

        if (bindingResult.hasErrors()) {
            return response.fail(bindingResult);
        }

        return response.success(ResponseCode.LOGIN_SUCCESS, memberService.login(requestDto, httpServletResponse));
    }

    @Operation(summary = "로그아웃", description = "로그아웃")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Parameter(hidden = true) Authentication authentication,
                                    HttpServletResponse servletResponse) {
        return response.success(ResponseCode.LOGOUT_SUCCESS, memberService.logout(authentication.getName(), servletResponse));
    }

    @Operation(summary = "이메일 확인 요청", description = "해당 이메일로 가입 가능한지 여부 체크")
    @PostMapping("/email/verification")
    public ResponseEntity<?> emailVerification(@Valid @RequestBody EmailValidationRequestDto requestDto) {

        return response.success(ResponseCode.EMAIL_VERIFIED_SUCCESS, memberService.checkEmailDuplication(requestDto));
    }

//    @Operation(summary = "소셜 회원가입", description = "소셜 회원가입")
//    @PostMapping("/social")
//    public ResponseEntity<?> signupBySocial(@Valid @RequestBody SignupRequestDto requestDto,
//                                            BindingResult bindingResult) {
//        return response.success(ResponseCode.MEMBER_SIGNUP_SUCCESS.getMessage());
//    }
//
//
//    @Operation(summary = "인증코드 인증 요청", description = "메일로 받은 인증코드를 입력해서 인증 요청")
//    @PostMapping("/email/verify")
//    public ResponseEntity<?> emailVerify(@Valid @RequestBody EmailCheckRequestDto requestDto,
//                                         BindingResult bindingResult,
//                                         HttpServletResponse servletResponse) {
//
//        if (bindingResult.hasErrors()) {
//            return response.fail(bindingResult);
//        }
//
//        return response.success(ResponseCode.EMAIL_VERIFIED_SUCCESS,
//                mailService.confirmAuthCode(requestDto.getEmail(), requestDto.getAuthNum(), servletResponse));
//    }
//
//    @Operation(summary = "닉네임 중복 검사", description = "닉네임의 중복 여부를 검사")
//    @GetMapping("/nickname/{nickname}/exists")
//    public ResponseEntity<?> nicknameExists(@Nickname @PathVariable String nickname) {
//        boolean result = memberService.checkNicknameDuplication(nickname);
//        return response.success(result ? ResponseCode.DUPLICATE_NICKNAME : ResponseCode.NICKNAME_AVAILABLE, result);
//    }
//
//
//
//    @Operation(summary = "소셜 로그인", description = "소셜 로그인")
//    @PostMapping("/login/social")
//    public ResponseEntity<?> loginBySocial(@RequestBody LoginRequestDto member) {
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//



}
