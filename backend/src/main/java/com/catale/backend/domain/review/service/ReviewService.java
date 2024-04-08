package com.catale.backend.domain.review.service;

import com.catale.backend.domain.cocktail.dto.MemberDataDto;
import com.catale.backend.domain.cocktail.dto.PreferenceDto;
import com.catale.backend.domain.cocktail.dto.RatingDto;
import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.cocktail.repository.CocktailRepository;
import com.catale.backend.domain.cocktail.service.RecommendApiService;
import com.catale.backend.domain.member.entity.Member;
import com.catale.backend.domain.member.repository.MemberRepository;
import com.catale.backend.domain.member.service.MemberService;
import com.catale.backend.domain.review.dto.ReviewGetRequestDto;
import com.catale.backend.domain.review.dto.ReviewGetResponseDto;
import com.catale.backend.domain.review.dto.ReviewListResponseDto;
import com.catale.backend.domain.review.entity.Review;
import com.catale.backend.domain.review.repository.ReviewRepository;
import com.catale.backend.global.exception.member.MemberNotFoundException;
import com.catale.backend.global.exception.review.ReviewListNotFoundException;
import com.catale.backend.global.exception.review.ReviewNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class ReviewService {

    private final MemberService memberService;
    private final ReviewRepository reviewRepository;
    private final CocktailRepository cocktailRepository;
    private final MemberRepository memberRepository;
    private final RecommendApiService recommendApiService;

    @Transactional
    public List<ReviewListResponseDto> getReviews(Long cocktailId, Pageable page){
        //아이디로 리뷰 리스트 찾기
        List<ReviewListResponseDto> list = reviewRepository.findByCocktailId(cocktailId, page).orElse(new ArrayList<>());
        return list;
    }

    @Transactional
    public Long postReview(Authentication authentication, ReviewGetRequestDto dto){
        Member me = memberService.findMember(authentication.getName());
        Long memberId = me.getId();

        Cocktail cocktail = cocktailRepository.findById(dto.getCocktailId()).orElseThrow(MemberNotFoundException::new);
        Review review = Review.builder()
                .member(memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new))
                .cocktail(cocktail)
                .content(dto.getContent())
                .rate(dto.getRate())
                .sweet(dto.getSweet())
                .bitter(dto.getBitter())
                .sour(dto.getSour())
                .sparking(dto.getSparking())
                .build();
        Review r = reviewRepository.save(review);

////      유저가 등록한 취향정보 반영하여 모델 재학습 로직
//        PreferenceDto preference = new PreferenceDto(memberId.intValue(), requestDto.getAlc(), requestDto.getSweet(), requestDto.getSour(), requestDto.getBitter(), requestDto.getSparking());
//        List<PreferenceDto> preferenceDtoList = new ArrayList<>();
//        preferenceDtoList.add(preference);
////      사용자 리뷰정보가 없을경우 기본 정보 추가
//        RatingDto defaultRating = new RatingDto(memberId.intValue(), 1, 0);
//        List<RatingDto> defaultRatingDtoList = new ArrayList<>();
//        defaultRatingDtoList.add(defaultRating);
//        List<RatingDto> reviewList = reviewRepository.findAllRatingsByMemberId(memberId).orElse(defaultRatingDtoList);
//        MemberDataDto memberData = MemberDataDto.builder()
//                .preferences(preferenceDtoList)
//                .ratings(reviewList)
//                .build();
//        log.info(memberData);
//        recommendApiService.retrainExistUserPreference(memberData);

        return r.getId();
    }

    @Transactional
    public Long deleteReview(Long reviewId){
        //리뷰id가 있는지 확인하고 삭제하기
        reviewRepository.findById(reviewId).orElseThrow(ReviewNotFoundException::new);
        reviewRepository.deleteById(reviewId);

        return reviewId;
    }
}
