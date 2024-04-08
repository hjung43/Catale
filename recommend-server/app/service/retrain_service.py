from fastapi import HTTPException
import logging

import pickle
from typing import List
import numpy as np
from lightfm import LightFM
from lightfm.data import Dataset
from lightfm.evaluation import precision_at_k, auc_score, recall_at_k, reciprocal_rank
from common.context.ItemFeatures import ItemFeatures

from models.dto.data_class import Rating, Preference
from util.modelutil import *
from util.optimizer import Optimizer

# 기존에 학습시킨 사용자의 새 기호정보를 기반으로 재학습
import logging
from typing import List

def fit_partial_user_preference(
        ratings: List[Rating],
        preference: List[Preference],
        item_features
):
    try:
        # 저장된 dataset, model 불러오기
        dataset = Dataset()
        dataset = load_dataset()
        model = load_rec_model()
        
        logging.info(ratings)
        logging.info("데이터셋과 모델 로드 완료")
        

        # 평점 정보 dataframe 생성
        rating_df = make_rating_df(ratings)
        logging.info(rating_df)
        logging.info("평점 정보 dataframe 생성 완료")

        # LightFM 모델에서 사용할 상호작용 데이터 생성
        interactions, weights = make_interactions(rating_df, dataset)
        logging.info("상호작용 데이터 생성 완료")

        # 사용자의 선호도 정보를 dataframe으로 변환
        preference_df = make_user_features_df(preference)
        logging.info("사용자 선호도 정보 dataframe 변환 완료")

        # 사용자 및 항목 메타데이터 생성
        # user_meta, item_meta = make_features(
        #     preference_df=preference_df, item_features=item_features, dataset=dataset
        # )
        user_source = make_source(preference_df)
        item_source = make_source(item_features.data)
        logging.info("source")
       
        item_meta = dataset.build_item_features(item_source, normalize=False)
        user_meta = dataset.build_user_features(user_source, normalize=False)
        logging.info("meta")
        
        logging.info("tq")
        # interactions, weights = dataset.build_interactions(zip(item_features['user_id'], item_features['cocktail_id'], item_features['rating']))
        interactions, weights = make_interactions(rating_df, dataset)
        logging.info("사용자 및 항목 메타데이터 생성 완료")

        # 생성된 데이터를 기반으로 모델 재학습
        model.fit_partial(
            interactions=interactions,
            sample_weight=weights,
            user_features=user_meta,
            item_features=item_meta,
            epochs=1,
            verbose=False,
        )
        logging.info("모델 부분 재학습 완료")

        # 중복 제거하여 신규 사용자 정보를 기존 정보에 통합
        rating_df = concat_ratings(rating_df=rating_df)
        # 중복 제거해서 신규 사용자 정보를 기존 정보에 통합하기
        user_features_df = concat_user_features(user_features_df=preference_df)  
        rating_df.to_csv(settings.RATING_FILE, encoding=settings.ENCODING)
        logging.info("사용자 특성 정보 통합 완료")

        # 사용자 특성 정보 저장
        user_features_df.to_csv(settings.USER_FEATURES_FILE, encoding=settings.ENCODING)
        logging.info("사용자 특성 정보 저장 완료")

        # 새로 학습한 모델 업데이트
        update_model(model, settings.MODEL_PATH + settings.MODEL_NAME)
        logging.info("모델 업데이트 완료(마지막)")

    except Exception as e:
        logging.error(f"기존 사용자 모델 재학습 오류: {e}", exc_info=True)

    


