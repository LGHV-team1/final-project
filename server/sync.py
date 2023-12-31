import pymysql
from pymongo import MongoClient
from config import settings




def rec_sync():
	print("rec_sync")
	# recommend SYNC
	rec_collect = db.recommends
	cursor = con.cursor()
	cursor.execute("select * from recommends_mainrecommend")
	data = cursor.fetchall()
	for rec in data:
		rec_id=rec[0]
		if not rec_collect.find_one({"id":rec_id}):
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
			rec_collect.insert_one(doc)
	print("end sync")


def rev_sync():
	print("review sync")
	# review SYNC
	review_collect = db.reviews
	cursor = con.cursor()
	cursor.execute("select * from reviews_review")
	data = cursor.fetchall()
	for review in data:
		review_id=review[0]
		if not review_collect.find_one({"id":review_id}):
			doc = {
				"id": review[0],
				"payload": review[1],
				"rating": review[2],
				"contents_id": review[3],
				"user_id": review[4],
			}
			review_collect.insert_one(doc)
	print("end sync")
	
def wish_sync():
	print("wish sync")
	# wishlist SYNC
	wish_collect = db.wishlists
	cursor = con.cursor()
	cursor.execute("select * from wishlists_wishlist")
	data = cursor.fetchall()
	for wish in data:
		wish_id=wish[0]
		if not wish_collect.find_one({"id": wish_id}):
			doc = {
				"id": wish[0],
				"created_at": wish[1],
				"user_id": wish[2],
				"vod_id": wish[3],
			}
			wish_collect.insert_one(doc)
	print("end sync")


def con_sync():
	print("con sync")
	# contents SYNC
	collect = db.contents
	cursor = con.cursor()
	cursor.execute("select * from contents_vod")
	data = cursor.fetchall()
	for content in data:
		con_id=content[0]
		if not collect.find_one({"id": con_id}):
			doc = {
				"id": content[0],
				"name": content[1],
				"description": content[2],
				"bigcategory": content[3],
				"smallcategory": content[4],
				"category": content[5],
				"searchactors": content[6],
				"actors": content[7],
				"director": content[8],
				"runningtime": content[9],
				"imgpath": content[10],
				"name_no_space": content[11],
				"backgroundimgpath": content[12],
				"count": content[13],
				"choseong": content[14],
			}
			collect.insert_one(doc)
	print("end sync")

def genre_sync():
	print("genre_sync")
	# recommend SYNC
	genrerec_collect = db.genrerecommends
	cursor = con.cursor()
	cursor.execute("select * from recommends_genrebasedrecommend")
	data = cursor.fetchall()
	for rec in data:
		rec_id=rec[0]
		if not genrerec_collect.find_one({"id":rec_id}):
			doc = {
				"id": rec[0],
				"stbnum":rec[1],
				"watched":rec[13],
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
			genrerec_collect.insert_one(doc)
	print("end sync")

def time_sync():
	print("time_sync")
	# recommend SYNC
	time_rec_collect = db.timerecommends
	cursor = con.cursor()
	cursor.execute("select * from recommends_timerecommend")
	data = cursor.fetchall()
	for rec in data:
		time_id=rec[0]
		if not time_rec_collect.find_one({"id":time_id}):
			doc = {
				"id": rec[0],
				"yesterday": rec[1],
				"today": rec[2],
				"tomorrow": rec[3],
				"time": rec[4],
				"rec1": rec[6],
				"rec2": rec[8],
				"rec3": rec[9],
				"rec4":rec[10],
				"rec5": rec[11],
				"rec6": rec[12],
				"rec7": rec[13],
				"rec8": rec[14],
				"rec9": rec[15],
				"rec10": rec[7],
				"method":rec[5],
			}
			time_rec_collect.insert_one(doc)
	print("end sync")

	

if __name__=="__main__":
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
	# conn.drop_database("LGHV")
	db = conn.LGHV
	time_sync()
	genre_sync()
	wish_sync()
	rec_sync()
	rev_sync()
	con_sync()
	con.close()