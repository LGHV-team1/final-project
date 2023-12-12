from django.apps import AppConfig
import pymysql
from pymongo import MongoClient
from datetime import datetime
from config import settings


class ReviewsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'reviews'
    def ready(self) -> None:
        con = pymysql.connect(
            host=settings.AWS_DB_HOST,
            port=3306,
            user="admin",
            passwd=settings.AWS_DB_PASSWORD,
            db="LGHV",
            charset="utf8",
        )
        ip=settings.EC2_IP
        pw=settings.MONGO_PW
        conn = MongoClient(f'mongodb://hellovision:{pw}@{ip}', 27017)
        print(conn)
        # 데이터베이스 설정
        db = conn.LGHV
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


