package com.catale.backend.domain.member.repository.custom;

import com.catale.backend.domain.member.dto.MemberInfoDto;
import com.catale.backend.domain.member.entity.Member;

import java.util.Optional;

public interface MemberRepositoryCustom {

    Optional<MemberInfoDto> getMemberInfo(Long memberId);

    boolean isNicknameDuplicate(String nickname);

}
