import codecs
import re

with codecs.open('seed_test_data.py', 'r', 'utf-8') as f:
    text = f.read()

pop_logic = """    img_counter = 0
    prop_idx = 1
    for city in city_objs:
        for j in range(5):
            uni = random.choice(universities) if prop_idx % 2 == 0 else None
            
            main_id = ALL_UNIQUE_POOL[img_counter % len(ALL_UNIQUE_POOL)]
            img_counter += 1
            main_img = f'https://images.unsplash.com/{main_id}?auto=format&fit=crop&w=1200&q=80'
            
            prop = Property.objects.create(
                name=f"{random.choice(titles)} #{prop_idx} ({city.name})",
                city=city,
                university=uni,
                owner=admin,
                address=f"{city.name}, Ko'cha {prop_idx}, {prop_idx}-uy",
                description="Barcha sharoitlari bilan talabalar uchun ajoyib imkoniyat.",
                latitude=Decimal(random.uniform(41.1, 41.5)),
                longitude=Decimal(random.uniform(69.1, 69.5)),
                main_image=main_img,
                distance_to_uni=random.randint(100, 3000),
            )

            for _ in range(random.randint(2, 4)):
                prop.amenities.add(random.choice(amenities))

            for k in range(2):
                gal_id = ALL_UNIQUE_POOL[img_counter % len(ALL_UNIQUE_POOL)]
                img_counter += 1
                img_url = f'https://images.unsplash.com/{gal_id}?auto=format&fit=crop&w=1200&q=80'
                PropertyImage.objects.create(property=prop, image=img_url)

            Room.objects.create(
                property=prop,
                room_type=random.choice(['entire', 'private', 'shared']),
                name=f"Xona {prop_idx}",
                price_per_month=Decimal(random.randint(150, 450) * 10000),
                available_from=timezone.now().date(),
                is_available=True
            )
            prop_idx += 1
"""

start_idx = text.find('    prop_idx = 1')
end_idx = text.find('if __name__ == "__main__":')

new_text = text[:start_idx] + pop_logic + '    \n' + text[end_idx:]

with codecs.open('seed_test_data.py', 'w', 'utf-8') as f:
    f.write(new_text)
