import requests
import pandas as pd
import csv
from django.core.management.base import BaseCommand
from contents.models import Vod


class Command(BaseCommand):
    headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmU3Zjc0NDkzOWViOGYwZmY4ZGNlMGY2OTIzN2Y3ZiIsInN1YiI6IjY1Mzc4MDM3NDFhYWM0MDBhYTA3ZTBlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RfZj_QvZtiLrqhs7crrHBukRA0elNetuc9yWYdos5sg"
    }

    def dbinsert(self, *args, **options):
        with open("./data/vod_data_addSummary.csv", encoding="utf-8") as f:
            reader = csv.reader(f)
            next(reader)  # Skip header
            vod_list = []
            for row in reader:
                print(row)
                none, name, Summary, actors, director, BigCategory, SmallCategory, Category, runningtime, SMRY, vod_name = row
                vod = Vod(name=vod_name, description=Summary, actors=actors, bigcategory=BigCategory, smallcategory=SmallCategory, category=Category, director=director)
                vod_list.append(vod)
            Vod.objects.bulk_create(vod_list)
            self.stdout.write(self.style.SUCCESS("Data imported successfully"))

    def dbgetimgpath(self, *args, **options):
        vod_list = Vod.objects.all()
        for row in vod_list:
            if row.category == "영화":  # 영화 처리
                url = "https://api.themoviedb.org/3/search/movie"
            else:  # 영화 이외 키즈, Tv 처리
                url = "https://api.themoviedb.org/3/search/tv"
            params = {
                "api_key": "8fe7f744939eb8f0ff8dce0f69237f7f",
                "language": "ko",
                "query": row.name,
                "include_adult": True
            }
            response = requests.get(url, headers=self.headers, params=params)
            if response.status_code == 200 and response.json()['results']:
                row.imgpath = response.json()['results'][0]['poster_path'] if response.json()['results'][0]['poster_path'] else "/noimage.png"
                row.backgroundimgpath = response.json()['results'][0]['backdrop_path'] if response.json()['results'][0]['backdrop_path'] else "/noimage.png"
            else:
                row.imgpath = "/noimage.png"
                row.backgroundimgpath = "/noimage.png"
                
            print(row.imgpath)
            print(row.backgroundimgpath)
            row.save()
        self.stdout.write(self.style.SUCCESS("Image paths updated successfully"))

    def handle(self, *args, **options):
        self.dbinsert(*args, **options)
        self.dbgetimgpath(*args, **options)
