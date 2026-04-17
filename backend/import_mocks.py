import os
import sys
import json
import django
from datetime import timedelta
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from users.models import User, UserRole
from listings.models import City, University, Amenity, Property, Room, PropertyImage

def run():
    print("MOCK_LISTINGS ni import qilish boshlandi...")
    
    with open('../frontend/mocks.json', 'r', encoding='utf-8') as f:
        mocks = json.load(f)

    print(f"Jami {len(mocks)} ta e'lon topildi.")

    # Get or create superadmin to own the imported properties
    admin, created = User.objects.get_or_create(username='superadmin', defaults={
        'email': 'foziljonislomjonov486@gmail.com',
        'role': UserRole.ADMIN,
        'is_superuser': True,
        'is_staff': True
    })
    if created:
        admin.set_password('admin123!')
        admin.save()
        print("Superadmin yaratildi.")

    # Track imported to avoid duplicates (idempotent)
    existing_count = 0
    imported_count = 0

    for mock in mocks:
        # Mock properties: id, name, city (slug), city_name, address, district, university, min_price, rooms, type, gender, description, amenities, main_image, images, latitude, longitude, distance_to_uni
        
        # Check if already imported
        if Property.objects.filter(name=mock['name'], address=mock['address']).exists():
            existing_count += 1
            continue

        # Get or Create City
        city, _ = City.objects.get_or_create(name=mock['city_name'])

        # Get or Create University
        uni = None
        if mock.get('university'):
            uni, _ = University.objects.get_or_create(name=mock['university'], defaults={'city': city})

        # Process Amenities
        amenity_objs = []
        for am in mock.get('amenities', []):
            am_obj, _ = Amenity.objects.get_or_create(name=am['name'], defaults={'icon': 'check'})
            amenity_objs.append(am_obj)

        prop = Property.objects.create(
            name=mock['name'],
            city=city,
            university=uni,
            owner=admin,
            address=mock['address'],
            description=mock['description'],
            latitude=mock['latitude'],
            longitude=mock['longitude'],
            main_image=mock['main_image'], # Storing URL directly
            distance_to_uni=mock['distance_to_uni'],
        )

        prop.amenities.set(amenity_objs)

        # Process Rooms
        Room.objects.create(
            property=prop,
            room_type='entire' if mock['type'] == 'Kvartira' else 'private',
            name=f"{mock['rooms']} xonali ({mock['gender']})",
            price_per_month=mock['min_price'],
            available_from=timezone.now().date(),
            is_available=True
        )

        # Process Gallery Images
        for img in mock.get('images', []):
            PropertyImage.objects.create(
                property=prop,
                image=img['image'] # Storing URL directly
            )

        imported_count += 1
        if imported_count % 50 == 0:
            print(f"... {imported_count} ta import qilindi")

    print(f"Import yakunlandi! Yangi: {imported_count}, Oldin bor edi: {existing_count}")

if __name__ == '__main__':
    run()
