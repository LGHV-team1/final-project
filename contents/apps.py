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

    # def ready(self) -> None:
    #     con = pymysql.connect(
    #         host=settings.AWS_DB_HOST,
    #         port=3306,
    #         user="admin",
    #         passwd=settings.AWS_DB_PASSWORD,
    #         db="LGHellovision",
    #         charset="utf8",
    #     )
    #     ip = settings.EC2_IP
    #     pw = settings.MONGO_PW
    #     conn = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
        
    #     # 데이터베이스 설정
    #     db = conn.LGHV
    #     collect = db.contents
    #     cursor = con.cursor()
    #     # 데이터 읽어오는 SQL 실행
    #     cursor.execute("select * from contents_vod")
    #     # 전체 데이터를 가져와서 튜플의 튜플로 생성
    #     data = cursor.fetchall()
    #     for content in data:
    #         content_id = content[0]
    #         if not collect.find_one({"id": content_id}):
    #             doc = {
    #                 "id": content[0],
    #                 "name": content[1],
    #                 "description": content[2],
    #                 "bigcategory": content[3],
    #                 "smallcategory": content[4],
    #                 "category": content[5],
    #                 "searchactors": content[6],
    #                 "actors": content[7],
    #                 "director": content[8],
    #                 "runningtime": content[9],
    #                 "imgpath": content[10],
    #                 "name_no_space": content[11],
    #                 "backgroundimgpath": content[12],
    #                 "count": content[13],
    #                 "choseong": content[14],
    #             }
    #             collect.insert_one(doc)
    #     con.close()

