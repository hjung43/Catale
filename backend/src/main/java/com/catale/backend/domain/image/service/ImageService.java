package com.catale.backend.domain.image.service;

import com.catale.backend.domain.image.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;
    @Transactional
    public Long updateMemberImage(Long imageId, String imageUrl){
       return imageRepository.updateMemberImage(imageId, imageUrl);

    }

}
