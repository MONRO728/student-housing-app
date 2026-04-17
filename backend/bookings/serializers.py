from rest_framework import serializers
from .models import Booking, Review
from listings.serializers import RoomSerializer


class BookingSerializer(serializers.ModelSerializer):
    room = RoomSerializer(read_only=True)
    user = serializers.StringRelatedField()

    class Meta:
        model = Booking
        fields = [
            "id",
            "user",
            "room",
            "start_date",
            "end_date",
            "status",
            "created_at",
        ]


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id", "room", "start_date", "end_date"]


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Review
        fields = ["id", "user", "property", "rating", "comment", "created_at"]
        read_only_fields = ["user", "created_at"]
