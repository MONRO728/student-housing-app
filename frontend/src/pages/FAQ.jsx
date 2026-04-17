import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
    {
        q: "TalabaUy platformasidan foydalanish bepulmi?",
        a: "Ha, talabalar uchun platforma to'liq bepul. Ro'yxatdan o'tish, uy qidirish va uy egasi bilan bog'lanish — barchasi tekin. Faqat premium e'lonlar uchun kichik to'lov mavjud, ammo oddiy uy topish uchun hech qanday to'lov talab etilmaydi.",
    },
    {
        q: "E'lonlarning haqiqiyligi qanday tekshiriladi?",
        a: "Barcha e'lonlar bizning moderatsiya jarayonimizdan o'tadi. Uy egalari hujjatlarini tasdiqlashlari shart. Shuningdek, foydalanuvchilar soxta yoki noto'g'ri e'lonlarni bizga xabar qilishlari mumkin — biz ularni 24 soat ichida ko'rib chiqamiz.",
    },
    {
        q: "Uy egasi bilan qanday bog'lanishim mumkin?",
        a: "Har bir e'lon sahifasida uy egasining telefon raqami va/yoki Telegram manzili ko'rsatilgan. Siz to'g'ridan-to'g'ri ular bilan bog'lanib, ko'rib chiqish uchun vaqt belgilashingiz mumkin. Platforma orqali ham xabar yuborish imkoniyati mavjud.",
    },
    {
        q: "Ijara bo'yicha muammo yuzaga kelsa nima qilaman?",
        a: "Agar uy egasi bilan muammo yuzaga kelsa, bizning qo'llab-quvvatlash xizmatimizga murojaat qiling. Biz vositachi sifatida muammoni hal etishga yordam beramiz. Shunigdek, shartnomangizni doimo saqlang — bu yuridik himoyangizni ta'minlaydi.",
    },
    {
        q: "Qaysi shaharlarda xizmat mavjud?",
        a: "Hozirda TalabaUy O'zbekistonning 13 ta viloyatini qamrab olgan: Toshkent, Samarqand, Buxoro, Namangan, Andijon, Farg'ona, Nukus, Urganch, Termiz, Qarshi, Guliston, Jizzax va Navoiy shaharlarida e'lonlar mavjud.",
    },
    {
        q: "Uy egasi men so'ragan narsadan ko'proq pul talab qilsa nima bo'ladi?",
        a: "Bu holat so'rov sifatida qayd etilishi kerak. Bizning saytimizda ko'rsatilgan narx — bu asosiy narx hisoblanadi. Agar uy egasi boshqa pullar talab qilsa yoki e'lon ma'lumotlari noto'g'ri bo'lsa, bizga xabar qiling. Bunday uy egalari platformadan o'chiriladi.",
    },
    {
        q: "Platforma mobil qurilmalarda ishlaydi?",
        a: "Ha, TalabaUy to'liq moslashuvchan dizaynga ega va smartfon, planshet hamda kompyuterlarda qulay ishlaydi. Tez orada iOS va Android uchun maxsus mobil ilova ham chiqariladi.",
    },
    {
        q: "Sevimli e'lonlarni qanday saqlashim mumkin?",
        a: "Platforma tizimiga 'Talaba' sifatida kirganingizdan so'ng, har bir e'londagi yurak belgisini bosib, xonani 'Saqlangan uylar' ro'yxatiga qo'shishingiz mumkin. Bu funksiya faqat ro'yxatdan o'tgan talabalar uchun mavjud.",
    },
];

const FAQ = () => {
    const [openIdx, setOpenIdx] = useState(null);

    return (
        <MainLayout>
            {/* Hero */}
            <section className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-20">
                <div className="container max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                        <HelpCircle size={16} /> Savollar va Javoblar
                    </div>
                    <h1 className="text-5xl font-black mb-6">Tez-tez so'raladigan <span className="text-primary-light">savollar</span></h1>
                    <p className="text-gray-300 text-lg max-w-xl mx-auto">
                        Platformamiz haqida eng ko'p beriladigan savollarga javoblarni bu yerda topasiz.
                    </p>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="py-16">
                <div className="container max-w-3xl">
                    <div className="space-y-3">
                        {faqs.map((item, idx) => (
                            <div
                                key={idx}
                                className={`bg-white rounded-2xl border transition-all overflow-hidden ${openIdx === idx ? 'border-primary/30 shadow-md' : 'border-gray-100 shadow-sm'}`}
                            >
                                <button
                                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left gap-4"
                                >
                                    <span className="font-bold text-secondary text-lg leading-snug">{item.q}</span>
                                    <ChevronDown
                                        size={20}
                                        className={`text-primary shrink-0 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {openIdx === idx && (
                                    <div className="px-6 pb-6">
                                        <div className="h-px bg-gray-100 mb-4" />
                                        <p className="text-gray-600 leading-relaxed">{item.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Still have questions */}
                    <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                        <h3 className="text-xl font-extrabold text-secondary mb-3">Savolingizga javob topa olmadingizmi?</h3>
                        <p className="text-gray-500 mb-6">Bizning qo'llab-quvvatlash jamoamiz bilan bog'laning. Biz 24 soat ichida javob beramiz.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="tel:+998940987005" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all">
                                📞 Qo'ng'iroq qiling
                            </a>
                            <a href="https://t.me/f0z1l_2005" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 text-secondary px-6 py-3 rounded-xl font-bold hover:border-primary hover:text-primary transition-all">
                                ✈️ Telegram
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default FAQ;
