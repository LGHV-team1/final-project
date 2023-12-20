import csv
from django.core.management.base import BaseCommand
from recommends.models import vod_score
from contents.models import Vod


class Command(BaseCommand):
    def recinsert(self, *args, **options):
        with open("./data/vod_score.csv", encoding="cp949") as f:
            reader = csv.reader(f)
            
            next(reader)  # Skip header
            rec_list = []
            for row in reader:
                (
                    subsr,
                    vod_id,
                    score,
                    
                ) = row
                
                

                rec=vod_score(
                    substr=int(subsr),
                    vod_id=int(vod_id),
                    score=float(score),
                    method=1 # 1은 준호, 2는 tscore(수정)
                    
				)
                rec_list.append(rec)
            vod_score.objects.bulk_create(rec_list)
            self.stdout.write(self.style.SUCCESS("Data imported successfully"))
    def handle(self, *args, **options):
        self.recinsert(*args, **options)