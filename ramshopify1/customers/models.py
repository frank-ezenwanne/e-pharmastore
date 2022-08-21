from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser,PermissionsMixin
)

 
from django.utils import timezone
from django.core.mail import send_mail
import uuid


class CustomUserManager(BaseUserManager):

    use_in_migrations = True
    def create_user(self, email, company_name, password=None,**extra_fields):
        extra_fields.setdefault('is_superuser', False)
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            company_name=company_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, email, company_name, password=None,**extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_admin', True)
 

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        if extra_fields.get('is_admin') is not True:
            raise ValueError('Superuser must have is_admin=True.')

        user = self.create_user(
            email,
            password=password,
            company_name=company_name,
        )
     
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    token = models.UUIDField(null=True, blank=True)
    company_name = models.CharField(max_length=100,unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    address = models.CharField(max_length=255)
    country = models.CharField(max_length=150)
    phone_no = models.CharField(null=True, blank=True, max_length=20)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['company_name']


    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def set_token(self):
        token = uuid.uuid64()
        self.token = token
        self.save()


    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin