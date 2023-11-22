from django.urls import path

from dj_rest_auth.registration.views import VerifyEmailView
from django.urls import re_path,include,path
from allauth.account.views import confirm_email

#accounts/
urlpatterns = [
    #일반 회원 회원가입/로그인
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
]