from django.urls import path
from .views import MainRecommend1,MainRecommend2,MainRecommend3,TOP10Recommend,timerecommend,FirstUser_Preference_2,SeasonRecommend,wishlist_recommend,FirstUser_Preference_1

urlpatterns = [
    path("1/",MainRecommend1.as_view()),
    path("2/", MainRecommend2.as_view()),
    path("3/", MainRecommend3.as_view()),
    path("4/",FirstUser_Preference_1.as_view()),
    path("5/",FirstUser_Preference_2.as_view()),
    path("6/",TOP10Recommend.as_view()),
    path("7/",timerecommend.as_view()),
    path("8/",SeasonRecommend.as_view()),
    path("9/",wishlist_recommend.as_view()),
]