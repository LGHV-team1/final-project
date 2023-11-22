import json
from reviews.models import Review
from reviews.serializers import ReviewSerializer
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
def myReview(request):
    current_user = request.user
    reviewlist = Review.objects.filter(user=current_user)

    serializer = ReviewSerializer(reviewlist,many=True)
    data = serializer.data
    return JsonResponse(data, json_dumps_params={'ensure_ascii': False}, safe=False)
