from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import OrderProductSerializer,BrandDescSerializer,ProductDetailSerializer,GetIdSerializer,ProductSerializer,GetOrderProductSerializer,GenericSerializer
from .models import Brand_Alphabetic,Product,Generic_Alphabetic,Order,OrderProduct,Order
from django.conf.global_settings import AUTH_USER_MODEL as CustomUser
from django.utils import timezone

class CreateOrder(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,*args,**kwargs):
        order = Order.objects.create(buyer = request.user)
        print(order.id)
        return Response({"order_id":order.id})


class OrderView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,*args,**kwargs):#post a new order product
        order_product = OrderProductSerializer(data=request.data)
        order_product.is_valid(raise_exception=True)
        order = order_product.validated_data["order_id"]
        order_id = order.id
        user = request.user
          #check cart id gotten from frontend
        order = Order.objects.get(id = int(order_product.validated_data["order_id"].id))
        if order:
            if order.buyer == request.user:
                instance=""
                for stored_op in order.order_products.all():
                    if stored_op.serial == order_product.validated_data["serial"]:
                        instance = stored_op
                        break
                if instance != "":
                    update_list = ( "product_id","generic_name","brand_description","presentation","cost","quantity_ordered",
                    "full_pack_quantity","unit_quantity","serial")
                    for field in update_list:
                        setattr(instance,field,order_product.validated_data[field])
                    instance.created = timezone.now()
                    instance.save()
                

                else:
                    instance=order_product.save(buyer = request.user)
                    order.order_products.add(instance)
                    order.save()
                return Response({"order_productid":instance.id})
            return Response({ "error" : "You don't own this order","saved":0},status = status.HTTP_404_NOT_FOUND)
 
        return Response({ "error" : "Order Cart not found","saved":0},status = status.HTTP_404_NOT_FOUND)
        
            

    def get(self,request,*args,**kwargs): # retrieve cart with orderproducts
        order_id_request = GetIdSerializer(data = request.data)
        order_id_request.is_valid(raise_exception= True)
        order_id = order_id_request.order_id
        if Order.objects.get(id = int(order_id)):
            order = Order.objects.get(id = int(order_id))#get cart with cart id present in frontend
            order_products = OrderProduct.objects.filter(order_id=order_id)
            order_products = OrderProductSerializer(order_products,many=True)
            return Response(order_products.data)
        return Response({"error":"order_id not found"},status = status.HTTP_404_NOT_FOUND)
            

    def delete(self,request,*args,**kwargs): #delete the cart at once with all orderproducts
        order_id_request = GetIdSerializer(data = request.data)
        order_id_request.is_valid(raise_exception= True)
        order_id = order_id_request.order_id
        if Order.objects.get(id = int(order_id)):
            order = Order.objects.get(id = int(order_id))#get cart with cart id present in frontend
            order.delete()
            return Response({"status":"delete_successful"})
 
        return Response({"error":"order_id not found"},status = status.HTTP_404_NOT_FOUND)




class OrderProductView(APIView):#finish up with database gen id
    def delete(self,request,*args,**kwargs):
        delete_request = GetIdSerializer(data=request.data)
        delete_request.is_valid(raise_exception = True)
        order_product_id = delete_request.order_product_id
        if OrderProduct.objects.get(id = int(order_product_id)):
            order_product = OrderProduct.objects.get(id = int(order_product_id))
            order_product.delete()       
            return Response({"status":"deleted successfully"})
        return Response({"error":"OrderProduct not found"},status = status.HTTP_404_NOT_FOUND)

    def put(self,request,*args,**kwargs):
        put_request = OrderProductSerializer(data=request.data)
        put_request.is_valid(raise_exception= True)
        order_product_id = put_request.id
        if OrderProduct.objects.get(id = int(order_product_id)):
            instance = OrderProduct.objects.get(id = int(order_product_id))
            instance.generic_name = put_request.generic_name
            instance.brand_name = put_request.brand_name
            instance.presentation = put_request.presentation
            instance.quantity_ordered = put_request.quantity_ordered
            instance.total_cost = put_request.total_cost
            instance.save()
            return Response({"status":"updated"})
        return Response({"error":"OrderProduct not found"},status = status.HTTP_404_NOT_FOUND)
            


@api_view(['POST'])
def product_forbrand(request): # On insert of brand description, it returns list of product records 
    brand_serializer = BrandDescSerializer(data=request.data)
    print(request.data)
    brand_serializer.is_valid(raise_exception=True)
    print(request.data)
    search_phrase = brand_serializer.validated_data["brand_description"]
    # col = search_phrase[0]
    # col__icontains = col + "__icontains"
    # options = Brand_Alphabetic.objects.filter(**{col__icontains:True})
    options = Product.objects.filter(brand_description__istartswith =search_phrase)
    options = ProductDetailSerializer(options,many=True)
    try:
        serial = int(request.data["serial"])
    except:
        return Response({"error":'serial not found'})
    return Response({"products":{serial:options.data}})

@api_view(['GET'])
def product_forgeneric(request):# On insert of generic, it returns list of corr product records 
    generic_serializer = GenericSerializer(data=request.data)
    generic_serializer.is_valid(raise_exception=True)
    search_phrase = generic_serializer.validated_data["generic_name"]
    options = Product.objects.filter(generic_name = search_phrase)
    options = GenericSerializer(options,many=True)
    return Response({"products":options.data})
    
@api_view(['GET'])
def generic_list(request): #returns list of generic names similar to input
    generic_serializer = GenericSerializer(data=request.data)
    generic_serializer.is_valid(raise_exception=True)
    search_phrase = generic_serializer.validated_data["generic_name"]
    options = Generic_Alphabetic.objects.filter(generic_name = search_phrase)
    options = GenericSerializer(options,many=True)
    return Response({"generics":options.data})


class GetLastOrder(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,*args,**kwargs):
        user = self.request.user
        last_order = Order.objects.filter(buyer=request.user).order_by('open_date').last()
        if not last_order:
            last_order = Order.objects.create(buyer=request.user)
            return Response({"last_orderid":last_order.id})
        print(last_order.order_products.all())
        last_order_items = {}
        for loi in last_order.order_products.all():
            
            obj = {}
            update_list = ("generic_name","brand_description","presentation","cost","quantity_ordered",
                    "full_pack_quantity","unit_quantity","serial")
            for field in update_list:
                obj[field] = getattr(loi,field)
            obj["product_id"] = loi.product_id.id
            last_order_items[loi.serial] = obj
        
        sorted_loi={}
        for key in sorted(last_order_items):
            sorted_loi[key] = last_order_items[key]
        print(sorted_loi)
        return Response({"loi":sorted_loi,
                        "last_orderid":last_order.id
        })
