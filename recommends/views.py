from rest_framework.views import APIView,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from .serializers import MainRecommendSerializer
from .models import MainRecommend,vod_score
from contents.models import Vod
from contents.serializers import VodListSerializer
from random import choice
from pymongo import MongoClient
import json
from config import settings
from datetime import timedelta
import datetime
from pytimekr import pytimekr
import pandas as pd
from django_pandas.io import read_frame
from random import sample
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.neighbors import NearestNeighbors
from surprise import Reader
from surprise import Dataset
from surprise.prediction_algorithms import KNNBaseline



class MainRecommend1(APIView): #<1>
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

class MainRecommend2(APIView): # <2>

	permission_classes=[IsAuthenticated]
	ip = settings.EC2_IP
	pw = settings.MONGO_PW
	client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
	db = client.LGHV
	rec_collection = db.genrerecommends
	vod_collection = db.contents

	def get(self, request):
		user = request.user.stbnumber
		try:
			recommend_list = self.rec_collection.find({"stbnum": user, "method": 2})
			rec_list = list(recommend_list)
			recommend=sample(rec_list,1)[0]
			print(recommend)
			if not recommend:
				raise Exception("No recommendation found")
			vod_ids = [recommend[f'rec{i}'] for i in range(1, 11)]
			vod_watched=recommend['watched']
			vod_objects = list(self.vod_collection.find({"id": {"$in": vod_ids}}))
			print(vod_objects)
			vod_list={}
			vod_serialized = [self.serialize_vod(vod) for vod in vod_objects]
			watched = self.vod_collection.find_one({"id": vod_watched})
			vod_watched=[self.serialize_vod(watched)]
			print(vod_watched)
			vod_list["watched"]=vod_watched
			vod_list["recommend"]=vod_serialized
			return Response(vod_list, status=status.HTTP_200_OK)

		except Exception as e:
		# 	# # 기본 추천 처리
		# 	# recommend = self.rec_collection.find_one({"stbnum": 1, "method": 2})
		# 	# vod_ids = [recommend.get(f'rec{i}') for i in range(1, 11)]
		# 	# watched=recommend.get("watched")
		# 	# vod_objects = list(self.vod_collection.find({"id": {"$in": vod_ids}}))
		# 	# vod_serialized = [self.serialize_vod(vod) for vod in vod_objects]
		# 	# return Response(vod_serialized, status=status.HTTP_202_ACCEPTED)
			print(e)

	def serialize_vod(self, vod):
		return {
			"id": vod["id"],
			"name": vod["name"],
			"smallcategory": vod["smallcategory"],
			"imgpath": vod["imgpath"],
			"count": vod["count"],
		}

	
class RandomRecommend(APIView):# <otheruser>
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
		
class timerecommend(APIView): # <3>
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


