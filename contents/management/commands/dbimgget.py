from django.core.management.base import BaseCommand
from contents.models import Vod
import requests, json
from contents.serializers import VodDetailSerializer

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmU3Zjc0NDkzOWViOGYwZmY4ZGNlMGY2OTIzN2Y3ZiIsInN1YiI6IjY1Mzc4MDM3NDFhYWM0MDBhYTA3ZTBlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RfZj_QvZtiLrqhs7crrHBukRA0elNetuc9yWYdos5sg"
}
class Command(BaseCommand):

    def handle(self, *args, **options) :
        vod_list = Vod.objects.all()

        for row in vod_list :
            url = "https://api.themoviedb.org/3/search/multi"
            params = {
                "api_key": "8fe7f744939eb8f0ff8dce0f69237f7f",
                "language": "ko",
                "query": row.name,
                "include_adult": True
            }
            response = requests.get(url, headers=headers, params=params)
            if response.json()['results'] :
                if response.json()['results'][0]['poster_path'] :
                    row.imgpath = response.json()['results'][0]['poster_path']
                    print(row.imgpath)
                else:
                    row.imgpath = "/noimage.png"
                    print(row.imgpath)
            else :
                row.imgpath = "/noimage.png"
                print(row.imgpath)



        self.stdout.write(self.style.SUCCESS("img get successfully"))