from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.middleware.csrf import get_token
@api_view(['GET'])
def index(request):
    return Response({'csrfToken': get_token(request)})