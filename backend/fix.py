import json

with open('valid_ids.json', 'r') as f:
    valid_ids = json.load(f)

content = f"""import os
import django
import random
from decimal import Decimal
from datetime import timedelta
from django.utils import timezone

# Exactly 48 100% Verified Working Unique Architectural/House/Interior Unsplash IDs
# This guarantees 100% no-duplicate, authentic real-estate images that do not 404!
ALL_UNIQUE_POOL = {repr(valid_ids)}
random.shuffle(ALL_UNIQUE_POOL)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from users.models import User, UserRole
from listings.models import City, University, Amenity, Property, Room, PropertyImage

def run():
    User.objects.exclude(is_superuser=True).delete()
    Property.objects.all().delete()
    University.objects.all().delete()
    City.objects.all().delete()
    Amenity.objects.all().delete()

    admin, _ = User.objects.get_or_create(username='superadmin')
    admin.set_password('admin123!')
    admin.email = 'foziljonislomjonov486@gmail.com'
    admin.is_superuser = True
    admin.is_staff = True
    admin.role = UserRole.ADMIN
    admin.save()

    cities_data = [
        {{'name': 'Toshkent', 'lat': 41.2995, 'lon': 69.2401}},
        {{'name': 'Samarqand', 'lat': 39.6270, 'lon': 66.9750}},
        {{'name': 'Buxoro', 'lat': 39.7714, 'lon': 64.4283}},
        {{'name': 'Namangan', 'lat': 40.9983, 'lon': 71.6726}},
        {{'name': 'Andijon', 'lat': 40.7821, 'lon': 72.3442}},
        {{'name': 'Farg\\'ona', 'lat': 40.3842, 'lon': 71.7843}},
        {{'name': 'Nukus', 'lat': 42.4619, 'lon': 59.6166}},
        {{'name': 'Urganch', 'lat': 41.5500, 'lon': 60.6333}},
        {{'name': 'Termiz', 'lat': 37.2286, 'lon': 67.2751}},
        {{'name': 'Qarshi', 'lat': 38.8667, 'lon': 65.8000}},
        {{'name': 'Guliston', 'lat': 40.4939, 'lon': 68.7803}},
        {{'name': 'Jizzax', 'lat': 40.1158, 'lon': 67.8422}},
        {{'name': 'Navoiy', 'lat': 40.0844, 'lon': 65.3792}},
        {{'name': 'Xiva', 'lat': 41.3783, 'lon': 60.3639}},
    ]
    city_objs = []
    for c in cities_data:
        city, _ = City.objects.get_or_create(name=c['name'])
        city_objs.append(city)

    toshkent = City.objects.get(name='Toshkent')
    samarqand = City.objects.get(name='Samarqand')

    uni_uzmu, _ = University.objects.get_or_create(name="O'zbekiston Milliy Universiteti", city=toshkent)
    uni_tiu, _ = University.objects.get_or_create(name="Toshkent Islom Universiteti", city=toshkent)
    uni_samdu, _ = University.objects.get_or_create(name="Samarqand Davlat Universiteti", city=samarqand)
    universities = [uni_uzmu, uni_tiu, uni_samdu]

    amenities = [
        Amenity.objects.get_or_create(name='Wi-Fi', icon='wifi')[0],
        Amenity.objects.get_or_create(name='Konditsioner', icon='wind')[0],
        Amenity.objects.get_or_create(name='Kir yuvish mashinasi', icon='droplet')[0],
        Amenity.objects.get_or_create(name='Mebel', icon='sofa')[0],
    ]

    titles = ["Shinam xonadon", "Talabalar uchun qulay uy", "Markazdagi kvartira", "Hovli ijaraga beriladi"]

    prop_idx = 1
    for city in city_objs:
        for j in range(1):
            uni = random.choice(universities) if prop_idx % 2 == 0 else None
            
            main_id = ALL_UNIQUE_POOL.pop()
            main_img = f'https://images.unsplash.com/{{main_id}}?auto=format&fit=crop&w=1200&q=80'
            
            prop = Property.objects.create(
                name=f"{{random.choice(titles)}} #{{prop_idx}} ({{city.name}})",
                city=city,
                university=uni,
                owner=admin,
                address=f"{{city.name}}, Ko'cha {{prop_idx}}, {{prop_idx}}-uy",
                description="Barcha sharoitlari bilan talabalar uchun ajoyib imkoniyat.",
                latitude=Decimal(random.uniform(41.1, 41.5)),
                longitude=Decimal(random.uniform(69.1, 69.5)),
                main_image=main_img,
                distance_to_uni=random.randint(100, 3000),
            )

            for _ in range(random.randint(2, 4)):
                prop.amenities.add(random.choice(amenities))

            for k in range(2):
                gal_id = ALL_UNIQUE_POOL.pop()
                img_url = f'https://images.unsplash.com/{{gal_id}}?auto=format&fit=crop&w=1200&q=80'
                PropertyImage.objects.create(property=prop, image=img_url)

            Room.objects.create(
                property=prop,
                room_type=random.choice(['entire', 'private', 'shared']),
                name=f"Xona {{prop_idx}}",
                price_per_month=Decimal(random.randint(150, 450) * 10000),
                available_from=timezone.now().date(),
                is_available=True
            )
            prop_idx += 1
    
if __name__ == "__main__":
    run()
"""

with open('seed_test_data.py', 'w') as f:
    f.write(content)
