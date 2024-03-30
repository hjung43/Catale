package com.catale.backend.domain.cocktail.service;


import com.catale.backend.domain.cocktail.dto.*;
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

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.data.domain.Pageable;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.catale.backend.domain.member.repository.MemberRepository;
import org.springframework.transaction.annotation.Transactional;

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

    //내가 먹은 칵테일 조회
    @Transactional
    public List <CoctailMyreviewResponseDto>getCocktailMyReviewList(Long memberId, Pageable page){
        //원하는 정렬 방법으로 정렬된 리스트 가져오기
        List<CoctailMyreviewResponseDto> myList = cocktailRepository.getCocktailMyReviewList(memberId, page).orElse(new ArrayList<>());
        for(CoctailMyreviewResponseDto c : myList){
            c.setReviewList(reviewRepository.findByMemberId(c.getId(),memberId).orElse(new ArrayList<>()));
            //해당 칵테일의 좋아요 여부 dto 등록
            Optional<LikeResponseDto> likeDto = likeRepository.getIsLike(memberId, c.getId());
            if(!likeDto.isEmpty()){
                c.setLike(true);
            }
        }
        return myList;
    }

    @Transactional
    public Long postCocktailLikeList(Long memberId, CocktailLikeListRequestDto requestDto){

        List<Long> list = requestDto.getCocktailIds();
        for(Long cocktailId : list){
            getCocktailLikeResult(memberId, cocktailId);
        }
        return  null;
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
            likeRepository.updateLikeCount(cocktailId, cocktail.getLikeCount()+1);
            responseDto.setLiked(true);
        }else{
            likeRepository.delete(isLike);
            likeRepository.updateLikeCount(cocktailId, cocktail.getLikeCount()-1);
            responseDto.setLiked(false);
        }
        return responseDto;
    }

    @Transactional
    public TodayCocktailResponseDto getTodayCocktail(Authentication authentication, TodayCocktailRequestDto request) {
        log.info("???");
        Member member = memberService.findMember(authentication.getName());
        Long memberId = member.getId();

        //먼저 오늘의 기분과 연관된 색의 칵테일을 하나 선정
        log.info("여기까지");
        List<Cocktail> cocktailList = cocktailRepository.findAll();
        Cocktail matchedCocktail = findBestMatchingItems(cocktailList, request.getEmotion1(), request.getEmotion2(), request.getEmotion3());
        log.info("matched:" + matchedCocktail.getName());
        TodayCocktailResponseDto responseDto = new TodayCocktailResponseDto(matchedCocktail);
        log.info("matched:" + responseDto.getCocktailId());
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
        log.info("dto:" + responseDto);
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

    @Transactional
    public List<CocktailSimpleInfoDto> getCocktailSearchByKeyword(Authentication authentication, String keyword, Pageable page){
        Member member = memberService.findMember(authentication.getName());
        Long memberId = member.getId();

        List<CocktailSimpleInfoDto> searchedList = cocktailRepository.searchByKeyword(keyword, page).orElse(new ArrayList<>());
        for(CocktailSimpleInfoDto infoDto : searchedList){
            infoDto.setLike(likeService.checkisLiked(memberId, infoDto.getCocktailId()));
        }
        return searchedList;
    }


    @Transactional
    public List<CocktailSimpleInfoDto> getCocktailSearchByOption(Authentication authentication,
                                                                 int base, int alc, int sweet, int sour, int bitter, int sparkling,
                                                                 Pageable page){
        Member member = memberService.findMember(authentication.getName());
        Long memberId = member.getId();

        List<CocktailSimpleInfoDto> searchedList = cocktailRepository
                                                    .searchByOption(base, alc, sweet, sour, bitter, sparkling, page)
                                                    .orElse(new ArrayList<>());
        for(CocktailSimpleInfoDto infoDto : searchedList){
            infoDto.setLike(likeService.checkisLiked(memberId, infoDto.getCocktailId()));
        }
        return searchedList;
    }





    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    /* 감정 1, 2, 3과의 차이가 적은 칵테일 목록을 뽑는 메서드 */
    private Cocktail findBestMatchingItems(List<Cocktail> cocktailList, int emotion1, int emotion2, int emotion3) {
        class CocktailDiff {
            private Long cocktailId;
            private int diff;

            public CocktailDiff(Long cocktailId, int diff) {
                this.cocktailId = cocktailId;
                this.diff = diff;
            }
            public int getDiff(){
                return diff;
            }
            public Long getCocktailId(){
                return cocktailId;
            }
        }

        List<Integer> cocktailEmoList;
        List<CocktailDiff> cocktailResults = new ArrayList<>();

        // 회원 emotion 정렬부터, 값이 없는경우(0인경우), 자리수 고려
        List<Integer> emoList = Stream.of(emotion1, emotion2, emotion3)
                .filter(emotion -> emotion != 0)
                .map(emotion -> emotion > 9 ? emotion / 10 : emotion)
                .sorted()
                .toList();

        for (Cocktail cocktail : cocktailList) {
            // 칵테일의 emotion 오름차순 정렬부터
            cocktailEmoList = new ArrayList<>();
            cocktailEmoList.add(cocktail.getEmotion1());
            cocktailEmoList.add(cocktail.getEmotion2());
            cocktailEmoList.add(cocktail.getEmotion3());
            cocktailEmoList.sort(Comparator.naturalOrder());

            int tmp = 0;
            int diff = 1000;
            int diffSum = 0;

            //각각의 최소 차이값 구하기
            for(int i=0; i<emoList.size(); i++){
                diff = 1000;
                for(int j=0; j<3; j++){
                    tmp = Math.abs(emoList.get(i) - cocktailEmoList.get(j));
                    if(tmp < diff) diff = tmp;
                }
                diffSum += diff;
            }
            cocktailResults.add(new CocktailDiff(cocktail.getId(), diffSum));
        }

        cocktailResults.sort(Comparator.comparingInt(CocktailDiff::getDiff));
        List<CocktailDiff> top5 = new ArrayList<>(cocktailResults.subList(0, 5));
        Collections.shuffle(top5);
        Cocktail matchedCocktail = cocktailRepository.findById(top5.get(0).getCocktailId()).orElseThrow(CocktailNotFoundException::new);
        log.info("matched:" + matchedCocktail.getId());
        return matchedCocktail;
    }

}
