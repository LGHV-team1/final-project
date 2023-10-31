from django.http import HttpResponseRedirect # 리다이렉트 
from rest_framework.views import APIView # apiview
from rest_framework.permissions import AllowAny # 허용 범위.
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC # allauth 에서 제공해주는 모델. 

class ConfirmEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        self.object = confirmation = self.get_object() # getobject 로 가져온거. 
        confirmation.confirm(self.request)
        # A React Router Route will handle the failure scenario 리액트 라우터가 실패할 경우. 
        return HttpResponseRedirect('/') # 인증성공

    def get_object(self, queryset=None):
        key = self.kwargs['key']
        email_confirmation = EmailConfirmationHMAC.from_key(key)
        if not email_confirmation:
            if queryset is None:
                queryset = self.get_queryset()
            try:
                email_confirmation = queryset.get(key=key.lower())
            except EmailConfirmation.DoesNotExist:
                # A React Router Route will handle the failure scenario
                return HttpResponseRedirect('/') # 인증실패
        return email_confirmation

    def get_queryset(self):
        qs = EmailConfirmation.objects.all_valid()
        qs = qs.select_related("email_address__user")
        return qs