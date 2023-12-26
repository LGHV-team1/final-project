from django.db import models

class Vod(models.Model):
    id=models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50, null=False)
    description = models.TextField(null=True)
    bigcategory = models.CharField(max_length=50, null=False,default="기타")
    smallcategory = models.CharField(max_length=50, null=False,default='기타')
    category = models.CharField(max_length=50, null=True)
    searchactors=models.CharField(max_length=200,null=True)
    actors = models.JSONField(max_length=200,null=True)
    director = models.CharField(max_length=50, null=True)
    runningtime = models.CharField(max_length=10,null=True)
    imgpath = models.CharField(max_length=100, null=True)
    name_no_space = models.CharField(max_length=255,editable=False)
    backgroundimgpath=models.CharField(max_length=100,null=True)
    count = models.IntegerField(null=True)
    choseong = models.CharField(max_length=255,null=True)
    text=models.TextField(null=True)


    def __str__(self) -> str:
        return self.name