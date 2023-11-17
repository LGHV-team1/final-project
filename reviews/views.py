from reviews.models import Review
from reviews.serializers import ReviewSerializer
from rest_framework.response import Response

def myReview(request):
    current_user = request.user.id
    reviewlist = Review.objects.filter(user_id=current_user)
    serializer = ReviewSerializer(
        reviewlist.all(),
        many=True,
    )
    return Response(serializer.data)
