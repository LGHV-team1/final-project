from django.db import models

class Vod(models.Model):
    name = models.CharField(max_length=50, null=False)
    description = models.TextField(max_length=200, null=True)
    bigcategory = models.CharField(max_length=50, null=False,default="기타")
    smallcategory = models.CharField(max_length=50, null=False,default='기타')
    category = models.CharField(max_length=50, null=True)
    actors = models.CharField(max_length=100, null=True)
    director = models.CharField(max_length=50, null=True)
    # runningtime=models.TimeField()
    imgpath = models.CharField(max_length=50, null=True)

    def __str__(self) -> str:
        return self.name