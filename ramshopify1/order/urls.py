from django.urls import path,include
from .api import (product_forbrand,product_forgeneric,CreateOrder,GetLastOrder,OrderView,SendCSVEmail,
GetCustomerOrders,MakeLastOrder,OrderProductView,CreateOrderWithTemplate,
GetGenericNames,UpdateProductStock,UpdateProductPrice,CreateUpdateDefProduct)

urlpatterns = [

    path('api/get_brand_options',product_forbrand),
    path('api/get_generic_products',product_forgeneric),
    path('api/create_order',CreateOrder.as_view()),
    path('api/get_last_order',GetLastOrder.as_view()),
    path('api/post_orderproduct',OrderView.as_view()),
    path('api/delete_order',OrderView.as_view()),
    path('api/get_customer_orders',GetCustomerOrders.as_view()),
    path('api/get_selected_order',MakeLastOrder.as_view()),
    path('api/delete_orderproduct',OrderProductView.as_view()),
    path('api/SendCSVEmail',SendCSVEmail.as_view()),
    path('api/CreateOrderWithTemplate',CreateOrderWithTemplate.as_view()),
    path('api/get_generic_options',GetGenericNames.as_view()),
    path('api/update_product_stock',UpdateProductStock.as_view()),
    path('api/update_product_price',UpdateProductPrice.as_view()),
    path('api/create_update_product',CreateUpdateDefProduct.as_view()),


]