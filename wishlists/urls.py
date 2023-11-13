# wishlist/urls.py

from django.urls import path
from .views import WishlistView, WishlistDetailView

urlpatterns = [
    path('', WishlistView.as_view()),
    path('<int:pk>/', WishlistDetailView.as_view())
]