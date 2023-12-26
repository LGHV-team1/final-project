import pandas as pd
import numpy as np

# contents file column명 : subsr, series_nm, super_asser_nm, ct_cl, genre_of_ct_cl, SMRY, ACTR_DISP, disp_rtm, log_dt
# vod file column명 : subsr, asset_nm, ct_cl, genre_of_ct_cl, use_tms, SMRY, ACTR_DISP, disp_rtm, strt_dt

# contents file 전처리 함수
def preprocessing_con(df):
  # 특수문자 정리

  # series_nm 괄호와 그 안의 내용 제거
  df['series_nm'] = df['series_nm'].str.replace(r'\([^()]*\)', '', regex=True)
  df['series_nm'] = df['series_nm'].str.replace(r'\[[^\[\]]*\]', '', regex=True)
  df['series_nm'] = df['series_nm'].str.replace(r'\.\.\.', '', regex=True)
  df['series_nm'] = df['series_nm'].str.replace(r'…', '', regex=True)
  df['series_nm'] = df['series_nm'].str.replace('-', ' ')
  df['series_nm'] = df['series_nm'].str.rstrip('.')

  # super_asset_nm 변경
  df['super_asset_nm'] = df['super_asset_nm'].str.replace(r'\([^()]*\)', '', regex=True)
  df['super_asset_nm'] = df['super_asset_nm'].str.replace(r'\[[^\[\]]*\]', '', regex=True)
  df['super_asset_nm'] = df['super_asset_nm'].str.replace(r'\.\.\.', '', regex=True)
  df['super_asset_nm'] = df['super_asset_nm'].str.replace(r'…', '', regex=True)
  df['super_asset_nm'] = df['super_asset_nm'].str.replace('-', ' ')
  df['super_asset_nm'] = df['super_asset_nm'].str.rstrip('.')

  # 회, 회., 화, 실사판, 무삭제 제거
  df['series_nm'] = df['series_nm'].str.replace(r'무삭제판|무삭제', '', regex = True)
  df['series_nm'] = df['series_nm'].str.replace(r'실사판', '', regex = True)
  df['series_nm'] = df['series_nm'].str.replace(r'\d+회$', '', regex=True)
  df['series_nm'] = df['series_nm'].str.replace(r'\d+회\.', '', regex=True)
  df['series_nm'] = df['series_nm'].str.replace(r'\d+화$', '', regex = True)
  df['series_nm'] = df['series_nm'].str.strip()
  df['series_nm'] = df['series_nm'].str.rstrip('.')

  df['super_asset_nm'] = df['super_asset_nm'].str.replace(r'무삭제판|무삭제', '', regex = True)
  df['super_asset_nm'] = df['super_asset_nm'].str.replace(r'실사판', '', regex = True)
  df['super_asset_nm'] = df['super_asset_nm'].str.replace(r'\d+회$', '', regex=True)
  df['super_asset_nm'] = df['super_asset_nm'].str.replace(r'\d+회\.', '', regex=True)
  df['super_asset_nm'] = df['super_asset_nm'].str.replace(r'\d+화$', '', regex = True)
  df['super_asset_nm'] = df['super_asset_nm'].str.strip()
  df['super_asset_nm'] = df['super_asset_nm'].str.rstrip('.')

  # 'series_nm'이 null인 경우, 'super_asset_nm'의 값으로 대체
  df['series_nm'].fillna(df['super_asset_nm'], inplace=True)

  # disp_rtm 문자열을 분 단위로 변경
  def convert_runtime(runtime_str):
    # 입력값이 NaN이면 - 반환
    if pd.isna(runtime_str):
        return '-'

    hours = int(runtime_str.split(':')[0])
    minutes = int(runtime_str.split(':')[1])
    total_minutes = hours * 60 + minutes
    total_minutes = str(total_minutes) + '분'
    return total_minutes

  df['disp_rtm'] = df['disp_rtm'].apply(convert_runtime)

  df["Summary"] = pd.Series(dtype='object')
  df["director"] = pd.Series(dtype='object')
  df["Catagory"] = pd.Series(dtype='object')

  new_order = ["series_nm", "Summary", "ACTR_DISP", "director", "ct_cl", "genre_of_ct_cl", "category", "disp_rtm", "SMRY"]
  df = df[new_order]

  df.columns = ['name', 'Summary', 'actors', 'director', 'BigCategory', 'SmallCategory', 'Category', 'runningtime', 'SMRY']

  return df


