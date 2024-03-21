package com.catale.backend.domain.image.controller;

import com.catale.backend.domain.image.service.ImageService;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

//    @PutMapping("/member/profileimage")
//    public ResponseEntity<?> putMemberImage(@Parameter(hidden = true) Authentication authentication,
//                                            @Valid  @RequestPart(value = "image", required = false) MultipartFile image){
//
//    }
}
