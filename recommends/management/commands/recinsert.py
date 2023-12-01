import csv
from django.core.management.base import BaseCommand
from recommends.models import MainRecommend
from contents.models import Vod


class Command(BaseCommand):
    def recinsert(self, *args, **options):
        with open("./data/test_data.csv", encoding="utf-8") as f:
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
                rec1,category1=rec1.split("/")
                rec2,category2=rec2.split("/")
                rec3,category3=rec3.split("/")
                rec4,category4=rec4.split("/")
                rec5,category5=rec5.split("/")
                rec6,category6=rec6.split("/")
                rec7,category7=rec7.split("/")
                rec8,category8=rec8.split("/")
                rec9,category9=rec9.split("/")
                rec10,category10=rec10.split("/") 


                vod_instance1=Vod.objects.get(name=rec1,category=category1)
                vod_instance2=Vod.objects.get(name=rec2,category=category2)
                vod_instance3=Vod.objects.get(name=rec3,category=category3)
                vod_instance4=Vod.objects.get(name=rec4,category=category4)
                vod_instance5=Vod.objects.get(name=rec5,category=category5)
                vod_instance6=Vod.objects.get(name=rec6,category=category6)
                vod_instance7=Vod.objects.get(name=rec7,category=category7)
                vod_instance8=Vod.objects.get(name=rec8,category=category8)
                vod_instance9=Vod.objects.get(name=rec9,category=category9)
                vod_instance10=Vod.objects.get(name=rec10,category=category10)
                
                

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
					method=int(method)
				)
                rec_list.append(rec)
            MainRecommend.objects.bulk_create(rec_list)
            self.stdout.write(self.style.SUCCESS("Data imported successfully"))
    def handle(self, *args, **options):
        self.recinsert(*args, **options)