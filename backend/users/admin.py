from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ["username", "email", "phone_number", "role", "is_staff"]
    list_filter = ["role", "is_staff", "is_superuser"]
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Qo'shimcha", {"fields": ("phone_number", "role", "avatar")}),
    )
    search_fields = ["username", "email", "phone_number"]
