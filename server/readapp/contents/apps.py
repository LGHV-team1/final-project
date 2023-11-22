from django.apps import AppConfig
import pymysql
from pymongo import MongoClient


class ContentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'contents'

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
        conn = MongoClient("127.0.0.1",port=27017)
        # 데이터베이스 설정
        db = conn.cqrs
        collect = db.contents
        collect.delete_many({})
        cursor = con.cursor()
        # 데이터 읽어오는 SQL 실행
        cursor.execute("select * from contents_vod")
        # 전체 데이터를 가져와서 튜플의 튜플로 생성
        data = cursor.fetchall()
        for user in data:
            doc = {
                "id": user[1],
                "name": user[2],
                "description": user[3],
                "bigcategory": user[4],
                "smallcategory": user[5],
                "actors": user[6],
                "director": user[7],
                "imgpath": user[8],
                "name_no_space": user[9],
                "backgroundimgpath":user[10]
            }
            collect.insert_one(doc)
        con.close()