# 이전에 학습시키지 않았던 사용자를 반영한 재학습
def refitting(
        time, ratings: List[Rating], preferences: List[Preference], item_features
):
    new_rating_df = make_rating_df(ratings=ratings)
    new_user_features_fd = make_user_features_df(preferences)
    rating_df = concat_ratings(new_rating_df)
    user_features = concat_user_features(user_features_df=new_user_features_fd)

    cols = user_features.columns.tolist()[1:]
    # item_features = item_features[["cocktail_id"] + cols]

    dataset = dataset_fit(
        users=np.arange(user_features.user_id.max() + 1),
        items=np.arange(item_features.cocktail_id.max() + 1),
        cols=cols,
    )

    interactions, weights = make_interactions(rating_df=rating_df, dataset=dataset)
    user_meta, item_meta = make_features(user_features, item_features, dataset=dataset)

    test_data = pd.read_csv(
        settings.TEST_DATA_FILE, index_col=0, encoding=settings.ENCODING
    )
    test_interactions, _ = make_interactions(rating_df=test_data, dataset=dataset)

    # # Hyper Parameter Search
    # optimizer = Optimizer(
    #     interactions, weights, test_interactions, user_meta, item_meta
    # )
    # hyper_params = optimizer.train(15)

    # logging.info("Hyper Params Optimization - {}".format(hyper_params))

    model = LightFM(
        no_components=hyper_params["no_components"],
        learning_rate=hyper_params["learning_rate"],
        item_alpha=hyper_params["item_alpha"],
        user_alpha=hyper_params["user_alpha"],
        learning_schedule="adagrad",
        loss="warp",
        random_state=42,
    )
    model.fit(
        interactions=interactions,
        sample_weight=weights,
        item_features=item_meta,
        user_features=user_meta,
        epochs=1,
        verbose=True,
    )

    logging.info(
        "-------------------------------------[파일 저장 시도]-------------------------------------"
    )
    logging.info("{} - Model, Dataset, 데이터 업데이트 진행".format(time))
    update_model(model, settings.MODEL_PATH + settings.MODEL_NAME)
    update_dataset(dataset, settings.DATASET_PATH + settings.DATASET_NAME)
    rating_df.to_csv(settings.RATING_FILE, encoding=settings.ENCODING)
    user_features.to_csv(settings.USER_FEATURES_FILE, encoding=settings.ENCODING)
    # logging.info("모델, 데이터셋 백업")
    # logging.info(
    #     "dataset path : {} model path : {}".format(
    #         create_backup_path("dataset", "pkl", time),
    #         create_backup_path("model", "pkl", time),
    #     )
    # )
    # with open(create_backup_path("dataset", "pkl", time), "wb") as f:
    #     pickle.dump(dataset, f)
    # with open(create_backup_path("model", "pkl", time), "wb") as f:
    #     pickle.dump(model, f)
    logging.info(
        "---------------------------------------[저장 성공]---------------------------------------"
    )

    precision, recall, auc, mrr = evaluate(
        model,
        test_interactions=test_interactions,
        user_meta=user_meta,
        item_meta=item_meta,
    )

    logging.info(
        "모델 재학습 결과 \nPrecision : {} Recall : {} AUC : {} MRR : {}".format(
            precision, recall, auc, mrr
        )
    )
    logging.info("refitting 끝")

    return precision, recall, auc, mrr

# def fit_partial_user(
#         ratings: List[Rating], preferences: List[Preference], item_features
# ):
#     try:
#         # 저장된 dataset, model 불러오기
#         dataset = Dataset()
#         dataset = load_dataset()
#         model = load_rec_model()
       
#         # 평점 정보 dataframe 생성 
#         rating_df = make_rating_df(ratings)
#         # LightFM 모델에서 사용할 상호작용 데이터를 생성
#         interactions, weights = make_interactions(rating_df, dataset)
#         # 사용자의 선호도 정보를 dataframe으로 변환
#         preference_df = make_user_features_df(preferences)
       
#         user_meta, item_meta = make_features(
#             preference_df=preference_df, item_features=item_features, dataset=dataset
#         )
       
#         # 생성된 데이터를 기반으로 모델 재학습 
#         model.fit_partial(
#             interactions=interactions,
#             sample_weight=weights,
#             user_features=user_meta,
#             item_features=item_meta,
#             epochs=3,
#             verbose=False,
#         )
      
#         rating_df = concat_ratings(rating_df=rating_df)

#         # 중복 제거해서 신규 사용자 정보를 기존 정보에 통합하기
#         user_features_df = concat_user_features(user_features_df=preference_df)  
#         rating_df.to_csv(settings.RATING_FILE, encoding=settings.ENCODING)
#         user_features_df.to_csv(settings.USER_FEATURES_FILE, encoding=settings.ENCODING)
#         # 새로 학습한 모델 업데이트 
#         update_model(model, settings.MODEL_PATH + settings.MODEL_NAME)

#     except Exception as e:
#         logging.error("기존 사용자 모델 재학습 오류 : {}".format(e.args[0]))

def dataset_fit(users, items, cols):
    dataset = Dataset()
    dataset.fit(users=users, items=items, user_features=cols, item_features=cols)
    return dataset


def evaluate(model, test_interactions, user_meta, item_meta):
    precision = precision_at_k(
        model, test_interactions, user_features=user_meta, item_features=item_meta, k=9
    ).mean()
    recall = recall_at_k(
        model, test_interactions, user_features=user_meta, item_features=item_meta, k=9
    ).mean()
    auc = auc_score(
        model, test_interactions, user_features=user_meta, item_features=item_meta
    ).mean()
    mrr = reciprocal_rank(
        model,
        test_interactions=test_interactions,
        user_features=user_meta,
        item_features=item_meta,
    ).mean()
    return precision, recall, auc, mrr