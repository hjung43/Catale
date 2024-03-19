package com.catale.backend.domain.store.entity;

import com.catale.backend.domain.image.entity.Image;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.REMOVE})
    @JoinColumn(name = "image_id")
    private Image image_id;

    @Column(name = "store_name")
    private String store_name;

    @Column(name = "address")
    private String address;

    @Column(name = "opening_hours")
    private String opening_hours;

    @Column(name = "tel")
    private String tel;

    @Column(name = "insta_url")
    private String insta_url;

    @Column(name = "group_available")
    private boolean group_available;

    @Column(name = "reservation_available")
    private boolean reservation_available;

    @Column(name = "pet_available")
    private boolean pet_available;

    @Column(name = "wifi_available")
    private boolean wifi_available;

}
