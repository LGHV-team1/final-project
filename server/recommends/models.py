from django.db import models


class MainRecommend(models.Model):
    stbnum = models.IntegerField()
    rec1 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="contents1"
    )
    rec2 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="contents2"
    )
    rec3 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="contents3"
    )
    rec4 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="contents4"
    )
    rec5 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="contents5"
    )
    rec6 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="contents6"
    )
    rec7 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="contents7"
    )
    rec8 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="contents8"
    )
    rec9 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="contents9"
    )
    rec10 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="contents"
    )
    method=models.IntegerField()


class TimeRecommend(models.Model):
    yesterday = models.BooleanField()
    today = models.BooleanField()
    tomorrow = models.BooleanField()
    time = models.IntegerField()
    rec1 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="cont1"
    )
    rec2 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="cont2"
    )
    rec3 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="cont3"
    )
    rec4 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="cont4"
    )
    rec5 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="cont5"
    )
    rec6 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="cont6"
    )
    rec7 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="cont7"
    )
    rec8 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="cont8"
    )
    rec9 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="cont9"
    )
    rec10 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="cont10"
    )
    method = models.IntegerField()


class vod_score(models.Model):
    substr = models.IntegerField()
    vod_id = models.IntegerField()
    score = models.FloatField()
    method=models.IntegerField()


class genrebasedRecommend(models.Model):
    stbnum = models.IntegerField()
    watched = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="watched"
    )
    rec1 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="genrebase1"
    )
    rec2 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="genrebase2"
    )
    rec3 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="genrebase3"
    )
    rec4 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="genrebase4"
    )
    rec5 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="genrebase5"
    )
    rec6 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="genrebase6"
    )
    rec7 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="genrebase7"
    )
    rec8 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="genrebase8"
    )
    rec9 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="genrebase9"
    )
    rec10 = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="genrebase10"
    )
    method=models.IntegerField()


