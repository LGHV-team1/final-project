from django.apps import AppConfig
import pymysql
from pymongo import MongoClient
from datetime import datetime
from config import settings
from kafka import KafkaConsumer
import threading
import json

class ReviewsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'reviews'
    def ready(self) -> None:
    
            # con = pymysql.connect(
            #     host=settings.AWS_DB_HOST,
            #     port=3306,
            #     user="admin",
            #     passwd=settings.AWS_DB_PASSWORD,
            #     db="LGHellovision",
            #     charset="utf8",
            # )
            # ip=settings.EC2_IP
            # pw=settings.MONGO_PW
            # conn = MongoClient(f'mongodb://hellovision:{pw}@{ip}', 27017)
            

            # # 데이터베이스 설정
            # db = conn.LGHV
            # collect = db.reviews
            # cursor = con.cursor()
            # # 데이터 읽어오는 SQL 실행
            # cursor.execute("select * from reviews_review")
            # # 전체 데이터를 가져와서 튜플의 튜플로 생성
            # data = cursor.fetchall()
            # for review in data:
            #     review_id=review[0]
            #     if not collect.find_one({"id": review_id}):
            #         doc = {
            #             "id": review[0],
            #             "payload": review[1],
            #             "rating": review[2],
            #             "contents_id": review[3],
            #             "user_id": review[4],
            #         }
            #         collect.insert_one(doc)
            # con.close()
            broker = ["1.220.201.108:9092"]
            topic = "rvdreview"
            consumer = MessageConsumer(broker, topic)
            t = threading.Thread(target=consumer.receive_message)
            t.start()


class MessageConsumer:
    def __init__(self,broker,topic):
        self.broker = broker
        self.consumer = KafkaConsumer(
            topic,
            bootstrap_servers=self.broker,
            value_deserializer=lambda x: x.decode("utf-8"),
            group_id="rvdworld",
            auto_offset_reset="earliest",
            enable_auto_commit=True,
        )

    

    def receive_message(self):
        try:
            for message in self.consumer:
                result = json.loads(message.value)
                if result['task']=="insert":
                    review = result["data"]
                    
                    doc = {
                        "id": review["id"],
                        "payload": review["payload"],
                        "rating": review["rating"],
                        "user_id": review["user"],
                        "contents_id": review["contents"],
                    }
                    ip = settings.EC2_IP
                    pw = settings.MONGO_PW
                    conn = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
                    db = conn.LGHV
                    collect=db.reviews
                    collect.insert_one(doc)
                    
                    conn.close()
                elif result['task']=="put":
                    review = result["data"]
                    review_id=review["id"]
                    update_fields={}
                    if "payload" in review:
                        update_fields["payload"]=review["payload"]
                    if "rating" in review:
                        update_fields["rating"]=review["rating"]

                    if update_fields:
                        ip = settings.EC2_IP
                        pw = settings.MONGO_PW
                        conn = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
                        db = conn.LGHV
                        collect=db.reviews

                        collect.update_one({"id":review_id},{"$set": update_fields})
                        conn.close()
                    else:
                        print("NO valid fields to update")

                elif result['task']=='delete':
                    ip = settings.EC2_IP
                    pw = settings.MONGO_PW
                    conn = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
                    db = conn.LGHV
                    collect=db.reviews
                    review_id = result["data"]
                    if review_id:
                        # ObjectId로 변환하여 삭제 작업을 수행합니다.
                        collect.delete_one({"id": review_id})
                    else:
                        print("No valid wishlist_id provided for delete operation.")
                    conn.close()
        except Exception as exc:
            raise exc





