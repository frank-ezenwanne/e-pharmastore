from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import( OrderProductSerializer,BrandDescSerializer,
OrderSerializer,ProductDetailSerializer,ProductDetailSerializerGen,
GetIdSerializer,ProductSerializer,GetOrderProductSerializer,GenericSerializer)

from .models import Brand_Alphabetic,Product,Generic_Alphabetic,Order,OrderProduct,Order
from django.conf.global_settings import AUTH_USER_MODEL as CustomUser
from django.utils import timezone
import csv
from io import StringIO
from django.core.mail import EmailMessage

class CreateOrder(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,*args,**kwargs):
        order = Order.objects.create(buyer = request.user)
        return Response({"order_id":order.id})

class CreateOrderWithTemplate(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,*args,**kwargs):
        id_serializer = GetIdSerializer(data=request.data)
        id_serializer.is_valid(raise_exception=True)
        old_order_id = id_serializer.validated_data['id']
        old_order=Order.objects.get(id=old_order_id) #check get for errors 
        if old_order and old_order.buyer == request.user:
            new_order = Order.objects.create(buyer = request.user)
            new_order.open_date=timezone.now()
            for op in old_order.order_products.all():
                op.pk=None
                op._state.adding = True
                op.save()
                op.ordered = False
                op.order_id = new_order
                op.created = timezone.now()
                op.save()
                new_order.order_products.add(op)
            new_order.ordered_date=None
            new_order.ordered = False
            new_order.order_total = None
            new_order.last_updated = timezone.now()
            new_order.save()
            return Response({'success':'Copy order created'})
        return Response({ "error" : "Order Cart not found"},status = status.HTTP_404_NOT_FOUND)
            



class OrderView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,*args,**kwargs):#post or update a new order product
        order_product = OrderProductSerializer(data=request.data)
        order_product.is_valid(raise_exception=True)
        order = order_product.validated_data["order_id"]
        order_id = order.id
        user = request.user
          #check cart id gotten from frontend.
        order = Order.objects.get(id = int(order_product.validated_data["order_id"].id))
        if order:
            if order.buyer == request.user:
                instance=""
                for stored_op in order.order_products.all():#check if orderproduct exists in order
                    if stored_op.serial == order_product.validated_data["serial"]:
                        instance = stored_op
                        break
                if instance != "":
                    update_list = ( "product_id","generic_name","brand_description","selected_unit","cost","raw_cost","quantity_ordered",
                    "full_pack_quantity","unit_quantity","serial",'total','extra_info')
                    for field in update_list:
                        try:
                            order_product.validated_data[field]
                        except KeyError:
                            continue
                        setattr(instance,field,order_product.validated_data[field])
                    instance.created = timezone.now()
                    instance.save()
                

                else:
                    instance=order_product.save(buyer = request.user)
                    order.order_products.add(instance)
                    order.save()
                return Response({'current_serial':instance.serial,'order_productid':instance.id})
            return Response({ "error" : "You don't own this order","saved":0},status = status.HTTP_404_NOT_FOUND)
 
        return Response({ "error" : "Order Cart not found","saved":0},status = status.HTTP_404_NOT_FOUND)
        

    def delete(self,request,*args,**kwargs): #delete the cart at once with all orderproducts
        order_id_request = GetIdSerializer(data = request.data)
        order_id_request.is_valid(raise_exception= True)
        print(order_id_request)
        order_id = order_id_request.validated_data['id']
        order = Order.objects.get(id = int(order_id))
        if order and order.buyer == request.user:
            order.delete()
            #get cart with cart id present in frontend
            return Response({"status":"delete_successful"})
 
        return Response({"error":"order_id not found"},status = status.HTTP_404_NOT_FOUND)




class OrderProductView(APIView):#finish up with database gen id
    permission_classes = [IsAuthenticated]
    def post(self,request,*args,**kwargs): #delete orderproduct
        delete_request = GetOrderProductSerializer(data=request.data)
        delete_request.is_valid(raise_exception = True)
        order_id = delete_request.validated_data['order_id']
        order = Order.objects.get(id = order_id)
        if not order or order.buyer != request.user:
            return Response({'error':'Order not found'},status = status.HTTP_404_NOT_FOUND)
        del_list = delete_request.validated_data['del_list']
        for id in del_list:
            order_product = OrderProduct.objects.get(id=id)
            if order_product and order_product.buyer==request.user and order_product in order.order_products.all():
                order.order_products.remove(order_product)
                order_product.delete()
            else:
                return Response({'error':'Orderproduct not found'},status = status.HTTP_404_NOT_FOUND)     
        return Response({"status":"deleted successfully"})
    
            


