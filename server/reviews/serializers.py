from rest_framework import serializers
from .models import Review
from contents.models import Vod


class ReviewshowSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.email')
    class Meta:
        model = Review
        fields = ("id","payload","rating","username")


class MypageReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.email')
    vodname = serializers.CharField(source='contents.name')
    vodimg = serializers.CharField(source='contents.imgpath')
    class Meta:
        model = Review
        fields = "__all__"

class ReviewSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Review
        fields = "__all__"
    
    