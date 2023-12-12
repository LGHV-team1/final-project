from django.apps import AppConfig
import pymysql
from pymongo import MongoClient
from datetime import datetime
from config import settings


class RecommendsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'recommends'
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
        collect = db.recommends
        collect.delete_many({})
        cursor = con.cursor()
        # 데이터 읽어오는 SQL 실행
        cursor.execute("select * from recommends_mainrecommend")
        # 전체 데이터를 가져와서 튜플의 튜플로 생성
        data = cursor.fetchall()
        for rec in data:
            doc = {
                "id": rec[0],
                "stbnum": rec[1],
                "rec1_id": rec[3],
                "rec2_id": rec[5],
                "rec3_id": rec[6],
                "rec4_id":rec[7],
                "rec5_id": rec[8],
                "rec6_id": rec[9],
                "rec7_id": rec[10],
                "rec8_id": rec[11],
                "rec9_id": rec[12],
                "rec10_id": rec[4],
                "method":rec[2],
            }
            collect.insert_one(doc)
        con.close()
