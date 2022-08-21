from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from knox.models import AuthToken
from .serializers import LoginSerializer,RegisterSerializer,UserSerializer
from django.core.mail import send_mail

class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user



class LoginAPI(APIView):
    #permission_classes=[permissions.AllowAny]
    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    def post(self,request,*args,**kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        user=serializer.validated_data
        return Response({
            "user":UserSerializer(user,context=self.get_serializer_context()).data,
            "token":AuthToken.objects.create(user)[1]
            })
     


class RegisterAPI(APIView):
    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    serializer_class = RegisterSerializer

    def post(self,request,*args,**kwargs):
        # send_mail("subject","change",'messenger@localhost.com',["efrank272@gmail.com"])
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # user.set_token()
        
        return Response({
                "user":UserSerializer(user,context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
            })
