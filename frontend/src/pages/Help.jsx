import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Search, Home, PlusCircle, Shield, CreditCard, ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react';

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Qanday qilib ijaraga uy topish mumkin?",
      answer: "Bosh sahifadagi qidiruv paneli orqali kerakli shahar yoki hududni kiriting. Filtrlar yordamida narx, xona soni va turini tanlab o'zingizga mos uyni osongina topishingiz mumkin."
    },
    {
      id: 2,
      question: "E'lon berish bepulmi?",
      answer: "Ha, TalabaUy platformasida e'lon berish mutlaqo bepul. Siz tizimdan ro'yxatdan o'tib, 'E'lon berish' tugmasi orqali o'z uyingizni joylashtirishingiz mumkin."
    },
    {
      id: 3,
      question: "Ijarachilar bilan qanday bog'lanaman?",
      answer: "Har bir e'lon sahifasida makler yoki uy egasining telefon raqami va manzili ko'rsatilgan. Siz to'g'ridan-to'g'ri ular bilan bog'lanishingiz mumkin."
    }
  ];

  const categories = [
    { id: 1, title: 'Ijaraga olish', icon: <Home className="w-8 h-8 text-primary" />, desc: 'Uy qidirish va ijaraga olish qoidalari' },
    { id: 2, title: "E'lon berish", icon: <PlusCircle className="w-8 h-8 text-primary" />, desc: 'Platformaga yangi e\'lon qo\'shish' },
    { id: 3, title: 'Xavfsizlik', icon: <Shield className="w-8 h-8 text-primary" />, desc: 'Xavfsiz ijaraga olish bo\'yicha maslahatlar' },
    { id: 4, title: "To'lovlar", icon: <CreditCard className="w-8 h-8 text-primary" />, desc: 'To\'lov turlari va hisob-kitoblar' }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-primary pt-20 pb-28 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Qanday yordam bera olamiz?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Muammoingizni qidiring..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-lg outline-none focus:ring-4 focus:ring-white/30 shadow-lg text-gray-800 font-medium"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-16 z-10 pb-20">
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map(cat => (
            <div key={cat.id} className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300 cursor-pointer border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">{cat.title}</h3>
              <p className="text-gray-500 text-sm font-medium">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-secondary mb-8 text-center">Ko'p so'raladigan savollar</h2>
          <div className="space-y-4">
            {faqs.map(faq => (
              <div key={faq.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button 
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full text-left p-6 flex justify-between items-center bg-white focus:outline-none"
                >
                  <span className="font-bold text-secondary text-lg">{faq.question}</span>
                  {openFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <div className={`px-6 pb-6 text-gray-500 font-medium leading-relaxed transition-all duration-300 ${openFaq === faq.id ? 'block' : 'hidden'}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="bg-gray-50 rounded-[40px] p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-secondary mb-4">Javob topa olmadingizmi?</h2>
            <p className="text-gray-500 font-medium">Qo'llab-quvvatlash jamoamiz sizga yordam berishdan doimo xursand.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Telegram */}
            <a href="https://t.me/f0z1l_2005" target="_blank" rel="noopener noreferrer" className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center group cursor-pointer">
              <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-7 h-7 text-blue-500" />
              </div>
              <h4 className="font-bold text-secondary mb-1">Telegram orqali</h4>
              <p className="text-sm text-gray-500 font-medium">@f0z1l_2005</p>
            </a>
            
            {/* Phone */}
            <a href="tel:+998940987005" className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center group cursor-pointer">
              <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7 text-green-500" />
              </div>
              <h4 className="font-bold text-secondary mb-1">Telefon orqali</h4>
              <p className="text-sm text-gray-500 font-medium">+998 94 098 70 05</p>
            </a>
            
            {/* Email Form Placeholder */}
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col items-center text-center group cursor-pointer">
              <div className="bg-purple-50 w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-bold text-secondary mb-1">Elektron pochta</h4>
              <p className="text-sm text-gray-500 font-medium">Xabar yuborish</p>
            </div>
          </div>
        </div>
        
      </div>
    </MainLayout>
  );
};

export default Help;
