import json,os,urllib
from json import JSONDecodeError

import dj_rest_auth.views
from django.core import serializers
from django.http import HttpResponseRedirect,JsonResponse,HttpResponse
from django.contrib.sites import requests
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import generics, mixins, status
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.google import views as google_view
from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.providers.naver import views as naver_view
from django.middleware.csrf import get_token
from django.conf import settings
from rest_framework.views import APIView
from accounts.models import User
from .serializers import UserSerializer,CustomUserDetailsSerializer
import requests
from contents.models import Vod



KAKAO_TOKEN_API = "https://kauth.kakao.com/oauth/token"
KAKAO_USER_API = "https://kapi.kakao.com/v2/user/me"
KAKAO_REDIRECT_URI = getattr(settings, 'KAKAO_REDIRECT_URI', 'KAKAO_REDIRECT_URI')
KAKAO_REST_API_KEY = getattr(settings, 'KAKAO_REST_API_KEY', 'KAKAO_REST_API_KEY')
def kakaoCallback(request, *args, **kwargs):
    #Callback URL 에서 code 받아오기
    code = request.GET["code"]
    if not code:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    print(code)
    # kakao에 access token 발급 요청
    data = {
      "grant_type": "authorization_code",
      "client_id": KAKAO_REST_API_KEY,
      "redirect_uri": KAKAO_REDIRECT_URI,
      "code": code,
    }
    # 받은 코드로 카카오에 access token 요청하기
    token = requests.post(KAKAO_TOKEN_API, data=data).json()
    access_token = token['access_token']
    if not access_token:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    # kakao에 user info 요청
    headers = {"Authorization": f"Bearer ${access_token}"}
    # 받은 access token 으로 user 정보 요청
    user_infomation = requests.get(KAKAO_USER_API, headers=headers).json()
    print(access_token)
    kakao_account = user_infomation.get('kakao_account')
    #email 은 카카오 user 정보에서 받은 email
    email = kakao_account.get('email')

    #3. 전달받은 이메일, access_token, code를 바탕으로 회원가입/로그인
    try:
        # 전달받은 이메일로 등록된 유저가 있는지 탐색
        # get_or_create : 있으면 get 없으면 create
        user = User.objects.get(email=email)
        social_user = SocialAccount.objects.get(user=user)
        # 있는데 카카오계정이 아니어도 에러
        if social_user.provider != 'kakao':
            err_msg = 'not_kakao'
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialk')
            response.set_cookie('loginerror', err_msg)
            return response

        # 이미 kakao로 제대로 가입된 유저 => 로그인 & 해당 유저의 jwt 발급
        data = {'access_token': access_token, 'code': code}
        accept = requests.post("https://server.hellorvdworld.com/accounts/kakao/login/finish/", data=data)
        accept_status = accept.status_code
        logindata = accept.json()

        # 뭔가 중간에 문제가 생기면 에러
        if accept_status != 200:
            err_msg = 'failed to signin'
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialk')
            response.set_cookie('loginerror', err_msg)
            return response
        else :
            accept_json = accept.json()
            print(accept_json)
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialk')
            response.set_cookie('loginjwt', logindata['access'])
            response.set_cookie('loginrefresh', logindata['refresh'])
            return response

    except User.DoesNotExist:
        # 전달받은 이메일로 기존에 가입된 유저가 아예 없으면 => 새로 회원가입 & 해당 유저의 jwt 발급

        data = {'access_token': access_token, 'code': code}
        accept = requests.post("https://server.hellorvdworld.com/accounts/kakao/login/finish/", data=data)
        accept_status = accept.status_code
        logindata = accept.json()
        # 뭔가 중간에 문제가 생기면 에러
        if accept_status != 200:
            err_msg = 'failed to signin'
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialk')
            response.set_cookie('loginerror', err_msg)
            return response
        else :
            accept_json = accept.json()
            print(accept_json)
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialk')
            response.set_cookie('loginjwt', logindata['access'])
            response.set_cookie('loginrefresh', logindata['refresh'])
            return response

    except SocialAccount.DoesNotExist:
        # User는 있는데 SocialAccount가 없을 때 (=일반회원으로 가입된 이메일일때)
        err_msg = 'not_social'
        response = HttpResponseRedirect('https://www.hellorvdworld.com/socialk')
        response.set_cookie('loginerror', err_msg)
        return response

