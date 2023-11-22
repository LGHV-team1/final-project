from django.conf import settings
from rest_framework.views import APIView,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
 






# class SearchVods(APIView):
# 	permission_classes = [IsAuthenticatedOrReadOnly]
    
	# def get(self,request,vodname):
	# 	if vodname:
	# 		vodname_no_space = vodname.replace(' ', '')
	# 		vods = Vod.objects.filter(name_no_space__icontains=vodname_no_space)
	# 		serializer = VodListSerializer(vods, many=True)
	# 		return Response(serializer.data)
	# 	else:
	# 		return Response({'error': '검색어를 제공해야 합니다.'}, status=400)
		

# class SearchVodsDetail(APIView):
# 	permission_classes=[IsAuthenticatedOrReadOnly]
# 	def get_object(self,vodname):
# 		return Vod.objects.get(name=vodname)
		 
		
# 	def get(self,request,vodname):
# 		vod=self.get_object(vodname)
# 		serializer = VodDetailSerializer(vod, context={'request': request})
# 		return Response(serializer.data)
	
	

# class VodReviews(APIView):
# 	permission_classes=[IsAuthenticatedOrReadOnly]
# 	def get_object(self,vodname):
# 		return Vod.objects.get(name=vodname)

# 	def get(self, request, vodname):
# 		vod = self.get_object(vodname)
# 		serializer = ReviewshowSerializer(
# 			vod.reviews.all(),
# 			many=True,
# 		)
# 		return Response(serializer.data)

	