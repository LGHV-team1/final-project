from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import User
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework.exceptions import AuthenticationFailed
from allauth.account.models import EmailAddress
from django.core.exceptions import ObjectDoesNotExist


class CustomTokenRefreshSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate(self, attrs):
        refresh = RefreshToken(attrs['refresh_token'])
        data = {'access_token': str(refresh.access_token)}

        return data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CustomUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'user_profile', 'stbnumber')  # 필요한 필드를 여기에 포함시킵니다.
        read_only_fields = ('email',)  # 이메일은 읽기 전용으로 설정할 수 있습니다.

class CustomRegisterSerializer(RegisterSerializer):
    # 기본 설정 필드: username, password, email
    # 추가 설정 필드: stbnum
    stbnumber = serializers.IntegerField(default=0)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['stbnumber'] = self.validated_data.get('stbnumber')

        return data


class CustomLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        try: 
            User.objects.get(email=email)
        except ObjectDoesNotExist:
            raise AuthenticationFailed("이메일이 없습니다.")
        
        # 이메일과 비밀번호로 사용자 인증
        user = authenticate(email=email, password=password)
        if not user:
            raise AuthenticationFailed('비밀번호를 확인하세요.')

        # 이메일 인증 여부 확인
        
        email_address = EmailAddress.objects.get(email=email, user=user)
        if not email_address.verified:
            raise AuthenticationFailed('이메일 인증이 완료되지 않았습니다.')



        # 성공적으로 인증된 경우, 마지막 로그인 시간 업데이트
        update_last_login(None, user)
        
        attrs['user'] = user
        return attrs
