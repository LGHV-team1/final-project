from django.urls import path
from .views import SearchVods,SearchVodsDetail,VodReviews,VodTop5,CategorySearch


urlpatterns = [
    path("<str:vodname>", SearchVods.as_view()),
    path("<int:vodid>/detail/",SearchVodsDetail.as_view()),
    path("<str:vodid>/review/",VodReviews.as_view()),
    path("category/<str:Bigcategory>/",VodTop5.as_view()),
    path("category/<str:Bigcategory>/<str:Smallcategory>",CategorySearch.as_view()),
    
]