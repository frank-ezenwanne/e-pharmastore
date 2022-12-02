from django.shortcuts import render

def index(request):
    return render (request,'frontend/index.html')

def token_email(request,token):
    return render (request,'frontend/index.html')