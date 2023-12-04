from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.middleware.csrf import get_token
@api_view(['GET'])
def index(request):
    return JsonResponse({'csrftoken': get_token(request)})