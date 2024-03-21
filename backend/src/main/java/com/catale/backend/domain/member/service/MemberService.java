package com.catale.backend.domain.member.service;

import com.catale.backend.domain.member.dto.LoginRequestDto;
import com.catale.backend.domain.member.dto.SignupRequestDto;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.repository.MemberRepository;
import com.catale.backend.global.exception.member.DuplicateEmailException;
import com.catale.backend.global.exception.member.InvalidLoginAttemptException;
import com.catale.backend.global.exception.member.MemberNotFoundException;
import com.catale.backend.global.exception.member.PasswordMismatchException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;


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


//    private Member searchMemberByEmail(String email) {
//        Member member = memberRepository.searchByEmail(email)
//                .orElseThrow(EmailNotFoundException::new);
//        log.info("event=MemberSearchByEmail, email={}", email);
//        return member;
//    }
//
//    private void removeOldRefreshToken(LoginRequestDto requestDto, Member member) {
//        refreshTokenRepository.findById(member.getEmail())
//                .ifPresent(refreshTokenRepository::delete);
//        log.info("event=DeleteExistingRefreshToken, email={}", requestDto.getEmail());
//    }

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
