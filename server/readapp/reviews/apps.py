from django.apps import AppConfig
import pymysql
from pymongo import MongoClient
from kafka import KafkaConsumer
import threading
import json


class ReviewsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "reviews"

    def ready(self) -> None:
        #  데이터베이스 연결.
        con = pymysql.connect(
            host="127.0.0.1",
            port=3306,
            user="jason",
            passwd="wlals980713",
            db="cqrs",
            charset="utf8",
        )
        conn = MongoClient("127.0.0.1", port=27017)
        # 데이터베이스 설정
        db = conn.cqrs
        collect = db.reviews
        collect.delete_many({})
        cursor = con.cursor()
        # 데이터 읽어오는 SQL 실행
        cursor.execute("select * from reviews_review")
        # 전체 데이터를 가져와서 튜플의 튜플로 생성
        data = cursor.fetchall()
        for review in data:
            doc = {
                "id": review[0],
                "payload": review[1],
                "rating": review[2],
                "contents_id": review[3],
                "user_id": review[4],
            }

            collect.insert_one(doc)
        con.close()
        broker = ["1.220.201.108:9092"]
        topic = "Jmreviewtopic"
        consumer = MessageConsumer(broker, topic)
        t = threading.Thread(target=consumer.receive_message)
        t.start()


class MessageConsumer:
    def __init__(self, broker, topic):
        self.broker = broker
        self.consumer = KafkaConsumer(
            topic,  # Topic to consume
            bootstrap_servers=self.broker,
            value_deserializer=lambda x: x.decode(
                "utf-8"
            ),  # Decode message value as utf-8
            group_id="my-group",  # Consumer group ID
            auto_offset_reset="earliest",  # Start consuming from earliest available message
            enable_auto_commit=True,  # Commit offsets automatically
        )

    def receive_message(self):
        try:
            for message in self.consumer:
                result = json.loads(message.value)
                review = result["data"]
                doc = {
                    "id": review["id"],
                    "payload": review["payload"],
                    "rating": review["rating"],
                    "contents_id": review["contents"],
                    "user_id": review["user"],
                }
                # 데이터베이스 연결
                conn = MongoClient("127.0.0.1", port=27017)
                # 데이터베이스 설정
                db = conn.cqrs
                # 컬렉션 설정
                collect = db.reviews
                collect.insert_one(doc)
                print(doc)
                conn.close()
        except Exception as exc:
            raise exc