@api_view(['POST'])
def product_forbrand(request): # On insert of brand description, it returns list of product records 
    brand_serializer = BrandDescSerializer(data=request.data)
    brand_serializer.is_valid(raise_exception=True)
    search_phrase = brand_serializer.validated_data["brand_description"]
    radio_type = brand_serializer.validated_data["radio_option"]
    try:
        serial = int(request.data["serial"])
    except:
        return Response({"error":'serial not found'})
    print(search_phrase,12345)
    # col = search_phrase[0]
    # col__icontains = col + "__icontains"
    # options = Brand_Alphabetic.objects.filter(**{col__icontains:True})
    if radio_type == 'deep':
        options = Product.objects.filter(brand_description_slug__icontains =search_phrase).order_by('brand_description_slug')
        options = ProductDetailSerializer(options,many=True)
        return Response({"products_deep":{serial:options.data}})
    else:
        options = Product.objects.filter(brand_description_slug__istartswith =search_phrase).order_by('brand_description_slug')
        options = ProductDetailSerializer(options,many=True)
        return Response({"products":{serial:options.data}})


@api_view(['POST'])
def product_forgeneric(request):# On insert of generic, it returns list of corr product records 
    generic_serializer = GenericSerializer(data=request.data)
    generic_serializer.is_valid(raise_exception=True)
    search_phrase = generic_serializer.validated_data["generic_name"]
    options = Product.objects.filter(generic_name = search_phrase)
    options = ProductDetailSerializerGen(options,many=True)
    print(options.data)
    return Response({"generic_products":options.data})
    
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
        last_order = Order.objects.filter(buyer=request.user).order_by('last_updated').last()
        if not last_order:
            last_order = Order.objects.create(buyer=request.user)
            return Response({"last_orderid":last_order.id})
        last_order_items = {}
        for loi in last_order.order_products.all(): 
            obj = {}
            update_list = ('id',"generic_name","brand_description","selected_unit","cost","raw_cost","quantity_ordered",
                    "full_pack_quantity","unit_quantity","serial",'extra_info',"total")
            for field in update_list:
                obj[field] = getattr(loi,field)
            obj["product_id"] = loi.product_id.id
            obj["unit"] = loi.product_id.unit
            obj['saved'] = True
            last_order_items[loi.serial] = obj
        sorted_loi={}
        id=0
        for key in sorted(last_order_items):
            id+=1
            last_order_items[key]['count'] = id
            sorted_loi[key] = last_order_items[key]
        print(last_order.ordered)
        return Response({"loi":sorted_loi,
                        "last_orderid":last_order.id,"last_order_status":last_order.ordered})
     


class GetCustomerOrders(APIView):
    permission_classes=[IsAuthenticated,]
    def get(self,request,*args,**kwargs):
        orders = Order.objects.filter(buyer=request.user).order_by('-open_date')
        serialized = OrderSerializer(orders,many=True)
        return Response({"customer_orders":serialized.data})

class MakeLastOrder(APIView):
    permission_classes=[IsAuthenticated,]
    def post(self,request,*args,**kwargs):
        serializer = GetIdSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        id = serializer.validated_data["id"]
        order = Order.objects.get(id=id)
        if order:
            order.save()
            return Response({"last_orderid":order.id})
        return Response({"error":"This orderId does not exist"},status = status.HTTP_404_NOT_FOUND)


class SendCSVEmail(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request,*args,**kwargs):
        order_id_request = GetIdSerializer(data = request.data)
        order_id_request.is_valid(raise_exception= True)
        print(order_id_request)
        order_id = order_id_request.validated_data['id']
        order = Order.objects.get(id = int(order_id))
        if order and order.buyer == request.user:
            order_products = order.order_products.all()
            csv_file = StringIO()
            writer = csv.writer(csv_file)
            writer.writerow(['brand_description','generic_name','selected_unit','quantity_ordered','cost','total'])
            order_fields = order_products.values_list('brand_description','generic_name','selected_unit','quantity_ordered','cost','total')
            for row in order_fields:
                writer.writerow(row)
            message = EmailMessage("Hello",f"The Order from {order.buyer.company_name} to Ramsgate", 'efrank938@gmail.com',[order.buyer.email])
            message.attach('order.csv', csv_file.getvalue(), 'text/csv')
            try:
                message.send()
            except:
                return Response({'email_send_error':'Email Error in Sending Order!'},status = status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            for op in order.order_products.all():
                op.ordered = True
                op.save()
            order.ordered = True
            order.save()
            
            return Response({'email_sent':'Email Sent!'})
        return Response({"error":"This orderId does not exist"},status = status.HTTP_404_NOT_FOUND)