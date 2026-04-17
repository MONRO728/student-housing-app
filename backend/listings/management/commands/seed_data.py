import random
import urllib.request
from datetime import date, timedelta
from django.core.management.base import BaseCommand
from listings.models import City, University, Amenity, Property, Room, PropertyImage
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = "Seeds the database with massive amounts of Uzbekistan student housing data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Ma'lumotlar bazasini tozalash...")
        Room.objects.all().delete()
        PropertyImage.objects.all().delete()
        Property.objects.all().delete()
        University.objects.all().delete()
        City.objects.all().delete()
        Amenity.objects.all().delete()

        self.stdout.write("Avtomatik yaratish boshlandi...")

        # 1. Superuser
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@talabauy.uz", "admin123")

        # 2. Amenities
        amenity_data = [
            ("Wi-Fi", "wifi"), ("Kir yuvish mashinasi", "washing-machine"), 
            ("Oshxona", "utensils"), ("Konditsioner", "wind"),
            ("Isitish tizimi", "thermometer"), ("Stol-stul", "monitor"),
            ("Xavfsizlik", "shield-check"), ("Avtoturargoh", "car"),
            ("Televizor", "tv"), ("Kutubxona xonasi", "book-open"),
            ("Sportzal", "dumbbell"), ("Bolalar maydonchasi", "smile")
        ]
        amenities = []
        for name, icon in amenity_data:
            am, _ = Amenity.objects.get_or_create(name=name, icon=icon)
            amenities.append(am)

        # 3. Cities & Universities & Coordinates
        locations_data = {
            "Toshkent": {
                "coords": (41.2995, 69.2401),
                "desc": "Poytaxtimiz markazi, eng ko'p ta'lim dargohlari va imkoniyatlar shahri.",
                "districts": ["Chilonzor", "Yunusobod", "Mirzo Ulug'bek", "Yakkasaroy", "Sergeli", "Olmazor", "Shayxontohur", "Mirobod"],
                "unis": [
                    "O‘zbekiston milliy universiteti (O'zMU)", "Toshkent davlat texnika universiteti (TDTU)",
                    "Toshkent tibbiyot akademiyasi (TMA)", "Jahon iqtisodiyoti va diplomatiya universiteti (JIDU)",
                    "Vestminster xalqaro universiteti (WIUT)", "Toshkent axborot texnologiyalari universiteti (TATU)",
                    "Toshkent davlat sharqshunoslik universiteti", "Toshkent moliya instituti"
                ]
            },
            "Samarqand": {
                "coords": (39.6270, 66.9749),
                "desc": "Boy tarix va ilg'or ilm-fan uchrashadigan qadimiy shahar.",
                "districts": ["Siyob", "Bog'ishamol", "Temiryo'l", "So'g'diyona", "Qorasuv"],
                "unis": ["Samarqand davlat universiteti (SamDU)", "Samarqand tibbiyot instituti", "Samarqand iqtisodiyot instituti", "Samarqand arxitektura instituti"]
            },
            "Buxoro": {
                "coords": (39.7681, 64.4210),
                "desc": "Sharq gavhari, zamonaviy talabalar uchun maxsus sokin muhit.",
                "districts": ["Markaz", "Sharq", "G'ijduvon", "Ibn Sino", "Kogon"],
                "unis": ["Buxoro davlat universiteti (BuxDU)", "Buxoro muhandislik-texnologiya instituti", "Buxoro davlat tibbiyot instituti"]
            },
            "Andijon": {
                "coords": (40.7821, 72.3442),
                "desc": "Vodiyning eng yirik yoshlar va ta'lim markazlaridan biri.",
                "districts": ["Eski shahar", "Yangi bozor", "Shodlik", "Bog'ishamol"],
                "unis": ["Andijon davlat universiteti (ADU)", "Andijon tibbiyot instituti", "Andijon qishloq xo'jaligi instituti"]
            },
            "Namangan": {
                "coords": (40.9983, 71.6726),
                "desc": "Gullar shahri va faol talabalar maskani.",
                "districts": ["Davlatobod", "Yangi Namangan", "Chortoq yo'li"],
                "unis": ["Namangan davlat universiteti (NamDU)", "Namangan muhandislik-texnologiya instituti"]
            },
            "Farg‘ona": {
                "coords": (40.3842, 71.7843),
                "desc": "Sokinlik va chiroy namunasi bo'lgan vodiy markazi.",
                "districts": ["Markaziy", "Kirgili", "Ahmad Yassaviy", "Qirguli"],
                "unis": ["Farg'ona davlat universiteti (FarDU)", "Farg'ona politexnika instituti", "Farg'ona jamoat salomatligi tibbiyot instituti"]
            },
            "Qashqadaryo": {
                "coords": (38.8617, 65.7951),
                "desc": "Qarshi shahri - vohaning ta'lim va rivojlanish yuragi.",
                "districts": ["Qarshi markazi", "Mahallot", "Nasaf", "Otchopar"],
                "unis": ["Qarshi davlat universiteti (QarDU)", "Qarshi muhandislik-iqtisodiyot instituti"]
            },
            "Surxondaryo": {
                "coords": (37.2286, 67.2751),
                "desc": "Termiz shahri, janubiy o'lkaning asosiy ilm darchasi.",
                "districts": ["Termiz markazi", "Alpomish", "Sharq", "Dostlik"],
                "unis": ["Termiz davlat universiteti (TerDU)"]
            },
            "Xorazm": {
                "coords": (41.5500, 60.6333),
                "desc": "Urganch shahri - zamonaviy talaba uchun qadim o'choq.",
                "districts": ["Urganch markazi", "Jaloliddin Manguberdi", "Al-Xorazmiy"],
                "unis": ["Urganch davlat universiteti (UrDU)", "TMA Urganch filiali"]
            },
            "Navoiy": {
                "coords": (40.0844, 65.3792),
                "desc": "O'zbekistonning eng yosh va orasta shahri.",
                "districts": ["Navoiy markazi", "Zarafshon", "Tinchlik"],
                "unis": ["Navoiy davlat pedagogika instituti", "Navoiy davlat konchilik instituti"]
            },
            "Jizzax": {
                "coords": (40.1158, 67.8422),
                "desc": "Iqtisodiy rivojlanish markazidagi qulay talabalar uylari.",
                "districts": ["Jizzax markazi", "Zargarlik", "Sayxon"],
                "unis": ["Jizzax davlat pedagogika universiteti (JDPU)", "Jizzax politexnika instituti"]
            },
            "Sirdaryo": {
                "coords": (40.4897, 68.7842),
                "desc": "Guliston shahri, markazga yaqin qulay yashash joylari.",
                "districts": ["Guliston markazi", "Yangihayot", "Bahor"],
                "unis": ["Guliston davlat universiteti (GulDU)"]
            },
            "Qoraqalpog‘iston": {
                "coords": (42.4611, 59.6166),
                "desc": "Nukus shahri - shimoliy ta'lim maskanlarining eng kattasi.",
                "districts": ["Nukus markazi", "Turon", "Qoraqalpoq"],
                "unis": ["Qoraqalpoq davlat universiteti (QDU)", "Nukus davlat pedagogika instituti"]
            }
        }

        created_cities = {}
        created_unis = {}

        for city_name, data in locations_data.items():
            city, _ = City.objects.get_or_create(name=city_name, defaults={"description": data["desc"]})
            created_cities[city_name] = city
            for uni_name in data["unis"]:
                uni, _ = University.objects.get_or_create(name=uni_name, city=city)
                created_unis[uni_name] = uni

        # 4. Property Generation Pools
        adjectives = ["Zamonaviy", "Qulay", "Shinam", "Premium", "Arzon", "Yangi", "Keng", "Yorug'", "Smart", "Talabalar uchun", "Ekstra", "Tinch"]
        noun_types = ["kvartira", "xona", "yotoqxona", "turar joy", "apartament", "hovli", "xostel", "guest house"]
        
        desc_parts = [
            "Ushbu bino Oliy o'quv yurtiga juda yaqin joylashgan.",
            "Uyda barcha kerakli jihozlar va mebellar mavjud.",
            "Faqat tartibli va toza saqlaydigan talabalar uchun ijaraga beriladi.",
            "Tinch va osoyishta mahalla, qo'shnilar juda yaxshi insonlar.",
            "Derazadan chiroyli manzara ko'rinadi va quyosh nuri yaxshi tushadi.",
            "Yaqin atrofda supermarket, bozor va transport bekatlari bor.",
            "Uy yaqinda to'liq evro ta'mirdan chiqqan.",
            "Internet tezligi juda yuqori, o'qish uchun barcha sharoit muhayyo."
        ]

        # Authentic looking interior images keywords
        house_keywords = ["livingroom", "bedroom", "apartment", "interior", "modern,house", "cozy,room", "furniture"]

        total_properties = 150
        cities_keys = list(locations_data.keys())

        for i in range(total_properties):
            # Select random location
            city_name = random.choice(cities_keys)
            city_info = locations_data[city_name]
            city_obj = created_cities[city_name]
            
            district = random.choice(city_info["districts"])
            uni_name = random.choice(city_info["unis"])
            uni_obj = created_unis[uni_name]
            
            # Title
            title = f"{district}dagi {random.choice(adjectives).lower()} {random.choice(noun_types)}"
            if random.random() > 0.5:
                title = f"{random.choice(adjectives)} {random.choice(noun_types)} - {district}"

            # Location coord variation (jitter around city center)
            lat = city_info["coords"][0] + (random.random() - 0.5) * 0.08
            lng = city_info["coords"][1] + (random.random() - 0.5) * 0.08

            # Description (2-4 sentences)
            description = " ".join(random.sample(desc_parts, random.randint(2, 4)))
            
            # Distance
            distance = random.randint(100, 4500)
            
            # Main image - Using LoremFlickr for reliability and relevance
            keyword = random.choice(house_keywords)
            main_img_url = f"https://loremflickr.com/800/600/{keyword}/all?lock={i}"
            
            prop = Property.objects.create(
                name=title.capitalize(),
                city=city_obj,
                university=uni_obj,
                address=f"{city_name}, {district} tumani, {random.randint(1, 150)}-uy",
                description=description,
                latitude=round(lat, 6),
                longitude=round(lng, 6),
                distance_to_uni=distance,
                main_image=main_img_url
            )

            # Assign random amenities
            chosen_amenities = random.sample(amenities, random.randint(4, 10))
            prop.amenities.set(chosen_amenities)

            # CREATE IMAGES (3-5 extra)
            num_images = random.randint(3, 5)
            for j in range(num_images):
                keyword = random.choice(house_keywords)
                img_url = f"https://loremflickr.com/800/600/{keyword}/all?lock={i * 10 + j}"
                PropertyImage.objects.create(property=prop, image=img_url)

            # CREATE ROOMS
            room_count = random.randint(1, 3)
            room_options = [
                ('private', 'Shaxsiy xona, alohida', random.randint(120, 250) * 10000),
                ('shared', '2 kishilik umumiy xona', random.randint(80, 150) * 10000),
                ('shared', '3 kishilik umumiy xona', random.randint(50, 100) * 10000),
                ('shared', '4 kishilik xona', random.randint(40, 70) * 10000),
                ('entire', 'Butun bir xonali kvartira (1 xonali)', random.randint(200, 350) * 10000),
                ('entire', 'Butun kvartira sharoitli (2 xonali)', random.randint(300, 450) * 10000)
            ]

            chosen_rooms = random.sample(room_options, room_count)
            for r_type, r_name, r_price in chosen_rooms:
                Room.objects.create(
                    property=prop,
                    room_type=r_type,
                    name=r_name,
                    price_per_month=r_price,
                    available_from=date.today() + timedelta(days=random.randint(0, 45)),
                    is_available=random.random() > 0.1 # 90% available
                )

        self.stdout.write(self.style.SUCCESS(f"\n✅ Baza tayyor! Jami {total_properties} ta bino (listing) barcha viloyatlar bo'yicha yaratildi."))

