from django.conf import settings
from rest_framework.views import APIView,status
from rest_framework.response import Response
from .models import Vod
from reviews.models import Review
from .serializers import VodListSerializer, VodDetailSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from reviews.serializers import ReviewSerializer,ReviewshowSerializer
from wishlists.models import Wishlist  
from wishlists.serializers import WishlistSerializer
from wishlists.utils import delete_wishlist


class SearchVods(APIView):
	permission_classes = [IsAuthenticatedOrReadOnly]
    
	def get(self,request,vodname):
		if vodname:
			vodname_no_space = vodname.replace(' ', '')
			vods = Vod.objects.filter(name_no_space__icontains=vodname_no_space)
			serializer = VodListSerializer(vods, many=True)
			return Response(serializer.data)
		else:
			return Response({'error': '검색어를 제공해야 합니다.'}, status=400)

class SearchVodsDetail(APIView):
	permission_classes=[IsAuthenticatedOrReadOnly]
	def get_object(self,vodid):
		return Vod.objects.get(id=vodid)
		 
		
	def get(self,request,vodid):
		vod=self.get_object(vodid)
		serializer = VodDetailSerializer(vod, context={'request': request})
		return Response(serializer.data)
	
	def post(self, request,vodname):
		vod=self.get_object(vodname)
	
		wishlist = Wishlist.objects.filter(
            user=request.user, 
            vod_id=vod.id
        ).first()
		# 찜 추가 or 삭제 확인
		
	
		if wishlist:
			wishlist_id = wishlist.id
			# 찜 삭제
			delete_wishlist(wishlist_id,request.user)
			return Response(status=status.HTTP_204_NO_CONTENT) 
		else:
			wishlist_data = {
				'user': request.user.id, 
				'vod': vod.id,
			}
			
			serializer = WishlistSerializer(data=wishlist_data)
			if serializer.is_valid():
				serializer.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
				
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		
class VodTop5(APIView):
	permission_classes = [IsAuthenticatedOrReadOnly]
	def get(self,request,category):
		top_vods=Vod.objects.filter(category=category).order_by('-count')[:5]
		serializer=VodListSerializer(top_vods,many=True)
		return Response(serializer.data,status=status.HTTP_200_OK)








class VodReviews(APIView):
	permission_classes=[IsAuthenticatedOrReadOnly]
	def get_object(self,vodname):
		return Vod.objects.get(name=vodname)

	def get(self, request, vodname):
		vod = self.get_object(vodname)
		serializer = ReviewshowSerializer(
			vod.reviews.all(),
			many=True,
		)
		return Response(serializer.data)

	def post(self,request,vodname):
		existing_review =Review.objects.filter(user=request.user, contents__name=vodname).first()
		if existing_review:
			return Response({'error': 'You have already reviewed this Vod.'}, status=status.HTTP_400_BAD_REQUEST)

		review_data = {
			'user': request.user.pk,
			'contents': self.get_object(vodname).pk,
			**request.data  # Include other data from the request
		}
		
		review = ReviewSerializer(data=review_data)
		# Save the review instance
		if review.is_valid():
			review_instance = review.save()
			return Response(ReviewSerializer(review_instance).data,status=201)
		else:
			return Response(review.errors,status=status.HTTP_400_BAD_REQUEST)
	
	def put(self, request, vodname):
		vod = self.get_object(vodname)
		try:
			review = vod.reviews.get(user=request.user)
		except Review.DoesNotExist:
			return Response({'error':'Review not found.'}, 404)

		serializer = ReviewSerializer(review, data=request.data, partial=True)
		if not serializer.is_valid():
			return Response(serializer.errors, status=400)

		serializer.save()

		return Response(serializer.data)

		
	def delete(self, request, vodname):
		# Retrieve the review instance
		try:
			review = self.get_object(vodname).reviews.get(user=request.user)
		except Review.DoesNotExist:
			return Response({'error': 'You do not have a review for this Vod.'}, status=status.HTTP_404_NOT_FOUND)

		# Delete the review
		review.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
	

