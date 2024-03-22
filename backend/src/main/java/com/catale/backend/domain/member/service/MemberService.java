package com.catale.backend.domain.member.service;

import com.catale.backend.domain.image.entity.Image;
import com.catale.backend.domain.member.dto.LoginRequestDto;
import com.catale.backend.domain.member.dto.LoginResponseDto;
import com.catale.backend.domain.member.dto.MemberInfo;
import com.catale.backend.domain.member.dto.SignupRequestDto;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.repository.MemberRepository;
import com.catale.backend.global.exception.member.*;
import com.catale.backend.global.jwt.TokenInfo;
import com.catale.backend.global.jwt.provider.TokenProvider;
import com.catale.backend.global.jwt.repository.RefreshTokenRepository;
import com.catale.backend.global.jwt.service.TokenService;
import com.catale.backend.global.util.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Log4j2
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final TokenProvider tokenProvider;
    private final TokenService tokenService;
    private final CookieUtil cookieUtil;


    /* 일반 회원가입 로직*/
    @Transactional
    public Long create(SignupRequestDto requestDto) {

        /* 비밀번호 불일치 */
        checkPasswordConfirmation(requestDto.getPassword(), requestDto.getPasswordConfirm());

        /* 이메일 중복 검증 */
        memberRepository.searchByEmail(requestDto.getEmail())
                .ifPresent(this::throwDuplicateEmailException);

        Member member = Member.of(requestDto, passwordEncoder.encode(requestDto.getPassword()), false);
        memberRepository.save(member);

        return member.getId();
    }

    public Member findMember(String email) {
        return memberRepository.searchByEmail(email).orElseThrow(MemberNotFoundException::new);
    }


    @Transactional
    public LoginResponseDto login(LoginRequestDto requestDto, HttpServletResponse response) {
        log.info("event=LoginAttempt, email={}", requestDto.getEmail());

        Member member = searchMemberByEmail(requestDto.getEmail());
        log.info("searchMemberByEmail");
        isPasswordMatchingWithEncoded(requestDto.getPassword(), member.getPassword());
        log.info("passwordMatched");
        removeOldRefreshToken(requestDto, member);

        TokenInfo tokenInfo = tokenProvider.generateTokenInfo(member.getEmail());
        tokenService.saveToken(tokenInfo);
        cookieUtil.addCookie("RefreshToken", tokenInfo.getRefreshToken(), tokenProvider.getREFRESH_TOKEN_TIME(), response);



        MemberInfo info = MemberInfo.builder()
                .memberId(member.getId())
                .profileImageId(Optional.ofNullable(member.getProfileImage()).map(Image::getId).orElse(null))
                .profileImageUrl(Optional.ofNullable(member.getProfileImage()).map(Image::getUrl).orElse(null))
                .email(member.getEmail())
                .nickname(member.getNickname())
                .alc(member.getAlc())
                .sweet(member.getSweet())
                .sour(member.getSour())
                .bitter(member.getBitter())
                .sparking(member.getSparking())
                .build();

        return LoginResponseDto.builder()
                                .token(tokenInfo.getAccessToken())
                                .memberInfo(info)
                                .build();
    }


    private Member searchMemberByEmail(String email) {
        Member member = memberRepository.searchByEmail(email)
                .orElseThrow(EmailNotFoundException::new);
        log.info("event=MemberSearchByEmail, email={}", email);
        return member;
    }

    private void removeOldRefreshToken(LoginRequestDto requestDto, Member member) {
//        log.info("email:" + member.getEmail());
        refreshTokenRepository.findByEmail(member.getEmail())
                .ifPresent(refreshTokenRepository::delete);
        log.info("event=DeleteExistingRefreshToken, email={}", requestDto.getEmail());
    }

    private void throwDuplicateEmailException(Member member) {
        throw new DuplicateEmailException();
    }

    private void isPasswordMatchingWithEncoded(String input, String encoded) {
        if (!passwordEncoder.matches(input, encoded)) {
            throw new InvalidLoginAttemptException();
        }
    }

    private void checkPasswordConfirmation(String password, String passwordConfirm) {
        if (!password.equals(passwordConfirm)) {
            throw new PasswordMismatchException();
        }
    }
}
