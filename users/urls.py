# user/urls.py
from django.urls import path
from .views import user_registration, user_login,activate

urlpatterns = [
    path('register/', user_registration, name='user-registration'),
    path('login/', user_login, name='user-login'),
    path('activate/<slug:uid64>/<slug:token>/', activate.as_view(), name='activate'),
]
