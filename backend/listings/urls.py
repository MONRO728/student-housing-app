from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CityViewSet, UniversityViewSet, PropertyViewSet, BookingRequestViewSet, AmenityViewSet

router = DefaultRouter()
router.register(r'cities', CityViewSet, basename='city')
router.register(r'universities', UniversityViewSet, basename='university')
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'amenities', AmenityViewSet, basename='amenity')
router.register(r'bookings', BookingRequestViewSet, basename='booking')

urlpatterns = [
    path('', include(router.urls)),
]
