from common.config import settings
from typing import List
from service.retrain_service import fit_partial_user_preference, refitting
from common.context.ItemFeatures import ItemFeatures
from models.dto.data_class import MemberData, ModelResult, Preference, Rating
from fastapi import APIRouter, Body, Depends, BackgroundTasks
import logging

import requests

rec = APIRouter(
    tags=["rec"],
    responses={404: {"description": "Page Not found"}},
)


# 기존 유저 취향정보(preference/review) 변경/생성 반영하여 재학습
@rec.post("/retrain/exist", status_code=202)
async def retrain_exist_user_preference(
        background_tasks: BackgroundTasks,
        memberData: MemberData = Body(...),
        item_features: ItemFeatures = Depends(ItemFeatures),
):
    logging.debug("이전 사용자 정보 반영 재학습 진행 : {}".format(memberData.preferences[0].user_id))
    logging.info("data")
    logging.info(item_features.data)
    
    background_tasks.add_task(
        fit_partial_user_preference, memberData.ratings, memberData.preferences, item_features
    )
    return

# # 기존 유저 리뷰정보 추가 반영 재학습 
# @rec.post("/retrain/rating", status_code=202)
# async def retrain_exist_user_rating(
#         background_tasks: BackgroundTasks,
#         rating: Rating = Body(..., alias="rating"),
# ):
#     logging.debug("사용자 피드백 실시간 반영 : {}".format(rating.user_id))
#     # logging.info("data")
#     # logging.info(item_features.data)
    
#     background_tasks.add_task(
#         fit_partial_user_rating, rating
#     )
#     return

# 신규 유저 정보(preference) 반영하여 재학습
@rec.post("/retrain/new", status_code=202)
async def retrain_new_model(
        background_tasks: BackgroundTasks,
        memberData: MemberData = Body(..., alias="memberData"),
        # preference: List[Preference] = Body(..., alias="preference"),
        item_features: ItemFeatures = Depends(ItemFeatures),
):
    logging.debug("신규 사용자 정보 반영 재학습 : {}".format(memberData.preferences[0].user_id))
    background_tasks.add_task(refitting_model, memberData, item_features.data)
    return


def refitting_model(memberData: MemberData, item_features: ItemFeatures):
    precision, recall, auc, mrr = refitting(
        memberData.time, memberData.ratings, memberData.preferences, item_features
    )
    data = ModelResult(
        savedDateTime=memberData.time,
        precision=precision,
        recall=recall,
        auc=auc,
        mrr=mrr,
    )
    logging.info(data)
    insert_train_result(data)


def insert_train_result(data: ModelResult):
    headers = {"content-type": "application/json"}
    url = settings.SPRING_BASE_URL + "/api/rec/retrain-model/any"
    response = requests.post(url, json=data.__dict__, headers=headers)
    if response.status_code == 200:
        logging.info("Success Save Retrained Model Information")
    else:
        logging.warn("Fail Save Retrained Model Information")