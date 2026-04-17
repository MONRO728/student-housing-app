from django.contrib import admin
from .models import City, University, Amenity, Property, PropertyImage, Room


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]


@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ["name", "city"]
    list_filter = ["city"]
    search_fields = ["name"]


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ["name", "city", "address", "created_at"]
    list_filter = ["city", "created_at"]
    search_fields = ["name", "address"]
    filter_horizontal = ["amenities"]


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ["name", "property", "room_type", "price_per_month", "is_available"]
    list_filter = ["room_type", "is_available", "property"]
    search_fields = ["name"]
