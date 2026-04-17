import os
import uuid
from django.db import models

def city_image_path(instance, filename):
    ext = filename.split('.')[-1]
    return os.path.join('cities', f'{uuid.uuid4()}.{ext}')

class City(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to=city_image_path, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

def university_logo_path(instance, filename):
    ext = filename.split('.')[-1]
    return os.path.join('universities', f'{uuid.uuid4()}.{ext}')

class University(models.Model):
    name = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='universities')
    logo = models.ImageField(upload_to=university_logo_path, blank=True, null=True)

    def __str__(self):
        return self.name

class Amenity(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, help_text="Lucide icon name")

    def __str__(self):
        return self.name

from django.conf import settings

def property_main_image_path(instance, filename):
    ext = filename.split('.')[-1]
    return os.path.join('properties', 'main', f'{uuid.uuid4()}.{ext}')

class Property(models.Model):
    name = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='properties')
    university = models.ForeignKey(University, on_delete=models.SET_NULL, null=True, blank=True, related_name='nearby_properties')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='properties', null=True, blank=True)
    address = models.CharField(max_length=255)
    description = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    amenities = models.ManyToManyField(Amenity, blank=True)
    main_image = models.ImageField(upload_to=property_main_image_path)
    
    # Distance to university in meters
    distance_to_uni = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

def property_gallery_image_path(instance, filename):
    ext = filename.split('.')[-1]
    return os.path.join('properties', 'gallery', f'{uuid.uuid4()}.{ext}')

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=property_gallery_image_path)

class Room(models.Model):
    ROOM_TYPES = (
        ('entire', 'Butun xona/kvartira'),
        ('private', 'Shaxsiy xona'),
        ('shared', 'Umumiy xona'),
    )
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='rooms')
    room_type = models.CharField(max_length=20, choices=ROOM_TYPES)
    name = models.CharField(max_length=100)
    price_per_month = models.DecimalField(max_digits=10, decimal_places=2)
    available_from = models.DateField()
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.property.name} - {self.name}"

class BookingRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Kutilmoqda'),
        ('approved', 'Tasdiqlandi'),
        ('rejected', 'Rad etildi'),
    )
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='booking_requests')
    tenant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='my_bookings')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('property', 'tenant')

    def __str__(self):
        return f"{self.tenant.username} -> {self.property.name}"
