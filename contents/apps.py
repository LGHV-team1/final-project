from django.apps import AppConfig
import pymysql
from pymongo import MongoClient
from datetime import datetime
from config import settings

class ContentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'contents'
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
                "category":user[5],
                "searchactors": user[6],
                "actors": user[7],
                "director": user[8],
                "runningtime": user[9],
                "imgpath": user[10],
                "name_no_space": user[11],
                "backgroundimgpath":user[12],
                "count": user[13],
                "choseong":user[14]
            }
            collect.insert_one(doc)
        con.close()

