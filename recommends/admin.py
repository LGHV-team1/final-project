from django.contrib import admin
from .models import MainRecommend

@admin.register(MainRecommend)
class MainRecommendAdmin(admin.ModelAdmin):
    list_display=("stbnum","rec1","rec2","rec3","rec4","rec5","rec6","rec7","rec8","rec9","rec10","method")
    list_filter=("stbnum",)
    search_fields=("stbnum",)

