package com.catale.backend.domain.diary.controller;

import com.catale.backend.domain.diary.dto.DiaryGetRequestDto;
import com.catale.backend.domain.diary.dto.DiaryGetResponseDto;
import com.catale.backend.domain.diary.service.DiaryService;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class
DiaryController {

    private final DiaryService diaryService;
    private final MemberService memberService;

    @GetMapping("/diary/{diaryId}")
    public ResponseEntity<?> getDiary(@Parameter(hidden = true) Authentication authentication,
                                      @PathVariable Long diaryId){
        DiaryGetResponseDto diary = diaryService.getDiary(diaryId);
        return new ResponseEntity<DiaryGetResponseDto>(diary, HttpStatus.OK);
    }
    @PostMapping("/diary")
    public ResponseEntity<?> postDiary(@Parameter(hidden = true) Authentication authentication,
                                       @Valid @RequestBody DiaryGetRequestDto dto){
        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        diaryService.postDiary(memberId, dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/diary/{diaryId}")
    public ResponseEntity<?> deleteDiary(@PathVariable Long diaryId){
        diaryService.deleteDiary(diaryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
