def detail_page_contents(vod_id):
    # 필요한 import
    import pandas as pd
    from sklearn.neighbors import NearestNeighbors
    from sklearn.feature_extraction.text import CountVectorizer
    from konlpy.tag import Okt
    import re
    from sklearn.feature_extraction.text import TfidfVectorizer
    from scipy.sparse import hstack

    # vod_list 가져오기
    vod_list = pd.read_csv('vod_list_add10_1213.csv', index_col=0)

    # BigCategory, SmallCategory로 장르 생성
    vod_list['genres'] = vod_list['BigCategory'].str.replace('/', '').str.replace(' ', '') + ' ' + vod_list['SmallCategory'].str.replace('/', '').str.replace(' ', '')

    # 장르 정보 추출
    cv = CountVectorizer(ngram_range = (1,2))
    genres = cv.fit_transform(vod_list.genres)

    # 줄거리 사용
    # TF-IDF 벡터화 (줄거리)
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(vod_list['text'])

    # 특징 벡터 결합
    combined_features = hstack([tfidf_matrix, genres])

    
    # n_neighbors: 가장 가까운 21개의 이웃을 찾도록 지정
    nbrs = NearestNeighbors(n_neighbors=21).fit(combined_features)
    nbrs

    # vod_id와 유사한 21개 가져오기
    vod_index = vod_list[vod_list['vod_id'] == vod_id].index[0]

    # 해당 VOD의 특징 벡터
    vod_features = combined_features[vod_index]
    _, indices = nbrs.kneighbors(vod_features)
    recommendations = vod_list.loc[indices[0], ["vod_id"]]
    
    # 상세페이지 vod가 있으면 제거
    recom = recommendations[recommendations['vod_id'] != i]
    
    return list(recom['vod_id'])


    




