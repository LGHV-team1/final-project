from django.apps import AppConfig
import pymysql
from pymongo import MongoClient
from datetime import datetime
from config import settings
from kafka import KafkaConsumer
import threading
import json

class WishlistsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'wishlists'
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
            # collect = db.wishlists
            # cursor = con.cursor()
            # # 데이터 읽어오는 SQL 실행
            # cursor.execute("select * from wishlists_wishlist")
            # # 전체 데이터를 가져와서 튜플의 튜플로 생성
            # data = cursor.fetchall()
            # for wish in data:
            #     wish_id=wish[0]
            #     if not collect.find_one({"id": wish_id}):
            #         doc = {
            #             "id": wish[0],
            #             "created_at": wish[1],
            #             "user_id": wish[2],
            #             "vod_id": wish[3],
            #         }
            #         collect.insert_one(doc)
            # con.close()
            broker = ["1.220.201.108:9092"]
            topic = "rvdwishlist"
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
                    wishlist = result["data"]
                    
                    doc = {
                        "id": wishlist["id"],
                        "created_at": wishlist["created_at"],
                        "user_id": wishlist["user"],
                        "vod_id": wishlist["vod"],
                    }
                    ip = settings.EC2_IP
                    pw = settings.MONGO_PW
                    conn = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
                    db = conn.LGHV
                    collect=db.wishlists
                    collect.insert_one(doc)
                    
                    conn.close()
                elif result['task']=='delete':
                    ip = settings.EC2_IP
                    pw = settings.MONGO_PW
                    conn = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
                    db = conn.LGHV
                    collect=db.wishlists
                    wishlist_id = result["data"]
                    if wishlist_id:
                        # ObjectId로 변환하여 삭제 작업을 수행합니다.
                        collect.delete_one({"id": wishlist_id})
                    else:
                        print("No valid wishlist_id provided for delete operation.")
                    conn.close()
        except Exception as exc:
            raise exc


