package com.catale.backend.domain.store.controller;

import com.catale.backend.domain.store.dto.StoreGetResponseDto;
import com.catale.backend.domain.store.entity.Store;
import com.catale.backend.domain.store.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Controller
public class StoreController {

    @Autowired
    StoreService storeService;

    // 모든 가게 조회
    @GetMapping("/store")
    public ResponseEntity<?> findAllStore(){

        List<StoreGetResponseDto> stores = storeService.StoreFindAll();
        return new ResponseEntity<List<StoreGetResponseDto>>(stores, HttpStatus.OK);
    }

    //가게 상세 조회
    @GetMapping("/store/{storeId}")
    public ResponseEntity<?> findStore(@PathVariable Long storeId){
        StoreGetResponseDto store = storeService.findById(storeId);
        return new ResponseEntity<StoreGetResponseDto>(store, HttpStatus.OK);
    }

}
