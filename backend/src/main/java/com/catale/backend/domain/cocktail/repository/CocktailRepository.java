package com.catale.backend.domain.cocktail.repository;

import com.catale.backend.domain.cocktail.entity.Cocktail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CocktailRepository extends JpaRepository<Cocktail, Long> {


}
