from django.urls import path
from .views import (
    SearchVods,
    SearchVodsDetail,
    VodReviews,
    VodTop10,
    CategorySearch,
    SearchVodsByChoseong,
    Searchactors,
    CategorySearchTOP5,
    CategoryPick,
)

urlpatterns = [
    path("<str:vodname>", SearchVods.as_view()),
    path("search/<str:vodname>", SearchVodsByChoseong.as_view()),
    path("search/actor/<str:actor>", Searchactors.as_view()),
    path("<int:vodid>/detail/", SearchVodsDetail.as_view()),
    path("<int:vodid>/review/", VodReviews.as_view()),
    path("category/<str:Bigcategory>/", VodTop10.as_view()),
    path("category/<str:Bigcategory>/<str:Smallcategory>", CategorySearch.as_view()),
    path("Firstuser/<str:searchcategory>/", CategorySearchTOP5.as_view()),
    path("pick/<str:Bigcategory>/", CategoryPick.as_view()),
]
