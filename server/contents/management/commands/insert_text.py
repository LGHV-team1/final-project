import requests
import pandas as pd
import csv
from django.core.management.base import BaseCommand
from contents.models import Vod


class Command(BaseCommand):
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmU3Zjc0NDkzOWViOGYwZmY4ZGNlMGY2OTIzN2Y3ZiIsInN1YiI6IjY1Mzc4MDM3NDFhYWM0MDBhYTA3ZTBlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RfZj_QvZtiLrqhs7crrHBukRA0elNetuc9yWYdos5sg",
    }

    def dbinsert(self, *args, **options):
        with open("./data/vod_text.csv", encoding="utf-8") as f:
            reader = csv.reader(f)
            next(reader)  # Skip header
            for row in reader:
                (
                    name,
                    Summary,
                    actors,
                    director,
                    BigCategory,
                    SmallCategory,
                    Category,
                    rename,
                    counts,
                    vod_id,
                    vod_name,
                    running_time,
                    genres,
                    text,
                ) = row

                fix_obj = Vod.objects.get(id=vod_id)
                fix_obj.text = text
                fix_obj.save()

            self.stdout.write(self.style.SUCCESS("Data imported successfully"))

    def handle(self, *args, **options):
        self.dbinsert(*args, **options)
