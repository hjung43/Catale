from .models import Cocktail
from typing import List
import numpy as np

def calculate_cosine_similarity(target_attrs, other_attrs):
    target_vector = np.array(target_attrs)
    other_vector = np.array(other_attrs)
    cosine_similarity = np.dot(target_vector, other_vector) / (np.linalg.norm(target_vector) * np.linalg.norm(other_vector))
    return cosine_similarity

def get_sorted_cocktails(target_cocktail: Cocktail, all_cocktails: List[Cocktail]):
    target_attrs = [target_cocktail.alcohol, target_cocktail.sweet, target_cocktail.sour, target_cocktail.bitter, target_cocktail.carbonation]
    recommendations = []
    for cocktail in all_cocktails:
        if cocktail.id == target_cocktail.id:
            continue
        other_attrs = [cocktail.alcohol, cocktail.sweet, cocktail.sour, cocktail.bitter, cocktail.carbonation]
        similarity_score = calculate_cosine_similarity(target_attrs, other_attrs)
        recommendations.append((cocktail, similarity_score))
    recommendations.sort(key=lambda x: x[1], reverse=True)
    return recommendations[:5]
