import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Cookie, CheckCircle2, X, Settings } from 'lucide-react';

const CookieRow = ({ name, purpose, duration, required }) => (
    <tr className="border-b border-gray-50">
        <td className="py-4 px-4 font-bold text-secondary text-sm font-mono">{name}</td>
        <td className="py-4 px-4 text-gray-600 text-sm">{purpose}</td>
        <td className="py-4 px-4 text-gray-500 text-sm">{duration}</td>
        <td className="py-4 px-4">
            {required
                ? <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Majburiy</span>
                : <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">Ixtiyoriy</span>}
        </td>
    </tr>
);

const Cookies = () => {
    const [analyticsOn, setAnalyticsOn] = useState(true);

    return (
        <MainLayout>
            <section className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-16">
                <div className="container max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                        <Cookie size={16} /> Cookie siyosati
                    </div>
                    <h1 className="text-4xl font-black mb-4">Cookie fayllar siyosati</h1>
                    <p className="text-gray-300">Oxirgi yangilanish: 1 aprel 2026</p>
                </div>
            </section>

            <section className="py-16">
                <div className="container max-w-3xl">

                    {/* Intro */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                        <h2 className="text-2xl font-extrabold text-secondary mb-4">Cookie nima?</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Cookie — bu veb-saytni tashrif buyurganingizda brauzeringizda saqlanadigan kichik matn fayli. Cookie fayllar saytni to'g'ri ishlashi, xarizmatik ishlash tajribasini ta'minlash va foydalanuvchilarni tanish uchun ishlatiladi.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            TalabaUy cookie fayllarni javobgarlik bilan ishlatadi va siz ularni boshqarish imkoniyatiga egasiz. Ushbu sahifada biz qanday cookie ishlatishimiz va ularni qanday boshqarish mumkinligi haqida batafsil ma'lumot beramiz.
                        </p>
                    </div>

                    {/* Cookie types */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-extrabold text-secondary">Biz ishlatiladigan cookie turlari</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 font-bold text-gray-500 text-sm">Cookie nomi</th>
                                        <th className="py-3 px-4 font-bold text-gray-500 text-sm">Maqsadi</th>
                                        <th className="py-3 px-4 font-bold text-gray-500 text-sm">Muddati</th>
                                        <th className="py-3 px-4 font-bold text-gray-500 text-sm">Turi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <CookieRow name="access_token" purpose="Foydalanuvchi autentifikatsiyasi uchun JWT token" duration="30 daqiqa" required />
                                    <CookieRow name="refresh_token" purpose="Kirishni yangilash tokeni" duration="7 kun" required />
                                    <CookieRow name="lang" purpose="Foydalanuvchi tili sozlamasi" duration="1 yil" required />
                                    <CookieRow name="search_filters" purpose="Oxirgi qidiruv filtrlari eslab qolinadi" duration="7 kun" required={false} />
                                    <CookieRow name="_ga" purpose="Google Analytics orqali sayt statistikasi" duration="2 yil" required={false} />
                                    <CookieRow name="theme" purpose="Qoʻng'iroq yoki yorug' rejim sozlamasi" duration="1 yil" required={false} />
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-primary/10 p-2 rounded-xl"><Settings className="text-primary w-5 h-5" /></div>
                            <h2 className="text-xl font-extrabold text-secondary">Cookie sozlamalaringiz</h2>
                        </div>

                        {/* Required - always on */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
                            <div>
                                <p className="font-bold text-secondary">Zaruriy cookie-lar</p>
                                <p className="text-sm text-gray-500">Sayt ishlashi uchun shart. O'chirib bo'lmaydi.</p>
                            </div>
                            <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                                <CheckCircle2 size={13} /> Doim yoniq
                            </div>
                        </div>

                        {/* Analytics - toggleable */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-bold text-secondary">Analitik cookie-lar</p>
                                <p className="text-sm text-gray-500">Saytni yaxshilash uchun anonim foydalanish ma'lumotlari.</p>
                            </div>
                            <button
                                onClick={() => setAnalyticsOn(!analyticsOn)}
                                className={`w-12 h-6 rounded-full transition-all relative ${analyticsOn ? 'bg-primary' : 'bg-gray-300'}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${analyticsOn ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>

                        <p className="text-xs text-gray-400 mt-4">
                            Sozlamalaringiz brauzeringizda saqlanadi. Brauzer cookie-larini o'chirsangiz, bu sozlamalar ham o'chiriladi.
                        </p>
                    </div>

                    {/* How to disable */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-extrabold text-secondary mb-4">Brauzerdan cookie-larni qanday o'chirish mumkin?</h2>
                        <div className="space-y-3">
                            {[
                                { name: "Google Chrome", path: "Sozlamalar → Maxfiylik → Cookie va sayt ma'lumotlari" },
                                { name: "Mozilla Firefox", path: "Sozlamalar → Maxfiylik va xavfsizlik → Cookie va sayt ma'lumotlari" },
                                { name: "Safari", path: "Sozlamalar → Maxfiylik → Veb-sayt ma'lumotlarini boshqarish" },
                                { name: "Microsoft Edge", path: "Sozlamalar → Cookie va sayt ruxsatlari → Cookie-larni boshqarish" },
                            ].map((b, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm">
                                    <span className="text-primary font-bold shrink-0">•</span>
                                    <span><strong className="text-secondary">{b.name}:</strong> <span className="text-gray-600">{b.path}</span></span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-400 mt-4">
                            Eslatma: ba'zi cookie-larni o'chirsangiz, platformaning ayrim funksiyalari to'g'ri ishlamasligi mumkin.
                        </p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Cookies;
