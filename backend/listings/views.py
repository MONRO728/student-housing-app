from rest_framework import viewsets, filters, permissions, status
from rest_framework.response import Response
from django_filters import rest_framework as django_filters
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (
    CitySerializer, UniversitySerializer, AmenitySerializer,
    PropertyListSerializer, PropertyDetailSerializer, PropertyCreateSerializer,
    BookingRequestSerializer,
)
from .models import City, University, Amenity, Property, PropertyImage, Room, BookingRequest
import datetime
from rest_framework.exceptions import PermissionDenied


# ---------------------------------------------------------------------------
# Custom FilterSet for Property
# Supports:
#   ?city_name=buxoro   → case-insensitive city name match
#   ?city=<id>          → exact FK match (original)
#   ?search=<text>      → full-text search via SearchFilter (name, address,
#                          description, city__name – all icontains)
# ---------------------------------------------------------------------------
class PropertyFilter(django_filters.FilterSet):
    """
    Explicit FilterSet so we get __icontains on city__name instead of the
    django-filter default exact-match that comes from `filterset_fields`.
    """
    city_name = django_filters.CharFilter(
        field_name='city__name',
        lookup_expr='icontains',
        label='City name (case-insensitive)',
    )

    class Meta:
        model = Property
        fields = {
            'city':       ['exact'],
            'university': ['exact'],
            'owner':      ['exact'],
        }


# ---------------------------------------------------------------------------
# ViewSets
# ---------------------------------------------------------------------------

class AmenityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]


class UniversityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer


class PropertyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return (
            request.user
            and request.user.is_authenticated
            and (request.user.role == 'MAKLER' or request.user.is_staff)
        )

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff or obj.owner == request.user


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = (
        Property.objects
        .select_related('city', 'university', 'owner')
        .prefetch_related('images', 'rooms')
        .all()
    )
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = PropertyFilter          # ← custom FilterSet (replaces filterset_fields)
    search_fields   = ['name', 'address', 'description', 'city__name']
    ordering_fields = ['created_at', 'distance_to_uni']
    ordering        = ['-created_at']
    permission_classes = [PropertyPermission]

    def perform_create(self, serializer):
        property_obj = serializer.save(owner=self.request.user)
        gallery_images = self.request.FILES.getlist('gallery_images')
        for image in gallery_images:
            PropertyImage.objects.create(property=property_obj, image=image)

        price = self.request.data.get('price', 0)
        Room.objects.create(
            property=property_obj,
            room_type='entire',
            name='Butun uy/kvartira',
            price_per_month=price,
            available_from=datetime.date.today(),
        )

    def perform_update(self, serializer):
        property_obj = serializer.save()
        
        gallery_images = self.request.FILES.getlist('gallery_images')
        if gallery_images:
            property_obj.images.all().delete()
            for image in gallery_images:
                from .models import PropertyImage # in case not imported locally, wait it's imported at top
                PropertyImage.objects.create(property=property_obj, image=image)

        price = self.request.data.get('price')
        room_type = self.request.data.get('room_type')
        if price or room_type:
            room = property_obj.rooms.first()
            if not room:
                from .models import Room
                import datetime
                room = Room(property=property_obj, available_from=datetime.date.today(), name='Butun uy/kvartira')
            if price:
                room.price_per_month = price
            if room_type:
                room.room_type = room_type
            room.save()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PropertyDetailSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PropertyCreateSerializer
        return PropertyListSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# ---------------------------------------------------------------------------

class BookingRequestViewSet(viewsets.ModelViewSet):
    serializer_class   = BookingRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.role == 'MAKLER':
            return BookingRequest.objects.filter(property__owner=user)
        return BookingRequest.objects.filter(tenant=user)

    def create(self, request, *args, **kwargs):
        property_id = request.data.get('property')
        if not property_id:
            return Response(
                {"error": "Property ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if BookingRequest.objects.filter(
            property_id=property_id, tenant=request.user, status='pending'
        ).exists():
            return Response(
                {"error": "Siz allaqachon ushbu uyga so'rov yuborgansiz."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(tenant=request.user, status='pending')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
