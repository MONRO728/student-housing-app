"""
seed_cities.py - Barcha 16 shaharni xavfsiz seed qiladi.

Ishlatish:
    python manage.py seed_cities

Xususiyatlari:
  - get_or_create - takroriy ishlatilsa duplicate yaratmaydi
  - Mavjud malumotlarni OCHIRMAYDI
  - Home.jsx dagi 16 ta shahar bilan TULIQ mos keladi
"""
from django.core.management.base import BaseCommand
from listings.models import City


# Home.jsx dagi FEATURED_CITIES bilan tuliq mos - bitta source of truth
CITIES = [
    "Toshkent",
    "Samarqand",
    "Buxoro",
    "Xiva",
    "Andijon",
    "Namangan",
    "Farg'ona",
    "Nukus",
    "Qarshi",
    "Termiz",
    "Guliston",
    "Jizzax",
    "Urganch",
    "Navoiy",
    "Qo'qon",
    "Denov",
]


class Command(BaseCommand):
    help = "Barcha 16 shaharni bazaga xavfsiz qo'shadi (mavjudlarni o'zgartirmaydi)"

    def handle(self, *args, **kwargs):
        self.stdout.write("Shaharlarni tekshirish boshlandi...\n")

        created_count = 0
        skipped_count = 0

        for name in CITIES:
            city, created = City.objects.get_or_create(name=name)
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f"  [YANGI] {city.name} (ID: {city.id})")
                )
            else:
                skipped_count += 1
                self.stdout.write(f"  [bor]   {city.name} (ID: {city.id})")

        self.stdout.write("\n" + "-" * 45)
        self.stdout.write(
            self.style.SUCCESS(
                f"Tayyor! Yangi: {created_count} | Bor edi: {skipped_count} | "
                f"Jami: {City.objects.count()} ta shahar"
            )
        )
