package com.catale.backend.domain.review.entity;

import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
/* soft delete 관련 */
@Where(clause = "is_deleted = false")
@SQLDelete(sql = "UPDATE member SET is_deleted = TRUE WHERE member_id = ?")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String content;

    private int rate;

    private int sweet;

    private int bitter;

    private int sour;

    private int sparking;



}
