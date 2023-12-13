from django.apps import AppConfig
import pymysql
from pymongo import MongoClient
from datetime import datetime
from config import settings
from kafka import KafkaConsumer
import threading
import json
from bson import ObjectId



class ContentsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "contents"

    def ready(self) -> None:
        con = pymysql.connect(
            host=settings.AWS_DB_HOST,
            port=3306,
            user="admin",
            passwd=settings.AWS_DB_PASSWORD,
            db="LGHV",
            charset="utf8",
        )
        ip = settings.EC2_IP
        pw = settings.MONGO_PW
        conn = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
        print(conn)
        # 데이터베이스 설정
        db = conn.LGHV
        collect = db.contents
        collect.delete_many({})
        cursor = con.cursor()
        # 데이터 읽어오는 SQL 실행
        cursor.execute("select * from contents_vod")
        # 전체 데이터를 가져와서 튜플의 튜플로 생성
        data = cursor.fetchall()
        for user in data:
            doc = {
                "id": user[0],
                "name": user[1],
                "description": user[2],
                "bigcategory": user[3],
                "smallcategory": user[4],
                "category": user[5],
                "searchactors": user[6],
                "actors": user[7],
                "director": user[8],
                "runningtime": user[9],
                "imgpath": user[10],
                "name_no_space": user[11],
                "backgroundimgpath": user[12],
                "count": user[13],
                "choseong": user[14],
            }
            collect.insert_one(doc)
        con.close()
        # broker = ["localhost:9092"]
        # topic = "rvdcontents"
        # consumer = MessageConsumer(broker, topic)
        # t = threading.Thread(target=consumer.receive_message)
        # t.start()


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
        ip = settings.EC2_IP
        pw = settings.MONGO_PW
        self.conn = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
        self.db = self.conn.LGHV

    def __del__(self):
        self.conn.close()

    def process_message(self, message):
        task = message.get("task")
        data = message.get("data")
        if task == "insert":
            self.db.wishlist.insert_one(data)
        elif task =="delete":
            wishlist_id = data.get("wishlist_id")
            if wishlist_id:
                # ObjectId로 변환하여 삭제 작업을 수행합니다.
                self.db.wishlist.delete_one({"_id": ObjectId(wishlist_id)})
            else:
                print("No valid wishlist_id provided for delete operation.")

    
    def receive_message(self):
        try:
            for message in self.consumer:
                result = json.loads(message.value)
                self.process_message(result)
        except Exception as exc:
            print(f"An error occurred: {exc}")
            # 적절한 로깅 또는 에러 처리





"""
# class MessageConsumer:
#     def __init__(self,broker,topic):
#         self.broker = broker
#         self.consumer = KafkaConsumer(
#             topic,
#             bootstrap_servers=self.broker,
#             value_deserializer=lambda x: x.decode("utf-8"),
#             group_id="rvdworld",
#             auto_offset_reset="earliest",
#             enable_auto_commit=True,
#         )

#     def receive_message(self):
#         try:
#             for message in self.consumer:
#                 result = json.loads(message.value)
#                 review = result["data"]
#                 doc = {
#                     "id": review["id"],
#                     "payload": review["payload"],
#                     "rating": review["rating"],
#                     "contents_id": review["contents"],
#                     "user_id": review["user"],
#                 }
#                 # 데이터베이스 연결
#                 ip = settings.EC2_IP
#                 pw = settings.MONGO_PW
#                 conn = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
#                 db = conn.LGHV
#                 collect = db.contents
#                 collect.insert_one(doc)
#                 print(doc)
#                 conn.close()
#         except Exception as exc:
#             raise exc
"""