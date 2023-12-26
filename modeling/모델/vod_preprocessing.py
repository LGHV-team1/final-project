import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings(action='ignore')

# 8,9 월 로그 데이터에 10월 데이터 결합하여 scoring 하는 과정까지 전처리 자동화

vod_08 = pd.read_csv('../data/데이터스쿨3차_2308월/데이터스쿨_3차_VOD_2308.csv', encoding = 'cp949', sep = '\t')
vod_09 = pd.read_csv('../data/데이터스쿨3차_2309월/데이터스쿨_3차_VOD_2309.csv', encoding = 'cp949', sep = '\t')

def pre_processing(vod_data = pd.DataFrame()):
    vod_all = pd.concat([vod_08, vod_09, vod_data])

    def preprocessing(data):
        df = data.copy()
        
        # disp_rtm 문자열을 분 단위로 변경
        def convert_runtime(runtime_str):
            # 입력값이 NaN이면 0 반환
            if pd.isna(runtime_str):
                return 0
            hours = int(runtime_str.split(':')[0])
            minutes = int(runtime_str.split(':')[1])
            total_minutes = hours * 60 + minutes
            return total_minutes

        df['disp_rtm'] = df['disp_rtm'].apply(convert_runtime)

        # 런타임 0분인 것 제거
        df = df[df['disp_rtm'] != 0]

        # 무삭제 제거
        df['asset_nm'] = df['asset_nm'].str.replace(r'무삭제판|무삭제', '', regex = True)
        
        # 예고편 제거
        df = df[~df['asset_nm'].str.contains(r'\(예고편\)|\(예고\)', regex=True)]
        
        # 예약구매, 사전구매 제거
        df = df[~df['asset_nm'].str.contains('예약구매|사전구매')]

        # 00회가 포함된 행은 런타임이 0또는 1이므로 제거
        df = df[~df['asset_nm'].str.contains(r'\b00회\b')]
        
        ## 괄호와 그 안의 내용 제거 
        df['asset_nm'] = df['asset_nm'].str.replace(r'\([^()]*\)', '', regex=True)
        df['asset_nm'] = df['asset_nm'].str.replace(r'\[[^\[\]]*\]', '', regex=True)
        df['asset_nm'] = df['asset_nm'].str.replace(r'\.\.\.', '', regex=True)
        df['asset_nm'] = df['asset_nm'].str.replace(r'\…', '', regex=True) # … 기호 제거
        df['asset_nm'] = df['asset_nm'].str.replace('-', " ")
        df['asset_nm'] = df['asset_nm'].str.rstrip('.')

        # use_tms 분 단위로 변경
        df['use_tms'] = round(df['use_tms'] / 60, 1)

        # 셋탑번호가 66056000인 것 삭제 - content 에서 이상치 아이디로 판별
        df = df[df['subsr'] != 66056000]

        return df
    
    df = preprocessing(vod_all)

    # 프로그램 회차별 정보
    df1 = df[['asset_nm', 'ct_cl', 'genre_of_ct_cl', 'ACTR_DISP', 'disp_rtm']].drop_duplicates().reset_index(drop = True)

    # 유저마다 각 회차를 본 시간을 더함
    # 시청시간으로 유저가 이 회차를 시청했는지 여부를 결정
    # 시청시간을 런타임으로 나눠 0.2 이 넘으면 시청한 것으로 간주      
    df2 = pd.DataFrame(df.groupby(['subsr','asset_nm', 'ct_cl', 'genre_of_ct_cl', 'disp_rtm'])['use_tms'].sum()).reset_index()
    df2 = df2[(df2['disp_rtm'] != 0) & (df2['use_tms'] != 0)]
    df2['watched'] = df2['use_tms'] / df2['disp_rtm']
    df2['watched'] = df2['watched'].apply(lambda x : 1 if x >= 0.2 else 0)

    # 회차 제거
    df11 = df1.copy()
    df11['asset_nm'] = df11['asset_nm'].str.replace(r'\d+회$', '', regex=True)
    df11['asset_nm'] = df11['asset_nm'].str.replace(r'\d+회\.', '', regex=True)
    df11['asset_nm'] = df11['asset_nm'].str.replace(r'\d+화$', '', regex=True)
    df11['asset_nm'] = df11['asset_nm'].str.strip()
    df11['asset_nm'] = df11['asset_nm'].str.rstrip('.')

    # 유저 시청 정보의 회차 제거한 변수 추가
    df2['series_nm'] = df2['asset_nm'].str.replace(r'\d+회$', '', regex=True)
    df2['series_nm'] = df2['series_nm'].str.replace(r'\d+회\.', '', regex=True)
    df2['series_nm'] = df2['series_nm'].str.replace(r'\d+화$', '', regex=True)
    df2['series_nm'] = df2['series_nm'].str.strip()
    df2['series_nm'] = df2['series_nm'].str.rstrip('.')

    df3 = df2[['subsr', 'series_nm', 'ct_cl',	'genre_of_ct_cl', 'watched']].copy()

    # 유저의 시리즈별 시청 횟수
    df4 = df3.groupby(['subsr', 'series_nm', 'ct_cl', 'genre_of_ct_cl'])['watched'].sum().reset_index()
    df4 = df4[df4['watched']!= 0]

    # 8~9월 시리즈별 시청된 총 횟수
    df5 = pd.DataFrame(df11[['asset_nm', 'ct_cl', 'genre_of_ct_cl']].value_counts().reset_index())
    df5.columns = ['series_nm', 'ct_cl', 'genre_of_ct_cl', 'watched_all']

    df6 = df4.merge(df5, on = ['series_nm', 'ct_cl', 'genre_of_ct_cl'], how = 'left')

    # 유저의 프로그램 총 시청 횟수
    df7 = df6.groupby(['subsr'])['watched'].sum().reset_index()
    df7.columns = ['subsr', 'watched_cnt']

    df8 = df6.merge(df7, on = 'subsr', how = 'left')
    df8 = df8[df8['watched_cnt'] != 0].reset_index(drop = True)

    # 시청횟수가 3개 이상인 유저만 
    user_cnt = df8['subsr'].value_counts()
    filter_users = user_cnt[user_cnt >= 3].index
    vod_over3 = df8[df8['subsr'].isin(filter_users)]

    # 시청횟수가 1개 이상인 유저(모든 유저) 
    user_cnt = df8['subsr'].value_counts()
    filter_users = user_cnt[user_cnt >= 1].index
    vod_all = df8[df8['subsr'].isin(filter_users)]

    # 시청 여부, 해당 시리즈 총 횟수, 유저의 프로그램 총 시청 횟수를 이용해
    # 유저의 프로그램 선호도를 측정
    def scoring(df):
        N = df['watched_all'] # 해당 프로그램 전체 회차 수
        L = df['watched_cnt'] # 유저의 총 시청 프로그램 회차 수
        n = df['watched'] # 유저의 해당 프로그램 시청 수
        lam = np.log(2) / 2
        w1 = 1 - np.exp(-1 * lam * N)
        data = pd.DataFrame([N, L]).T
        def custom_weight(data):
            if data['watched_cnt'] < data['watched_all']:
                return data['watched_all'] / data['watched_cnt']
            else:
                return 1

        w2 = data.apply(custom_weight, axis = 1)

        score = (n / N) * w1 * w2

        return score

    vod_over3['score'] = scoring(vod_over3) 
    vod_all['score'] = scoring(vod_all)

    vod_over3 = vod_over3[['subsr', 'series_nm', 'ct_cl', 'genre_of_ct_cl', 'score']]
    vod_over3 = vod_over3.sort_values(by = 'subsr').reset_index(drop = True)
    vod_over3['category'] = vod_over3['ct_cl'].apply(lambda x : x if x in ['영화', '키즈'] else 'TV프로그램')
    vod_over3['rename'] = vod_over3['series_nm'].apply(lambda x : x.replace(' ', '') if isinstance(x, str) else x)

    vod_all = vod_all[['subsr', 'series_nm', 'ct_cl', 'genre_of_ct_cl', 'score']]
    vod_all = vod_all.sort_values(by = 'subsr').reset_index(drop = True)
    vod_all['category'] = vod_all['ct_cl'].apply(lambda x : x if x in ['영화', '키즈'] else 'TV프로그램')
    vod_all['rename'] = vod_all['series_nm'].apply(lambda x : x.replace(' ', '') if isinstance(x, str) else x)

    # 프로그램을 3개 이상 본 유저(hard user)만 추출한 데이터와 모든 유저 데이터
    return vod_over3, vod_all