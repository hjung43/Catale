package com.catale.backend.domain.review.service;

import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.cocktail.repository.CocktailRepository;
import com.catale.backend.domain.member.repository.MemberRepository;
import com.catale.backend.domain.review.dto.ReviewGetRequestDto;
import com.catale.backend.domain.review.dto.ReviewGetResponseDto;
import com.catale.backend.domain.review.entity.Review;
import com.catale.backend.domain.review.repository.ReviewRepository;
import com.catale.backend.global.exception.member.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final CocktailRepository cocktailRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public List<ReviewGetResponseDto> getReviews(Long cocktailId){
        //아이디로 리뷰 리스트 찾기
        List<ReviewGetResponseDto> list = reviewRepository.findByCocktailId(cocktailId).orElseThrow(MemberNotFoundException::new);
        return list;
    }

    @Transactional
    public Long postReview(Long memberId, ReviewGetRequestDto dto){
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
        return r.getId();
    }

    @Transactional
    public Long deleteReview(Long reviewId){
        //리뷰id가 있는지 확인하고 삭제하기
        reviewRepository.findById(reviewId).orElseThrow(MemberNotFoundException::new);
        reviewRepository.deleteById(reviewId);

        return reviewId;
    }
}
