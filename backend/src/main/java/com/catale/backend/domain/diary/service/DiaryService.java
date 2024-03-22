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



    @Transactional
    public DiaryGetResponseDto getDiaryDetail(Long diaryId){
        return diaryRepository.getDiaryDetail(diaryId).orElseThrow(NullPointerException::new);
    }

    @Transactional
    public List<DiaryMonthResponseDto> getDiarys(int year, int month, Long memberId){
        List<DiaryMonthResponseDto> diaryList = diaryRepository.getDiraryMonth(year,month,memberId).orElseThrow(NullPointerException::new);
        return diaryList;
    }

    @Transactional
    public void postDiary(Long memberId,DiaryGetRequestDto dto){
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
        diaryRepository.save(diary);
    }

    @Transactional
    public void deleteDiary(Long diaryId){
        diaryRepository.deleteById(diaryId);
    }


}
