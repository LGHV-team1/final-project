# wishlist/views.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Wishlist 




# class WishlistView(APIView):
# 	permission_classes = [IsAuthenticated]
		
# 	def get(self, request):
# 		wishlists = Wishlist.objects.filter(user=request.user)
# 		serializer = ShowWishlistSerializer(wishlists, many=True)
# 		return Response(serializer.data)

