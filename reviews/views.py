import json
from rest_framework import status
from reviews.models import Review
from reviews.serializers import MypageReviewSerializer
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from pymongo import MongoClient
from config import settings
from kafka import KafkaProducer
from pymongo import MongoClient
from config import settings
import json

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

class MyReviews(APIView):
    ip = settings.EC2_IP
    pw = settings.MONGO_PW
    client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
    db = client.LGHV
    user_collection=db.users
    review_collection = db.reviews
    vod_collection = db.contents
    def get(self, request):
        current_user = request.user.id
        reviewlist = self.review_collection.find({"user_id": current_user})
        serialized_reviews = [self.serialize_review(review) for review in reviewlist]
        return Response(serialized_reviews)
        # reviewlist = Review.objects.filter(user=current_user)
        # serializer = MypageReviewSerializer(reviewlist,many=True)
        # data = serializer.data
        # return Response(serializer.data)
    def serialize_review(self, review):
        user=self.user_collection.find_one({"id":review['user_id']})
        vod=self.vod_collection.find_one({"id":review['contents_id']})
        return {
            "id": review['id'],
            "payload": review['payload'],
            "rating":review['rating'],
            "user":review['user_id'],
            "contents":review['contents_id'],
            "username":user.get("email",""),
            "vodname":vod.get("name"),
            "vodimg":vod.get("imgpath")            
        }


class MyReviewDetail(APIView):
    ip = settings.EC2_IP
    pw = settings.MONGO_PW
    client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
    db = client.LGHV
    user_collection=db.users
    review_collection = db.reviews
    vod_collection = db.contents

    def get_object(self, id):
        return Review.objects.get(id=id)


    def put(self, request, id):
        review = self.get_object(id)
        serializer = MypageReviewSerializer(review, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        else:
            serializer.save()
            broker = ["1.220.201.108:9092"]
            topic = "rvdreview"
            pd = MessageProducer(broker, topic)
            #전송할 메시지 생성
            msg = {"task": "put", "data": serializer.data}
            res = pd.send_message(msg)
            print(res)
        return Response(serializer.data)

    def delete(self, request, id):
        try:
            review = self.get_object(id)
        except Review.DoesNotExist:
            return Response({'error': 'You do not have a review for this Vod.'}, status=status.HTTP_404_NOT_FOUND)
                
        review.delete()
        broker = ["1.220.201.108:9092"]
        topic = "rvdreview"
        pd = MessageProducer(broker, topic)
        #전송할 메시지 생성
        msg = {"task": "delete", "data": id}
        res = pd.send_message(msg)
        print(res)
        return Response(status=status.HTTP_204_NO_CONTENT)