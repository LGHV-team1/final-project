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
            db="LGHellovision",
            charset="utf8",
        )
        ip=settings.EC2_IP
        pw=settings.MONGO_PW
        conn = MongoClient(f'mongodb://hellovision:{pw}@{ip}', 27017)
        
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
            rec_id =rec[0]
            if not collect.find_one({"id": rec_id}):
                doc = {
                    "id": rec[0],
                    "stbnum": rec[1],
                    "rec1": rec[3],
                    "rec2": rec[5],
                    "rec3": rec[6],
                    "rec4":rec[7],
                    "rec5": rec[8],
                    "rec6": rec[9],
                    "rec7": rec[10],
                    "rec8": rec[11],
                    "rec9": rec[12],
                    "rec10": rec[4],
                    "method":rec[2],
                }
                collect.insert_one(doc)
        con.close()
