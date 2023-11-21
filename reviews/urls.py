from django.urls import path
from .views import myReview


urlpatterns = [
    path("myreview", myReview),
]