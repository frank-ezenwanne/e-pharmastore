from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Product,Brand_Alphabetic,Generic_Alphabetic
from django.db import connection

@receiver(post_save,sender = Product)
def create_brand(sender,instance,created,**kwargs):
    if created:
        try:
            if not Generic_Alphabetic.objects.get(generic_name__icontains = instance.generic_name):
                gen_instance = Generic_Alphabetic.objects.create(generic_name = instance.generic_name)
                # gen_instance.save()
        except:
            print("generic_info for gentable not created")

        with connection.cursor() as cursor:
            cursor.execute("UPDATE order_product SET brand_description_slug = translate(brand_description,'-/\)_=:;><]/?,.|~!@*(90[}#${ ','') WHERE brand_description = %s",[instance.brand_description])
        

