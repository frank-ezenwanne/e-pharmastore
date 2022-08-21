from django.urls import path,include
from .api import product_forbrand,product_forgeneric,CreateOrder,GetLastOrder,OrderView

urlpatterns = [

    path('api/get_brand_options',product_forbrand),
    path('api/get_generics',product_forgeneric),
    path('api/create_order',CreateOrder.as_view()),
    path('api/get_last_order',GetLastOrder.as_view()),
    path('api/post_orderproduct',OrderView.as_view()),


]