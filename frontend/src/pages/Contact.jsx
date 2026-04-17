import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Phone, Send, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/core/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                setSent(true);
            } else {
                const data = await response.json();
                alert(data.error || "Xabar yuborishda xatolik yuz berdi.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Server bilan bog'lanishda xatolik. Iltimos, keyinroq qayta urinib ko'ring.");
        }
    };

    return (
        <MainLayout>
            {/* Hero */}
            <section className="bg-gradient-to-br from-secondary to-secondary/80 text-white py-20">
                <div className="container max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                        <MessageSquare size={16} /> Aloqa
                    </div>
                    <h1 className="text-5xl font-black mb-6">Biz bilan <span className="text-primary-light">bog'lanish</span></h1>
                    <p className="text-gray-300 text-lg max-w-xl mx-auto">
                        Savolingiz, taklifingiz yoki muammoingiz bormi? Biz doim tayyor!
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Contact info cards */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-extrabold text-secondary mb-6">Aloqa ma'lumotlari</h2>

                            <a href="tel:+998940987005" className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group">
                                <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                                    <Phone className="text-primary w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Telefon</p>
                                    <p className="font-extrabold text-secondary text-lg">+998 94 098 70 05</p>
                                    <p className="text-xs text-gray-400">Dushanba – Shanba: 9:00 – 18:00</p>
                                </div>
                            </a>

                            <a href="https://t.me/f0z1l_2005" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group">
                                <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-blue-100 transition-colors">
                                    <Send className="text-blue-500 w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Telegram</p>
                                    <p className="font-extrabold text-secondary text-lg">@f0z1l_2005</p>
                                    <p className="text-xs text-gray-400">Tezkor javob uchun Telegram afzal</p>
                                </div>
                            </a>

                            <a href="mailto:foziljonislomjonov486@gmail.com" className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group">
                                <div className="bg-amber-50 p-3 rounded-xl group-hover:bg-amber-100 transition-colors">
                                    <Mail className="text-amber-500 w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Elektron pochta</p>
                                    <p className="font-extrabold text-secondary text-lg">foziljonislomjonov486@gmail.com</p>
                                    <p className="text-xs text-gray-400">24 soat ichida javob beramiz</p>
                                </div>
                            </a>

                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                <p className="text-sm font-bold text-secondary mb-2">📍 Manzil</p>
                                <p className="text-gray-500 text-sm leading-relaxed">Toshkent shahri, Yunusobod tumani, Amir Temur ko'chasi, 108-uy</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-extrabold text-secondary mb-6">Xabar yuboring</h2>
                            {sent ? (
                                <div className="flex flex-col items-center justify-center h-64 text-center">
                                    <div className="bg-green-50 p-5 rounded-2xl mb-4">
                                        <CheckCircle2 className="text-green-500 w-12 h-12" />
                                    </div>
                                    <h3 className="text-xl font-extrabold text-secondary mb-2">Xabar yuborildi!</h3>
                                    <p className="text-gray-500">Tez orada siz bilan bog'lanamiz. Rahmat!</p>
                                    <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }} className="mt-6 text-primary font-bold hover:underline text-sm">
                                        Yangi xabar yuborish
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Ismingiz</label>
                                        <input
                                            required
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            type="text"
                                            placeholder="Masalan: Sardor Rahimov"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Elektron pochta</label>
                                        <input
                                            required
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            type="email"
                                            placeholder="email@example.com"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Xabar</label>
                                        <textarea
                                            required
                                            value={form.message}
                                            onChange={e => setForm({ ...form, message: e.target.value })}
                                            rows="5"
                                            placeholder="Savolingiz yoki taklifingizni shu yerga yozing..."
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                    >
                                        <Send size={18} /> Yuborish
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Contact;
