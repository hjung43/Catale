package com.catale.backend.domain.diary.controller;

import com.catale.backend.domain.diary.dto.DiaryGetRequestDto;
import com.catale.backend.domain.diary.dto.DiaryGetResponseDto;
import com.catale.backend.domain.diary.dto.DiaryMonthResponseDto;
import com.catale.backend.domain.diary.service.DiaryService;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Tag(name = "Diary 컨트롤러", description = "Diary Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/diary")
public class
DiaryController {

    private final DiaryService diaryService;
    private final MemberService memberService;

    @Operation(summary = "다이어리 상세 조회", description = "날짜별 다이어리 상세 페이지 조회")
    @GetMapping("/{diaryId}")
    public ResponseEntity<?> getDiary(@Parameter(hidden = true) Authentication authentication,
                                      @PathVariable Long diaryId){
        DiaryGetResponseDto diary = diaryService.getDiaryDetail(diaryId);
        return new ResponseEntity<DiaryGetResponseDto>(diary, HttpStatus.OK);
    }
    @Operation(summary = "다이어리 저장", description = "데일리 칵테일 추천 후 다이어리에 저장")
    @PostMapping
    public ResponseEntity<?> postDiary(@Parameter(hidden = true) Authentication authentication,
                                       @Valid @RequestBody DiaryGetRequestDto dto){
        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        diaryService.postDiary(memberId, dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @Operation(summary = "다이어리 삭제", description = "다이어리 삭제")
    @DeleteMapping("/{diaryId}")
    public ResponseEntity<?> deleteDiary(@PathVariable Long diaryId){
        diaryService.deleteDiary(diaryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @Operation(summary = "월별 다이어리 조회", description = "월별 다이어리 전체 조회")
    @GetMapping
    public ResponseEntity<?> getDiaryMonth(@Parameter(hidden = true) Authentication authentication, @RequestParam int year, @RequestParam int month){
        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        List<DiaryMonthResponseDto> list = diaryService.getDiarys(year,month,memberId);
        return new ResponseEntity<List<DiaryMonthResponseDto>>(list, HttpStatus.OK);
    }

}
