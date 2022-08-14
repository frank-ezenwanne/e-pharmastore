from numpy import require
from rest_framework import serializers
from .models import Order, OrderProduct, Product

class OrderProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderProduct
        fields = ("generic_name","brand_name","presentation","quantity_ordered","total_cost")



class GetIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("id")


class GetOrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ("order_product_id","order_id")


class BrandDescSerializer(serializers.Serializer):
    brand_description = serializers.CharField()
    

class ProductDetailSerializer(serializers.Serializer):
    # serial = serializers.IntegerField()
    brand_description = serializers.CharField()
    generic_name = serializers.CharField()
    presentation = serializers.CharField()
    price = serializers.IntegerField()
    full_pack_quantity = serializers.IntegerField()
    unit_quantity = serializers.CharField()

class GenericSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("generic_name",)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("brand_description","generic_name","unit",)