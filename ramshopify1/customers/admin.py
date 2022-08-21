from django.contrib import admin
from customers.models import CustomUser
from django.contrib.auth.admin import UserAdmin


class CustomAdmin(UserAdmin):
    # The forms to add and change user instances

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('email', 'company_name', 'phone_no', 'is_admin')
    list_filter = ('is_admin','company_name','phone_no','is_active','company_name')
    fieldsets = (
        (None, {'fields': ('email', 'password','company_name')}),
        ('Personal info', {'fields': ('phone_no','country')}),
        ('Permissions', {'fields': ('is_admin','is_active')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'company_name', 'password1', 'password2'),
        }),
    )
    search_fields = ('company_name',)
    ordering = ('company_name',)
    filter_horizontal = ()

admin.site.register(CustomUser, CustomAdmin)