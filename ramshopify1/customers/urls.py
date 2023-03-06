from django.urls import path,include
from knox import views as knox_views
from .api import LoginAPI, RegisterAPI, UpdateProfile, UserAPI,VerifyToken,SendPasswordResetLink,ChangePasswordView, ChangeEmailRequest,TokenChangeEmail,ResendToken

urlpatterns =[
    path("api/auth",include("knox.urls")),
    path("api/auth/login",LoginAPI.as_view()),
    path("api/auth/register", RegisterAPI.as_view()),
    path("api/auth/getProfile", UpdateProfile.as_view()),
    path('api/auth/updateProfile',UpdateProfile.as_view()),
    path("api/auth/user",UserAPI.as_view()),
    path("api/verifytoken",VerifyToken.as_view()),
    path("api/resendtoken",ResendToken.as_view()),
    path("api/change_email",ChangeEmailRequest.as_view()),
    path("api/token_change_email",TokenChangeEmail.as_view()),
    path("api/passwordResetLink",SendPasswordResetLink.as_view()),
    path("api/auth/changePassword",ChangePasswordView.as_view()),
    path("api/auth/logout",knox_views.LogoutView.as_view()),
    path("api/auth/logoutall",knox_views.LogoutAllView.as_view()),
   
]