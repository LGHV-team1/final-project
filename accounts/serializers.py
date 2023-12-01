from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from dj_rest_auth.registration.serializers import RegisterSerializer
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