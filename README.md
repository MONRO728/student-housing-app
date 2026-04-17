# TalabaUy - Talabalar uchun uy-joy platformasi

TalabaUy — O'zbekistonda talabalarga o'z universitetlariga yaqin, arzon va qulay ijaraga uylar va xonalarni topishga yordam beruvchi zamonaviy veb-dastur.

## 🌟 Asosiy Imkoniyatlar
- 🏠 **Uy qidirish va Filtrlash**: Talabalar uchun kvartiralar, shaxsiy yoki umumiy xonalarni qulay tarzda qidirish.
- 🤖 **Sun'iy Intellekt Chatboti**: Saytning o'zida Google Gemini AI (2.5 Flash) yordamida uylarni o'zbek tilida (oddiy suhbatlashish orqali) qidirish qobiliyati. Chatbot bevosita ma'lumotlar bazasiga ulangan.
- 📍 **Xarita**: Uylarning qayerda joylashganini interaktiv xaritada ko'rish.
- 🔐 **Xavfsiz tizim**: Foydalanuvchilarning ro'yxatdan o'tishi va tizimga kirishi (JWT autentifikatsiyasi).
- 📱 **Qulay dizayn (Responsive)**: Telefon, planshet va kompyuterlarda birdek chiroyli ishlash imkoniyati (React va Tailwind CSS).
- 🛠️ **Admin Panel**: Uylar, foydalanuvchilar va buyurtmalarni oson boshqarish.

## 🚀 Qanday ishga tushiriladi?

Loyihani ishga tushirish uchun qiyin kodlar yozish shart emas! Maxsus yordamchi fayl tayyorlab qo'yilgan.

### Bitta tugma bilan ishga tushirish:
Loyiha papkasidagi **`ishga-tushirish.bat`** fayli ustiga ikki marta bosing. Ushbu fayl o'zi avtomatik tarzda:
1. Orqa fon (Backend) serverini yoqadi.
2. Old fon (Frontend) serverini yoqadi.
3. Hammasi tayyor bo'lgach brauzerda manzillarni chiqaradi:
   - **Vebsayt:** `http://localhost:5173`
   - **Admin Panel:** `http://localhost:8000/admin`

### Qo'lda ishga tushirish (Dasturchilar uchun)
**Backend (Django):**
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

**Frontend (React):**
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Xavfsizlik va API kalitlari
Loyihaning asosiy papkasida `.env` nomli fayl yaratilgan bo'lishi kerak. Uning ichida xavfsizlik kalitlari va Chatbot ishlashi uchun Gemini API kaliti kiritiladi:
```env
GEMINI_API_KEY=sizning_gemini_api_kalitingiz
DJANGO_SECRET_KEY=maxfiy_kalit
```
*(Eslatma: `.env` fayli maxfiylikni saqlash maqsadida GitHub ga yuklanmaydi, uni o'zingiz qo'lda kiritishingiz kerak).*
