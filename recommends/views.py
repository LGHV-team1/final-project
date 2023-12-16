from rest_framework.views import APIView,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import MainRecommendSerializer
from .models import MainRecommend
from contents.models import Vod
from contents.serializers import VodListSerializer
from random import choice
from pymongo import MongoClient
import json
from config import settings
from datetime import timedelta
import datetime
from pytimekr import pytimekr



class MainRecommend1(APIView):
	permission_classes=[IsAuthenticated]
	ip = settings.EC2_IP
	pw = settings.MONGO_PW
	client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
	db = client.LGHV
	rec_collection = db.recommends
	vod_collection = db.contents

	def get(self, request):
		user = request.user.stbnumber
		try:
			recommend = self.rec_collection.find_one({"stbnum": user, "method": 1})
			if not recommend:
				raise Exception("No recommendation found")
			vod_ids = [recommend.get(f'rec{i}') for i in range(1, 11)]
			# VOD 객체 조회
			
			vod_objects = list(self.vod_collection.find({"id": {"$in": vod_ids}}))
			
			vod_serialized = [self.serialize_vod(vod) for vod in vod_objects]
			return Response(vod_serialized, status=status.HTTP_200_OK)

		except Exception as e:
			# 기본 추천 처리
			recommend = self.rec_collection.find_one({"stbnum": 1, "method": 1})
			vod_ids = [recommend.get(f'rec{i}') for i in range(1, 11)]
			vod_objects = list(self.vod_collection.find({"id": {"$in": vod_ids}}))
			vod_serialized = [self.serialize_vod(vod) for vod in vod_objects]
			return Response(vod_serialized, status=status.HTTP_202_ACCEPTED)

	def serialize_vod(self, vod):
		return {
			"id": vod["id"],
			"name": vod["name"],
			"smallcategory": vod["smallcategory"],
			"imgpath": vod["imgpath"],
			"count": vod["count"],
		}
"""
	def get(self,request):
		user=request.user.stbnumber
		try:
			recommend=MainRecommend.objects.get(stbnum=user,method=1)
			serializer=MainRecommendSerializer(recommend)
			# MainRecommend 객체에서 각 VOD ID 가져오기
			vod_ids = [serializer.data[f'rec{i}'] for i in range(1, 11)]

			# 각 ID에 해당하는 VOD 객체 조회 및 직렬화
			vod_objects = Vod.objects.filter(id__in=vod_ids)
			vod_serializer = VodListSerializer(vod_objects, many=True)

			# 직렬화된 VOD 데이터를 응답으로 반환
			return Response(vod_serializer.data,status=status.HTTP_200_OK)
		except MainRecommend.DoesNotExist:
			recommend=MainRecommend.objects.get(stbnum=1,method=1)
			serializer=MainRecommendSerializer(recommend)
			# MainRecommend 객체에서 각 VOD ID 가져오기
			vod_ids = [serializer.data[f'rec{i}'] for i in range(1, 11)]

			# 각 ID에 해당하는 VOD 객체 조회 및 직렬화
			vod_objects = Vod.objects.filter(id__in=vod_ids)
			vod_serializer = VodListSerializer(vod_objects, many=True)

			# 직렬화된 VOD 데이터를 응답으로 반환
			return Response(vod_serializer.data,status=status.HTTP_202_ACCEPTED)
	"""
			
			
	
		


