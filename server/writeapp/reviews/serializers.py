from rest_framework import serializers
from .models import Review
from contents.models import Vod


class ReviewshowSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.email')

    class Meta:
        model = Review
        fields = ("payload","rating","username")


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = "__all__"
    