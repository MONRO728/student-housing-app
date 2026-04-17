import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { BookOpen, Search, Eye, MessageCircle, FileText, Key, CheckCircle2 } from 'lucide-react';

const Step = ({ num, icon, title, desc, tips }) => (
    <div className="flex gap-6">
        <div className="flex flex-col items-center">
            <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shrink-0">
                {num}
            </div>
            {num < 6 && <div className="w-0.5 bg-primary/20 flex-1 my-2 min-h-[40px]" />}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1 mb-6">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 p-2 rounded-xl">{icon}</div>
                <h3 className="font-extrabold text-secondary text-xl">{title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">{desc}</p>
            {tips && (
                <ul className="space-y-1.5">
                    {tips.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                            <CheckCircle2 className="text-primary w-4 h-4 shrink-0 mt-0.5" /> {t}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

const Guide = () => (
    <MainLayout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-20">
            <div className="container max-w-4xl text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                    <BookOpen size={16} /> Bosqichma-bosqich qo'llanma
                </div>
                <h1 className="text-5xl font-black mb-6">Talabalar uchun <span className="text-primary-light">uy topish qo'llanmasi</span></h1>
                <p className="text-gray-300 text-lg max-w-xl mx-auto">
                    TalabaUy orqali uy topishning har bir bosqichini tushuntiruvchi to'liq qo'llanma.
                </p>
            </div>
        </section>

        {/* Quick stats */}
        <section className="py-10 bg-gray-50">
            <div className="container max-w-5xl">
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { n: "6", label: "Oson qadam" },
                        { n: "15 daqiqa", label: "O'rtacha vaqt" },
                        { n: "Bepul", label: "Talabalar uchun" },
                    ].map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
                            <p className="text-3xl font-black text-primary mb-1">{s.n}</p>
                            <p className="text-gray-500 font-medium text-sm">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Steps */}
        <section className="py-16">
            <div className="container max-w-3xl">
                <h2 className="text-3xl font-extrabold text-secondary text-center mb-12">Uy topishning 6 bosqichi</h2>
                <Step
                    num={1}
                    icon={<Search className="text-primary w-5 h-5" />}
                    title="Ro'yxatdan o'ting"
                    desc="TalabaUy saytiga kiring va 'Kirish' tugmasini bosing. Elektron pochta, ism va parol bilan bir daqiqada ro'yxatdan o'tasiz. Ro'lni 'Talaba' deb tanlang."
                    tips={["To'g'ri elektron pochta kiriting — u orqali xabarnomalar keladi", "Kuchli parol o'ylang (harflar + raqamlar)", "Profilingizda telefon raqamingizni qo'shing"]}
                />
                <Step
                    num={2}
                    icon={<Search className="text-primary w-5 h-5" />}
                    title="Shahar va filtr bo'yicha qidiring"
                    desc="Asosiy sahifadan yoki 'Qidirish' bo'limidan shahringizni tanlang. Filtrlar yordamida narx oraliq, universitetga masofa va boshqa parametrlarni belgilang."
                    tips={["Dastlab keng filtr qo'ying, keyin toraytirib boring", "Universitetingiz nomini filtrdan tanlang", "Narx oralig'ini byudjetingizga mos qiling"]}
                />
                <Step
                    num={3}
                    icon={<Eye className="text-primary w-5 h-5" />}
                    title="E'lonlarni ko'rib chiqing"
                    desc="Mos e'lonlarni topganingizdan so'ng, ularni batafsil ko'ring. Rasmlar, xarita joylashuvi, xona turlari va narxlarni sinchkovlik bilan o'rganing."
                    tips={["Kamida 3-5 ta variantni solishtirib ko'ring", "Xaritada joylashuvni universitetga nisbatan tekshiring", "Galereya rasmlarini diqqat bilan ko'ring"]}
                />
                <Step
                    num={4}
                    icon={<MessageCircle className="text-primary w-5 h-5" />}
                    title="Uy egasi bilan bog'laning"
                    desc="E'lon sahifasidagi telefon yoki Telegram orqali uy egasiga murojaat qiling. Ko'rishni oldindan kelishib oling. Og'zaki kelishuv emas, yozma tasdiqlashni talab qiling."
                    tips={["Telefonda uy haqida asosiy savollarni bering", "Ko'rish uchun kunduz kuni boring", "Yolg'iz emas, do'sting bilan boring"]}
                />
                <Step
                    num={5}
                    icon={<Eye className="text-primary w-5 h-5" />}
                    title="Uyni shaxsan tekshiring"
                    desc="Uyga borib, rasm bilan tengligini, suvini, elektrini, isitishini sinab ko'ring. Qo'shnilar bilan qisqa gaplashish ham foydali bo'lishi mumkin."
                    tips={["Suv bosimini tekshiring", "Deraza va eshiklarni sinab ko'ring", "Qo'shni xonalar va umumiy joylarni ko'ring", "Uy egasining hujjatlarini ko'rishni so'rang"]}
                />
                <Step
                    num={6}
                    icon={<FileText className="text-primary w-5 h-5" />}
                    title="Shartnoma tuzing va ko'chib o'ting"
                    desc="Ijara shartnomasini rasmiy ravishda tuzing. Unda ijara muddati, narxi, kommunal xarajatlar va depozit shartlari aniq ko'rsatilishi shart. Imzolangan nusxani o'zingizda saqlang."
                    tips={["Shartnomasiz hech qachon pul bermang", "Har qanday qurilmalar ro'yxatini shartnomaga qo'shing", "Pasportingiz nusxasini bering, lekin aslini qoldirmang", "Garov pulini kvitansiya bilan to'lang"]}
                />

                {/* Warning box */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-4">
                    <h3 className="font-extrabold text-amber-800 mb-3 flex items-center gap-2">⚠️ Ehtiyot bo'ling!</h3>
                    <ul className="space-y-2 text-amber-700 text-sm">
                        <li>• Ko'rmasdan oldin hech qachon pul o'tkazmang</li>
                        <li>• Arzonligi uchun tasdiqlanmagan e'lonlarga ishonmang</li>
                        <li>• Shartnomasiz ko'chib o'tmang</li>
                        <li>• Pasportingizni garovga qoldirmang — bu noqonuniy</li>
                    </ul>
                </div>
            </div>
        </section>
    </MainLayout>
);

export default Guide;
