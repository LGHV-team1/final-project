# modeling

## Scoring

VOD 시청 정보의 경우 유저의 프로그램 회차별 시청 정보만 있고 평점은 존재하지 않는다.

즉, 시청 정보로 유저의 프로그램 선호도를 도출해야 하므로 다음과 같은 Scoring 방법을 사용하였다.

<img src='http://drive.google.com/uc?export=view&id=1AWGwc2rFXaacqo584ukeePOlzM6p1oO2' /><br>

## KNN baseline
### 알고리즘 선정

Surprise 내장 알고리즘 중 KNN Baseline, SVD, BaselineOnly, KNN Basic 4가지 알고리즘을 학습하고 가장 성능이 좋은 알고리즘으로 선정하였다.

### training

train set, test set, 평가지표는 다음과 같이 설정하고 학습하였다.
<img src='http://drive.google.com/uc?export=view&id=1v3cU4gWy2abqW_608rr1UyfLqxYwQP3v' /><br>

### 유저 그룹화

전체의 20% 유저가 총 VOD 시청 수의 70% 를 차지하고 있음을 확인하였다.  
파레토 법칙에 근거하여 상위 20% 의 인원이 의미가 있다고 판단하여 heavy user로 정의하고, medium user, light user도 추가로 정의하였다.

<img src='http://drive.google.com/uc?export=view&id=1RBKQMAPI1Zm7d-S_1Do75fbml4kc4kyI' /><br>

그룹화의 효과로 다른 유저에 비해 heavy user 의 추천 정확도가 높다는 것을 확인할 수 있다.

<img src='http://drive.google.com/uc?export=view&id=1q3ncvdqqKO93aJJ_u0i4JJbeVnM_nvtv' /><br>


## Time period based

vod를 시청하는 사용자들의 하루 스케줄이 비슷할 것이라는 가정에 착안하여 주로 사용하는 시간대에 많이 시청한 콘텐츠를 추천
로그 데이터 중 시(hour) 이용하여 구간 확인

<img src='http://drive.google.com/uc?export=view&id=1k34iiQDe6q1eVfBoZAzcGoLvyj1Poesc_link' /><br>

평일 / 휴일 간 프로그램 별 시청 비율 확인 결과 차이가 두드러지는 프로그램 카테고리가 있다는 것을 확인할 수 있었음

<img /><br>

저녁, 새벽의 경우 다음날, 전날의 평일 / 휴일 여부도 영향을 미침

<img /><br>

10가지 경우로 나누어 그 시간대에 많이 클릭된 콘텐츠를 추천


## Contents based 

콘텐츠 별 Attribute(장르, 줄거리)를 활용하여 사용자가 선호하는 콘텐츠를 활용해 추천

<img /><br>


