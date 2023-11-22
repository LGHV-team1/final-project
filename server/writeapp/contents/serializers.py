from rest_framework.serializers import ModelSerializer
from .models import Vod
from django.db.models import Avg
from reviews.serializers import ReviewshowSerializer
from rest_framework import serializers
from wishlists.models import Wishlist
from reviews.models import Review



class VodListSerializer(ModelSerializer):
    class Meta:
        model = Vod
        fields = ("name", "smallcategory")


class VodDetailSerializer(ModelSerializer):
    review = ReviewshowSerializer(source="reviews", many=True, read_only=True)
    is_liked = serializers.SerializerMethodField()
    avg_rate=serializers.SerializerMethodField()
    class Meta:
        model = Vod
        fields = "__all__"

    def get_is_liked(self, vod):
        user = self.context['request'].user
        if user.is_authenticated:
             return Wishlist.objects.filter(user=user, vod=vod).exists()
        return False
    
    def get_avg_rate(self, obj):
        reviews = Review.objects.filter(contents=obj)  # Assuming 'vod' is the ForeignKey in Review model
        if reviews.exists():
            return reviews.aggregate(Avg('rating'))['rating__avg']  # Assuming 'rating' is the field name in Review model
        return 0  # Return 0 if there are no reviews
