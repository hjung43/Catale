from fastapi import Body
from pydantic import BaseModel, Field
from typing import List
import pandas as pd

class Rating(BaseModel):
    user_id: int = Field(..., alias="memberId", ge=1)
    cocktail_id: int = Field(..., alias="cocktailId", ge=1)
    rating: int

class Preference(BaseModel):
    user_id: int = Field(..., alias="memberId")
    alc: int = Field(..., ge=0, le=5)
    sweet: int = Field(..., ge=0, le=5)
    sour: int = Field(..., ge=0, le=5)
    bitter: int = Field(..., ge=0, le=5)
    sparking: int = Field(..., ge=0, le=5)

class MemberData(BaseModel):
    ratings: List[Rating]
    preferences: List[Preference]


class UserPreference(BaseModel):
    alc: int = Body(..., ge=0, le=5)
    sweet: int = Body(..., ge=0, le=5)
    sour: int = Body(..., ge=0, le=5)
    bitter: int = Body(..., ge=0, le=5)
    sparking: int = Body(..., ge=0, le=5)


class PersonalcocktailRequest(BaseModel):
    user_id: int = Body(..., alias="memberId")
    preferences: List[Preference] = Body(..., alias="preferenceDtoList")


class ModelResult(BaseModel):
    savedDateTime: str
    precision: float
    recall: float
    auc: float
    mrr: float

# class Preference(BaseModel):
#     user_id: int = Body(..., alias="memberId")
#     alc: int = Body(..., ge=0, le=5)
#     sweet: int = Body(..., ge=0, le=5)
#     sour: int = Body(..., ge=0, le=5)
#     bitter: int = Body(..., ge=0, le=5)
#     sparking: int = Body(..., ge=0, le=5)

# class Rating(BaseModel):
#     user_id: int = Body(..., alias="memberId")
#     cocktail_id: int = Body(..., alias="cocktailId", ge=1)
#     rating: int = Body(...)

# class MemberData(BaseModel):
#     # time: str = 0.05982906
#     ratings: List[Rating] = Body(..., alias="ratings")
#     preferences: List[Preference] = Body(..., alias="preferences")