# vod file 전처리 함수
def preprocessing_vod(df):
  # 특수문자 정리

  # series_nm 괄호와 그 안의 내용 제거
  df['asset_nm'] = df['asset_nm'].str.replace(r'\([^()]*\)', '', regex=True)
  df['asset_nm'] = df['asset_nm'].str.replace(r'\[[^\[\]]*\]', '', regex=True)
  df['asset_nm'] = df['asset_nm'].str.replace(r'\.\.\.', '', regex=True)
  df['asset_nm'] = df['asset_nm'].str.replace(r'…', '', regex=True)
  df['asset_nm'] = df['asset_nm'].str.replace('-', ' ')
  df['asset_nm'] = df['asset_nm'].str.rstrip('.')

  # 회, 회., 화, 실사판, 무삭제 제거
  df['asset_nm'] = df['asset_nm'].str.replace(r'실사판', '', regex = True)
  df['asset_nm'] = df['asset_nm'].str.replace(r'무삭제판|무삭제', '', regex = True)
  df['asset_nm'] = df['asset_nm'].str.replace(r'\d+회$', '', regex=True)
  df['asset_nm'] = df['asset_nm'].str.replace(r'\d+회\.', '', regex=True)
  df['asset_nm'] = df['asset_nm'].str.replace(r'\d+화$', '', regex = True)
  df['asset_nm'] = df['asset_nm'].str.strip()
  df['asset_nm'] = df['asset_nm'].str.rstrip('.')

  # disp_rtm 문자열을 분 단위로 변경
  def convert_runtime(runtime_str):
    # 입력값이 NaN이면 - 반환
    if pd.isna(runtime_str):
        return '-'

    hours = int(runtime_str.split(':')[0])
    minutes = int(runtime_str.split(':')[1])
    total_minutes = hours * 60 + minutes
    total_minutes = str(total_minutes) + '분'
    return total_minutes

  df['disp_rtm'] = df['disp_rtm'].apply(convert_runtime)

  df["Summary"] = pd.Series(dtype='object')
  df["director"] = pd.Series(dtype='object')
  df["Category"] = pd.Series(dtype='object')

  new_order = ["asset_nm", "summary", "ACTR_DISP", "director", "ct_cl", "genre_of_ct_cl", "category", "disp_rtm","SMRY"]
  df = df[new_order]

  df.columns = ['name', 'Summary', 'actors', 'director', 'BigCategory', 'SmallCategory', 'Category', 'runningtime', 'SMRY']

  return df


def file_preprocess(dataframe_list):
    df = pd.DataFrame()
    for dataframe in dataframe_list:
        # contents 파일인 경우
        if 'series_nm' in list(dataframe.columns):
           new_df = preprocessing_con(dataframe)
        else:
           new_df = preprocessing_vod(dataframe)
        
        df = pd.concat([df, new_df], ignore_index=True)

    df['Category'] = np.where(df['BigCategory'] == '영화', '영화', np.where(df['BigCategory'] == '키즈', '키즈', 'TV프로그램'))

    # name에서 띄어쓰기 전부 제거한 열 생성
    df['rename'] = df['name'].apply(lambda x: x.replace(' ', '') if isinstance(x, str) else x)
    
    # 많이 언급된 순으로 count
    counts = df.groupby(['rename', 'Category']).size().reset_index(name='counts')

    # 중복 제거
    df = df.sort_values(by='SMRY', na_position='last')

    # 'rename'과 'Category'를 기준으로 중복된 값 삭제
    df_drop = df.drop_duplicates(subset=['rename', 'Category'])
    df_drop = df.reset_index(drop=True)

    # count 합침
    df_addcount = df_drop.merge(counts, on=['rename', 'Category'], how='left')
    df_addcount

    # vod_id 붙이기
    df_addcount['vod_id'] = df_addcount.index

    return df_addcount


# file_preprocess 함수 완료 후 사용할 것 
# 기존 vod list와 새 파일 합칠 때
def merge_new_file(old_dataframe, new_dataframe):
  for index, row in new_dataframe.iterrows():
    same = old_dataframe[(old_dataframe['rename'] == row['rename']) & (old_dataframe['Category'] == row['Category'])]
    
    if not same.empty:
      # vod_old의 counts 업데이트
      vod_old_index = same.index[0]
      old_dataframe.at[vod_old_index, 'counts'] += row['counts']
        
      # vod_addcount에서 행 제거
      new_dataframe.drop(index, inplace=True)
        

  final_df = pd.concat([old_dataframe, new_dataframe], ignore_index=True)
    
  # vod_id 붙이기
  final_df['vod_id'] = final_df.index    
    
  return final_df