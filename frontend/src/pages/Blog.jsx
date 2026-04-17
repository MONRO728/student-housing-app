import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { BookOpen, Clock, Tag, ChevronRight } from 'lucide-react';

const articles = [
    {
        id: 1,
        category: "Maslahatlar",
        title: "Talaba sifatida uy ijaraga olishda e'tibor bering!",
        excerpt: "Ko'p talabalar birinchi marta uy ijaraga olganda muammolarga duch keladi. Mana, eng muhim 7 ta maslahat: shartnomani diqqat bilan o'qing, kommunal xarajatlarni aniqlang va uy egasi bilan muloqotni yozma tarzda olib boring.",
        date: "10 aprel 2026",
        readTime: "5 daqiqa",
        color: "bg-blue-50 text-blue-700",
    },
    {
        id: 2,
        category: "Hayot tarzi",
        title: "Talaba hayotini yengillashtiruvchi 10 ta lifehack",
        excerpt: "Yotoqxona yoki ijaraga olingan xonada samarali yashash uchun amaliy maslahatlar: oziq-ovqat xarajatlarini qisqartirish, vaqtni boshqarish va xonani qulay qilish bo'yicha real tajribalar.",
        date: "8 aprel 2026",
        readTime: "7 daqiqa",
        color: "bg-green-50 text-green-700",
    },
    {
        id: 3,
        category: "Moliya",
        title: "Talaba byudjetini to'g'ri rejalashtirish yo'llari",
        excerpt: "Oylik stipendiya va ota-ona yordamida yashash qiyin. Ammo to'g'ri rejalashtirish yordamida ijara, ovqat va transport xarajatlarini optimallashtirish mumkin. Ushbu maqolada batafsil plan tuzamiz.",
        date: "5 aprel 2026",
        readTime: "6 daqiqa",
        color: "bg-amber-50 text-amber-700",
    },
    {
        id: 4,
        category: "Xavfsizlik",
        title: "Soxta e'lonlardan qanday qutulish mumkin?",
        excerpt: "Internet orqali uy izlayotgan har bir talaba kamida bir marta soxta e'longa duch keladi. Qizil bayroqlarni aniqlash, to'lovlarni xavfsiz amalga oshirish va qonuniy shartnoma tuzish bo'yicha batafsil qo'llanma.",
        date: "2 aprel 2026",
        readTime: "8 daqiqa",
        color: "bg-red-50 text-red-700",
    },
    {
        id: 5,
        category: "Shaharshunoslik",
        title: "Toshkентda talabalar uchun eng qulay tumanlar",
        excerpt: "Yunusobod, Chilonzor, Mirzo Ulug'bek — qaysi tuman sizga mos? Universitetga masofa, narx-navo, transport ulushi va infratuzilma bo'yicha batafsil taqqoslash.",
        date: "29 mart 2026",
        readTime: "5 daqiqa",
        color: "bg-purple-50 text-purple-700",
    },
    {
        id: 6,
        category: "Maslahatlar",
        title: "Xona yig'doshingiz bilan munosabatni qanday yo'lga qo'yish kerak?",
        excerpt: "Ba'zida eng katta muammo uy egasi emas, balki xonadosh bo'ladi. Uyg'un yashash uchun aniq qoidalar, muloqot madaniyati va kelishuv punktlari haqida gaplashamiz.",
        date: "25 mart 2026",
        readTime: "4 daqiqa",
        color: "bg-teal-50 text-teal-700",
    },
];

const Blog = () => {
    const [selected, setSelected] = useState(null);

    return (
        <MainLayout>
            {/* Hero */}
            <section className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-20">
                <div className="container max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                        <BookOpen size={16} /> TalabaUy Blog
                    </div>
                    <h1 className="text-5xl font-black mb-6">Foydali <span className="text-primary-light">maqolalar</span></h1>
                    <p className="text-gray-300 text-lg max-w-xl mx-auto">
                        Talabalar uchun ijara, moliya va hayot tarzi bo'yicha amaliy maslahatlar.
                    </p>
                </div>
            </section>

            {/* Articles */}
            <section className="py-16">
                <div className="container max-w-5xl">
                    {selected ? (
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-primary font-bold mb-6 hover:underline">
                                ← Orqaga
                            </button>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${selected.color} mb-4 inline-block`}>{selected.category}</span>
                            <h1 className="text-3xl font-extrabold text-secondary mb-4">{selected.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                                <span className="flex items-center gap-1"><Clock size={14} /> {selected.readTime}</span>
                                <span>{selected.date}</span>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-6">{selected.excerpt}</p>
                            <p className="text-gray-600 leading-relaxed">
                                Batafsil ma'lumot va amaliy tavsiyalar tez orada bu sahifada joylashtiriladi. TalabaUy blogiga obuna bo'lib, yangi maqolalardan birinchi bo'lib xabardor bo'ling.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map(article => (
                                <div key={article.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${article.color}`}>
                                                <Tag size={11} className="inline mr-1" />{article.category}
                                            </span>
                                        </div>
                                        <h2 className="font-extrabold text-secondary text-lg mb-3 leading-tight group-hover:text-primary transition-colors">
                                            {article.title}
                                        </h2>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                                <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                                                <span>{article.date}</span>
                                            </div>
                                            <button
                                                onClick={() => setSelected(article)}
                                                className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                            >
                                                O'qish <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
};

export default Blog;
