from django.contrib import admin
from .models import Booking, Review


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ["user", "room", "start_date", "end_date", "status", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["user__username", "room__name"]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["user", "property", "rating", "created_at"]
    list_filter = ["rating", "created_at"]
    search_fields = ["user__username", "property__name"]
