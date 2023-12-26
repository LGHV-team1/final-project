from django.db import models
from django.core.validators import MaxValueValidator


class Review(models.Model):
    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="users"
    )
    contents = models.ForeignKey(
        "contents.Vod", on_delete=models.CASCADE, related_name="reviews"
    )
    payload = models.TextField()  # 리뷰 내용
    rating = models.PositiveIntegerField(validators=[MaxValueValidator(5)])  # 별점.

    def __str__(self) -> str:
        return f"{self.contents}/ ⭐️{self.rating}"
