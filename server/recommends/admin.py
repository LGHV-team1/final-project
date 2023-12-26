from django.contrib import admin
from .models import MainRecommend,TimeRecommend,genrebasedRecommend

@admin.register(MainRecommend)
class MainRecommendAdmin(admin.ModelAdmin):
    list_display=("stbnum","rec1","rec2","rec3","rec4","rec5","rec6","rec7","rec8","rec9","rec10","method")
    list_filter=("stbnum",)
    search_fields=("stbnum",)

@admin.register(TimeRecommend)
class TimeRecommendAdmin(admin.ModelAdmin):
    list_display=("yesterday","today","tomorrow","time","rec1","rec2","rec3","rec4","rec5","rec6","rec7","rec8","rec9","rec10","method")


@admin.register(genrebasedRecommend)
class genreRecommendAdmin(admin.ModelAdmin):
    list_display=("stbnum","watched","rec1","rec2","rec3","rec4","rec5","rec6","rec7","rec8","rec9","rec10","method")
    list_filter=("stbnum",)
    search_fields=("stbnum",)
