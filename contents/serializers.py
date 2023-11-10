from rest_framework.serializers import ModelSerializer
from .models import Vod
from reviews.serializers import ReviewshowSerializer

class VodListSerializer(ModelSerializer):
    class Meta:
        model=Vod
        fields=("name","smallcategory")

class VodDetailSerializer(ModelSerializer):
    review=ReviewshowSerializer(source='reviews',many=True,read_only=True)
    class Meta:
        model=Vod
        fields="__all__"