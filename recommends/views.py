from rest_framework.views import APIView,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import MainRecommendSerializer
from .models import MainRecommend
from contents.models import Vod
from contents.serializers import VodListSerializer
from random import choice


class MainRecommend1(APIView):
	permission_classes=[IsAuthenticated]
    
	def get(self,request):
		user=request.user.stbnumber
		try:
			recommend=MainRecommend.objects.get(stbnum=user,method=1)
			serializer=MainRecommendSerializer(recommend)
			# MainRecommend 객체에서 각 VOD ID 가져오기
			vod_ids = [serializer.data[f'rec{i}'] for i in range(1, 11)]

			# 각 ID에 해당하는 VOD 객체 조회 및 직렬화
			vod_objects = Vod.objects.filter(id__in=vod_ids)
			vod_serializer = VodListSerializer(vod_objects, many=True)

			# 직렬화된 VOD 데이터를 응답으로 반환
			return Response(vod_serializer.data,status=status.HTTP_200_OK)
		except MainRecommend.DoesNotExist:
			return Response(status=status.HTTP_400_BAD_REQUEST)
			
	
		


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
		return Response(vod_serializer.data,status=status.HTTP_200_OK)
	
class RandomRecommend(APIView):
	def get(self, request):
		# 현재 요청한 사용자 제외한 모든 사용자 ID 목록 가져오기
		all_user_ids = MainRecommend.objects.exclude(stbnum=request.user.stbnumber).values_list('stbnum', flat=True)

		# 무작위 사용자 ID 선택
		if all_user_ids:
			random_user_id = choice(all_user_ids)
		else:
			# 무작위 선택할 사용자가 없는 경우, 에러 처리
			return Response({"error": "No other users found"}, status=status.HTTP_404_NOT_FOUND)

		# 선택된 사용자의 추천 데이터 조회
		recommend = MainRecommend.objects.get(stbnum=random_user_id, method=1)
		serializer = MainRecommendSerializer(recommend)

		# MainRecommend 객체에서 각 VOD ID 가져오기
		vod_ids = [serializer.data[f'rec{i}'] for i in range(1, 11)]

		# 각 ID에 해당하는 VOD 객체 조회 및 직렬화
		vod_objects = Vod.objects.filter(id__in=vod_ids)
		vod_serializer = VodListSerializer(vod_objects, many=True)

		# 직렬화된 VOD 데이터를 응답으로 반환
		return Response(vod_serializer.data, status=status.HTTP_200_OK)

			