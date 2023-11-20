# myapp/management/commands/load_vod_data.py
import pandas as pd
from django.core.management.base import BaseCommand
import csv
from contents.models import Vod


class Command(BaseCommand):
    def handle(self, *args, **options):
        with open("./data/vod_data_addSummary.csv", encoding="utf-8") as f:
            reader = csv.reader(f)
            next(reader)
            vod_list = []
            for row in reader:
                print(row)
                none,name,Summary,actors,director,BigCategory,SmallCategory,Category,runningtime,SMRY,vod_name = row
                vod = Vod(name=vod_name, description=Summary, actors=actors, bigcategory=BigCategory, smallcategory=SmallCategory, category=Category,director=director)
                vod_list.append(vod)

        Vod.objects.bulk_create(vod_list)

        self.stdout.write(self.style.SUCCESS("Data imported successfully"))
