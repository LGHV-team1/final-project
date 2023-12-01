import json
from rest_framework import status
from reviews.models import Review
from reviews.serializers import MypageReviewSerializer
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView

class MyReviews(APIView):
    def get(self, request):
        current_user = request.user
        reviewlist = Review.objects.filter(user=current_user)
        serializer = MypageReviewSerializer(reviewlist,many=True)
        data = serializer.data
        return Response(serializer.data)


class MyReviewDetail(APIView):
    def get_object(self, id):
        return Review.objects.get(id=id)

    def get(self, request, id):
        review = self.get_object(id)
        serializer = MypageReviewSerializer(review)
        return Response(serializer.data)
    def put(self, request, id):
        review = self.get_object(id)

        serializer = MypageReviewSerializer(review, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        serializer.save()
        return Response(serializer.data)

    def delete(self, request, id):
        # Retrieve the review instance
        try:
            review = self.get_object(id)
        except Review.DoesNotExist:
            return Response({'error': 'You do not have a review for this Vod.'}, status=status.HTTP_404_NOT_FOUND)

        # Delete the review
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)