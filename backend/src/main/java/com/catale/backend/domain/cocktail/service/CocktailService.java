package com.catale.backend.domain.cocktail.service;


import com.catale.backend.domain.cocktail.dto.CocktailGetLikeResponseDto;
import com.catale.backend.domain.cocktail.dto.CocktailGetResponseDto;
import com.catale.backend.domain.cocktail.dto.CocktailLikeResponseDto;
import com.catale.backend.domain.cocktail.dto.CocktailSimpleInfoDto;
import com.catale.backend.domain.cocktail.dto.TodayCocktailRequestDto;
import com.catale.backend.domain.cocktail.dto.TodayCocktailResponseDto;
import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.cocktail.repository.CocktailRepository;
import com.catale.backend.domain.like.dto.LikeResponseDto;
import com.catale.backend.domain.like.entity.Like;
import com.catale.backend.domain.like.repository.LikeRepository;
import com.catale.backend.domain.like.service.LikeService;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.service.MemberService;
import com.catale.backend.domain.review.repository.ReviewRepository;
import com.catale.backend.global.exception.cocktail.CocktailNotFoundException;

import com.catale.backend.global.exception.member.MemberNotFoundException;
import java.util.Collections;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.data.domain.Pageable;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.catale.backend.domain.cocktail.dto.CocktailListResponseDto;
import com.catale.backend.domain.member.repository.MemberRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import reactor.core.publisher.Mono;


@Log4j2
@Service
@RequiredArgsConstructor
public class CocktailService {

    private final CocktailRepository cocktailRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final LikeRepository likeRepository;
    private final LikeService likeService;
    private final ReviewRepository reviewRepository;
    private final RecommendApiService apiService;

    //칵테일 전체 리스트 조회
    @Transactional
    public List<CocktailListResponseDto> getAllCocktails(Long memberId, Pageable page){
        //좋아요 수 많은 순서대로 리스트 가져오기
        List<CocktailListResponseDto> list = cocktailRepository.getCocktails(page).orElse(new ArrayList<>());
        //칵테일 마다 유저가 좋아요 했는지 유무 저장
        for(CocktailListResponseDto c : list) {
            Optional<LikeResponseDto> likeDto = likeRepository.getIsLike(memberId, c.getId());
            if(!likeDto.isEmpty()){
                c.setLike(true);
        }
        }
        return list;
    }
    //내가 좋아요 한 칵테일 리스트
    @Transactional
    public List<CocktailGetLikeResponseDto> getLikeCocktails(Long memberId, Pageable page){
        List<CocktailGetLikeResponseDto> list = cocktailRepository.getLikeCoctails(memberId, page)
                                                                  .orElse(new ArrayList<>());
        return list;
    }

    //칵테일 상세정보 조회
    @Transactional
    public CocktailGetResponseDto getCocktailDetail(Long memberId, Long cocktailId){
        Cocktail cocktail = cocktailRepository.findById(cocktailId).orElseThrow(CocktailNotFoundException::new);
        CocktailGetResponseDto cocktailDto = new CocktailGetResponseDto(cocktail);
        //해당 칵테일의 리뷰 조회 및 dto 저장
//        cocktailDto.setReviewList(reviewRepository.findByCocktailId(cocktailId,page).orElse(new ArrayList<>()));
        //해당 칵테일의 좋아요 여부 dto 등록
        Optional<LikeResponseDto> likeDto = likeRepository.getIsLike(memberId, cocktailId);
        if(!likeDto.isEmpty()){
            cocktailDto.setLike(true);
        }
        return cocktailDto;

    }

    @Transactional
    public CocktailLikeResponseDto getCocktailLikeResult(Long memberId, Long cocktailId){
//        Member member = memberService.findMember(auth.getName());
//        Long memberId = member.getId();
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);

        Cocktail cocktail = cocktailRepository.findById(cocktailId).orElseThrow(CocktailNotFoundException::new);
        Like isLike = likeRepository.getLike(memberId, cocktailId).orElse(null);
        CocktailLikeResponseDto responseDto = new CocktailLikeResponseDto();
        responseDto.setCocktailId(cocktailId);

