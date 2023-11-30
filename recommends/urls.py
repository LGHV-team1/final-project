from django.urls import path
from .views import MainRecommend1,MainRecommend2

urlpatterns = [
    path("1",MainRecommend1.as_view()),
    path("2", MainRecommend2.as_view()),
]