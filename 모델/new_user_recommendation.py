import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings(action='ignore')
from surprise import Reader
from surprise import Dataset
from surprise.prediction_algorithms import KNNBaseline

def new_user_recommendation(vod_input = []):
    vod_score = pd.read_csv('../data/vod_score.csv')
    vod = pd.DataFrame([[1]*len(vod_input), vod_input, [0.7]*len(vod_input)]).T
    vod.columns =vod_score.columns
    vod_score_1 = pd.concat([vod_score, vod], axis = 0)

    # surprise 데이터 형식으로 변환
    def convert_traintest_dataframe_forsurprise(training_dataframe):
        reader = Reader(rating_scale=(0, 1)) # 이 범위를 넘으면 양극값으로 대체
        trainset = Dataset.load_from_df(training_dataframe[['subsr', 'vod_id', 'score']], reader)
        trainset = trainset.construct_trainset(trainset.raw_ratings)
        return trainset

    trainset = convert_traintest_dataframe_forsurprise(vod_score_1)
    sim_options = {'name': 'pearson_baseline', 'user_based': False} # item-based similarity
    bsl_options = {'method' : 'sgd', 'n_epochs' : 1}
    knnbaseline = KNNBaseline(k = 40, sim_options=sim_options, random_state = 42,
                              bsl_options = bsl_options)

    knnbaseline.fit(trainset)
    vod_id = sorted(vod_score_1.vod_id.unique())
    result = []
    for vod in vod_id:
        result.append(knnbaseline.predict(1, vod)[0:4])

    result = pd.DataFrame(result, columns = ['subsr', 'vod_id', 'real', 'predict'])
    result = result[['subsr', 'vod_id', 'predict']].sort_values(by = 'predict', ascending= False).vod_id.tolist()

    # 추천 VOD가 영화인 경우, 본 적이 있다면 추천안함
    vod_list = pd.read_csv('../data/vod_list_add10.csv', index_col=0)
    TV_kids = vod_list[(vod_list['Category'] == 'TV프로그램') | (vod_list['Category'] == '키즈')].vod_id.unique().tolist()
    movie = vod_list[vod_list['Category'] == '영화'].vod_id.unique().tolist()

    li = []
    for x in result:
        if x not in vod_input:
            li.append(x)
        elif x in vod_input and x in TV_kids:
            li.append(x)
        elif x in vod_input and x in movie:
            continue

    return li[:10]