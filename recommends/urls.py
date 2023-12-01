from django.urls import path
from .views import MainRecommend1,MainRecommend2,RandomRecommend

urlpatterns = [
    path("1/",MainRecommend1.as_view()),
    path("2/", MainRecommend2.as_view()),
    path("otheruser/",RandomRecommend.as_view()),
]