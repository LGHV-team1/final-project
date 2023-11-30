from rest_framework.views import APIView,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import MainRecommendSerializer
from .models import MainRecommend
from contents.models import Vod
from contents.serializers import VodListSerializer

class MainRecommend1(APIView):
	permission_classes=[IsAuthenticated]
    
	def get(self,request):
		user=request.user.stbnumber
		recommend=MainRecommend.objects.get(stbnum=user,method=1)
		serializer=MainRecommendSerializer(recommend)
		# MainRecommend 객체에서 각 VOD ID 가져오기
		vod_ids = [serializer.data[f'rec{i}'] for i in range(1, 11)]

		# 각 ID에 해당하는 VOD 객체 조회 및 직렬화
		vod_objects = Vod.objects.filter(id__in=vod_ids)
		vod_serializer = VodListSerializer(vod_objects, many=True)

		# 직렬화된 VOD 데이터를 응답으로 반환
		return Response(vod_serializer.data)


class MainRecommend2(APIView):
	permission_classes=[IsAuthenticated]
    
	def get(self,request):
		user=request.user.stbnumber
		recommend=MainRecommend.objects.get(stbnum=user,method=2)
		serializer=MainRecommendSerializer(recommend)
		# MainRecommend 객체에서 각 VOD ID 가져오기
		vod_ids = [serializer.data[f'rec{i}'] for i in range(1, 11)]

		# 각 ID에 해당하는 VOD 객체 조회 및 직렬화
		vod_objects = Vod.objects.filter(id__in=vod_ids)
		vod_serializer = VodListSerializer(vod_objects, many=True)

		# 직렬화된 VOD 데이터를 응답으로 반환
		return Response(vod_serializer.data)