from numpy import require
from rest_framework import serializers
from .models import Order, OrderProduct, Product

class OrderProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderProduct
        # fields = ("generic_name","brand_name","presentation","quantity_ordered","total_cost")
        exclude = ("buyer","ordered")



class GetIdSerializer(serializers.Serializer):
    id=serializers.IntegerField()


class GetOrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ("order_product_id","order_id")


class BrandDescSerializer(serializers.Serializer):
    brand_description = serializers.CharField()
    

class ProductDetailSerializer(serializers.Serializer):
    # serial = serializers.IntegerField()
    id = serializers.IntegerField()
    brand_description = serializers.CharField()
    generic_name = serializers.CharField()
    unit = serializers.CharField()
    raw_cost = serializers.IntegerField()
    full_pack_quantity = serializers.IntegerField()
    unit_quantity = serializers.CharField()

class GenericSerializer(serializers.Serializer):
    generic_name = serializers.CharField()

class ProductDetailSerializerGen(serializers.Serializer):
    id = serializers.IntegerField()
    brand_description = serializers.CharField()
    unit = serializers.CharField()
    raw_cost = serializers.IntegerField()
    full_pack_quantity = serializers.IntegerField()
    unit_quantity = serializers.CharField()

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("brand_description","generic_name","unit",)


class OrderSerializer(serializers.ModelSerializer):
    num_items = serializers.SerializerMethodField()
    open_date = serializers.SerializerMethodField()
    ordered_date = serializers.SerializerMethodField()

    def get_num_items(self,obj):
        return obj.order_products.count()

    def get_open_date(self,obj):
        return obj.open_date.isoformat()

    def get_ordered_date(self,obj):
        if obj.ordered_date:
            return obj.ordered_date.isoformat()
        return obj.ordered_date

    class Meta:
        model = Order
        exclude = ('buyer','order_products')

        