        if(isLike == null){
            Like like = Like.builder()
                            .cocktail(cocktail)
                            .member(member)
                            .build();
            likeRepository.save(like);
            responseDto.setLiked(true);
        }else{
            likeRepository.delete(isLike);
            responseDto.setLiked(false);
        }
        return responseDto;
    }


    @Transactional
    public TodayCocktailResponseDto getTodayCocktail(Authentication authentication, TodayCocktailRequestDto request) {
        Member member = memberService.findMember(authentication.getName());
        Long memberId = member.getId();

        //먼저 오늘의 기분과 연관된 색의 칵테일을 하나 선정
        List<Cocktail> cocktailList = cocktailRepository.findAll();
        Cocktail matchedCocktail = findBestMatchingItems(cocktailList, request.getEmotion1(), request.getEmotion2(), request.getEmotion3());
        TodayCocktailResponseDto responseDto = new TodayCocktailResponseDto(matchedCocktail);
        responseDto.setLike(likeService.checkisLiked(memberId, matchedCocktail.getId()));

        // FastAPI 호출, 연관 칵테일 Id list 반환
        List<Long> recommendedIdList = apiService.getTodayCocktailResponse(matchedCocktail.getId()).block();
        // id -> dto로 변환
        List<CocktailSimpleInfoDto> simpleInfoDtos = recommendedIdList.stream()
                              .map(id -> {
                                  Cocktail cocktail = cocktailRepository.findById(id)
                                                                        .orElseThrow(CocktailNotFoundException::new);
                                                                        return cocktail;
                              }).map(cocktail -> {
                                    CocktailSimpleInfoDto simpleInfoDto = new CocktailSimpleInfoDto(cocktail);
                                    simpleInfoDto.setLike(likeService.checkisLiked(memberId, cocktail.getId()));
                                    return simpleInfoDto;
                              }).toList();

        responseDto.setRecommendedCocktailList(simpleInfoDtos);
        return responseDto;
    }

    @Transactional
    public List<CocktailGetResponseDto> getMemberRecommendCocktail(Authentication authentication){
        Member member = memberService.findMember(authentication.getName());
        Long memberId = member.getId();

        // FastAPI 호출, 이용자 맞춤 추천 칵테일 Id list 반환
        List<Long> recommendedIdList = apiService.getMemberRecommendResponse(memberId).block();
        // id -> dto로 변환
        List<CocktailGetResponseDto> responseDtoList = recommendedIdList.stream()
                .map(id -> {
                    Cocktail cocktail = cocktailRepository.findById(id)
                            .orElseThrow(CocktailNotFoundException::new);
                    return cocktail;
                }).map(cocktail -> {
                    CocktailGetResponseDto cocktailDto = new CocktailGetResponseDto(cocktail);
                    cocktailDto.setLike(likeService.checkisLiked(memberId, cocktail.getId()));
                    return cocktailDto;
                }).toList();

        return responseDtoList;
    }





    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    /* 감정 1, 2, 3과의 차이가 적은 칵테일 목록을 뽑는 메서드 */
    private Cocktail findBestMatchingItems(List<Cocktail> cocktailList, int emotion1, int emotion2, int emotion3) {
        List<Cocktail> bestMatches = new ArrayList<>();
        int minDifference = Integer.MAX_VALUE;

        for (Cocktail cocktail : cocktailList) {
            int cocktailAttr1 = cocktail.getEmotion1();
            int cocktailAttr2 = cocktail.getEmotion2();
            int cocktailAttr3 = cocktail.getEmotion3();

            int diff =
                Math.abs(cocktailAttr1 - emotion1) + Math.abs(cocktailAttr2 - emotion2) + Math.abs(
                    cocktailAttr3 - emotion3);

            if (diff < minDifference) {
                bestMatches.clear();
                bestMatches.add(cocktail);
                minDifference = diff;
            }

        }
        Collections.shuffle(bestMatches);
        return bestMatches.get(0);
    }


}
