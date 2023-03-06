from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order,Product,Generic_Alphabetic
from django.db import connection

@receiver(post_save,sender = Product)
def create_generic(sender,instance,created,**kwargs):
    if created:
        try:
            if not Generic_Alphabetic.objects.filter(generic_name__icontains = instance.generic_name):
                gen_instance = Generic_Alphabetic.objects.create(generic_name = instance.generic_name)
                # gen_instance.save()
        except:
            print("generic_info for gentable not created")

        with connection.cursor() as cursor:
            cursor.execute("UPDATE order_product SET brand_description_slug = translate(brand_description,'-/\)_=:;><]/?,.|~!@*(90[}#${ ','') WHERE brand_description = %s",[instance.brand_description])
        

@receiver(post_save,sender=Order)
def gen_order_code(sender, instance, created, **kwargs):
    try:
        if not instance.order_code:
            instance.order_code = 'RAMS0' + str(instance.id)
            instance.save()
    except:
        print('Order code not created')