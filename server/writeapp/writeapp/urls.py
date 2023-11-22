from django.contrib import admin
from django.urls import path,include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/',include('accounts.urls')),
    path('contents/',include('contents.urls')),
    path('wishlists/',include('wishlists.urls')),
    path('review/', include('reviews.urls'))
    
]