from django.db import models

class MainRecommend(models.Model):
	stbnum=models.IntegerField()
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



