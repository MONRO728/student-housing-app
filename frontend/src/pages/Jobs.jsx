import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Briefcase, MapPin, Clock, ChevronRight, Users, Code, Headphones, PenLine, BarChart3 } from 'lucide-react';

const vacancies = [
    {
        id: 1,
        title: "Frontend Developer",
        icon: <Code className="text-primary w-6 h-6" />,
        type: "To'liq stavka",
        location: "Toshkent / Masofaviy",
        salary: "3,000,000 – 6,000,000 so'm",
        desc: "React.js, Tailwind CSS va zamonaviy frontend texnologiyalari bilan ishlay oladigan dasturchi izlayapmiz.",
        requirements: ["React.js (16+)", "Tailwind CSS", "REST API bilan ishlash", "Git bilimi", "Ingliz tili (o'rta daraja)"],
        color: "bg-blue-50 border-blue-100",
        badge: "bg-blue-100 text-blue-700",
    },
    {
        id: 2,
        title: "Qo'llab-quvvatlash menejeri",
        icon: <Headphones className="text-primary w-6 h-6" />,
        type: "To'liq stavka",
        location: "Toshkent",
        salary: "1,800,000 – 2,800,000 so'm",
        desc: "Foydalanuvchilar bilan muloqot qilish, muammolarni hal etish va platforma sifatini yaxshilashga yordam berish.",
        requirements: ["O'zbek va rus tillarini yaxshi bilish", "Kompyuter savodxonligi", "Sabr va muloqot ko'nikmalari", "Mijozlarga xizmat ko'rsatish tajribasi"],
        color: "bg-green-50 border-green-100",
        badge: "bg-green-100 text-green-700",
    },
    {
        id: 3,
        title: "Kontent menejer / Copywriter",
        icon: <PenLine className="text-primary w-6 h-6" />,
        type: "Qisman stavka",
        location: "Masofaviy",
        salary: "1,500,000 – 2,500,000 so'm",
        desc: "Blog maqolalari, ijtimoiy media postlari va platforma matnlarini yaratish va tahrirlash.",
        requirements: ["O'zbek tilidagi yozuv mahorati", "SEO asoslarini bilish", "Ijodkorlik", "Deadline'larga rioya qilish"],
        color: "bg-amber-50 border-amber-100",
        badge: "bg-amber-100 text-amber-700",
    },
    {
        id: 4,
        title: "Marketing mutaxassisi",
        icon: <BarChart3 className="text-primary w-6 h-6" />,
        type: "To'liq stavka",
        location: "Toshkent",
        salary: "2,500,000 – 4,500,000 so'm",
        desc: "Platforma foydalanuvchilar bazasini kengaytirish, reklama kampaniyalarini boshqarish va tahlil qilish.",
        requirements: ["SMM tajribasi", "Google/Meta Ads bilan ishlash", "Analitika asoslarini bilish", "Ijodiy fikrlash"],
        color: "bg-purple-50 border-purple-100",
        badge: "bg-purple-100 text-purple-700",
    },
];

const Jobs = () => {
    const [openId, setOpenId] = useState(null);

    return (
        <MainLayout>
            {/* Hero */}
            <section className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-20">
                <div className="container max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                        <Briefcase size={16} /> Jamoamizga qo'shiling
                    </div>
                    <h1 className="text-5xl font-black mb-6">Ochiq <span className="text-primary-light">vakansiyalar</span></h1>
                    <p className="text-gray-300 text-lg max-w-xl mx-auto">
                        TalabaUy jamoasi bilan birga O'zbekiston talabalariga xizmat qilish istagida bo'lgan iste'dodli mutaxassislarni izlaymiz.
                    </p>
                </div>
            </section>

            {/* Culture */}
            <section className="py-12 bg-gray-50">
                <div className="container max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { icon: "🚀", title: "Tez rivojlanish", desc: "Yosh jamoada fikringiz va loyihalaringiz tezda amalga oshadi." },
                            { icon: "🤝", title: "Do'stona muhit", desc: "Biz muvaffaqiyatni ham, muvaffaqiyatsizlikni ham birgalikda boshdan kechiramiz." },
                            { icon: "📚", title: "O'rganish madaniyati", desc: "Kurslar, yo'nalishlar va o'sish imkoniyatlari har doim ochiq." },
                        ].map((c, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                                <div className="text-4xl mb-3">{c.icon}</div>
                                <h3 className="font-bold text-secondary mb-2">{c.title}</h3>
                                <p className="text-gray-500 text-sm">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vacancies */}
            <section className="py-16">
                <div className="container max-w-4xl">
                    <h2 className="text-3xl font-extrabold text-secondary text-center mb-10">Hozirgi ochiq o'rinlar</h2>
                    <div className="space-y-4">
                        {vacancies.map(v => (
                            <div key={v.id} className={`rounded-2xl border p-6 ${v.color} transition-all`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className="bg-white p-3 rounded-xl shadow-sm">{v.icon}</div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <h3 className="text-xl font-extrabold text-secondary">{v.title}</h3>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${v.badge}`}>{v.type}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                                                <span className="flex items-center gap-1"><MapPin size={13} /> {v.location}</span>
                                                <span className="flex items-center gap-1"><Clock size={13} /> {v.salary}</span>
                                            </div>
                                            <p className="text-gray-600 text-sm">{v.desc}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setOpenId(openId === v.id ? null : v.id)}
                                        className="bg-white text-primary font-bold text-sm px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center gap-1 shrink-0 shadow-sm"
                                    >
                                        <ChevronRight size={16} className={`transition-transform ${openId === v.id ? 'rotate-90' : ''}`} />
                                        Batafsil
                                    </button>
                                </div>
                                {openId === v.id && (
                                    <div className="mt-5 pt-5 border-t border-white/60">
                                        <h4 className="font-bold text-secondary mb-3">Talablar:</h4>
                                        <ul className="space-y-2">
                                            {v.requirements.map((r, i) => (
                                                <li key={i} className="text-gray-600 text-sm flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {r}
                                                </li>
                                            ))}
                                        </ul>
                                        <a
                                            href="https://t.me/f0z1l_2005"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-5 inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-dark transition-all"
                                        >
                                            <Users size={16} /> Murojaat qilish
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Jobs;
