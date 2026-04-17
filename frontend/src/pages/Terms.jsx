import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { FileText } from 'lucide-react';

const Section = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-extrabold text-secondary mb-4">{title}</h2>
        <div className="space-y-3 text-gray-600 leading-relaxed">{children}</div>
    </div>
);

const Terms = () => (
    <MainLayout>
        <section className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-16">
            <div className="container max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                    <FileText size={16} /> Huquqiy hujjat
                </div>
                <h1 className="text-4xl font-black mb-4">Foydalanish shartlari</h1>
                <p className="text-gray-300">Oxirgi yangilanish: 1 aprel 2026</p>
            </div>
        </section>

        <section className="py-16">
            <div className="container max-w-3xl">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10">
                    <p className="text-amber-800 leading-relaxed text-sm">
                        ⚠️ Platformadan foydalanish orqali siz ushbu shartlar bilan to'liq kelishganingizni tasdiqlaysiz. Iltimos, ro'yxatdan o'tishdan oldin diqqat bilan o'qing.
                    </p>
                </div>

                <Section title="1. Umumiy qoidalar">
                    <p>TalabaUy (bundan buyon "Platforma" deb ataladi) — O'zbekistondagi talabalar uchun uy-joy topish xizmatini ko'rsatuvchi raqamli platforma. Platformadan foydalanish uchun foydalanuvchi 18 yoshdan katta bo'lishi yoki qonuniy vakili ruxsatiga ega bo'lishi shart.</p>
                    <p>Platforma ushbu shartlarni istalgan vaqtda o'zgartirish huquqini saqlab qoladi. O'zgarishlar foydalanuvchilarga elektron pochta yoki saytda xabar qilish orqali ma'lum qilinadi.</p>
                </Section>

                <Section title="2. Ro'yxatdan o'tish va hisob">
                    <p>Foydalanuvchi to'g'ri va to'liq ma'lumotlarni kiritishi shart. Yolg'on ma'lumot berish hisob bloklanishiga olib kelishi mumkin. Ro'yxatdan o'tish bepul va ixtiyoriydir.</p>
                    <p>Hisobingizning xavfsizligi uchun siz javobgarsiz. Parolingizni boshqalarga bermang. Hisobingiz ruxsatsiz foydalanilgani haqida bizga darhol xabar bering.</p>
                </Section>

                <Section title="3. E'lon qo'yish qoidalari">
                    <p>Uy egalari va maklerlar faqat haqiqiy, mavjud mulklar uchun e'lon qo'yishi mumkin. Quyidagi hollarda e'lon o'chiriladi va hisob bloklanadi:</p>
                    <ul className="list-disc list-inside space-y-1.5 ml-4">
                        <li>Soxta yoki mavjud bo'lmagan uy e'loni</li>
                        <li>Aldamchi narxlar yoki noto'g'ri ma'lumotlar</li>
                        <li>Boshqa foydalanuvchilarning rasm va matnlarini o'g'irlash</li>
                        <li>Bir mulk uchun bir nechta takroriy e'lonlar</li>
                    </ul>
                </Section>

                <Section title="4. Taqiqlangan harakatlar">
                    <p>Platformada quyidagi harakatlar qat'iyan man etiladi:</p>
                    <ul className="list-disc list-inside space-y-1.5 ml-4">
                        <li>Firibgarlik, aldash yoki boshqa foydalanuvchini chalg'itish</li>
                        <li>Platformaning texnik zaifliklarini suiiste'mol qilish</li>
                        <li>Avtomatik usullar (botlar) bilan ma'lumot jig'ilish</li>
                        <li>Boshqa foydalanuvchilarga bezovtalik qilish yoki tahdid solish</li>
                        <li>Noqonuniy faoliyatni targ'ib qilish</li>
                    </ul>
                </Section>

                <Section title="5. Mas'uliyatning chegaralari">
                    <p>TalabaUy — vositachi platforma. U uy egalari va talabalar o'rtasidagi shartnomalarga to'g'ridan-to'g'ri mas'ul emas. Platforma e'lonlarning haqiqiyligini tekshirishga harakat qilsa-da, barcha ma'lumotlar uchun kafolat bera olmaydi.</p>
                    <p>Ijaradagi nizolar uy egasi va ijara oluvchi o'rtasida hal etilishi kerak. Platforma vositachilik xizmatini ko'rsatishga harakat qiladi, lekin yuridik javobgarlikni o'z zimmasiga olmaydi.</p>
                </Section>

                <Section title="6. Hisob o'chirish">
                    <p>Foydalanuvchi istalgan vaqtda o'z hisobini o'chirishi mumkin. Hisob o'chirilganda barcha shaxsiy ma'lumotlar platformadan o'chiriladi. Saqlangan e'lonlar va muloqot tarixi ham o'chiriladi.</p>
                    <p>Platforma qoidalarni buzgan foydalanuvchilarning hisobini ogohlantirishsiz bloklash yoki o'chirish huquqini saqlab qoladi.</p>
                </Section>

                <Section title="7. Aloqa">
                    <p>Foydalanish shartlari bo'yicha savollar uchun:</p>
                    <p>📧 <a href="mailto:foziljonislomjonov486@gmail.com" className="text-primary font-bold hover:underline">foziljonislomjonov486@gmail.com</a></p>
                </Section>
            </div>
        </section>
    </MainLayout>
);

export default Terms;
