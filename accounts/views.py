import json,os,urllib
from json import JSONDecodeError
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.sites import requests
from django.shortcuts import render, redirect
from rest_framework import generics, mixins, status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from django.conf import settings
from rest_framework.views import APIView
from accounts.models import User
from .serializers import UserSerializer
import requests

KAKAO_TOKEN_API = "https://kauth.kakao.com/oauth/token"
KAKAO_USER_API = "https://kapi.kakao.com/v2/user/me"
KAKAO_REDIRECT_URI = getattr(settings, 'KAKAO_REDIRECT_URI', 'KAKAO_REDIRECT_URI')
KAKAO_REST_API_KEY = getattr(settings, 'KAKAO_REST_API_KEY', 'KAKAO_REST_API_KEY')

def kakaoCallback(request, *args, **kwargs):
    #Callback URL 에서 code 받아오기
    code = request.GET["code"]
    print(code)
    if not code:
        return Response(status=status.HTTP_400_BAD_REQUEST)

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
    print(access_token)
    # kakao에 user info 요청
    headers = {"Authorization": f"Bearer ${access_token}"}
    # 받은 access token 으로 user 정보 요청
    user_infomation = requests.get(KAKAO_USER_API, headers=headers).json()

    data = {'access_token': access_token, 'code': code}
    kakao_account = user_infomation.get('kakao_account')
    #email 은 카카오 user 정보에서 받은 email
    email = kakao_account.get('email')
    print(email)

    # 1. 유저가 이미 DB에 있는지 확인하기
    try:
        #User모델의 이메일과 Token의 이메일이 같은지 확인
        user = User.objects.get(email=email)
        token = Token.objects.get_or_create(user=user)
        print(token)
        #같으면 이미 있는 유저 -> 바로 리다이렉트
        res = redirect("http://127.0.0.1:3000")
        #res.set_cookie(res, token.get('access'), token.get('refresh'))
        # 쿠키설정은 res.set_cookie('쿠키이름', '쿠키값')
        return res

    except User.DoesNotExist:
        # 2. 없으면 회원가입하기
        data = {
            'email': email,
            'password': 'kakao',
            'is_social': True
            # 비밀번호는 없지만 validation 을 통과하기 위해서 임시로 사용
            # 비밀번호를 입력해서 로그인하는 부분은 없으므로 안전함
            # is_social 값을 True 변경
        }
        serializer = UserSerializer(data=data)
        if not serializer.is_valid():
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data
        serializer.create(validated_data=user)

        # 2-1. 회원가입 하고 토큰 만들어서 쿠키에 저장하기
        try:
            user = User.objects.get(email=email)
            token = Token.objects.create(user=user)
            print(token)
            res = redirect("http://127.0.0.1:3000")
            #res.set_cookie(res, token.get('access'), token.get('refresh'))

            return res
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)




GOOGLE_TOKEN_API = "https://oauth2.googleapis.com/token"
GOOGLE_USER_API = "https://www.googleapis.com/userinfo/v2/me"
GOOGLE_REDIRECT_URI = getattr(settings, 'GOOGLE_REDIRECT_URI', 'GOOGLE_REDIRECT_URI')
GOOGLE_CLIENT_ID = getattr(settings, 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_PW = getattr(settings, 'GOOGLE_CLIENT_PW', 'GOOGLE_CLIENT_PW')
BASE_URL = "http://localhost:8000/"

def googleCallback(request):
    client_id = GOOGLE_CLIENT_ID
    client_secret = GOOGLE_CLIENT_PW
    code = request.GET.get("code")
    state = "rnrmffhrmdls"
    print(code)
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
    print("토큰:", access_token)

    #################################################################

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
        token = Token.objects.get_or_create(user=user)
        res = redirect("http://127.0.0.1:3000")


        # # 있는데 구글계정이 아니어도 에러
        # if social_user.provider != "google":
        #     return JsonResponse(
        #         {"err_msg": "no matching social type"},
        #         status=status.HTTP_400_BAD_REQUEST,
        #     )

        return res

    except User.DoesNotExist:
        # 전달받은 이메일로 기존에 가입된 유저가 아예 없으면 => 새로 회원가입 & 해당 유저의 token 발급

        data = {
            'email': email,
            'password': 'google',
            'is_social': True
            # 비밀번호는 없지만 validation 을 통과하기 위해서 임시로 사용
            # 비밀번호를 입력해서 로그인하는 부분은 없으므로 안전함
            # is_social 값을 True 변경
        }
        serializer = UserSerializer(data=data)
        if not serializer.is_valid():
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data
        serializer.create(validated_data=user)

        try:
            user = User.objects.get(email=email)
            token = Token.objects.create(user=user)
            print(token)
            res = redirect("http://127.0.0.1:3000")
            # res.set_cookie(res, token.get('access'), token.get('refresh'))

            return res
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


    # except SocialAccount.DoesNotExist:
    #     # User는 있는데 SocialAccount가 없을 때 (=일반회원으로 가입된 이메일일때)
    #     return JsonResponse(
    #         {"err_msg": "email exists but not social user"},
    #         status=status.HTTP_400_BAD_REQUEST,
    #     )

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


    # 1. 유저가 이미 DB에 있는지 확인하기
    try:
        #User모델의 이메일과 Token의 이메일이 같은지 확인
        user = User.objects.get(email=email)
        token = Token.objects.get_or_create(user=user)
        #같으면 이미 있는 유저 -> 바로 리다이렉트
        res = redirect("http://127.0.0.1:3000")
        #res.set_cookie(res, token.get('access'), token.get('refresh'))
        # 쿠키설정은 res.set_cookie('쿠키이름', '쿠키값')
        return res

    except User.DoesNotExist:
        # 2. 없으면 회원가입하기
        data = {
            'email': email,
            'password': 'naver',
            'is_social': True
            # 비밀번호는 없지만 validation 을 통과하기 위해서 임시로 사용
            # 비밀번호를 입력해서 로그인하는 부분은 없으므로 안전함
            # is_social 값을 True 변경
        }

        serializer = UserSerializer(data=data)
        if not serializer.is_valid():
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data
        serializer.create(validated_data=user)

        # 2-1. 회원가입 하고 토큰 만들어서 쿠키에 저장하기
        try:
            user = User.objects.get(email=email)
            token = Token.objects.create(user=user)
            print(token)
            res = redirect("http://127.0.0.1:3000")
            #res.set_cookie(res, token.get('access'), token.get('refresh'))

            return res
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)



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
