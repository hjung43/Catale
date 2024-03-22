package com.catale.backend.domain.image.controller;

import com.catale.backend.domain.image.dto.MemberImageUpdateRequestDto;
import com.catale.backend.domain.image.service.ImageService;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PutMapping("/member/profileimage")
    public ResponseEntity<?> putMemberImage(@Parameter(hidden = true) Authentication authentication,
                                            @RequestPart(value = "image", required = false) MultipartFile image){

//        Optional<>
//        imageService.updateMemberImage(MemberImageUpdateRequestDto, imageUrl);
//        return new ResponseEntity<>(HttpStatus.OK);
        return null;
    }
}