class MainRecommend2(APIView):

	permission_classes=[IsAuthenticated]
	ip = settings.EC2_IP
	pw = settings.MONGO_PW
	client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
	db = client.LGHV
	rec_collection = db.recommends
	vod_collection = db.contents

	def get(self, request):
		user = request.user.stbnumber
		try:
			recommend = self.rec_collection.find_one({"stbnum": user, "method": 2})
			if not recommend:
				raise Exception("No recommendation found")
			vod_ids = [recommend.get(f'rec{i}') for i in range(1, 11)]
			vod_objects = list(self.vod_collection.find({"id": {"$in": vod_ids}}))
			vod_serialized = [self.serialize_vod(vod) for vod in vod_objects]
			return Response(vod_serialized, status=status.HTTP_200_OK)

		except Exception as e:
			# 기본 추천 처리
			recommend = self.rec_collection.find_one({"stbnum": 1, "method": 2})
			vod_ids = [recommend.get(f'rec{i}') for i in range(1, 11)]
			vod_objects = list(self.vod_collection.find({"id": {"$in": vod_ids}}))
			vod_serialized = [self.serialize_vod(vod) for vod in vod_objects]
			return Response(vod_serialized, status=status.HTTP_202_ACCEPTED)

	def serialize_vod(self, vod):
		return {
			"id": vod["id"],
			"name": vod["name"],
			"smallcategory": vod["smallcategory"],
			"imgpath": vod["imgpath"],
			"count": vod["count"],
		}
	
class RandomRecommend(APIView):
	ip = settings.EC2_IP
	pw = settings.MONGO_PW
	client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
	db = client.LGHV
	rec_collection = db.recommends
	vod_collection = db.contents
	def get(self, request):
        # 현재 요청한 사용자 제외한 모든 사용자 ID 목록 가져오기
		current_user_id = request.user.stbnumber
		all_user_ids = self.rec_collection.distinct("stbnum", {"stbnum": {"$ne": current_user_id}})
		# 무작위 사용자 ID 선택
		if all_user_ids:
			random_user_id = choice(all_user_ids)
		else:
			return Response({"error": "No other users found"}, status=status.HTTP_404_NOT_FOUND)
		
		# 선택된 사용자의 추천 데이터 조회
		recommend = self.rec_collection.find_one({"stbnum": random_user_id, "method": 1})
		vod_ids = [recommend[f'rec{i}'] for i in range(1, 11)]
		vod_objects = list(self.vod_collection.find({"id": {"$in": vod_ids}}))

		serialized_vods = [self.serialize_vod(vod) for vod in vod_objects]
		return Response(serialized_vods, status=status.HTTP_200_OK)

	def serialize_vod(self, vod):
		return {
			"id": vod["id"],
			"name": vod["name"],
			"smallcategory": vod["smallcategory"],
			"imgpath": vod["imgpath"],
			"count": vod["count"],
		}
		
class timerecommend(APIView):
	permission_classes=[IsAuthenticated]
	ip = settings.EC2_IP
	pw = settings.MONGO_PW
	client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
	db = client.LGHV
	timerec_collection = db.timerecommends
	vod_collection = db.contents

	def get(self, request):
		# return Response(status=status.HTTP_200_OK)
		
		current_date = datetime.date.today()
		yesterday = current_date - datetime.timedelta(days=1)
		tomorrow = current_date + datetime.timedelta(days=1)
		holiday = pytimekr.holidays() 

		today = 1 if current_date.weekday() > 4 else 0
		day_before= 1 if yesterday.weekday()>4 else 0
		next_day= 1 if tomorrow.weekday()>4 else 0
		
		
		
		if yesterday in holiday:
			day_before=1
		if current_date in holiday:
			today=1
		if tomorrow in holiday:
			next_day=1

		current_time = datetime.datetime.now()

		current_hour = current_time.hour
		if 0 <= current_hour < 8:
			hour = 0
		elif 8 <= current_hour < 18:
			hour = 1
		else:
			hour = 2


		recommend = self.timerec_collection.find_one({"today":today ,"yesterday":day_before,"tomorrow":next_day,"time":hour})
		if not recommend:
			raise Exception("No recommendation found")
		vod_ids = [recommend.get(f'rec{i}') for i in range(1, 11)]
		vod_objects = list(self.vod_collection.find({"id": {"$in": vod_ids}}))
		vod_serialized = [self.serialize_vod(vod) for vod in vod_objects]
		return Response(vod_serialized, status=status.HTTP_200_OK)
	
	
	
	
	def serialize_vod(self, vod):
		return {
			"id": vod["id"],
			"name": vod["name"],
			"smallcategory": vod["smallcategory"],
			"imgpath": vod["imgpath"],
			"count": vod["count"],
		}