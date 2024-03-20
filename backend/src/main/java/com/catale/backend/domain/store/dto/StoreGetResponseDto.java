package com.catale.backend.domain.store.dto;

import com.catale.backend.domain.store.entity.Store;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
public class StoreGetResponseDto {

    private Long id;
    private boolean groupAvailable;
    private boolean reservationAvailable;
    private boolean petAvailable;
    private boolean wifiAvailable;
    private boolean parkAvailable;

    public StoreGetResponseDto(Store store){
        this.id = store.getId();
        this.groupAvailable = store.isGroupAvailable();
        this.reservationAvailable = store.isReservationAvailable();
        this.petAvailable = store.isPetAvailable();
        this.wifiAvailable = store.isWifiAvailable();
        this.parkAvailable = store.isParkAvailable();
    }

}
