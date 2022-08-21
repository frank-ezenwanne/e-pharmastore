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
        fields = ('password','email',"company_name")
        extra_kwargs = {'password':{'write_only':True}}

    def create(self,validated_data):
        user = CustomUser.objects.create_user(password=validated_data["password"],company_name=validated_data["company_name"],email=validated_data["email"])
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials")
