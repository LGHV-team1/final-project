# wishlist/views.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Wishlist 
from .serializers import WishlistSerializer,ShowWishlistSerializer
from pymongo import MongoClient
from config import settings

class WishlistView(APIView):
	permission_classes = [IsAuthenticated]
	ip = settings.EC2_IP
	pw = settings.MONGO_PW
	client = MongoClient(f"mongodb://hellovision:{pw}@{ip}", 27017)
	db = client.LGHV
	wish_collection = db.wishlists
	vod_collection = db.contents
		
	def get(self, request):
		user_id=request.user.id
		wishlists=self.wish_collection.find({"user_id":user_id})
		serialized_wishlists = [self.serialize_wishlist(wishlist) for wishlist in wishlists]
		return Response(serialized_wishlists)
		
	
	def serialize_wishlist(self, wishlist):
		vod=self.vod_collection.find_one({"id":wishlist['vod_id']})
		return {
			"vod_id": vod["id"],
			"vodname": vod["name"],
			"vodimage": vod["imgpath"],
			
		}
		


# class WishlistDetailView(APIView):
# 	def delete(self, request, pk):
# 		try:
# 			wishlist = Wishlist.objects.get(pk=pk, user=request.user) 
# 		except Wishlist.DoesNotExist:
# 			return Response(status=status.HTTP_404_NOT_FOUND)
			
# 		wishlist.delete()
# 		return Response(status=status.HTTP_204_NO_CONTENT)