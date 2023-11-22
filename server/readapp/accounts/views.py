from django.http import HttpResponseRedirect,JsonResponse,HttpResponse
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from pymongo import MongoClient
from bson import json_util
import json


@api_view(['GET'])
def userAPI(request):
    # 데이터베이스 연결
    conn = MongoClient('127.0.0.1',port=27017)
    # 데이터베이스 설정
    db = conn.cqrs
    # 컬렉션 설정
    collect = db.accounts
    # 전체 문서 조회
    result = collect.find()
    # 조회 문서 출력
    data = []
    for r in result :
        print(type(r))
        data.append(r)
    return Response(json.loads(json_util.dumps(data)), status=status.HTTP_201_CREATED)