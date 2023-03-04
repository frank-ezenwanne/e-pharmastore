import copy
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import (OrderProductSerializer, BrandDescSerializer,
                          OrderSerializer, ProductDetailSerializer, ProductDetailSerializerGen, ProductDefSerializer,
                          GetIdSerializer, GetOrderProductSerializer, GenericSerializer, UpdatePriceSerializer, UpdateStockSerializer)

from .models import Product, Generic_Alphabetic, Order, OrderProduct, Order
from django.conf.global_settings import AUTH_USER_MODEL as CustomUser
from django.utils import timezone
import csv
from io import StringIO
from django.core.mail import EmailMessage
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


class CreateOrder(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        order = Order.objects.create(buyer=request.user)
        return Response({"order_id": order.id})


class CreateOrderWithTemplate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        id_serializer = GetIdSerializer(data=request.data)
        id_serializer.is_valid(raise_exception=True)
        old_order_id = id_serializer.validated_data['id']
        old_order = Order.objects.filter(id=old_order_id).first()
        if old_order and old_order.buyer == request.user:
            new_order = Order.objects.create(buyer=request.user)
            new_order.open_date = timezone.now()
            for op in old_order.order_products.all():
                op.pk = None
                op._state.adding = True
                op.save()
                op.ordered = False
                op.order_id = new_order
                op.created = timezone.now()
                op.save()
                new_order.order_products.add(op)
            new_order.ordered_date = None
            new_order.ordered = False
            new_order.order_total = old_order.order_total
            new_order.last_updated = timezone.now()
            new_order.save()
            return Response({'order_copied': 'Order Copied Successfully'})
        return Response({"error": "Order Cart not found"}, status=status.HTTP_404_NOT_FOUND)


class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):  # post or update a new order product
        order_product = OrderProductSerializer(data=request.data)
        order_product.is_valid(raise_exception=True)
        order = order_product.validated_data["order_id"]
        # check cart id gotten from frontend.
        order = Order.objects.filter(
            id=int(order_product.validated_data["order_id"].id)).first()
        if order:
            if order.buyer == request.user:
                instance = ""
                for stored_op in order.order_products.all():  # check if orderproduct exists in order
                    if stored_op.serial == order_product.validated_data["serial"]:
                        instance = stored_op
                        break
                if instance != "":
                    old_item_total = float(copy.copy(instance.total))
                    update_list = ("product_id", "selected_unit", "cost", "raw_cost", "quantity_ordered",
                                   "full_pack_quantity", "unit_quantity", "serial", 'total', 'extra_info')
                    for field in update_list:
                        try:
                            order_product.validated_data[field]
                        except KeyError:
                            continue
                        setattr(instance, field,
                                order_product.validated_data[field])
                    instance.created = timezone.now()
                    instance.save()
                    total = float(order.order_total) - old_item_total
                    total = total + float(instance.total)
                    order.order_total = total
                    order.save()

                else:
                    instance = order_product.save(buyer=request.user)
                    total = float(order.order_total) + float(order_product.validated_data['total'])
                    order.order_products.add(instance)
                    order.order_total = total
                    order.save()
                return Response({'current_serial': instance.serial, 'order_productid': instance.id})
            return Response({"error": "You don't own this order", "saved": 0}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Order Cart not found", "saved": 0}, status=status.HTTP_404_NOT_FOUND)

    # delete the cart at once with all orderproducts
    def delete(self, request, *args, **kwargs):
        order_id_request = GetIdSerializer(data=request.data)
        order_id_request.is_valid(raise_exception=True)
        order_id = order_id_request.validated_data['id']
        order = Order.objects.filter(id=int(order_id)).first()
        if order and order.buyer == request.user:
            order.delete()
            # get cart with cart id present in frontend
            return Response({"status": "delete_successful"})

        return Response({"error": "order_id not found"}, status=status.HTTP_404_NOT_FOUND)


class OrderProductView(APIView):  # finish up with database gen id
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):  # delete orderproduct
        delete_request = GetOrderProductSerializer(data=request.data)
        delete_request.is_valid(raise_exception=True)
        order_id = delete_request.validated_data['order_id']
        order = Order.objects.filter(id=order_id).first()
        if not order or order.buyer != request.user:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        del_list = delete_request.validated_data['del_list']
        for id in del_list:
            order_product = OrderProduct.objects.filter(serial=id,order_id=order).first()
            if order_product and order_product.buyer == request.user and order_product in order.order_products.all():
                order.order_products.remove(order_product)
                order_product.delete()
            else:
                return Response({'error': 'Orderproduct not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({"status": "deleted successfully"})


@api_view(['POST'])
# On insert of brand description, it returns list of product records
def product_forbrand(request):
    brand_serializer = BrandDescSerializer(data=request.data)
    brand_serializer.is_valid(raise_exception=True)
    search_phrase = brand_serializer.validated_data["brand_description"]
    radio_type = brand_serializer.validated_data["radio_option"]
    try:
        serial = int(request.data["serial"])
    except:
        return Response({"error": 'serial not found'})
    # col = search_phrase[0]
    # col__icontains = col + "__icontains"
    # options = Brand_Alphabetic.objects.filter(**{col__icontains:True})
    if radio_type == 'deep':
        options = Product.objects.filter(
            brand_description_slug__icontains=search_phrase, disabled_status=False).order_by('brand_description_slug')
        options = ProductDetailSerializer(options, many=True)
        return Response({"products_deep": {serial: options.data}})
    else:
        options = Product.objects.filter(
            brand_description_slug__istartswith=search_phrase, disabled_status=False).order_by('brand_description_slug')
        options = ProductDetailSerializer(options, many=True)
        return Response({"products": {serial: options.data}})


@api_view(['POST'])
# On insert of generic, it returns list of corr product records
def product_forgeneric(request):
    generic_serializer = GenericSerializer(data=request.data)
    generic_serializer.is_valid(raise_exception=True)
    search_phrase = generic_serializer.validated_data["generic_name"]
    options = Product.objects.filter(
        generic_name=search_phrase, disabled_status=False)
    options = ProductDetailSerializerGen(options, many=True)
    return Response({"generic_products": options.data})


class GetGenericNames(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):  # returns list of generic names similar to input
        generic_serializer = GenericSerializer(data=request.data)
        generic_serializer.is_valid(raise_exception=True)
        search_phrase = generic_serializer.validated_data["generic_name"]
        options = Generic_Alphabetic.objects.filter(
            generic_name__istartswith=search_phrase)
        options = GenericSerializer(options, many=True)
        return Response({"generic_name_options": options.data})


class GetLastOrder(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        try:
            user = self.request.user
            last_order = Order.objects.filter(
                buyer=request.user).order_by('last_updated').last()
            if not last_order:
                last_order = Order.objects.create(buyer=request.user)
                return Response({"last_orderid": last_order.id})
            last_order_items = {}
            last_order_status = last_order.ordered
            updates = {
                'unit': {},
                'unit_name': {},
                'cost': {},
            }
            for loi in last_order.order_products.all():
                if last_order_status == False:

                    if (int(loi.full_pack_quantity) != int(loi.product_id.full_pack_quantity) or
                            loi.unit_quantity != loi.product_id.unit_quantity or loi.unit != loi.product_id.unit):

                        if int(loi.full_pack_quantity) != int(loi.product_id.full_pack_quantity):

                            # orderproduct unit should merge into 1 as product fpq is now 1
                            if int(loi.product_id.full_pack_quantity) == 1:
                                loi.full_pack_quantity = 1
                                loi.unit_quantity = loi.product_id.unit_quantity
                                if loi.selected_unit != 'FULL PACK':  # special case to set cost for non-full pack selected
                                    # set to itz already selected full pack cost for comparison later
                                    loi.cost = loi.raw_cost
                                    loi.total = loi.raw_cost
                                loi.selected_unit = loi.product_id.unit
                                if loi.product_id.brand_description not in updates['unit']:
                                    updates['unit'][loi.product_id.brand_description] = "This product is now defined with a single unit"

                            # orderproduct unit should now split
                            elif int(loi.full_pack_quantity) == 1:
                                loi.full_pack_quantity = int(
                                    loi.product_id.full_pack_quantity)
                                loi.unit_quantity = loi.product_id.unit_quantity
                                loi.selected_unit = 'FULL PACK'
                                if loi.product_id.brand_description not in updates['unit']:
                                    updates['unit'][loi.product_id.brand_description] = "This product is now defined with multiple units "
                            else:
                                loi.full_pack_quantity = int(
                                    loi.product_id.full_pack_quantity)
                                loi.unit_quantity = loi.product_id.unit_quantity
                                if loi.product_id.brand_description not in updates['unit']:
                                    updates['unit'][loi.product_id.brand_description] = "This product has its pack size defintion updated"

                        elif loi.unit_quantity != loi.product_id.unit_quantity:
                            loi.unit_quantity = loi.product_id.unit_quantity
                            if loi.product_id.brand_description not in updates['unit']:
                                updates['unit'][loi.product_id.brand_description] = "This product has its pack size defintion updated"

                        if loi.unit != loi.product_id.unit:
                            loi.unit = loi.product_id.unit
                            if loi.product_id.brand_description not in updates['unit_name']:
                                updates['unit_name'][loi.product_id.brand_description] = "This product has its unit name updated"
                        loi.save()

                    if loi.raw_cost != loi.product_id.raw_cost:
                        loi.raw_cost = loi.product_id.raw_cost
                        if int(loi.full_pack_quantity) > 1:
                            if loi.selected_unit != 'FULL PACK':
                                try:
                                    int(loi.unit_quantity)
                                    ratio = int(loi.full_pack_quantity) / \
                                        int(loi.unit_quantity)
                                except ValueError:
                                    ratio = int(loi.full_pack_quantity)
                                old_cost = copy.copy(loi.cost)
                                loi.cost = loi.product_id.raw_cost/ratio  # raw_cost/ratio
                                loi.raw_cost = loi.product_id.raw_cost
                                loi.total = float(loi.cost) * \
                                    int(loi.quantity_ordered)
                                loi.save()
                                if loi.product_id.brand_description not in updates['cost'] and abs(float(loi.cost) - float(old_cost)) > 0.1:
                                    updates['cost'][loi.product_id.brand_description] = {
                                        'selected_unit': loi.selected_unit, 'old_cost': old_cost, 'new_cost': loi.cost}

                            else:
                                old_cost = copy.copy(loi.cost)
                                loi.cost = loi.product_id.raw_cost
                                loi.raw_cost = loi.product_id.raw_cost
                                loi.total = float(loi.cost) * \
                                    int(loi.quantity_ordered)
                                loi.save()
                                if loi.product_id.brand_description not in updates['cost'] and abs(float(loi.cost) - float(old_cost)) > 0.1:
                                    updates['cost'][loi.product_id.brand_description] = {
                                        'selected_unit': loi.selected_unit, 'old_cost': old_cost, 'new_cost': loi.cost}

                        elif int(loi.full_pack_quantity) == 1:
                            old_cost = copy.copy(loi.cost)
                            loi.cost = loi.product_id.raw_cost
                            loi.raw_cost = loi.product_id.raw_cost
                            loi.total = float(loi.cost) * int(loi.quantity_ordered)
                            loi.save()
                            if loi.product_id.brand_description not in updates['cost'] and abs(float(loi.cost) - float(old_cost)) > 0.1:
                                updates['cost'][loi.product_id.brand_description] = {
                                    'selected_unit': loi.selected_unit, 'old_cost': old_cost, 'new_cost': loi.cost}

                obj = {}
                update_list = ('id', "selected_unit", "cost", "raw_cost", "quantity_ordered", 'unit',
                            "full_pack_quantity", "unit_quantity", "serial", 'extra_info', "total")
                for field in update_list:
                    # get attributes of loi dynamically
                    obj[field] = getattr(loi, field)
                # extract and send id bcoz object isn't JSON serializable
                obj["product_id"] = loi.product_id.id
                obj['saved'] = True
                obj['brand_description'] = loi.product_id.brand_description
                obj['generic_name'] = loi.product_id.generic_name
                obj['total'] = float(loi.total)

                last_order_items[loi.serial] = obj
            sorted_loi = {}
            id = 0
            for key in sorted(last_order_items):
                id += 1
                last_order_items[key]['count'] = id
                sorted_loi[key] = last_order_items[key]
            return Response({"loi": sorted_loi,
                            "last_orderid": last_order.id,'last_ordercode':last_order.order_code, "last_order_status": last_order.ordered, 'updates': updates})
        except Exception as e:
            return Response({'error':e})

class GetCustomerOrders(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        orders = Order.objects.filter(buyer=request.user).order_by('-open_date')
        paginator = Paginator(orders,6)
        print(request.data)
        page = request.data.get('page_num',9)
        try:
            orders = paginator.page(page)
        except PageNotAnInteger:
            orders = paginator.page(1) #go to 1st page
            page=1
        except EmptyPage: #check paginator.num_pages later
            orders = paginator.page(paginator.num_pages) #if blank page go to the last avail page 
            page=paginator.num_pages
        except:
            orders = paginator.page(1)
            page=1
        serialized = OrderSerializer(orders, many=True)
        page_range = list(paginator.page_range)
        if orders.has_other_pages:
            has_other_pages = True
        else:
            has_other_pages = False
        return Response({"customer_orders": {'orders_data':serialized.data,'num_pages':orders.paginator.num_pages,
             'page_range':page_range,'has_other_pages':has_other_pages,'current_page':page}})


class MakeLastOrder(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        serializer = GetIdSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        id = serializer.validated_data["id"]
        order = Order.objects.filter(id=id).first()
        if order:
            order.save()
            return Response({"last_orderid": order.id})
        return Response({"error": "This orderId does not exist"}, status=status.HTTP_404_NOT_FOUND)


class SendCSVEmail(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            order_id_request = GetIdSerializer(data=request.data)
            order_id_request.is_valid(raise_exception=True)
            order_id = order_id_request.validated_data['id']
            order = Order.objects.filter(id=int(order_id)).first()
            if order and order.buyer == request.user:
                order_products = order.order_products.all()
                csv_file = StringIO()  # creates writing pad for the csvwriter
                writer = csv.writer(csv_file)
                writer.writerow([order.order_code,'','','','','',''])
                writer.writerow(['serial','brand_description', 'generic_name',
                                'selected_unit', 'quantity_ordered', 'cost', 'total'])
                order_fields=[]
                overall_cost = 0
                for op in order_products: #assign the field vals to var as tupules manually instead of using values_list due to fetching vals from another table
                    overall_cost += op.total
                    serial,brand_des,gen,sel_unit,quant,cost,total = op.serial,op.product_id.brand_description,op.product_id.generic_name,op.selected_unit,op.quantity_ordered,op.cost,op.total
                    order_fields.append((serial,brand_des,gen,sel_unit,quant,cost,total))
                order_fields = sorted(order_fields,key=lambda x:x[0])
                for row in order_fields:
                    writer.writerow(row)
                writer.writerow(['','','','','','',overall_cost])
                
                message = EmailMessage(
                    "Hello", f"The Order from {order.buyer.company_name} to Ramsgate", 'efrank938@gmail.com', [order.buyer.email])
                message.attach('order.csv', csv_file.getvalue(), 'text/csv')
                try:
                    message.send()
                except:
                    return Response({'email_send_error': 'Email Error in Sending Order!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                for op in order.order_products.all():
                    op.ordered = True
                    op.save()
                order.ordered = True
                order.save()

                return Response({'email_sent': 'Email Sent!'})
            return Response({"error": "This orderId does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({'error':'Error encountered in sending mail'},status = status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateUpdateDefProduct(APIView):
    def post(self, request, *args, **kwargs):
        def_serializer = ProductDefSerializer(data=request.data)
        def_serializer.is_valid(raise_exception=True)
        instance = Product.objects.filter(
            product_code=def_serializer.validated_data['product_code']).first()
        if instance:
            fields = ('brand_name', 'generic_name', 'brand_description', 'department', 'dosage_form', 'unit',
                      'quantity_left', 'category', 'company', 'full_pack_quantity', 'unit_quantity')
            for field in fields:
                setattr(instance, field, def_serializer.validated_data[field])
            if instance.raw_cost:
                instance.disabled_status = False
            instance.save()
            return Response({'success': 'Product Updated'})
        else:
            instance = def_serializer.save(disabled_status=True)
            return Response({'success': 'Product Created'})


class UpdateProductPrice(APIView):
    def post(self, request, *args, **kwargs):
        update_serializer = UpdatePriceSerializer(data=request.data)
        update_serializer.is_valid(raise_exception=True)
        instance = Product.objects.filter(
            product_code=update_serializer.validated_data['product_code']).first()
        if instance:
            unit = update_serializer.validated_data['unit']
            if int(instance.full_pack_quantity) == 1:
                instance.raw_cost = int(
                    update_serializer.validated_data['price'])
                instance.disabled_status = False
                instance.save()
                return Response({'success': 'Price Updated Successfully'})
            elif int(instance.full_pack_quantity) > 1:
                if update_serializer.validated_data['unit'] != 'FULL PACK':
                    try:
                        int(instance.unit_quantity)
                    except ValueError:
                        instance.raw_cost = int(
                            update_serializer.validated_data['price']) * int(instance.full_pack_quantity)
                        instance.disabled_status = False
                        instance.save()
                        return Response({'success': 'Price Updated Successfully'})
                    ratio = int(instance.full_pack_quantity) / \
                        int(instance.unit_quantity)
                    instance.raw_cost = int(
                        update_serializer.validated_data['price']) * ratio
                    instance.disabled_status = False
                    instance.save()
                else:
                    instance.raw_cost = int(
                        update_serializer.validated_data['price'])
                    instance.disabled_status = False
                    instance.save()
                return Response({'success': 'Price Updated Successfully'})
        else:
            return Response({'error': 'Product Not Found'}, status=status.HTTP_404_NOT_FOUND)


class UpdateProductStock(APIView):
    def post(self, request, *args, **kwargs):
        update_serializer = UpdateStockSerializer(data=request.data)
        update_serializer.is_valid(raise_exception=True)
        instance = Product.objects.filter(
            product_code=update_serializer.validated_data['product_code']).first()
        if instance:
            instance.quantity_left = update_serializer.validated_data['quantity_left']
            instance.save()
            return Response({'success': 'Stock Updated Successfully', 'stock': instance.quantity_left})
        return Response({'error': 'Product Not Found'}, status=status.HTTP_404_NOT_FOUND)
