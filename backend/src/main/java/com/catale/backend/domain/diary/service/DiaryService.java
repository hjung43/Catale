package com.catale.backend.domain.diary.service;

import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.cocktail.repository.CocktailRepository;
import com.catale.backend.domain.diary.dto.DiaryGetRequestDto;
import com.catale.backend.domain.diary.dto.DiaryGetResponseDto;
import com.catale.backend.domain.diary.dto.DiaryMonthResponseDto;
import com.catale.backend.domain.diary.entity.Diary;
import com.catale.backend.domain.diary.repository.DiaryRepository;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.repository.MemberRepository;
import com.catale.backend.global.exception.member.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final CocktailRepository cocktailRepository;
    private final MemberRepository memberRepository;

    //다이어리 상세조회
    @Transactional
    public DiaryGetResponseDto getDiaryDetail(Long diaryId){
        return diaryRepository.getDiaryDetail(diaryId).orElseThrow(NullPointerException::new);
    }
    //월 별 다이어리 조회
    @Transactional
    public List<DiaryMonthResponseDto> getDiarys(int year, int month, Long memberId){
        List<DiaryMonthResponseDto> diaryList = diaryRepository.getDiraryMonth(year,month,memberId).orElseThrow(NullPointerException::new);
        return diaryList;
    }
    // 다이어리 등록
    @Transactional
    public Long postDiary(Long memberId,DiaryGetRequestDto dto){
        //칵테일 레포지토리에서 칵테일 아이디로 칵테일 찾아서 저장
        Cocktail cocktail = cocktailRepository.findById(dto.getCocktailId()).orElseThrow(NullPointerException::new);
        Diary diary = Diary.builder()
                .member(memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new))
                .cocktail(cocktail)
                .mood(dto.getMood())
                .comment(dto.getComment())
                .reason(dto.getReason())
                .emotion1(dto.getEmotion1())
                .emotion2(dto.getEmotion2())
                .emotion3(dto.getEmotion3())
                .build();
        Diary saveDiary = diaryRepository.save(diary);
        if(saveDiary.getId() == null){

        }
        return saveDiary.getId();
    }
    //다이어리 삭제
    @Transactional
    public void deleteDiary(Long diaryId){
        diaryRepository.deleteById(diaryId);
    }


}
