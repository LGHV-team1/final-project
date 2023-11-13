# wishlist/views.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import Wishlist 
from .serializers import WishlistSerializer,ShowWishlistSerializer


class WishlistView(APIView):
	permission_classes = [IsAuthenticated]
		
	def get(self, request):
		wishlists = Wishlist.objects.filter(user=request.user)
		serializer = ShowWishlistSerializer(wishlists, many=True)
		return Response(serializer.data)


class WishlistDetailView(APIView):
	def delete(self, request, pk):
		try:
			wishlist = Wishlist.objects.get(pk=pk, user=request.user) 
		except Wishlist.DoesNotExist:
			return Response(status=status.HTTP_404_NOT_FOUND)
			
		wishlist.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)