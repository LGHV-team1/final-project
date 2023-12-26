from rest_framework.serializers import ModelSerializer
from .models import MainRecommend
from rest_framework import serializers

class MainRecommendSerializer(ModelSerializer):
    class Meta:
        model=MainRecommend
        exclude=("id","stbnum","method")