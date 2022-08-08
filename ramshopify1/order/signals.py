from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Product,Brand_Alphabetic,Generic_Alphabetic

@receiver(post_save,sender = Product)
def create_brand(sender,instance,created,**kwargs):
    if created:
        try:
            if not Brand_Alphabetic.objects.get(brand_name__icontains = instance.brand_name):
                ba_instance = Brand_Alphabetic.objects.create(brand_name = instance.brand_name)
                # ba_instance.save()
        except:
            print("Brand_info for brandtable not created")

        try:
            if not Generic_Alphabetic.objects.get(generic_name__icontains = instance.generic_name):
                gen_instance = Generic_Alphabetic.objects.create(generic_name = instance.generic_name)
                # gen_instance.save()
        except:
            print("generic_info for gentable not created")

