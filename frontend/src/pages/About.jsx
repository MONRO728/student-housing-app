import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Target, Eye, Heart, Users, Home, GraduationCap } from 'lucide-react';

const StatCard = ({ number, label }) => (
    <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
        <p className="text-4xl font-black text-primary mb-2">{number}</p>
        <p className="text-gray-500 font-medium">{label}</p>
    </div>
);

const ValueCard = ({ icon, title, desc }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
        <div className="bg-primary/10 p-3 rounded-xl h-fit">{icon}</div>
        <div>
            <h3 className="font-bold text-secondary text-lg mb-2">{title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
        </div>
    </div>
);

const About = () => (
    <MainLayout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-20">
            <div className="container max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-sm font-medium">
                    <Home size={16} /> TalabaUy platformasi haqida
                </div>
                <h1 className="text-5xl font-black mb-6 leading-tight">
                    Talabalar uchun <span className="text-primary-light">eng yaxshi</span> uy topish platformasi
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    TalabaUy — O'zbekistondagi talabalar uchun maxsus yaratilgan raqamli platforma bo'lib, qulay, arzon va ishonchli uy-joy topishga yordam beradi.
                </p>
            </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-gray-50">
            <div className="container max-w-5xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard number="5,000+" label="Ro'yxatdan o'tgan talabalar" />
                    <StatCard number="1,200+" label="Faol e'lonlar" />
                    <StatCard number="13" label="Viloyat qamrovi" />
                    <StatCard number="98%" label="Mamnun foydalanuvchilar" />
                </div>
            </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
            <div className="container max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2.5 rounded-xl"><Target className="text-primary w-6 h-6" /></div>
                            <h2 className="text-2xl font-extrabold text-secondary">Missiyamiz</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Har bir talaba o'z o'qishiga to'liq e'tibor qarata olishi uchun ularga mos, xavfsiz va arzon yashash joyini topishda yordam berish. Biz uy qidirish jarayonini soddalashtirish va shaffof qilish orqali talabalar hayotini yaxshilashni maqsad qilganmiz.
                        </p>
                    </div>
                    <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-secondary/10 p-2.5 rounded-xl"><Eye className="text-secondary w-6 h-6" /></div>
                            <h2 className="text-2xl font-extrabold text-secondary">Viziyon</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            2030 yilga qadar O'zbekistondagi barcha talabalar uchun qulay va ishonchli yashash joyini ta'minlovchi №1 raqamli platforma bo'lish. Har bir shahardagi uy egasi va talaba o'rtasida to'g'ridan-to'g'ri, ishonchli bog'liqlik yaratish.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <h2 className="text-3xl font-extrabold text-secondary text-center mb-10">Qadriyatlarimiz</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <ValueCard icon={<Heart className="text-primary w-6 h-6" />} title="Talabalar manfaati birinchi" desc="Har bir qarorimizda talabalarning qulayligi, xavfsizligi va iqtisodiy imkoniyatlarini hisobga olamiz." />
                    <ValueCard icon={<Users className="text-primary w-6 h-6" />} title="Shaffoflik va ishonch" desc="Uy egalari bilan bo'ladigan barcha muloqot va shartlar ochiq va adolatli bo'lishini ta'minlaymiz." />
                    <ValueCard icon={<GraduationCap className="text-primary w-6 h-6" />} title="Ta'limga xizmat" desc="Yashash joyi muammolari talabalarga o'qishiga halaqit bermasligi uchun tezkor yechimlar taklif etamiz." />
                    <ValueCard icon={<Home className="text-primary w-6 h-6" />} title="Sifatli e'lonlar" desc="Barcha e'lonlar tekshirilgan va haqiqiy ma'lumotlarga asoslanadi. Soxta e'lonlarga chek qo'yamiz." />
                </div>
            </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-gray-50">
            <div className="container max-w-3xl">
                <h2 className="text-3xl font-extrabold text-secondary text-center mb-8">Bizning hikoyamiz</h2>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4 text-gray-600 leading-relaxed">
                    <p>
                        TalabaUy 2024-yilda Toshkentda talabalar tomonidan talabalar uchun tashkil etilgan. Asoschilari o'zlari talaba bo'lgan vaqtda uy topishning qanchalik qiyin ekanligini his qilishgan va bu muammoga zamonaviy yechim yaratishga qaror qilishgan.
                    </p>
                    <p>
                        Platforma dastlab faqat Toshkent shahri uchun ishlab chiqilgan bo'lsa-da, hozir u O'zbekistonning 13 ta viloyatini qamrab olgan va minglab talabalar va uy egalariga xizmat ko'rsatmoqda.
                    </p>
                    <p>
                        Bizning jamoamiz yosh dasturchilar, dizaynerlar va marketing mutaxassislaridan tashkil topgan bo'lib, barchasi bir maqsad sari — talabalar hayotini ozgina bo'lsa ham yengillashtirish yo'lida ishlaydi.
                    </p>
                </div>
            </div>
        </section>
    </MainLayout>
);

export default About;
