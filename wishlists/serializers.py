# wishlist/serializers.py

from rest_framework import serializers
from .models import Wishlist
from contents.serializers import VodDetailSerializer

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = "__all__"
        
class WishlistDetailSerializer(WishlistSerializer):
    vod = VodDetailSerializer()
    
class ShowWishlistSerializer(serializers.ModelSerializer):
    vodname = serializers.CharField(source='vod.name')
    vodimage = serializers.CharField(source='vod.imgpath')
    class Meta:
        model = Wishlist
        fields = ('vodname','vodimage')