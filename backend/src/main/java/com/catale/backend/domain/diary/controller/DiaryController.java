package com.catale.backend.domain.diary.controller;

import com.catale.backend.domain.diary.dto.DiaryGetResponseDto;
import com.catale.backend.domain.diary.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
public class DiaryController {
    @Autowired
    DiaryService diaryService;

    @GetMapping("/diary/{diaryId}")
    public ResponseEntity<?> findDiary(@PathVariable Long diaryId){
        DiaryGetResponseDto diary = diaryService.findById(diaryId);
        return new ResponseEntity<DiaryGetResponseDto>(diary, HttpStatus.OK);
    }
    @PostMapping("/diary")
    public ResponseEntity<?> createDiary(@RequestBody DiaryGetResponseDto dto){
        diaryService.insertDiary(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/diary/{diaryId}")
    public ResponseEntity<?> deleteDiary(@PathVariable Long diaryId){
        diaryService.deleteById(diaryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
