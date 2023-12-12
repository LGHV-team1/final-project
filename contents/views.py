from django.conf import settings
from rest_framework.views import APIView, status
from rest_framework.response import Response
from .models import Vod
from reviews.models import Review
from .serializers import VodListSerializer, VodDetailSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from reviews.serializers import ReviewSerializer, ReviewshowSerializer
from wishlists.models import Wishlist
from wishlists.serializers import WishlistSerializer
from wishlists.utils import delete_wishlist
from pymongo import MongoClient
from config import settings




class SearchVods(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request, vodname):
        if vodname:
            vodname_no_space = vodname.replace(" ", "")
            ip=settings.EC2_IP
            pw=settings.MONGO_PW
            client = MongoClient(f'mongodb://hellovision:{pw}@{ip}', 27017)
            db = client.LGHV
            collection = db.contents

            # 대소문자 구분 없는 검색을 위한 regex 쿼리
            regex_query = {'$regex': vodname_no_space, '$options': 'i'}
            query = {'name_no_space': regex_query}

            # 쿼리 실행
            vods = collection.find(query)

            # 결과를 Python 리스트로 변환
            vod_list = list(vods)

            # 결과를 JSON 형태로 변환하여 응답
            # 여기서는 직렬화 방법을 직접 구현해야 합니다.
            # 예시를 위해 간단히 dictionary로 변환하는 코드를 작성합니다.
            vod_data = [self.serialize_vod(vod) for vod in vod_list]
            return Response(vod_data)
        else:
            return Response({"error": "검색어를 제공해야 합니다."}, status=400)

    def serialize_vod(self, vod):
        # VOD 객체를 직렬화하는 메서드
        # 여기서 필요한 필드를 선택하여 dictionary 형태로 반환
        return {
            'id':vod['id'],
            'name': vod['name'],
            'smallcategory':vod['smallcategory'],
            'imgpath':vod['imgpath'],
            'count':vod['count']
        }
    
class Searchactors(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request, actor):
        if actor:
            actor_no_space = actor.replace(" ", "")
            ip=settings.EC2_IP
            pw=settings.MONGO_PW
            client = MongoClient(f'mongodb://hellovision:{pw}@{ip}', 27017)
            db = client.LGHV
            collection = db.contents

            # 대소문자 구분 없는 검색을 위한 regex 쿼리
            regex_query = {'$regex': actor_no_space, '$options': 'i'}
            query =  {'searchactors': regex_query}   

            # 쿼리 실행
            vods = collection.find(query)

            # 결과를 Python 리스트로 변환
            vod_list = list(vods)

            # 결과를 JSON 형태로 변환하여 응답
            # 여기서는 직렬화 방법을 직접 구현해야 합니다.
            # 예시를 위해 간단히 dictionary로 변환하는 코드를 작성합니다.
            vod_data = [self.serialize_vod(vod) for vod in vod_list]
            return Response(vod_data)
        else:
            return Response({"error": "검색어를 제공해야 합니다."}, status=400)

    def serialize_vod(self, vod):
        # VOD 객체를 직렬화하는 메서드
        # 여기서 필요한 필드를 선택하여 dictionary 형태로 반환
        return {
            'id':vod['id'],
            'name': vod['name'],
            'smallcategory':vod['smallcategory'],
            'imgpath':vod['imgpath'],
            'count':vod['count']
        }



class SearchVodsByChoseong(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request, vodname):
        if vodname:
            vodname_no_space = vodname.replace(' ', '')
            vods = Vod.objects.filter(choseong__icontains=vodname_no_space)
            serializer = VodListSerializer(vods, many=True)
            return Response(serializer.data)
        else:
            return Response({'error': '검색어를 제공해야 합니다.'}, status=400)

