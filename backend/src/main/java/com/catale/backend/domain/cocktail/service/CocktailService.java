package com.catale.backend.domain.cocktail.service;

import com.catale.backend.domain.cocktail.dto.CocktailListGetResponseDto;
import com.catale.backend.domain.cocktail.entity.Cocktail;
import com.catale.backend.domain.cocktail.repository.CocktailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CocktailService {

    private final CocktailRepository cocktailRepository;

//    public List<CocktailListGetResponseDto> getAllCocktailList(Pageable page){
//        List<Cocktail> cocktailList = cocktailRepository.findAll();
//        List<CocktailListGetResponseDto> dtoList = cocktailList.stream().toList(CocktailListGetResponseDto);
//        return dtoList;
//    }
}
