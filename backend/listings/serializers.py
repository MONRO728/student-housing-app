from rest_framework import serializers
from .models import City, University, Amenity, Property, Room, PropertyImage

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = '__all__'

class PropertyImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PropertyImage
        fields = ['id', 'image']

    def get_image(self, obj):
        if not obj.image: return None
        if obj.image.name.startswith('http'):
            return obj.image.name
        request = self.context.get('request')
        if request: return request.build_absolute_uri(obj.image.url)
        return f'http://localhost:8000{obj.image.url}'

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class PropertyListSerializer(serializers.ModelSerializer):
    city = serializers.StringRelatedField()
    university = serializers.StringRelatedField()
    min_price = serializers.SerializerMethodField()
    main_image = serializers.SerializerMethodField()
    owner_username = serializers.SerializerMethodField()
    images = PropertyImageSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = ['id', 'name', 'city', 'university', 'address', 'latitude', 'longitude', 'main_image', 'images', 'distance_to_uni', 'min_price', 'owner_username']

    def get_min_price(self, obj):
        min_room = obj.rooms.order_by('price_per_month').first()
        return min_room.price_per_month if min_room else 0

    def get_main_image(self, obj):
        if not obj.main_image:
            return None
        if obj.main_image.name.startswith('http'):
            return obj.main_image.name
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.main_image.url)
        return f'http://localhost:8000{obj.main_image.url}'

    def get_owner_username(self, obj):
        return obj.owner.username if obj.owner else None

class PropertyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id', 'name', 'city', 'university', 'address', 'description', 'latitude', 'longitude', 'main_image', 'distance_to_uni', 'amenities']

class PropertyDetailSerializer(serializers.ModelSerializer):
    city = CitySerializer()
    university = UniversitySerializer()
    amenities = AmenitySerializer(many=True)
    images = PropertyImageSerializer(many=True)
    rooms = RoomSerializer(many=True)
    main_image = serializers.SerializerMethodField()
    owner_id = serializers.SerializerMethodField()
    owner_phone = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = '__all__'

    def get_main_image(self, obj):
        if not obj.main_image:
            return None
        if obj.main_image.name.startswith('http'):
            return obj.main_image.name
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.main_image.url)
        return f'http://localhost:8000{obj.main_image.url}'

    def get_owner_id(self, obj):
        return obj.owner.id if obj.owner else None

    def get_owner_phone(self, obj):
        return obj.owner.phone_number if obj.owner and hasattr(obj.owner, 'phone_number') else None

from .models import BookingRequest
class BookingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingRequest
        fields = '__all__'
        read_only_fields = ('tenant', 'status', 'created_at')
