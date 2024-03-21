package com.catale.backend.domain.image.dto;

public class ImagePostRequestDto {

    private Long imageid;
    private String imageurl;

    public ImagePostRequestDto(Long id, String url){
        this.imageid = id;
        this.imageurl = url;
    }
}
