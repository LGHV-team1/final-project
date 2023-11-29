from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

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
        fields = ('username', 'email', 'user_profile')  # 필요한 필드를 여기에 포함시킵니다.
        read_only_fields = ('email',)  # 이메일은 읽기 전용으로 설정할 수 있습니다.