class FirstUser_Preference_1(APIView): # <5>
	permission_classes = [IsAuthenticatedOrReadOnly]
	ip = settings.EC2_IP
	pw = settings.MONGO_PW
	client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
	db = client.LGHV
	vods_collection = db.contents

	def get(self, request):
		vod_id_list=request.user.prefer_contents
        # vod list 가져오기
		query_set = Vod.objects.all()
		vod_list=read_frame(query_set)
		score_query_set=vod_score.objects.all()
		score=read_frame(score_query_set)
		
		vod = pd.DataFrame([[1]*len(vod_id_list), vod_id_list, [0.7]*len(vod_id_list)]).T
		vod.columns =score.columns[1:4]
		vod_score_1 = pd.concat([score, vod], axis = 0)

			# surprise 데이터 형식으로 변환
		def convert_traintest_dataframe_forsurprise(training_dataframe):
			reader = Reader(rating_scale=(0, 1)) # 이 범위를 넘으면 양극값으로 대체
			trainset = Dataset.load_from_df(training_dataframe[['substr', 'vod_id', 'score']], reader)
			trainset = trainset.construct_trainset(trainset.raw_ratings)
			return trainset

		trainset = convert_traintest_dataframe_forsurprise(vod_score_1)
		
		sim_options = {'name': 'pearson_baseline', 'user_based': False} # item-based similarity
		bsl_options = {'method' : 'sgd', 'n_epochs' : 1}
		knnbaseline = KNNBaseline(k = 40, sim_options=sim_options, random_state = 42,
								bsl_options = bsl_options)

		knnbaseline.fit(trainset)
		vod_id = sorted(vod_score_1.vod_id.unique())
		result = []
		for vod in vod_id:
			result.append(knnbaseline.predict(1, vod)[0:4])

		result = pd.DataFrame(result, columns = ['subsr', 'vod_id', 'real', 'predict'])
		result = result[['subsr', 'vod_id', 'predict']].sort_values(by = 'predict', ascending= False).vod_id.tolist()		
		
		# 추천 VOD가 영화인 경우, 본 적이 있다면 추천안함
		TV_kids = vod_list[(vod_list['category'] == 'TV프로그램') | (vod_list['category'] == '키즈')].id.unique().tolist()
		movie = vod_list[vod_list['category'] == '영화'].id.unique().tolist()

		li = []
		for x in result:
			if x not in vod_id_list:
				li.append(x)
			elif x in vod_id_list and x in TV_kids:
				li.append(x)
			elif x in vod_id_list and x in movie:
				continue

		top_10=li[:10]

		serialized_vods=[]
		for vod in top_10:
			vod = self.vods_collection.find_one({"id": vod})
			serialized_vods.append(self.serialize_vod(vod))
		return Response(serialized_vods, status=status.HTTP_200_OK)
		
	def serialize_vod(self, vod):
		# VOD 객체를 직렬화하는 메서드
		# 여기서 필요한 필드를 선택하여 dictionary 형태로 반환
		return {
			"id": vod["id"],
			"name": vod["name"],
			"smallcategory": vod["smallcategory"],
			"imgpath": vod["imgpath"],
			"count": vod["count"],
		}


class FirstUser_Preference_2(APIView): # <4>
    permission_classes = [IsAuthenticatedOrReadOnly]
    ip = settings.EC2_IP
    pw = settings.MONGO_PW
    client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
    db = client.LGHV
    vods_collection = db.contents

    def get(self, request):
        vod_id_list=request.user.prefer_contents
        # vod list 가져오기
        query_set = Vod.objects.all()
        vod_list=read_frame(query_set)
        print(type(vod_list))
        # BigCategory, SmallCategory로 장르 생성
        vod_list['genres'] = vod_list['bigcategory'].str.replace('/', '').str.replace(' ', '') + ' ' + vod_list['smallcategory'].str.replace('/', '').str.replace(' ', '')
        
        # 장르 정보 추출
        cv = CountVectorizer()
        genres = cv.fit_transform(vod_list.genres)
        
        # one-hot vector 생성
        genres = pd.DataFrame(genres.toarray(), columns=list(sorted(cv.vocabulary_.keys(), key=lambda x:cv.vocabulary_[x])))
        
        
        # n_neighbors: 가장 가까운 n개의 이웃을 찾도록 지정합니다.
        nbrs = NearestNeighbors(n_neighbors=10	).fit(genres.values)
        
        
        # vod_id_list에 있는 vod와 가까운 10개 vod
        recommendation_list = pd.DataFrame()
        for vod_id in vod_id_list:
            vod = genres.iloc[vod_id, :]
            distances, indices = nbrs.kneighbors([vod])
            recommendations = vod_list.loc[indices[0], ["id"]]
            recommendations["distance"] = distances[0]
            # 추천 데이터에 count 합쳐줌
            recommendations = pd.merge(recommendations, vod_list[['id', 'count']], on='id', how="left")
            recommendation_list = pd.concat([recommendation_list, recommendations])
        
        # 거리순, 시청량 순으로 정렬
        recommendation_list.sort_values(["distance", "count"], ascending=[True, False], inplace=True)
        recommendation_list.drop_duplicates(inplace=True)
        
        # 상위 10개 가져옴
        top_10 = list(recommendation_list['id'].head(10))
        serialized_vods=[]
        for vod in top_10:
            vod = self.vods_collection.find_one({"id": vod})
            serialized_vods.append(self.serialize_vod(vod))
        return Response(serialized_vods, status=status.HTTP_200_OK)
        
    def serialize_vod(self, vod):
        # VOD 객체를 직렬화하는 메서드
        # 여기서 필요한 필드를 선택하여 dictionary 형태로 반환
        return {
            "id": vod["id"],
            "name": vod["name"],
            "smallcategory": vod["smallcategory"],
            "imgpath": vod["imgpath"],
            "count": vod["count"],
        }


