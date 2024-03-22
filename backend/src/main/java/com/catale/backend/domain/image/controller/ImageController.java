package com.catale.backend.domain.image.controller;

import com.catale.backend.domain.image.dto.MemberImageUpdateRequestDto;
import com.catale.backend.domain.image.service.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Tag(name = "Image 컨트롤러", description = "Image Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/image")
public class ImageController {

    private final ImageService imageService;

    @Operation(summary = "사용자 프로필 사진 수정", description = "사용자 프로필 사진 수정")
    @PutMapping("/member/profileimage")
    public ResponseEntity<?> putMemberImage(@Parameter(hidden = true) Authentication authentication,
                                            @RequestPart(value = "image", required = false) MultipartFile image){

//        Optional<>
//        imageService.updateMemberImage(MemberImageUpdateRequestDto, imageUrl);
//        return new ResponseEntity<>(HttpStatus.OK);
        return null;
    }
}
