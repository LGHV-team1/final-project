def new_genre_based(vod_id_list):
    import pandas as pd
    import numpy as np
    import seaborn as sns
    import matplotlib.pyplot as plt
    import scipy
    from collections import Counter
    from sklearn.feature_extraction.text import CountVectorizer
    from sklearn.neighbors import NearestNeighbors
    
    # vod list 가져오기
    vod_list = pd.read_csv('vod_list_add10_1213.csv', index_col=0)
    
    # BigCategory, SmallCategory로 장르 생성
    vod_list['genres'] = vod_list['BigCategory'].str.replace('/', '').str.replace(' ', '') + ' ' + vod_list['SmallCategory'].str.replace('/', '').str.replace(' ', '')
    
    # 장르 정보 추출
    cv = CountVectorizer()
    genres = cv.fit_transform(vod_list.genres)
    
    # one-hot vector 생성
    genres = pd.DataFrame(genres.toarray(), columns=list(sorted(cv.vocabulary_.keys(), key=lambda x:cv.vocabulary_[x])))
    genres
    
    # n_neighbors: 가장 가까운 n개의 이웃을 찾도록 지정합니다.
    nbrs = NearestNeighbors(n_neighbors=100).fit(genres)
    nbrs
    
    # vod_id_list에 있는 vod와 가까운 10개 vod
    recommendation_list = pd.DataFrame()
    for vod_id in vod_id_list:
        vod = genres.iloc[vod_id, :]
        distances, indices = nbrs.kneighbors([vod])
        recommendations = vod_list.loc[indices[0], ["vod_id"]]
        recommendations["distance"] = distances[0]
        # 추천 데이터에 count 합쳐줌
        recommendations = pd.merge(recommendations, vod_list[['vod_id', 'counts']], on='vod_id', how="left")
        recommendation_list = pd.concat([recommendation_list, recommendations])
    
    # 거리순, 시청량 순으로 정렬
    recommendation_list.sort_values(["distance", "counts"], ascending=[True, False], inplace=True)
    recommendation_list.drop_duplicates(inplace=True)
    print(recommendation_list)
    
    # 상위 10개 가져옴
    top_10 = list(recommendation_list['vod_id'].head(10))
    
    return top_10