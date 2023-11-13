from rest_framework.serializers import ModelSerializer
from .models import Vod
from reviews.serializers import ReviewshowSerializer
from rest_framework import serializers
from wishlists.models import Wishlist


class VodListSerializer(ModelSerializer):
    class Meta:
        model = Vod
        fields = ("name", "smallcategory")


class VodDetailSerializer(ModelSerializer):
    review = ReviewshowSerializer(source="reviews", many=True, read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Vod
        fields = "__all__"

    def get_is_liked(self, vod):
        print(self.context)
        user = self.context['request'].user
        if user.is_authenticated:
             return Wishlist.objects.filter(user=user, vod=vod).exists()
        return False
