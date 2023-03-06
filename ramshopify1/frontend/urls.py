from django.urls import path
from .views import index,token_email

urlpatterns = [
    path("",index),
    path("login",index),
    path("register",index),
    path("aboutus",index),
    path("order",index),
    path("profile",index),
    path("customerpage",index),
    path("verifytoken",index),
    path("emailchange",index),
    path("emailchange_sent",index),
    path("emailchange/<str:token>/",token_email,name='emailchange'),
]