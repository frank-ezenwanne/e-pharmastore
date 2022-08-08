from django.urls import path
from .api import product_forbrand,product_forgeneric


urlpatterns = [
    path('api/get_brand_options',product_forbrand),
    path('api/get_generics',product_forgeneric),

]