from django.template.loader import render_to_string
# user/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .tokens import account_activation_token
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth import login, authenticate
from django.utils.translation import gettext as _
from rest_framework.views import APIView
from django.utils.encoding import force_bytes, force_str
from django.http import HttpResponse
from django.utils.http import urlsafe_base64_decode

from .serializers import UserSerializer

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def user_registration(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False  # Deactivate the user until email confirmation
            user.save()

            # Send email confirmation
            
            mail_subject = _('Activate your account')
            current_site = get_current_site(request) 
            # localhost:8000
            message = render_to_string('users/authentication_email.dtl',{
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)).encode().decode(),
                'token': account_activation_token.make_token(user),
            })
            to_email = serializer.validated_data['email']
            send_mail(mail_subject, message, 'lghellovisiondxdataschool@gmail.com', [to_email])

            return Response(_('Please confirm your email address to complete the registration.'), status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class activate(APIView):
    

    def get(self, request, uid64, token):
        try:
            User = get_user_model()
            uid = force_str(urlsafe_base64_decode(uid64))
            user = User.objects.get(pk=uid)

            if user is not None and account_activation_token.check_token(user, token):
                user.is_active = True
                user.save()
                return HttpResponse('이메일 인증이 완료되었습니다. 로그인하세요.')
            else:
                return HttpResponse('인증 링크가 만료되었거나 올바르지 않습니다.')
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        return HttpResponse('인증 링크가 만료되었거나 올바르지 않습니다.')


@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return Response({'detail': 'Login successful!'})
        return Response({'detail': 'Login failed. Please check your email and password.'}, status=status.HTTP_401_UNAUTHORIZED)
