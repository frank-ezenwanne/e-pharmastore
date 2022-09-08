from django.db import models
from django.conf import settings
from django.utils import timezone



class Product(models.Model):
    product_code = models.CharField(max_length = 50,null=True)
    brand_name = models.CharField(max_length = 150,null=True)
    generic_name = models.CharField(max_length = 150,null=True)
    brand_description = models.CharField(max_length = 150,null=True)
    brand_description_slug = models.CharField(max_length = 150,null=True)
    department = models.CharField(max_length = 15,null=True)
    dosage_form = models.CharField(max_length = 20,null=True)
    unit = models.CharField(max_length = 30,null=True)
    category = models.CharField(max_length = 100,null=True)
    raw_cost = models.FloatField(null=True)
    quantity_left = models.IntegerField(null=True)
    company = models.CharField(max_length=50,null=True)
    full_pack_quantity = models.CharField(null=True,max_length=10)
    unit_quantity = models.CharField(null=True,max_length=10)
    first_letter_brand = models.CharField(null=True,max_length=1)
    first_letter_generic = models.CharField(null=True,max_length=1)
    disabled_status = models.BooleanField(default=False)


    def __str__(self):
        return self.brand_description


class Brand_Alphabetic(models.Model):
    brand_description = models.CharField(max_length=100,primary_key=True)
    other = models.BooleanField(default=False, null=True)
    a = models.BooleanField(default=False,null=True)
    b = models.BooleanField(default=False,null=True)
    c = models.BooleanField(default=False,null=True)
    d = models.BooleanField(default=False,null=True)
    e = models.BooleanField(default=False,null=True)
    f = models.BooleanField(default=False,null=True)
    g = models.BooleanField(default=False,null=True)
    h = models.BooleanField(default=False,null=True)
    i = models.BooleanField(default=False,null=True)
    j = models.BooleanField(default=False,null=True)
    k = models.BooleanField(default=False,null=True)
    l = models.BooleanField(default=False,null=True)
    m = models.BooleanField(default=False,null=True)
    n = models.BooleanField(default=False,null=True)
    o = models.BooleanField(default=False,null=True)
    p = models.BooleanField(default=False,null=True)
    q = models.BooleanField(default=False,null=True)
    r = models.BooleanField(default=False,null=True)
    s = models.BooleanField(default=False,null=True)
    t = models.BooleanField(default=False,null=True)
    u = models.BooleanField(default=False,null=True)
    v = models.BooleanField(default=False,null=True)
    w = models.BooleanField(default=False,null=True)
    x = models.BooleanField(default=False,null=True)
    y = models.BooleanField(default=False,null=True)
    z = models.BooleanField(default=False,null=True)

    def __str__(self):
        return self.brand.brand_description

class Generic_Alphabetic(models.Model):
    generic_name = models.CharField(max_length=100,primary_key=True)
    other = models.BooleanField(default=False, null=True)
    a = models.BooleanField(default=False,null=True)
    b = models.BooleanField(default=False,null=True)
    c = models.BooleanField(default=False,null=True)
    d = models.BooleanField(default=False,null=True)
    e = models.BooleanField(default=False,null=True)
    f = models.BooleanField(default=False,null=True)
    g = models.BooleanField(default=False,null=True)
    h = models.BooleanField(default=False,null=True)
    i = models.BooleanField(default=False,null=True)
    j = models.BooleanField(default=False,null=True)
    k = models.BooleanField(default=False,null=True)
    l = models.BooleanField(default=False,null=True)
    m = models.BooleanField(default=False,null=True)
    n = models.BooleanField(default=False,null=True)
    o = models.BooleanField(default=False,null=True)
    p = models.BooleanField(default=False,null=True)
    q = models.BooleanField(default=False,null=True)
    r = models.BooleanField(default=False,null=True)
    s = models.BooleanField(default=False,null=True)
    t = models.BooleanField(default=False,null=True)
    u = models.BooleanField(default=False,null=True)
    v = models.BooleanField(default=False,null=True)
    w = models.BooleanField(default=False,null=True)
    x = models.BooleanField(default=False,null=True)
    y = models.BooleanField(default=False,null=True)
    z = models.BooleanField(default=False,null=True)

    def __str__(self):
        return self.brand.brand_description


class OrderProduct(models.Model):
    serial = models.IntegerField(null=True) #serial created by frontend
    selected_unit = models.CharField(max_length = 30)
    brand_description = models.CharField(max_length = 50)
    generic_name = models.CharField(max_length = 50,null=True,blank=True)
    product_id = models.ForeignKey(Product,on_delete=models.PROTECT)
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)#SET TO DELETED USER LATER
    quantity_ordered = models.IntegerField(default=1)
    ordered = models.BooleanField(default=False)
    order_id=models.ForeignKey('Order',on_delete=models.CASCADE) #cart id
    cost = models.FloatField(null=True)
    unit_quantity = models.CharField(max_length=10,null=True) #Remove null later
    full_pack_quantity = models.IntegerField(null=True)
    raw_cost = models.FloatField(null=True)
    total = models.FloatField(null=True)
    extra_info=models.TextField(null=True,blank=True)
    created  = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f'{self.product_id.brand_description} OrderProduct'

class Order(models.Model):
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)#SET TO DELETED USER LATER
    order_products = models.ManyToManyField("OrderProduct",related_name = "order_items_field",blank=True)
    open_date = models.DateTimeField(default=timezone.now)
    ordered_date = models.DateTimeField(null=True,blank=True)
    ordered = models.BooleanField(default = False)
    order_total = models.FloatField(null=True)
    last_updated = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.buyer.company_name




