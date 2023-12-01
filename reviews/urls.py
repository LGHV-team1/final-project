from django.urls import path
from .views import MyReviews, MyReviewDetail

urlpatterns = [
    path("myreview", MyReviews.as_view(), name='My Reviews'),
    path("myreview/<int:id>", MyReviewDetail.as_view(),name='My Review Detail'),
]