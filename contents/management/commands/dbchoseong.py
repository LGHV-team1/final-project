import requests
import pandas as pd
import csv
from django.core.management.base import BaseCommand
from contents.models import Vod

class Command(BaseCommand):
    def dbchoseong(self, *args, **options):
        vod_list = Vod.objects.all()
        for row in vod_list:
            CHOSEONG_LIST = [
                'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
            ]
            result = ""

            for char in row.name_no_space:
                if '가' <= char <= '힣':
                    # 한글 문자의 유니코드 값으로 초성 인덱스를 계산
                    choseong_index = (ord(char) - ord('가')) // 588
                    result += CHOSEONG_LIST[choseong_index]
                else:
                    result += char
            row.choseong = result
            row.save()

        self.stdout.write(self.style.SUCCESS("choseong updated successfully"))

    def handle(self, *args, **options):
        self.dbchoseong(*args, **options)