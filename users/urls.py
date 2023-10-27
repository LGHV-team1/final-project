from django.urls import path
from . import views 

urlpatterns = [
    path("", views.UserRegistrationView.as_view()),
    # 다른 URL 패턴 및 뷰를 추가할 수 있습니다.
]
