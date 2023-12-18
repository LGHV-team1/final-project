from django.conf import settings
from rest_framework.views import APIView, status
from rest_framework.response import Response
from .models import Vod
from reviews.models import Review
from accounts.models import User
from .serializers import VodListSerializer, VodDetailSerializer
from rest_framework.exceptions import NotFound, APIException
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from reviews.serializers import ReviewSerializer, ReviewshowSerializer
from wishlists.models import Wishlist
from wishlists.serializers import WishlistSerializer
from wishlists.utils import delete_wishlist
from kafka import KafkaProducer
from pymongo import MongoClient
from config import settings
import json
from datetime import timedelta
import datetime
from pytimekr import pytimekr
import pandas as pd
from django_pandas.io import read_frame
from random import sample


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

class SearchVods(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get(self, request, vodname):
        ip = settings.EC2_IP
        pw = settings.MONGO_PW
        client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
        db = client.LGHV
        vods_collection = db.contents
        if vodname:
            vodname_no_space = vodname.replace(" ", "")
            # 대소문자 구분 없는 검색을 위한 regex 쿼리
            regex_query = {"$regex": vodname_no_space, "$options": "i"}
            query = {"name_no_space": regex_query}

            vods = vods_collection.find(query)
            vod_list = list(vods)
            vod_data = [self.serialize_vod(vod) for vod in vod_list]
            return Response(vod_data)
        else:
            return Response({"error": "검색어를 제공해야 합니다."}, status=400)

    def serialize_vod(self, vod):
        return {
            "id": vod["id"],
            "name": vod["name"],
            "smallcategory": vod["smallcategory"],
            "imgpath": vod["imgpath"],
            "count": vod["count"],
        }


class Searchactors(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get(self, request, actor):
        ip = settings.EC2_IP
        pw = settings.MONGO_PW
        client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
        db = client.LGHV
        vods_collection = db.contents
        if actor:
            actor_no_space = actor.replace(" ", "")
            

            # 대소문자 구분 없는 검색을 위한 regex 쿼리
            regex_query = {"$regex": actor_no_space, "$options": "i"}
            query = {"searchactors": regex_query}
            # 쿼리 실행
            vods = vods_collection.find(query)
            # 결과를 Python 리스트로 변환
            vod_list = list(vods)
            vod_data = [self.serialize_vod(vod) for vod in vod_list]
            return Response(vod_data)
        else:
            return Response({"error": "검색어를 제공해야 합니다."}, status=400)

    def serialize_vod(self, vod):
        # VOD 객체를 직렬화하는 메서드
        return {
            "id": vod["id"],
            "name": vod["name"],
            "smallcategory": vod["smallcategory"],
            "imgpath": vod["imgpath"],
            "count": vod["count"],
        }


class SearchVodsByChoseong(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get(self, request, vodname):
        ip = settings.EC2_IP
        pw = settings.MONGO_PW
        client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
        db = client.LGHV
        vods_collection = db.contents
        if vodname:
            vodname_no_space = vodname.replace(" ", "")
            # 대소문자 구분 없는 검색을 위한 regex 쿼리
            regex_query = {"$regex": vodname_no_space, "$options": "i"}
            query = {"choseong": regex_query}

            # 쿼리 실행
            vods = vods_collection.find(query)
            vod_list = list(vods)
            vod_data = [self.serialize_vod(vod) for vod in vod_list]
            return Response(vod_data)
        else:
            return Response({"error": "검색어를 제공해야 합니다."}, status=400)

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


class SearchVodsDetail(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    ip = settings.EC2_IP
    pw = settings.MONGO_PW
    client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
    db = client.LGHV
    vods_collection = db.contents
    wishlist_collection=db.wishlists
    reviews_collection=db.reviews
    user_collection=db.users
    def get_object(self, vodid):
        return Vod.objects.get(id=vodid)
    
    def get_object_mongo(self, vodid):
        return self.vods_collection.find_one({"id": vodid})

    def get(self, request, vodid):
        vod = self.get_object_mongo(vodid)
        if vod is None:
            return Response(
                {"error": "해당 vod가 존재하지 않습니다."}, status=status.HTTP_404_NOT_FOUND
            )

        # 여기서 직렬화 방식을 구현해야 합니다.
        serialized_vod = self.serialize_vod(vod,request)
        return Response(serialized_vod)

    def serialize_vod(self, vod,request):
        serialized_data = {
            "id": vod["id"],
            "name": vod["name"],
            "description": vod["description"],
            "bigcategory": vod["bigcategory"],
            "smallcategory": vod["smallcategory"],
            "category": vod["category"],
            "actors": vod["actors"],
            "director": vod["director"],
            "runningtime": vod["runningtime"],
            "imgpath": vod["imgpath"],
            "backgroundimgpath": vod["backgroundimgpath"],
            "count": vod["count"],
        }
        if "actors" in serialized_data and isinstance(serialized_data["actors"], str):
            try:
                # json으로 변경 가능시 json으로 변경
                serialized_data["actors"] = json.loads(serialized_data["actors"])
            except json.JSONDecodeError:
                # JSON 변환 실패 시, 기본값으로 처리
                serialized_data["actors"] = []

        # 'is_liked' 필드 계산
        user = request.user
        if user.is_authenticated:
            serialized_data['is_liked'] = self.wishlist_collection.find_one({"user_id": user.id, "vod_id": vod['id']}) is not None
        else:
            serialized_data['is_liked'] = False

        pipeline = [
            {"$match": {"contents_id": vod["id"]}},
            {"$group": {"_id": "$contents_id", "avg_rating": {"$avg": "$rating"}}},
        ]
        avg_result = list(self.reviews_collection.aggregate(pipeline))
        

        # 평균 평점 추가
        if avg_result:
            serialized_data["avg_rate"] = avg_result[0]["avg_rating"]
        else:
            serialized_data["avg_rate"] = 0

        # 리뷰 가져오기
        # reviews = self.reviews_collection.find({"contents_id": vod['id']})
        # serialized_reviews = []
        # for review in reviews:
        #     user=self.user_collection.find_one({"id":review['user_id']})
        #     serialized_review = {
        #         "payload": review.get("payload", ""),
        #         "rating": review.get("rating", 0),
        #         "username":user.get("email")
        #     }
        #     serialized_reviews.append(serialized_review)
        # serialized_data['review'] = serialized_reviews
        
        # 같은 장르 비디오 가져오기
        if vod["category"]=="키즈":
            vods=self.vods_collection.find({"category":"키즈","smallcategory":vod['smallcategory']}).sort("count",-1).limit(20)
            vods_list=list(vods)
            selected_vods=sample(vods_list,5)
            serialized_vods = []
            for cont in selected_vods:
                serialized_review = {
                    "id": cont.get("id"),
                    "name": cont.get("name"),
                    "imgpath":cont.get("imgpath"),
                    "backgroundimgpath":cont.get("backgroundimgpath")
                }
                serialized_vods.append(serialized_review)
        else:
            vods = self.vods_collection.find({"smallcategory": vod['smallcategory']}).sort("count",-1).limit(20)
            vods_list = list(vods)
            selected_vods=sample(vods_list,5)
            serialized_vods = []
            for cont in selected_vods:
                serialized_review = {
                    "id": cont.get("id"),
                    "name": cont.get("name"),
                    "imgpath":cont.get("imgpath"),
                    "backgroundimgpath":cont.get("backgroundimgpath")
                }
                serialized_vods.append(serialized_review)
        serialized_data['related_vods'] = serialized_vods



        return serialized_data

    def post(self, request, vodid):
        vod = self.get_object(vodid)
        wish=request.data['wish']
        print(wish)
        wishlist = Wishlist.objects.filter(user=request.user, vod_id=vod.id).first()
        # 찜 추가 or 삭제 확인

        if not wish:
            if wishlist:
                wishlist_id = wishlist.id
                # 찜 삭제
                delete_wishlist(wishlist_id, request.user)
                broker = ["1.220.201.108:9092"]
                topic = "rvdwishlist"
                pd = MessageProducer(broker, topic)
                #전송할 메시지 생성
                msg = {"task": "delete", "data": wishlist_id}
                res = pd.send_message(msg)
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_202_ACCEPTED)
        else:
            if wishlist:
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                wishlist_data = {
                    "user": request.user.id,
                    "vod": vod.id,
                }

                serializer = WishlistSerializer(data=wishlist_data)
                if serializer.is_valid():
                    serializer.save()
                    # Kafka를 통한 메세지 전송
                    broker = ["1.220.201.108:9092"]
                    topic = "rvdwishlist"
                    pd = MessageProducer(broker, topic)
                    #전송할 메시지 생성
                    msg = {"task": "insert", "data": serializer.data}
                    res = pd.send_message(msg)
                    print(res)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VodTop10(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    ip = settings.EC2_IP
    pw = settings.MONGO_PW
    client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
    db = client.LGHV
    vods_collection = db.contents

    def get(self, request, Bigcategory):
        category_map = {"tv": "TV프로그램", "movie": "영화", "kids": "키즈"}
        category = category_map[Bigcategory]
        top_vods = self.vods_collection.find({"category": category}).sort("count", -1).limit(10)
        serialized_vods = [self.serialize_vod(vod) for vod in top_vods]
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


class VodReviews(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    ip = settings.EC2_IP
    pw = settings.MONGO_PW
    client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
    db = client.LGHV
    vods_collection = db.contents
    wishlist_collection=db.wishlists
    reviews_collection=db.reviews
    user_collection=db.users
    def get_object(self, vodid):
        return self.vods_collection.find_one({"id": vodid})

    def get(self, request, vodid):
        try:
            vod = self.get_object(vodid)
            print(vod)
            if not vod:
                # VOD가 존재하지 않는 경우
                raise NotFound(detail="VOD not found.", code=404)

            serialized_vod = self.serialize_vod(vod)
            return Response(serialized_vod, status=status.HTTP_200_OK)

        except NotFound as e:
            # 특정 VOD를 찾을 수 없는 경우
            return Response({"error": str(e)}, status=e.status_code)

        except Exception as e:
            # 기타 예외 처리
            print(e)
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def serialize_vod(self, vod):
        reviews = self.reviews_collection.find({"contents_id": vod['id']})
        serialized_reviews = []
        for review in reviews: 
            # user=self.user_collection.find_one({"id":review['user_id']})
            user=User.objects.get(id=review['user_id'])
            email=user.email
            serialized_review = {
                "id":review.get("id"),
                "payload": review.get("payload", ""),
                "rating": review.get("rating", 0),
                "username":email
            }
            serialized_reviews.append(serialized_review)
        
        return serialized_reviews


    # def get(self, request, vodid):
    #     vod = self.get_object(vodid)
    #     serializer = ReviewshowSerializer(
    #         vod.reviews.all(),
    #         many=True,
    #     )
    #     return Response(serializer.data)
    
    def post(self, request, vodid):
        existing_review = Review.objects.filter(
            user=request.user, contents__id=vodid
        ).first()
        if existing_review:
            return Response(
                {"error": "You have already reviewed this Vod."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        review_data = {
            "user": request.user.pk,
            "contents": int(vodid),
            **request.data,  # Include other data from the request
        }
        

        review = ReviewSerializer(data=review_data)
        # Save the review instance
        if review.is_valid():
            review_instance = review.save()
            broker = ["1.220.201.108:9092"]
            topic = "rvdreview"
            pd = MessageProducer(broker, topic)
            #전송할 메시지 생성
            msg = {"task": "insert", "data": ReviewSerializer(review_instance).data}
            res = pd.send_message(msg)
            print(res)
            return Response(ReviewSerializer(review_instance).data, status=201)
        else:
            return Response(review.errors, status=status.HTTP_400_BAD_REQUEST)
    """ # 마이페이지에서만 수정 가능.
    def put(self, request, vodid):
        vod = self.get_object(vodid)
        try:
            review = vod.reviews.get(user=request.user)
        except Review.DoesNotExist:
            return Response({"error": "Review not found."}, 404)

        serializer = ReviewSerializer(review, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        serializer.save()

        return Response(serializer.data)

    def delete(self, request, vodid):
        # Retrieve the review instance
        try:
            review = self.get_object(vodid).reviews.get(user=request.user)
        except Review.DoesNotExist:
            return Response(
                {"error": "You do not have a review for this Vod."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Delete the review
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        """


class CategorySearch(APIView):
    ip = settings.EC2_IP
    pw = settings.MONGO_PW
    client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
    db = client.LGHV
    vods_collection = db.contents

    def get(self, request, Bigcategory, Smallcategory):
        movie_category = {
            "fantasy": "SF/환타지",
            "thriller": "공포/스릴러",
            "documentary": "다큐멘터리",
            "shortfilm": "단편",
            "drama": "드라마",
            "RoCo": "로맨틱코미디",
            "melo": "멜로",
            "martial": "무협",
            "musical": "뮤지컬",
            "western": "서부",
            "animation": "애니메이션",
            "action": "액션/어드벤쳐",
            "history": "역사",
            "comedy": "코미디",
            "etc": "기타",
        }
        kids_category = {
            "etc": "기타",
            "animation": "애니메이션",
            "entertainment": "오락",
            "study": "학습",
        }
        tv_category = {
            "Neighborhood": "우리동네",
            "Sports": "스포츠",
            "etc": "미분류",
            "Life": "라이프",
            "Documentary": "다큐",
            "Animation": "TV애니메이션",
            "Drama": "TV드라마",
            "Entertainment": "TV 연예/오락",
            "Education": "TV 시사/교양",
            "Music": "공연/음악",
        }

        if Bigcategory == "tv":
            decoded_category = tv_category[Smallcategory]
            vods = self.vods_collection.find({"category": "TV프로그램","bigcategory":decoded_category})
            serialized_vods = [self.serialize_vod(vod) for vod in vods]
            return Response(serialized_vods, status=status.HTTP_200_OK)

        elif Bigcategory == "movie":
            decoded_category = movie_category[Smallcategory]
            vods = self.vods_collection.find({"category": "영화","smallcategory":decoded_category})
            serialized_vods = [self.serialize_vod(vod) for vod in vods]
            return Response(serialized_vods, status=status.HTTP_200_OK)
            
        elif Bigcategory == "kids":
            decoded_category = kids_category[Smallcategory]
            vods = self.vods_collection.find({"category": "키즈","smallcategory":decoded_category})
            serialized_vods = [self.serialize_vod(vod) for vod in vods]
            return Response(serialized_vods, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_404_NOT_FOUND)        
    def serialize_vod(self, vod):
        return {
            "id": vod["id"],
            "name": vod["name"],
            "smallcategory": vod["smallcategory"],
            "imgpath": vod["imgpath"],
            "count": vod["count"],
        }
    


class CategorySearchTOP5(APIView):
    ip = settings.EC2_IP
    pw = settings.MONGO_PW
    client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
    db = client.LGHV
    vods_collection = db.contents

    def get(self, request, searchcategory):
        movie_category = {
            "fantasy": "SF/환타지",
            "thriller": "공포/스릴러",
            "documentary": "다큐멘터리",
            "shortfilm": "단편",
            "drama": "드라마",
            "RoCo": "로맨틱코미디",
            "melo": "멜로",
            "martial": "무협",
            "musical": "뮤지컬",
            "western": "서부",
            "animation": "애니메이션",
            "action": "액션/어드벤쳐",
            "history": "역사",
            "comedy": "코미디",
            "etc": "기타",
        }
        kids_category = {
            "etc": "기타",
            "animation": "애니메이션",
            "entertainment": "오락",
            "study": "학습",
        }
        tv_category = {
            "Neighborhood": "우리동네",
            "Sports": "스포츠",
            "etc": "미분류",
            "Life": "라이프",
            "Documentary": "다큐",
            "Animation": "TV애니메이션",
            "Drama": "TV드라마",
            "Entertainment": "TV 연예/오락",
            "Education": "TV 시사/교양",
            "Music": "공연/음악",
        }
        categorylist=list(searchcategory.split(","))
        print(categorylist)
        serialized_vods=[]
        for i in categorylist:
            Bigcategory,Smallcategory=i.split("*")
            print(Bigcategory,Smallcategory)
            if Bigcategory == "tv":
                decoded_category = tv_category[Smallcategory]
                vods = self.vods_collection.find({"category": "TV프로그램","bigcategory":decoded_category}).sort("count",-1).limit(5)
                serialized_vods.append([self.serialize_vod(vod) for vod in vods])
            elif Bigcategory == "movie":
                decoded_category = movie_category[Smallcategory]
                vods = self.vods_collection.find({"category": "영화","smallcategory":decoded_category}).sort("count",-1).limit(5)
                serialized_vods.append([self.serialize_vod(vod) for vod in vods])
            elif Bigcategory == "kids":
                decoded_category = kids_category[Smallcategory]
                vods = self.vods_collection.find({"category": "키즈","smallcategory":decoded_category}).sort("count",-1).limit(5)
                serialized_vods.append([self.serialize_vod(vod) for vod in vods])
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)        
        return Response(serialized_vods, status=status.HTTP_200_OK)
    def serialize_vod(self, vod):
        return {
            "id": vod["id"],
            "name": vod["name"],
            "smallcategory": vod["smallcategory"],
            "imgpath": vod["imgpath"],
            "count": vod["count"],
        }
    

class CategoryPick(APIView):
    ip = settings.EC2_IP
    pw = settings.MONGO_PW
    client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
    db = client.LGHV
    vods_collection = db.contents

    def get(self, request, Bigcategory):
        movie_category = {
            "fantasy": "SF/환타지",
            "thriller": "공포/스릴러",
            "documentary": "다큐멘터리",
            "shortfilm": "단편",
            "drama": "드라마",
            "RoCo": "로맨틱코미디",
            "melo": "멜로",
            "martial": "무협",
            "musical": "뮤지컬",
            "western": "서부",
            "animation": "애니메이션",
            "action": "액션/어드벤쳐",
            "history": "역사",
            "comedy": "코미디",
            "etc": "기타",
        }
        kids_category = {
            "etc": "기타",
            "animation": "애니메이션",
            "entertainment": "오락",
            "study": "학습",
        }
        tv_category = {
            "Neighborhood": "우리동네",
            "Sports": "스포츠",
            "etc": "미분류",
            "Life": "라이프",
            "Documentary": "다큐",
            "Animation": "TV애니메이션",
            "Drama": "TV드라마",
            "Entertainment": "TV 연예/오락",
            "Education": "TV 시사/교양",
            "Music": "공연/음악",
        }
        serialized_vods=[]
        if Bigcategory == "tv":
            smallcategory=list(tv_category.values())
            for i in smallcategory:
                vods = self.vods_collection.find({"category": "TV프로그램","bigcategory":i}).sort("count",-1).limit(1)
                serialized_vods.append([self.serialize_tvvod(vod) for vod in vods])
        elif Bigcategory == "movie":
            smallcategory=list(movie_category.values())
            for i in smallcategory:
                vods = self.vods_collection.find({"category": "영화","smallcategory":i}).sort("count",-1).limit(1)
                serialized_vods.append([self.serialize_vod(vod) for vod in vods])
        elif Bigcategory == "kids":
            smallcategory=list(kids_category.values())
            for i in smallcategory:
                vods = self.vods_collection.find({"category": "키즈","smallcategory":i}).sort("count",-1).limit(1)
                serialized_vods.append([self.serialize_vod(vod) for vod in vods])
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)        
        return Response(serialized_vods, status=status.HTTP_200_OK)
    
    def serialize_vod(self, vod):
        return {
            "id": vod["id"],
            "name": vod["name"],
            "smallcategory": vod["smallcategory"],
            "imgpath": vod["imgpath"],
            "count": vod["count"],
        }
    def serialize_tvvod(self,vod):
        bigcategory= "기타" if vod['bigcategory']=="미분류" else vod['bigcategory']
        return  {
            "id": vod["id"],
            "name": vod["name"],
            "bigcategory": bigcategory,
            "imgpath": vod["imgpath"],
            "count": vod["count"],
        }
    
