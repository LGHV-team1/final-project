import numpy as np
import pandas as pd
from surprise import Reader
from surprise import Dataset
from surprise.prediction_algorithms import KNNBaseline

def random_similer(user_input=[]):
  con_score = pd.read_csv('/content/drive/MyDrive/LG Hellovision VOD 추천 프로젝트/모델/content_surprise/csv/score.csv')
  rec = pd.read_csv('/content/drive/MyDrive/LG Hellovision VOD 추천 프로젝트/모델/content_surprise/csv/recommend_all_user.csv')

  # surprise 데이터 형식으로 변환
  def convert_traintest_dataframe_forsurprise(training_dataframe):
    reader = Reader(rating_scale=(0, 1)) # 범위가 0~1 인 경우
    trainset = Dataset.load_from_df(training_dataframe[['subsr', 'vod_id', 'cp_score']], reader)
    trainset = trainset.construct_trainset(trainset.raw_ratings)
    return trainset

  trainset = convert_traintest_dataframe_forsurprise(con_score)

  trainset = convert_traintest_dataframe_forsurprise(con_score)
  sim_options = {'name': 'pearson', 'user_based': True}
  knnbaseline = KNNBaseline(sim_options=sim_options, bsl_options={'method': 'sgd', 'n_epochs': 1})
  knnbaseline.fit(trainset)

  top_n_neighbors = {}
  try:
      inner_uid = trainset.to_inner_uid(user_input)
      neighbors = knnbaseline.get_neighbors(inner_uid, k=3)
      top_n_neighbors[user_input] = [trainset.to_raw_uid(x) for x in neighbors]
  except ValueError:
      top_n_neighbors[user_input] = []

  similer3 = pd.DataFrame.from_dict(top_n_neighbors, orient='index')

  # vod_predict 데이터프레임 생성
  vod_predict = rec.copy()
  vod_predict.index = vod_predict['subsr']
  vod_predict = vod_predict.apply(lambda x: x[1:].tolist(), axis=1)
  vod_predict = vod_predict.reset_index()
  vod_predict.columns = ['subsr', 'vod_id']

  def get_combined_vod_ids(row):
    combined_vod_ids = []
    for col_idx in range(1, 4):
      user_id = row.iloc[col_idx]
      vod_ids = vod_predict[vod_predict['subsr'] == user_id]['vod_id'].values
      if vod_ids:
        combined_vod_ids.extend(vod_ids[0])

      # 중복 제거
      combined_vod_ids = list(OrderedDict.fromkeys(combined_vod_ids))[:10]
      return combined_vod_ids

  if user_input in similer3.index:
    similer3_row = similer3.loc[user_input]
    combined_vod_ids_result = get_combined_vod_ids(similer3_row)
  else:
    combined_vod_ids_result = []  # Return empty list if user_input not found

  return combined_vod_ids_result