class SeasonRecommend(APIView): # <6>
	permission_classes = [IsAuthenticatedOrReadOnly]
	ip = settings.EC2_IP
	pw = settings.MONGO_PW
	client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
	db = client.LGHV
	vods_collection = db.contents

	def get(self, request):
		christmas=[4299,2226,3452,3856,3192,3812,3649,2130,1723,1001,4682]
		recommend = self.vods_collection.find({"id":{"$in": christmas}}).sort('count',-1)
		vod_serialized = [self.serialize_vod(vod) for vod in recommend]
		return Response(vod_serialized, status=status.HTTP_200_OK)
	
	def serialize_vod(self, vod):
		return {
			"id": vod["id"],
			"name": vod["name"],
			"smallcategory": vod["smallcategory"],
			"imgpath": vod["imgpath"],
			"count": vod["count"],
		}


class wishlist_recommend(APIView): # <7>
	permission_classes = [IsAuthenticatedOrReadOnly]
	ip = settings.EC2_IP
	pw = settings.MONGO_PW
	client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
	db = client.LGHV
	vods_collection = db.contents
	wish_collection=db.wishlists

	def get(self, request):
		user_id=request.user.id
		vods = self.wish_collection.find({"user_id": user_id})
		vod_id_list = [i['vod_id'] for i in vods]
		print(vod_id_list)

		
		# vod list 가져오기
		query_set = Vod.objects.all()
		vod_list=read_frame(query_set)
		score_query_set=vod_score.objects.all()
		score=read_frame(score_query_set)
		
		vod = pd.DataFrame([[1]*len(vod_id_list), vod_id_list, [0.7]*len(vod_id_list)]).T
		vod.columns =score.columns[1:4]
		vod_score_1 = pd.concat([score, vod], axis = 0)

			# surprise 데이터 형식으로 변환
		def convert_traintest_dataframe_forsurprise(training_dataframe):
			reader = Reader(rating_scale=(0, 1)) # 이 범위를 넘으면 양극값으로 대체
			trainset = Dataset.load_from_df(training_dataframe[['substr', 'vod_id', 'score']], reader)
			trainset = trainset.construct_trainset(trainset.raw_ratings)
			return trainset

		trainset = convert_traintest_dataframe_forsurprise(vod_score_1)
		
		sim_options = {'name': 'pearson_baseline', 'user_based': False} # item-based similarity
		bsl_options = {'method' : 'sgd', 'n_epochs' : 1}
		knnbaseline = KNNBaseline(k = 40, sim_options=sim_options, random_state = 42,
								bsl_options = bsl_options)

		knnbaseline.fit(trainset)
		vod_id = sorted(vod_score_1.vod_id.unique())
		result = []
		for vod in vod_id:
			result.append(knnbaseline.predict(1, vod)[0:4])

		result = pd.DataFrame(result, columns = ['subsr', 'vod_id', 'real', 'predict'])
		result = result[['subsr', 'vod_id', 'predict']].sort_values(by = 'predict', ascending= False).vod_id.tolist()		
		
		# 추천 VOD가 영화인 경우, 본 적이 있다면 추천안함
		TV_kids = vod_list[(vod_list['category'] == 'TV프로그램') | (vod_list['category'] == '키즈')].id.unique().tolist()
		movie = vod_list[vod_list['category'] == '영화'].id.unique().tolist()

		li = []
		for x in result:
			if x not in vod_id_list:
				li.append(x)
			elif x in vod_id_list and x in TV_kids:
				li.append(x)
			elif x in vod_id_list and x in movie:
				continue

		top_10=li[:10]

		serialized_vods=[]
		for vod in top_10:
			vod = self.vods_collection.find_one({"id": vod})
			serialized_vods.append(self.serialize_vod(vod))
		return Response(serialized_vods, status=status.HTTP_200_OK)
		
	def serialize_vod(self, vod):
		# VOD 객체를 직렬화하는 메서드
		# 여기서 필요한 필드를 선택하여 dictionary 형태로 반환
		return {
			"id": vod["id"],
			"name": vod["name"],
			"smallcategory": vod["smallcategory"],
			"imgpath": vod["imgpath"],
			"count": vod["count"],
		}