class SearchVodsDetail(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, vodid):
        return Vod.objects.get(id=vodid)

    def get(self, request, vodid):
        vod = self.get_object(vodid)
        serializer = VodDetailSerializer(vod, context={"request": request})
        return Response(serializer.data)

    def post(self, request, vodid):
        vod = self.get_object(vodid)

        wishlist = Wishlist.objects.filter(user=request.user, vod_id=vod.id).first()
        # 찜 추가 or 삭제 확인

        if wishlist:
            wishlist_id = wishlist.id
            # 찜 삭제
            delete_wishlist(wishlist_id, request.user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            wishlist_data = {
                "user": request.user.id,
                "vod": vod.id,
            }

            serializer = WishlistSerializer(data=wishlist_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VodTop10(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, Bigcategory):
        category={"tv":"TV프로그램","movie":"영화","kids":"키즈"}
        category=category[Bigcategory]
        top_vods = Vod.objects.filter(category=category).order_by("-count")[:10]
        serializer = VodListSerializer(top_vods, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class VodReviews(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, vodid):
        return Vod.objects.get(id=vodid)

    def get(self, request, vodid):
        vod = self.get_object(vodid)
        serializer = ReviewshowSerializer(
            vod.reviews.all(),
            many=True,
        )
        return Response(serializer.data)

    def post(self, request, vodid):
        existing_review = Review.objects.filter(
            user=request.user, contents__id=vodid
        ).first()
        if existing_review:
            return Response(
                {"error": "You have already reviewed this Vod."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        review_data = {
            "user": request.user.pk,
            "contents": int(vodid),
            **request.data,  # Include other data from the request
        }
        print(review_data)

        review = ReviewSerializer(data=review_data)
        # Save the review instance
        if review.is_valid():
            review_instance = review.save()
            return Response(ReviewSerializer(review_instance).data, status=201)
        else:
            return Response(review.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, vodid):
        vod = self.get_object(vodid)
        try:
            review = vod.reviews.get(user=request.user)
        except Review.DoesNotExist:
            return Response({"error": "Review not found."}, 404)

        serializer = ReviewSerializer(review, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        serializer.save()

        return Response(serializer.data)

    def delete(self, request, vodid):
        # Retrieve the review instance
        try:
            review = self.get_object(vodid).reviews.get(user=request.user)
        except Review.DoesNotExist:
            return Response(
                {"error": "You do not have a review for this Vod."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Delete the review
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CategorySearch(APIView):
    def get(self, request, Bigcategory, Smallcategory):
        movie_category = {
            "fantasy": "SF/환타지",
            "thriller": "공포/스릴러",
            "documentary": "다큐멘터리",
            "shortfilm": "단편",
            "drama": "드라마",
            "RoCo": "로맨틱코미디",
            "melo": "멜로",
            "martial": "무협",
            "musical": "뮤지컬",
            "western": "서부",
            "animation": "애니메이션",
            "action": "액션/어드벤쳐",
            "history": "역사",
            "comedy": "코미디",
            "etc": "기타",
        }
        kids_category = {
            "etc": "기타",
            "animation": "애니메이션",
            "entertainment": "오락",
            "study": "학습",
        }
        tv_category = {
            "Neighborhood": "우리동네",
            "Sports": "스포츠",
            "etc": "미분류",
            "Life": "라이프",
            "Documentary": "다큐",
            "Animation": "TV애니메이션",
            "Drama": "TV드라마",
            "Entertainment": "TV 연예/오락",
            "Education": "TV 시사/교양",
            "Music": "공연/음악",
        }

        if Bigcategory == "tv":
            decoded_category=tv_category[Smallcategory]
            vods = Vod.objects.filter(category="TV프로그램", bigcategory=decoded_category)
            serializer = VodListSerializer(vods, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif Bigcategory == "movie":
            decoded_category=movie_category[Smallcategory]
            vods = Vod.objects.filter(category="영화", smallcategory=decoded_category)
            serializer = VodListSerializer(vods, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif Bigcategory == "kids":
            decoded_category=kids_category[Smallcategory]
            vods = Vod.objects.filter(category="키즈", smallcategory=decoded_category)
            serializer = VodListSerializer(vods, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
