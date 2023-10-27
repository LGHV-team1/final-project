from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework.exceptions import ParseError

class UserRegistrationView(APIView):
	def post(self,request):
		password=request.data.get('password')
		if not password:
			raise ParseError 
		
		serializer=CustomUserSerializer(data=request.data)
		if serializer.is_valid():
			user=serializer.save()
			user.set_password(password)
			user.save()
			serializer=CustomUserSerializer(user)
			return Response(serializer.data)
		else:
			return Response(serializer.errors)

