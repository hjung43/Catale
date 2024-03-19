package com.catale.backend.domain.store.entity;

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

    @Column(name = "group_available")
    private boolean group_available;

    @Column(name = "reservation_available")
    private boolean reservation_available;

    @Column(name = "pet_available")
    private boolean pet_available;

    @Column(name = "wifi_available")
    private boolean wifi_available;

    @Column(name = "park_available")
    private boolean park_available;

}
