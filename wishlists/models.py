from django.db import models
from django.contrib.auth import get_user_model
from contents.models import Vod

User = get_user_model()


class Wishlist(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
	vod = models.ForeignKey(Vod, on_delete=models.CASCADE, related_name="vod")
	created_at = models.DateTimeField(auto_now_add=True)
	def __str__(self) -> str:
		return f"{self.user}/{self.vod}"
