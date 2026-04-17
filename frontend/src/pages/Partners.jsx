import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Handshake, Building2, GraduationCap, TrendingUp, CheckCircle2, Mail } from 'lucide-react';

const BenefitItem = ({ text }) => (
    <li className="flex items-start gap-3 text-gray-600">
        <CheckCircle2 className="text-primary w-5 h-5 shrink-0 mt-0.5" />
        <span>{text}</span>
    </li>
);

const PartnerCard = ({ icon, title, desc }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
        <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-4">{icon}</div>
        <h3 className="font-extrabold text-secondary text-xl mb-3">{title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
    </div>
);

const Partners = () => (
    <MainLayout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-20">
            <div className="container max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                    <Handshake size={16} /> Hamkorlik imkoniyatlari
                </div>
                <h1 className="text-5xl font-black mb-6">Bizning <span className="text-primary-light">hamkorlarimiz</span></h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                    TalabaUy platformasi uy egalari, ko'chmas mulk agentliklari va universitetlar bilan hamkorlikda talabalar uchun eng yaxshi yashash muhitini yaratadi.
                </p>
            </div>
        </section>

        {/* Partner types */}
        <section className="py-16">
            <div className="container max-w-5xl">
                <h2 className="text-3xl font-extrabold text-secondary text-center mb-12">Hamkorlik turlari</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <PartnerCard
                        icon={<Building2 className="text-primary w-8 h-8" />}
                        title="Uy egalari"
                        desc="Mulk egalariga o'z uylarini ishonchli talabalar bilan bog'lash imkoniyatini beramiz. Platforma orqali tezroq va osonroq ijarachilar topasiz."
                    />
                    <PartnerCard
                        icon={<TrendingUp className="text-primary w-8 h-8" />}
                        title="Ko'chmas mulk agentliklari"
                        desc="Agentliklar bizning platformamiz orqali o'z e'lonlarini ko'proq auditoriyaga yetkazib, savdoni oshirishi mumkin."
                    />
                    <PartnerCard
                        icon={<GraduationCap className="text-primary w-8 h-8" />}
                        title="Universitetlar"
                        desc="Oliy ta'lim muassasalari talabalariga rasmiy tavsiya etilgan va tekshirilgan yashash joylari ro'yxatini taqdim etish imkoniyatiga ega bo'ladi."
                    />
                </div>

                {/* Benefits */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                        <h3 className="text-xl font-extrabold text-secondary mb-6 flex items-center gap-2">
                            <Building2 className="text-primary w-5 h-5" /> Uy egalari uchun afzalliklar
                        </h3>
                        <ul className="space-y-3">
                            <BenefitItem text="Platforma orqali bepul e'lon joylash imkoniyati" />
                            <BenefitItem text="Tekshirilgan va ishonchli talabalar bilan bog'lanish" />
                            <BenefitItem text="Ijara shartnomasini onlayn rasmiylashtirish" />
                            <BenefitItem text="Mulkingizni minglarga taqdim etish" />
                            <BenefitItem text="24/7 qo'llab-quvvatlash xizmati" />
                        </ul>
                    </div>
                    <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-8">
                        <h3 className="text-xl font-extrabold text-secondary mb-6 flex items-center gap-2">
                            <GraduationCap className="text-secondary w-5 h-5" /> Universitetlar uchun afzalliklar
                        </h3>
                        <ul className="space-y-3">
                            <BenefitItem text="Talabalaringiz uchun tasdiqlangan uy-joy ro'yxati" />
                            <BenefitItem text="Universitetga yaqin mulklarni belgilash imkoniyati" />
                            <BenefitItem text="Statistik ma'lumotlarga kirish huquqi" />
                            <BenefitItem text="Talabalar xavfsizligi bo'yicha nazorat" />
                            <BenefitItem text="Branding va hamkorlik sahifasi" />
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-50">
            <div className="container max-w-3xl text-center">
                <h2 className="text-3xl font-extrabold text-secondary mb-4">Hamkor bo'lishni xohlaysizmi?</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Bizning jamoamiz siz bilan hamkorlik shartlarini muhokama qilishga tayyor. Quyidagi manzilga murojaat qiling.
                </p>
                <a
                    href="mailto:foziljonislomjonov486@gmail.com"
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                    <Mail size={20} /> foziljonislomjonov486@gmail.com ga yozing
                </a>
            </div>
        </section>
    </MainLayout>
);

export default Partners;
