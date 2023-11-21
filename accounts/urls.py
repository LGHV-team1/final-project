from django.urls import path
from .views import kakaoCallback, naverCallback, googleCallback, current_user, GoogleLogin, NaverLogin, KakaoLogin
from dj_rest_auth.registration.views import VerifyEmailView
from django.urls import re_path,include,path
from allauth.account.views import confirm_email

#accounts/
urlpatterns = [
    path('naver/callback', naverCallback, name='naver_login_callback'),
    path('naver/login/finish/', NaverLogin.as_view(), name='naver_login_todjango'),
    path('kakao/callback', kakaoCallback, name='kakao_login_callback'),
    path('kakao/login/finish/', KakaoLogin.as_view(), name='kakao_login_todjango'),
    path('google/callback', googleCallback, name='google_login_callback'),
    path('google/login/finish/', GoogleLogin.as_view(), name='google_login_todjango'),


    #일반 회원 회원가입/로그인
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    # 유효한 이메일이 유저에게 전달
    re_path(r'^account-confirm-email/$', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # 유저가 클릭한 이메일(=링크) 확인
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', confirm_email, name='account_confirm_email'),
    #유저 정보
    path('currentuser', current_user),
]