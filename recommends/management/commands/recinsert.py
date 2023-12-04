import csv
from django.core.management.base import BaseCommand
from recommends.models import MainRecommend
from contents.models import Vod


class Command(BaseCommand):
    def recinsert(self, *args, **options):
        with open("./data/test_data.csv", encoding="cp949") as f:
            reader = csv.reader(f)
            
            next(reader)  # Skip header
            rec_list = []
            for row in reader:
                (
                    stbnum,
                    rec1,
                    rec2,
                    rec3,
                    rec4,
                    rec5,
                    rec6,
                    rec7,
                    rec8,
                    rec9,
                    rec10,
					method
                    
                ) = row
                

                vod_instance1=Vod.objects.get(id=rec1)
                vod_instance2=Vod.objects.get(id=rec2)
                vod_instance3=Vod.objects.get(id=rec3)
                vod_instance4=Vod.objects.get(id=rec4)
                vod_instance5=Vod.objects.get(id=rec5)
                vod_instance6=Vod.objects.get(id=rec6)
                vod_instance7=Vod.objects.get(id=rec7)
                vod_instance8=Vod.objects.get(id=rec8)
                vod_instance9=Vod.objects.get(id=rec9)
                vod_instance10=Vod.objects.get(id=rec10)
                
                

                rec=MainRecommend(
                    stbnum=int(stbnum),
                    rec1=vod_instance1,
                    rec2=vod_instance2,
                    rec3=vod_instance3,
                    rec4=vod_instance4,
                    rec5=vod_instance5,
                    rec6=vod_instance6,
                    rec7=vod_instance7,
                    rec8=vod_instance8,
                    rec9=vod_instance9,
                    rec10=vod_instance10,
					method=method
				)
                rec_list.append(rec)
            MainRecommend.objects.bulk_create(rec_list)
            self.stdout.write(self.style.SUCCESS("Data imported successfully"))
    def handle(self, *args, **options):
        self.recinsert(*args, **options)