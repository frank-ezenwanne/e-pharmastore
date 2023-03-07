from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.conf import settings
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email','company_name')




class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('password','email','company_name','address', 'phone_no', 'establishment')
        extra_kwargs = {'password':{'write_only':True}}

    def create(self,validated_data):
        user = CustomUser.objects.create_user(password=validated_data["password"],
        company_name=validated_data["company_name"],
        email=validated_data["email"],
        address = validated_data['address'],
        phone_no = validated_data['phone_no'],
        establishment = validated_data['establishment']
        )
        return user

# class UpdateProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ('address', 'phone_no', 'establishment')

class UpdateProfileSerializer(serializers.Serializer):
    company_name = serializers.CharField()
    address = serializers.CharField()
    phone_no = serializers.CharField()
    establishment = serializers.CharField()





class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self,data):
        print(data)
        user = authenticate(**data)
        print(user)
        if user and user.user_active:
            return user,'active'
        elif user and user.user_active == False:
            return user,'inactive'
        raise serializers.ValidationError("Incorrect credentials")


class VerifyTokenSerializer(serializers.Serializer):
    token = serializers.CharField()
    email = serializers.EmailField()

class ChangeEmailSerializer(serializers.Serializer):
    old_email = serializers.EmailField()
    new_email = serializers.EmailField()
    password = serializers.CharField()

class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField()

class ErrorSerializer(serializers.Serializer):
    error = serializers.CharField()
    errorInfo = serializers.CharField()