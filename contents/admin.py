from django.contrib import admin
from .models import Vod

@admin.register(Vod)
class VodAdmin(admin.ModelAdmin):
    list_display=("name","bigcategory","smallcategory")

