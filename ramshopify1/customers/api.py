from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from knox.models import AuthToken
from .serializers import LoginSerializer,RegisterSerializer,UserSerializer,VerifyTokenSerializer,ChangeEmailSerializer
from django.core.mail import EmailMessage
from .models import CustomUser
from rest_framework import status
from django.contrib.auth import authenticate
from django.urls import reverse

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
        data=serializer.validated_data
        status = data[1]
        user= data[0]
        if status == 'active':
            return Response({
                "user":UserSerializer(user,context=self.get_serializer_context()).data,
                "token":AuthToken.objects.create(user)[1]
                })
        elif status == 'inactive':
                return Response({
                "user":UserSerializer(user,context=self.get_serializer_context()).data,
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
        user = RegisterSerializer(data=request.data)
        user.is_valid(raise_exception=True)
        instance=user.save()
        instance.set_token()
        message = EmailMessage(
                    "Hello", f'Your Token is {instance.token}', 'efrank938@gmail.com', [instance.email])
        try: 
            message.send()
        except: 
            return Response({
                'token_sent':'failed'
            })
        return Response({
                "user":UserSerializer(instance,context=self.get_serializer_context()).data,
                'token_sent':'success'
            })

class VerifyToken(APIView):
    def post(self,request,*args,**kwargs):
        serializer = VerifyTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['token']
        email = serializer.validated_data['email']
        user = CustomUser.objects.filter(email=email).first()
        if user:
            if token == user.token:
                user.is_active = True
                user.save()
                return Response({'token_verify':'success'})
            else:
                return Response({'token_verify':'failed'},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'token_verify':'No User'},status=status.HTTP_404_NOT_FOUND)

class ChangeEmailRequest(APIView):
    def post(self,request,*args,**kwargs):
            serializer = ChangeEmailSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            old_email = serializer.validated_data['old_email']
            new_email = serializer.validated_data['new_email']
            password = serializer.validated_data['password']
            user = authenticate(old_email=old_email,password=password)
            if user:
                any_prev = CustomUser.objects.filter(email=new_email).first()
                if any_prev:
                    return Response({'email_change':'email has already been taken'},status= status.HTTP_400_BAD_REQUEST)
                user.temp_email = new_email
                user.save()
                url = reverse('email-change',kwargs ={'token':AuthToken.objects.create(user)[0]})
                message = EmailMessage(
                    "Hello", f'Click on this {user.token} to activate your new email', 'efrank938@gmail.com', [user.temp_email])
                try: 
                    message.send()
                except: 
                    return Response({'token_sent':'failed' })

                return Response({'email_set':'success'})
            else:
                return Response({'email_set':'user not found'},status=status.HTTP_404_NOT_FOUND)

class ActuallyChangeEmail(APIView):
    permission_classes = [
          permissions.IsAuthenticated, ]
    def post(self,request,*args,**kwargs):
        if request.user.temp_email:
            request.user.email = request.user.temp_email
            request.user.temp_email = None
            request.user.save()
            return Response({"new_email_confirmed":{'status':'changed','new_email':request.user.email}})
        else:
            return Response({"new_email_confirmed":{'status':'not_changed','new_email':False}})

   