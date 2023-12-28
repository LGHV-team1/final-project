# 📼 R=VD vol.2


$$R_{ec}=V_oD$$

<div align="center">
  <img width="150" alt="image" src="https://github.com/LGHV-team1/final-project/assets/110653633/b71ec6d4-66f8-49d1-96f9-1bca53ce4bf0">

</div>
<div align="center"><br>

</div>


# 📚 Contents

- [🏆️ 프로젝트 소개](#%EF%B8%8F-프로젝트-소개)
- [🏵️ 프로젝트 결과물](#%EF%B8%8F-프로젝트-결과물)
- [🗓️ 프로젝트 수행 기간 ](#%EF%B8%8F-프로젝트-수행-기간)
- [🛠 기술 스택 ](#-기술-스택)
- [🙋🏻‍♂️🙋🏻‍♀️ 팀 소개](#%EF%B8%8F%EF%B8%8F-팀-소개)
- [🔍 요구사항 정의서](#-요구사항-정의서)
- [🏛️ 전체 서비스 아키텍처](#%EF%B8%8F-전체-서비스-아키텍처-cicd)
- [📺 모델 설명](#-모델-설명)
- [🦅 ERD 다이어그램](#-erd-다이어그램)
- [🌱 사용자 요청 흐름도](#-사용자-요청-흐름도)
- [🗒 API 명세서](#-api-명세서)
- [👉🏻 화면 및 시연 영상](#-화면-및-시연-영상)
- [🌈 상세 기능 설명](#-상세-기능-설명)
- [🎞 회고](#-회고)
<br>


# 🏆️ 프로젝트 소개
<h3 style="text-align:center"> LG Hellovision 의 신규 고객 유입 및 기존 셋탑박스 사용 유저의 고객 이탈 방지를 위한 <br> 시청 기록 기반 vod 추천, 평점 및 리뷰 검색 서비스 <h3/>

```
목적
1. 셋탑박스 개인화
2. 추천 다양화
3. 숏필름 및 신규 유저 추천 제공
4. 사용자 경험 및 고객 만족도 극대화
5. 트렌드에 알맞은 UI구성
```

<br>

# 🏵️ 프로젝트 결과물

* [프로젝트 보러 가기](https://www.hellorvdworld.com)
  
<br>

# 🗓️ 프로젝트 수행 기간 
- 2023.10 ~ 2023.12 (10주)

<br>

# 🙋🏻‍♂️🙋🏻‍♀️ 팀 소개
|[김도현](https://github.com/dhyeon1320)|[김수정](https://github.com/sugenre)|[김지민](https://github.com/jmboy713)|[김한경](https://github.com/kkk1k)|[박효심](https://github.com/recordhyo)|[송준호](https://github.com/junoflows)|
|:---:|:---:|:---:|:---:|:---:|:---:|
|<img src="https://github.com/dhyeon1320.png" width="100px" height="100" >|<img src="https://github.com/sugenre.png" width="100px" height="100" >|<img src="https://github.com/JMboy713.png" width="100px" height="100" >|<img src="https://github.com/kkk1k.png" width="100px" height="100">|<img src="https://github.com/recordhyo.png" width="100px" height="100"  >|<img src="https://github.com/junoflows.png" width="100px" height="100"  >|
|Data Analysis|Data Analysis|Back-end<br>CI/CD|Front-end|Front-end<br>Back-end|Data Analysis|
|-|-|-|-|-|-|

<br/>

# 🔍 요구사항 정의서
| **구분**   | **요구사항 명**        | **상세 기능**                  | **중요도** |
|:-----:|:----------:|:-----------------------|:--------:|
| 사용자 | 회원가입          | - 아이디 중복 체크<br>- 비밀번호 길이 및 아이디와의 유사도 체크<br>- 이메일 인증을 통한 회원가입 | 상     |
| 사용자 | 로그인            | - 가입되지 않은 이메일 체크 (알림창)<br>- 올바르지 않은 암호 체크 (알림창)                | 하     |
| 사용자 | 회원 정보 수정    | - 프로필 사진 변경<br>- 셋탑번호 변경<br>- 비밀번호 변경                              | 하     |
| 사용자 | 로그아웃          | - 로그아웃 기능                                  | 상     |
| 사용자 | 회원탈퇴          | - 알림 팝업으로 한번 더 확인 후 회원 탈퇴        | 하     |
| 사용자 | 신규유저 콘텐츠 선택 | - 셋톱박스 번호가 없는 신규 유저일 시 선택 페이지 노출<br>- 추천알고리즘을 위한 카테고리 5개 → 콘텐츠 5개 선택 | 중     |
| 메인   | 예고 영상          | - 메인화면 상단에 예고 영상 노출<br>- 소리 On/Off 및 + 아이콘으로 디테일 페이지로 이동 | 중     |
| 메인   | 추천 노출          | - 셋톱박스 유무에 따라 다른 추천 노출<br>- 이미지 슬라이더로 넘길 수 있도록<br>- 시즌 별 추천은 시즌을 시각화할 수 있도록 | 중     |
| 추천   | 신규 유저 추천     | - 처음 선택한 VOD로 신규유저를 위한 추천 노출<br>- 인기 TOP5 노출                     | 상     |
| 추천   | 기존 유저 추천     | - 시청 및 클릭 로그를 기반으로 추천 노출        | 상     |
| 추천   | 공통 추천          | - 평일 및 주말 여부 판단 후 시간대 별 추천<br>- 시즌 별 추천<br>- 위시리스트 기반 추천 | 상     |
| 콘텐츠 | 인기 TOP 5         | - 콘텐츠 별 인기 TOP5 노출                       | 중     |
| 콘텐츠 | 카테고리 버튼      | - 카테고리 별 인기 TOP1 VOD 이미지로 카테고리 버튼<br>- 카테고리 버튼 클릭 시 세부 카테고리로 이동 | 하     |
| 콘텐츠 | 컨텐츠 정렬        | - 이름순, 인기순, 랜덤 순으로 정렬<br>- 포스터 이미지 클릭 시 디테일 페이지로 이동 | 상     |
| 콘텐츠 | 숏필름             | - 숏필름 슬라이더 노출<br>- 소리 On/Off 및 제목 클릭 시 디테일 페이지로 이동     | 상     |
| 검색   | 검색창 검색        | - 검색아이콘 클릭 시 검색창 페이지로 이동<br>- 제목, 초성, 인물로 검색 가능          | 상     |
| 검색   | 인물로 검색        | - 디테일 페이지 내 인물 클릭 시 인물 검색 결과로 이동 | 하     |
| 위시리스트 | 위시 추가        | - 디테일 페이지 내 위시추가 버튼으로 위시리스트 추가 | 상     |
| 위시리스트 | 위시 삭제        | - 디테일 페이지 내 위시삭제 버튼으로 위시리스트 삭제 | 상     |
| 위시리스트 | 위시 확인        | - 마이페이지 내 위시리스트 칸에서 총 건수 및 포스터 이미지 확인<br>- 포스터 이미지 클릭 시 디테일 페이지로 이동 | 하     |
| 리뷰   | 리뷰 작성          | - 디테일 페이지 내에서 리뷰 및 평점 작성<br>- 리뷰는 한 컨텐츠에 1개만 작성 가능    | 상     |
| 리뷰   | 리뷰 수정 및 삭제  | - 마이페이지 내에서 리뷰 수정 및 삭제 가능<br>- 포스터 이미지 및 제목 클릭 시 디테일 페이지로 이동 | 중     |
| 리뷰   | 평점               | - 리뷰들의 평점으로 평균 점수를 디테일 페이지에 노출 | 중     |

<br/>

# 🛠 기술 스택


<p align="center">
<div>
<h3>FrontEnd</h3>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/>
  
</br>

<h3>BackEnd</h3>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"/> &nbsp

<br>

<h3>DataAnalysis</h3>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/Numpy-013243?style=for-the-badge&logo=Numpy&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/scikitlearn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/Surprise-75b5aa?style=for-the-badge&logo=Surprise&logoColor=white"/> &nbsp

</br>

<h3>CI/CD</h3>
<img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/Amazon ECS-FF9900?style=for-the-badge&logo=Amazon ECS&logoColor=white"> &nbsp  
<img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white"> &nbsp
<img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=Amazon RDS&logoColor=white"> &nbsp
<img src="https://img.shields.io/badge/Amazon Route 53-8c4fff?style=for-the-badge&logo=Amazon Route 53&logoColor=white"> &nbsp
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/> &nbsp
<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=for-the-badge&logo=GitHub Actions&logoColor=white"/> &nbsp


<br>

<h3>협업 툴</h3>
  <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"/> &nbsp
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/> &nbsp
  <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/> &nbsp
</div>
</p> 

<br><br>

# 🏛️ 전체 서비스 아키텍처 (CI/CD)
<p align="center"><img src="https://github.com/LGHV-team1/final-project/assets/126046238/1430f6ce-9ac7-42d8-a8c3-3aeea9734307)\" /><br><br></p>


<h4>디렉토리 구조</h4>

<details>
<summary>Front-End Directory</summary>

<!--summary 아래 빈칸 공백 두고 내용을 적는공간-->
```
┣ public
 ┃  ┣ favicon-96x96.png
 ┃  ┣ favicon.ico
 ┃  ┣ index.html
 ┃  ┣ kakao.png
 ┃  ┣ logo192.png
 ┃  ┣ logo512.png
 ┃  ┣ manifest.json
 ┃  ┗ robots.txt
 ┣ src
 ┃  ┣ api
 ┃  ┃  ┗ ApiService.js
 ┃  ┣ components
 ┃  ┃  ┣ Modal
 ┃  ┃  ┃  ┣ ModalChangeinfo.js
 ┃  ┃  ┃  ┣ ModalChangeinfo.module.css
 ┃  ┃  ┃  ┣ ModalProfile.js
 ┃  ┃  ┃  ┗ ModalProfile.module.css
 ┃  ┃  ┣ ArrowBtn.js
 ┃  ┃  ┣ Button.js
 ┃  ┃  ┣ CategoryBtn.js
 ┃  ┃  ┣ DarkButton.js
 ┃  ┃  ┣ Dropdown.js
 ┃  ┃  ┣ GoogleButton.js
 ┃  ┃  ┣ Helload.js
 ┃  ┃  ┣ Input.js
 ┃  ┃  ┣ KakaoButton.js
 ┃  ┃  ┣ MiniSlide.js
 ┃  ┃  ┣ Modal.js
 ┃  ┃  ┣ MyReview.js
 ┃  ┃  ┣ MyWish.js
 ┃  ┃  ┣ NaverButton.js
 ┃  ┃  ┣ Rank.js
 ┃  ┃  ┣ RecMiniSlide.js
 ┃  ┃  ┣ Related.js
 ┃  ┃  ┣ Review.js
 ┃  ┃  ┣ ScrollonTop.js
 ┃  ┃  ┣ ShowData.js
 ┃  ┃  ┣ ShowRec.js
 ┃  ┃  ┣ Snow.js
 ┃  ┃  ┣ SortData.js
 ┃  ┃  ┣ Spinner.js
 ┃  ┃  ┣ Star.js
 ┃  ┃  ┣ Streaming.js
 ┃  ┃  ┣ Top5.js
 ┃  ┃  ┗ ViewReview.js
 ┃  ┣ hook
 ┃  ┃  ┣ useCategory.js
 ┃  ┃  ┗ useDebounce.js
 ┃  ┣ layout
 ┃  ┃  ┣ BeforeHeader.js
 ┃  ┃  ┣ Footer.js
 ┃  ┃  ┣ Header.js
 ┃  ┃  ┣ MainLayout.js
 ┃  ┃  ┗ SubLayout.js
 ┃  ┣ page
 ┃  ┃  ┣ tmp
 ┃  ┃  ┃  ┣ Socialgoogle.js
 ┃  ┃  ┃  ┣ Socialkakao.js
 ┃  ┃  ┃  ┗ Socialnaver.js
 ┃  ┃  ┣ __Search.js
 ┃  ┃  ┣ About.js
 ┃  ┃  ┣ Detail.js
 ┃  ┃  ┣ First.js
 ┃  ┃  ┣ Home.js
 ┃  ┃  ┣ Kids.js
 ┃  ┃  ┣ Login.js
 ┃  ┃  ┣ Movie.js
 ┃  ┃  ┣ Mypage.js
 ┃  ┃  ┣ Register.js
 ┃  ┃  ┣ Search.js
 ┃  ┃  ┣ SelectCategory.js
 ┃  ┃  ┣ SelectContents.js
 ┃  ┃  ┣ ShortFilm.css
 ┃  ┃  ┣ ShortFilm.js
 ┃  ┃  ┗ Tv.js
 ┃  ┣ redux
 ┃  ┃  ┣ store
 ┃  ┃  ┃  ┗ store.js
 ┃  ┃  ┣ categorySlice.js
 ┃  ┃  ┣ rankSlice.js
 ┃  ┃  ┗ searchSlice.js
 ┃  ┣ App.css
 ┃  ┣ App.js
 ┃  ┣ index.css
 ┃  ┣ index.js
 ┃  ┣ LoginRouter.js
 ┃  ┗ PrivateRouter.js
 ┣ .gitignore
 ┣ .gitmessage
 ┣ package-lock.json
 ┣ package.json
 ┣ postcss.config.js
 ┣ README.md
 ┗ tailwind.config.js┣ public

```
</details>
  
<details>
<summary>Back-End Directory</summary>

<!--summary 아래 빈칸 공백 두고 내용을 적는공간-->
```
┣ .github
┃  ┗ PULL_REQUEST_TEMPLATE.md
┣ accounts
┃  ┣ __init__.py
┃  ┣ adapters.py
┃  ┣ admin.py
┃  ┣ apps.py
┃  ┣ models.py
┃  ┣ serializers.py
┃  ┣ tests.py
┃  ┣ urls.py
┃  ┗ views.py
┣ config
┃  ┣ __init__.py
┃  ┣ asgi.py
┃  ┣ settings.py
┃  ┣ urls.py
┃  ┣ views.py
┃  ┗ wsgi.py
┃
┣ contents
┃  ┗ management
┃     ┗ commands
┃        ┣ dbchoseong.py
┃        ┣ dbinsert.py
┃        ┗ insert_text.py
┃
┣ myvenv
┣ recommends
┃  ┗ management
┃    ┗ commands
┃       ┣ genrebaseinsert.py
┃       ┣ recinsert.py
┃       ┣ scoreinsert.py
┃       ┗ timeinsert.py
┣ reviews
┣ static
┃  ┣ admin
┃  ┗ rest_framework
┣ templates
┃   ┗account
┃     ┗ email
┃     		┣ email_confirmation_signup_message.html
┃     		┗ email_confirmation_signup_subject.txt
┣ wishlists
┃
┃
┣ .DS_Store
┣ .gitignore
┣ .gitmessage
┣ docker-compose.yml
┣ Dockerfile
┣ manage.py
┣ README.md
┣ requirements.txt
┣ secrets.json
┣ sync.py
┗ task-definition.json
```
</details>




<br>


<br>


# 📺 모델 설명
[🤖 modeling](https://github.com/LGHV-team1/final-project/blob/main/modeling/README.md)

<br/>

# 🦅 ERD 다이어그램
<p align="center"><img width="1167" alt="image" src="https://github.com/JMboy713/LG_final-project/assets/110653633/b10b7b89-7bf9-423a-b31d-0af1cf3c85b8"><br><br></p>

<br>

# 🌱 사용자 요청 흐름도
<p align="center"><img src="https://github.com/LGHV-team1/final-project/assets/110653633/8c8a4431-b7cd-4df1-9e7e-03fdac76d61e" /><br><br></p>



# 🗒 API 명세서

<img width="862" alt="image" src="https://github.com/LGHV-team1/final-project/assets/110653633/5b81e96f-8762-4db4-b4b8-f3fe0fd98563">
<img width="860" alt="image" src="https://github.com/LGHV-team1/final-project/assets/110653633/a860f65b-c808-42b4-9ab7-fd114cd3d48d">




<br/>


# 👉🏻 화면 및 시연 영상
<br>

### 신규유저 로그인 (선호 컨텐츠 선택 및 신규유저 추천)



https://github.com/recordhyo/final-project/assets/126046238/2c8e2983-a941-41c2-a939-0afa7d298934



<br>


### 기존유저 로그인 (시청 및 클릭 로그 기반 추천)



https://github.com/recordhyo/final-project/assets/126046238/e153b558-ea7d-4910-8beb-fd0811935c86



<br>

### 메인 페이지 (예고영상 및 추천 제공)



https://github.com/recordhyo/final-project/assets/126046238/94c7ad34-9393-4347-bb68-e30028962d78



<br/>


### 카테고리 별 페이지 (장르 버튼, 이름・인기・랜덤순 정렬, 숏필름)



https://github.com/recordhyo/final-project/assets/126046238/76c8474d-6e91-4803-b443-b982d39b275d




<br>

### 디테일 페이지 (VOD상세, 위시 추가 및 리뷰 작성)



https://github.com/recordhyo/final-project/assets/126046238/21ed66da-8cd6-460a-ba2c-5b55a8ee019a



<br>


### 마이페이지 (프로필 수정, 위시리스트 확인, 리뷰 수정 및 삭제) 



https://github.com/recordhyo/final-project/assets/126046238/b490a530-b3b6-4c9c-8bd5-f94efc0e69e0




<br>

### 검색 (제목, 초성, 인물 검색)



https://github.com/recordhyo/final-project/assets/126046238/af1420e6-4ef1-455a-ba72-da6abcab3bca



<br>

# 🌈 상세 기능 설명

[자세히보기 (최종발표자료)](https://drive.google.com/file/d/1R2NNytJQkys3FPxny0_eSzR3liSqm0l7/view?usp=sharing)

<br>

# 🎞 회고
* 추후 추가 예정

<br/>
