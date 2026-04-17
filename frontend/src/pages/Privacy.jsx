import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Shield } from 'lucide-react';

const Section = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-extrabold text-secondary mb-4">{title}</h2>
        <div className="space-y-3 text-gray-600 leading-relaxed">{children}</div>
    </div>
);

const Privacy = () => (
    <MainLayout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-16">
            <div className="container max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                    <Shield size={16} /> Maxfiylik
                </div>
                <h1 className="text-4xl font-black mb-4">Maxfiylik siyosati</h1>
                <p className="text-gray-300">Oxirgi yangilanish: 1 aprel 2026</p>
            </div>
        </section>

        <section className="py-16">
            <div className="container max-w-3xl">
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-10">
                    <p className="text-gray-700 leading-relaxed">
                        TalabaUy platformasi foydalanuvchilarning shaxsiy ma'lumotlarini himoya qilishni o'z zimmasiga oladi. Ushbu siyosat qanday ma'lumotlar to'planishi va ulardan qanday foydalanilishi haqida batafsil ma'lumot beradi.
                    </p>
                </div>

                <Section title="1. Qanday ma'lumotlar to'planadi?">
                    <p>Platforma quyidagi ma'lumotlarni to'playdi:</p>
                    <ul className="list-disc list-inside space-y-1.5 ml-4">
                        <li>Ism, familiya va foydalanuvchi nomi</li>
                        <li>Elektron pochta manzili va telefon raqami</li>
                        <li>Profil rasmi (foydalanuvchi ixtiyorida)</li>
                        <li>Saqlangan e'lonlar va platforma faoliyati</li>
                        <li>Qurilma va brauzer ma'lumotlari (texnik maqsadlar uchun)</li>
                    </ul>
                </Section>

                <Section title="2. Ma'lumotlar qanday maqsadda ishlatiladi?">
                    <p>To'plangan ma'lumotlar faqat quyidagi maqsadlar uchun ishlatiladi:</p>
                    <ul className="list-disc list-inside space-y-1.5 ml-4">
                        <li>Foydalanuvchi hisobini boshqarish va autentifikatsiya</li>
                        <li>Platformaning asosiy funksiyalarini ta'minlash</li>
                        <li>Qidiruv natijalarini personalizatsiya qilish</li>
                        <li>Xavfsizlik va firibgarlikning oldini olish</li>
                        <li>Platforma sifatini yaxshilash bo'yicha tahlillar</li>
                    </ul>
                </Section>

                <Section title="3. Ma'lumotlar uchinchi shaxslarga beriladimi?">
                    <p>TalabaUy sizning shaxsiy ma'lumotlaringizni tijorat maqsadida uchinchi shaxslarga sotmaydi yoki bermaydi. Faqat quyidagi holatlarda ma'lumotlar ulashilishi mumkin:</p>
                    <ul className="list-disc list-inside space-y-1.5 ml-4">
                        <li>Qonuniy talablar asosida (sud buyrug'i va hokazo)</li>
                        <li>Platformani texnik ta'minlash uchun ishonchli xizmat ko'rsatuvchilar bilan (bu xizmat ko'rsatuvchilar maxfiylik shartnomasi asosida ishlaydi)</li>
                    </ul>
                </Section>

                <Section title="4. Cookie fayllar">
                    <p>Platforma cookie fayllardan foydalanadi. Cookie — bu brauzeringizda saqlanadigan kichik fayl. Ular platformaga kirishingizni osonlashtiradi va siz oldindan ko'rgan variantlarni eslab qoladi. Brauzer sozlamalaringizdan cookie fayllarni o'chirish yoki bloklash mumkin.</p>
                </Section>

                <Section title="5. Ma'lumotlarni himoya qilish">
                    <p>Biz siz ishonchingizbilan topshirgan ma'lumotlarni quyidagi usullar bilan himoya qilamiz:</p>
                    <ul className="list-disc list-inside space-y-1.5 ml-4">
                        <li>HTTPS orqali shifrlangan aloqa</li>
                        <li>Parollar hash formatida saqlanadi — hech kim ko'ra olmaydi</li>
                        <li>Serverlar muntazam zaxiralanadi va monitoring qilinadi</li>
                        <li>Faqat vakolatli xodimlar ma'lumotlarga kirish huquqiga ega</li>
                    </ul>
                </Section>

                <Section title="6. Foydalanuvchi huquqlari">
                    <p>Siz istalgan vaqtda quyidagi huquqlarga egasiz:</p>
                    <ul className="list-disc list-inside space-y-1.5 ml-4">
                        <li>Shaxsiy ma'lumotlaringizni ko'rish va tahrirlash</li>
                        <li>Hisobingizni va barcha ma'lumotlaringizni o'chirish</li>
                        <li>Marketing xabarnomalaridan voz kechish</li>
                        <li>Ma'lumotlaringiz haqida so'rov yuborish</li>
                    </ul>
                </Section>

                <Section title="7. Bog'lanish">
                    <p>Maxfiylik siyosati bo'yicha savollaringiz bo'lsa, bizga murojaat qiling:</p>
                    <p>📧 <a href="mailto:foziljonislomjonov486@gmail.com" className="text-primary font-bold hover:underline">foziljonislomjonov486@gmail.com</a></p>
                    <p>📞 <a href="tel:+998940987005" className="text-primary font-bold hover:underline">+998 94 098 70 05</a></p>
                </Section>
            </div>
        </section>
    </MainLayout>
);

export default Privacy;
