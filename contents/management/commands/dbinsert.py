# myapp/management/commands/load_vod_data.py
import pandas as pd
from django.core.management.base import BaseCommand
import csv
from contents.models import Vod

class Command(BaseCommand):
    def handle(self, *args, **options):
        with open(".\data\제목장르서머리배우러닝타임.csv", encoding="utf-8") as f:
            reader = csv.reader(f)
            
            vod_list = []
            for row in reader:
                print(row)
                none,name, ctcl, genre, smry, actors, runningTime = row
                vod = Vod(name=name,description=smry, actors=actors,bigcategory=ctcl,smallcategory=genre)
                vod_list.append(vod)

        Vod.objects.bulk_create(vod_list)

        self.stdout.write(self.style.SUCCESS("Data imported successfully"))
