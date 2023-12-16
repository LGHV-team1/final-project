from django.urls import path
from .views import MainRecommend1,MainRecommend2,RandomRecommend,timerecommend,FirstUser_Preference_2

urlpatterns = [
    path("1/",MainRecommend1.as_view()),
    path("2/", MainRecommend2.as_view()),
    path("otheruser/",RandomRecommend.as_view()),
    path("3/",timerecommend.as_view()),
    path("4/",FirstUser_Preference_2.as_view()),
]