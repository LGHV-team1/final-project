from django.apps import AppConfig
import pymysql
from pymongo import MongoClient
from datetime import datetime
from config import settings

class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'
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
        collect = db.users
        collect.delete_many({})
        cursor = con.cursor()
        # 데이터 읽어오는 SQL 실행
        cursor.execute("select * from accounts_user")
        # 전체 데이터를 가져와서 튜플의 튜플로 생성
        data = cursor.fetchall()
        for user in data:
            doc = {
                "id": user[0],
                "email": user[7],
            }
            collect.insert_one(doc)
        con.close()