class KakaoLogin(SocialLoginView):
    adapter_class = kakao_view.KakaoOAuth2Adapter
    callback_url = KAKAO_REDIRECT_URI
    client_class = OAuth2Client


GOOGLE_TOKEN_API = "https://oauth2.googleapis.com/token"
GOOGLE_USER_API = "https://www.googleapis.com/userinfo/v2/me"
GOOGLE_REDIRECT_URI = getattr(settings, 'GOOGLE_REDIRECT_URI', 'GOOGLE_REDIRECT_URI')
GOOGLE_CLIENT_ID = getattr(settings, 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_PW = getattr(settings, 'GOOGLE_CLIENT_PW', 'GOOGLE_CLIENT_PW')

def googleCallback(request):
    client_id = GOOGLE_CLIENT_ID
    client_secret = GOOGLE_CLIENT_PW
    code = request.GET.get("code")
    state = "rnrmffhrmdls"
    # 1. callback으로 받은 코드로 구글에 access token 요청
    token_req = requests.post(
        f"https://oauth2.googleapis.com/token?client_id={client_id}&client_secret={client_secret}&code={code}&grant_type=authorization_code&redirect_uri={GOOGLE_REDIRECT_URI}&state={state}"
    )
    if token_req.status_code != 200:
        return JsonResponse(
            {"err_msg": "failed to get token"}, status=token_req.status_code
        )

    ### 1-1. json으로 변환 & 에러 부분 파싱
    token_req_json = token_req.json()
    error = token_req_json.get("error")
    ### 1-2. 에러 발생 시 종료
    if error is not None:
        raise JSONDecodeError(error)
    ### 1-3. 성공 시 access_token 가져오기
    access_token = token_req_json.get("access_token")


    # 2. 가져온 access_token으로 이메일값을 구글에 요청
    email_req = requests.get(
        f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={access_token}"
    )
    email_req_status = email_req.status_code
    ### 2-1. 에러 발생 시 400 에러 반환
    if email_req_status != 200:
        return JsonResponse(
            {"err_msg": "failed to get email"}, status=status.HTTP_400_BAD_REQUEST
        )

    ### 2-2. 성공 시 이메일 가져오기
    email_req_json = email_req.json()
    email = email_req_json.get("email")
    print("이메일: ", email)

    # 3. 전달받은 이메일, access_token, code를 바탕으로 회원가입/로그인
    try:
        # 전달받은 이메일로 등록된 유저가 있는지 탐색
        # get_or_create : 있으면 get 없으면 create
        user = User.objects.get(email=email)
        social_user = SocialAccount.objects.get(user=user)
        # 있는데 구글계정이 아니어도 에러
        if social_user.provider != 'google':
            err_msg = 'not_google'
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialg')
            response.set_cookie('loginerror', err_msg)
            return response

        # 이미 Google로 제대로 가입된 유저 => 로그인 & 해당 우저의 jwt 발급
        data = {'access_token': access_token, 'code': code}
        accept = requests.post("https://server.hellorvdworld/accounts/google/login/finish/", data=data)
        accept_status = accept.status_code
        logindata = accept.json()
        # 뭔가 중간에 문제가 생기면 에러
        if accept_status != 200:
            err_msg = 'failed to signin'
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialg')
            response.set_cookie('loginerror', err_msg)
            return response

        else :
            accept_json = accept.json()
            print(accept_json)
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialg')
            response.set_cookie('loginjwt', logindata['access'])
            response.set_cookie('loginrefresh', logindata['refresh'])
            return response

    except User.DoesNotExist:
        # 전달받은 이메일로 기존에 가입된 유저가 아예 없으면 => 새로 회원가입 & 해당 유저의 jwt 발급
        data = {'access_token': access_token, 'code': code}
        accept = requests.post("https://server.hellorvdworld.com/accounts/google/login/finish/", data=data)
        accept_status = accept.status_code
        logindata = accept.json()
        # 뭔가 중간에 문제가 생기면 에러
        if accept_status != 200:
            err_msg = 'failed to signin'
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialg')
            response.set_cookie('loginerror', err_msg)
            return response
        else:
            accept_json = accept.json()
            print(accept_json)
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialg')
            response.set_cookie('loginjwt', logindata['access'])
            response.set_cookie('loginrefresh', logindata['refresh'])
            return response

    except SocialAccount.DoesNotExist:
        # User는 있는데 SocialAccount가 없을 때 (=일반회원으로 가입된 이메일일때)
        err_msg = 'not_social'
        response = HttpResponseRedirect('https://www.hellorvdworld.com/socialg')
        response.set_cookie('loginerror', err_msg)
        return response

class GoogleLogin(SocialLoginView):
    adapter_class = google_view.GoogleOAuth2Adapter
    callback_url = GOOGLE_REDIRECT_URI
    client_class = OAuth2Client





NAVER_TOKEN_API = "https://nid.naver.com/oauth2.0/token"
NAVER_USER_API = "https://openapi.naver.com/v1/nid/me"
NAVER_REDIRECT_URI = getattr(settings, 'NAVER_REDIRECT_URI', 'NAVER_REDIRECT_URI')
NAVER_CLIENT_ID = getattr(settings, 'NAVER_CLIENT_ID', 'NAVER_CLIENT_ID')
NAVER_CLIENT_PW = getattr(settings, 'NAVER_CLIENT_PW', 'NAVER_CLIENT_PW')

def naverCallback(request, *args, **kwargs):
    #Callback URL 에서 code 받아오기
    code = request.GET["code"]
    # if not code:
    #     return Response(status=status.HTTP_400_BAD_REQUEST)
    print(code)
    # Naver에 access token 발급 요청
    data = {
        "grant_type": "authorization_code",
        "client_id": NAVER_CLIENT_ID,
        "client_secret": NAVER_CLIENT_PW,
        "redirect_uri": NAVER_REDIRECT_URI,
        "code": code,
    }
    # 받은 코드로 네이버에 access token 요청하기
    token = requests.post(NAVER_TOKEN_API, data=data).json()
    access_token = token.get('access_token')
    print(access_token)
    # if not access_token:
    #     return Response(status=status.HTTP_400_BAD_REQUEST)

    # 네이버에 user info 요청
    headers = "Bearer " + access_token
    # 받은 access token 으로 user 정보 요청
    request = urllib.request.Request(NAVER_USER_API)
    request.add_header("Authorization", headers)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()
    if (rescode == 200):
        response_body = response.read()
        user_info = response_body.decode('utf-8')
        jsonResult = json.loads(user_info)
    else:
        print("Error Code:" + rescode)

    email = jsonResult.get('response').get('email')

    # 3. 전달받은 이메일, access_token, code를 바탕으로 회원가입/로그인
    try:
        # 전달받은 이메일로 등록된 유저가 있는지 탐색
        # get_or_create : 있으면 get 없으면 create
        user = User.objects.get(email=email)
        social_user = SocialAccount.objects.get(user=user)
        # 있는데 네이버계정이 아니어도 에러
        if social_user.provider != 'naver':
            err_msg = 'not_naver'
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialn')
            response.set_cookie('loginerror', err_msg)
            return response

        # 이미 naver로 제대로 가입된 유저 => 로그인 & 해당 우저의 jwt 발급
        data = {'access_token': access_token, 'code': code}
        accept = requests.post("https://server.hellorvdworld.com/accounts/naver/login/finish/", data=data)
        accept_status = accept.status_code
        logindata = accept.json()
        # 뭔가 중간에 문제가 생기면 에러
        if accept_status != 200:
            err_msg = 'failed to signin'
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialn')
            response.set_cookie('loginerror', err_msg)
            return response

        else:
            accept_json = accept.json()
            print(accept_json)
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialn')
            response.set_cookie('loginjwt', logindata['access'])
            response.set_cookie('loginrefresh', logindata['refresh'])
            return response

    except User.DoesNotExist:
        # 전달받은 이메일로 기존에 가입된 유저가 아예 없으면 => 새로 회원가입 & 해당 유저의 jwt 발급
        data = {'access_token': access_token, 'code': code}
        accept = requests.post("https://server.hellorvdworld.com/accounts/naver/login/finish/", data=data)
        accept_status = accept.status_code
        logindata=accept.json()
        # 뭔가 중간에 문제가 생기면 에러
        if accept_status != 200:
            err_msg = 'failed to signin'
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialn')
            response.set_cookie('loginerror', err_msg)
            return response

        else:
            accept_json = accept.json()
            print(accept_json)
            response = HttpResponseRedirect('https://www.hellorvdworld.com/socialn')
            response.set_cookie('loginjwt', logindata['access'])
            response.set_cookie('loginrefresh', logindata['refresh'])
            return response

    except SocialAccount.DoesNotExist:
        # User는 있는데 SocialAccount가 없을 때 (=일반회원으로 가입된 이메일일때)
        err_msg = 'not_social'
        response = HttpResponseRedirect('https://www.hellorvdworld.com/socialn')
        response.set_cookie('loginerror', err_msg)
        return response

class NaverLogin(SocialLoginView):
    adapter_class = naver_view.NaverOAuth2Adapter
    callback_url = NAVER_REDIRECT_URI
    client_class = OAuth2Client

@api_view(['DELETE'])
def delete_user(request):
    permission_classes = [IsAuthenticatedOrReadOnly]
    request.user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


class ConfirmEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        self.object = confirmation = self.get_object() # getobject 로 가져온거.
        confirmation.confirm(self.request)
        # A React Router Route will handle the failure scenario 리액트 라우터가 실패할 경우.
        return HttpResponseRedirect('/') # 인증성공

    def get_object(self, queryset=None):
        key = self.kwargs['key']
        email_confirmation = EmailConfirmationHMAC.from_key(key)
        if not email_confirmation:
            if queryset is None:
                queryset = self.get_queryset()
            try:
                email_confirmation = queryset.get(key=key.lower())
            except EmailConfirmation.DoesNotExist:
                # A React Router Route will handle the failure scenario
                return HttpResponseRedirect('/') # 인증실패
        return email_confirmation

    def get_queryset(self):
        qs = EmailConfirmation.objects.all_valid()
        qs = qs.select_related("email_address__user")
        return qs

class MessageProducer:
    def __init__(self,broker,topic):
        self.broker=broker
        self.topic=topic
        self.producer=KafkaProducer(
            bootstrap_servers=self.broker,
            value_serializer=lambda x: json.dumps(x).encode("utf-8"),
            acks=0,
            api_version=(2,5,0),
            key_serializer=str.encode,
            retries=3,

        )
    def send_message(self, msg, auto_close=True):
        try:
            print(self.producer)
            future = self.producer.send(self.topic, value=msg, key="key")
            self.producer.flush() # 비우는 작업
            if auto_close:
                self.producer.close()
            future.get(timeout=2)
            return {"status_code": 200, "error": None}
        except Exception as exc:
            raise exc

class PreferView(APIView):
    def get_object(self,id):
        return User.objects.get(id=id)
    

    def put(self, request):
        user = self.get_object(request.user.id)
        serializer = CustomUserDetailsSerializer(user, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        else:
            serializer.save()
        return Response(serializer.data)
