package com.catale.backend.domain.cocktail.entity;

import com.catale.backend.domain.base.BaseEntity;
import com.catale.backend.domain.image.entity.Image;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Where(clause = "is_deleted = false")
@SQLDelete(sql = "UPDATE cocktail SET is_deleted = TRUE WHERE cocktail_id = ?")
public class Cocktail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cocktail_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REMOVE})
    @JoinColumn(name = "image_id")
    private Image image;

    @Column(name = "name")
    private String name;

    @Column(name = "alc")
    private int alc;

    @Column(name = "sweet")
    private int sweet;

    @Column(name = "sour")
    private int sour;

    @Column(name = "bitter")
    private int bitter;

    @Column(name = "sparking")
    private int sparking;

    /* 칵테일의 색은 1~9까지로 나뉘어짐,
    * 1: 핑크 / 2: 빨강 / 3: 주황 / 4: 노랑 / 5: 갈색 / 6: 클리어 / 7: 초록 / 8: 화이트 / 9: 파랑
    *  */
    @Column(name = "color1")
    private int color1;

    @Column(name = "color2")
    private int color2;

    @Column(name = "color3")
    private int color3;

    @Column(name = "glass")
    private int glass;

    @Column(name = "content")
    private String content;

    @Column(name = "ingredient")
    private String ingredient;

    @Column(name = "base")
    private int base;

    @Column(name = "emotion1")
    private int emotion1;

    @Column(name = "emotion2")
    private int emotion2;

    @Column(name = "emotion3")
    private int emotion3;

    @Column(name = "like_count")
    private int likeCount;

    @Column(name = "fruit")
    private int fruit;


}
