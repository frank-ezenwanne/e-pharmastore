from pickle import UNICODE
from django.db import models
from django.conf import settings
from django.utils import timezone


class Product(models.Model):
    product_code = models.CharField(max_length=50,unique=True)
    brand_name = models.CharField(max_length=150, null=True)
    generic_name = models.CharField(max_length=150, null=True, blank=True)
    brand_description = models.CharField(max_length=150,unique=True)
    brand_description_slug = models.CharField(max_length=150, null=True)
    department = models.CharField(max_length=15, null=True)
    dosage_form = models.CharField(max_length=20, null=True, blank=True)
    unit = models.CharField(max_length=30)
    category = models.CharField(max_length=100, null=True, blank=True)
    raw_cost = models.FloatField(null=True)
    quantity_left = models.IntegerField(null=True)
    company = models.CharField(max_length=150, null=True, blank=True)
    full_pack_quantity = models.CharField(max_length=10)
    unit_quantity = models.CharField(default=1, max_length=10)
    disabled_status = models.BooleanField(default=False)

    def __str__(self):
        return self.brand_description


class Generic_Alphabetic(models.Model):
    generic_name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.generic_name


class OrderProduct(models.Model):
    serial = models.IntegerField()  # serial created by frontend
    selected_unit = models.CharField(max_length=30)
    product_id = models.ForeignKey(Product, on_delete=models.PROTECT)
    # MIGHT SET TO DELETED USER LATER
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    quantity_ordered = models.IntegerField(default=1)
    ordered = models.BooleanField(default=False)
    order_id = models.ForeignKey('Order', on_delete=models.CASCADE)  # cart id
    cost = models.FloatField(default=0)
    unit_quantity = models.CharField(max_length=10)
    full_pack_quantity = models.IntegerField()
    raw_cost = models.FloatField(default=0)
    unit = models.CharField(max_length=30)
    total = models.FloatField()
    extra_info = models.TextField(null=True, blank=True)
    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.product_id.brand_description} OrderProduct'


class Order(models.Model):
    order_code = models.CharField(unique=True,max_length=255)
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE) # SET TO DELETED USER LATER
    order_products = models.ManyToManyField("OrderProduct", related_name="order_items_field", blank=True)
    open_date = models.DateTimeField(default=timezone.now)
    ordered_date = models.DateTimeField(null=True, blank=True)
    ordered = models.BooleanField(default=False)
    order_total = models.FloatField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    def save(self,force_insert=True,*args,**kwargs):
        super().save(*args,**kwargs)
        self.order_code= 'RAMS0' + str(self.id)
        return super().save(*args,**kwargs)

    def __str__(self):
        return f"{self.buyer.company_name}'s Order"
