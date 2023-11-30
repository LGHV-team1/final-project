from django.urls import path
from .views import SearchVods,SearchVodsDetail,VodReviews,VodTop5


urlpatterns = [
    path("<str:vodname>", SearchVods.as_view()),
    path("<int:vodid>/detail/",SearchVodsDetail.as_view()),
    path("<str:vodname>/review/",VodReviews.as_view()),
    path("<str:category>/popular/",VodTop5.as_view()),
    # path("posttest", vodTestPOST
]