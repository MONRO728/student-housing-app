import React, { useState, useEffect } from 'react';
import api from '../api';
import MainLayout from '../layouts/MainLayout';
import { Search, MapPin, GraduationCap, ChevronRight, Home as HomeIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Static reliable data to ensure high performance and exactly correct images mapping.
  const FEATURED_CITIES = [
{ name: 'Toshkent', slug: 'toshkent', image: 'https://tests2.tashkent.uz/_next/image?url=https%3A%2F%2Fapi.tashkent.uz%2Fupload%2Fcity%2Fseesight%2F2025%2F%25D0%25A2%25D0%25B0%25D1%2588%25D0%25BA%25D0%25B5%25D0%25BD%25D1%2582%25D1%2581%25D0%25BA%25D0%25B0%25D1%258F_%25D0%25A2%25D0%25B5%25D0%25BB%25D0%25B5%25D0%25B1%25D0%25B0%25D1%2588%25D0%25BD%25D1%258F_Russian.jpg&w=3840&q=75' },
{ name: 'Samarqand', slug: 'samarqand', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQek2U54QE_Li98rKAZd-CgDj6CYAlVMZo8IA&s' },
{ name: 'Buxoro', slug: 'buxoro', image: 'https://uzbekistan.travel/storage/app/media/Rasmlar/Buxoro/Umumiy/cropped-images/shutterstock_1007253181-0-0-0-0-1738740666.jpg' },
{ name: 'Xiva', slug: 'xiva', image: 'https://uzbekistan.travel/storage/app/media/Rasmlar/Xorazm/cropped-images/1407935021-0-0-0-0-1738670764.jpg' },
{ name: 'Andijon', slug: 'andijon', image: 'https://dolorestravel.com/uploads/Guide/31/61c1e85fa910c.jpg' },
{ name: 'Namangan', slug: 'namangan', image: 'https://eurasia.travel/wp-content/uploads/2024/07/Namangan-1.jpg' },
{ name: "Farg'ona", slug: 'fargona', image: 'https://uzbekistan.travel/storage/app/media/Otabek/asosiydagi%20rasmlar/Fergana/cropped-images/pamyatnik-al-fergani-2-0-0-0-0-1728965931.jpg' },
{ name: 'Nukus', slug: 'nukus', image: 'https://www.advantour.com/img/uzbekistan/images/nukus.jpg' },
{ name: 'Qarshi', slug: 'qarshi', image: 'https://qashstat.uz/images/aholi/15.03.2022.8.jpg' },
{ name: 'Termiz', slug: 'termiz', image: 'https://uzbekistan.travel/storage/app/media/Rasmlar/Surxondaryo/cropped-images/DJI_0032-0-0-0-0-1738134984.jpg' },
{ name: 'Guliston', slug: 'guliston', image: 'https://uzbekistan.travel/storage/app/media/nargiza/cropped-images/8-0-0-0-0-1593511859.jpg' },
{ name: 'Jizzax', slug: 'jizzax', image: 'https://xabar.uz/static/crop/3/2/920__95_3210047744.jpg' },
{ name: 'Urganch', slug: 'urganch', image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Waterfront_of_Shavat_canal_in_Urganch.jpg' },
{ name: 'Navoiy', slug: 'navoiy', image: 'https://yuz.uz/imageproxy/980x/https://yuz.uz/file/news/87a979f0e226b4635e5e5966066ab779.jpg' },
{ name: "Qo'qon", slug: 'qoqon', image: 'https://t4.ftcdn.net/jpg/02/21/06/69/360_F_221066982_YLkA35JMsSiLoAo8dodHXoCkwBaMF3Ae.jpg' },
{ name: 'Denov', slug: 'denov', image: 'https://static.review.uz/crop/1/0/1400__100_1085759189.jpg?v=1613650535' }
];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Background Image Placeholder / Animation */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2070" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Sizning mukammal <br /> 
            <span className="text-primary-light">talaba uyingiz</span> shu yerda!
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
          >
            O'zbekistonning 400+ dan ortiq oliygohlari yaqinidagi eng yaxshi xonalarni toping va band qiling.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2"
          >
            <div className="flex-grow flex items-center px-4 py-3 gap-3 border-b md:border-b-0 md:border-r border-gray-100">
              <MapPin className="text-primary w-6 h-6" />
              <input 
                type="text" 
                placeholder="Qaysi shahar yoki oliygohda turasiz?" 
                className="w-full outline-none text-lg text-secondary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => {
                if (searchQuery.trim()) {
                  navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
                } else {
                  navigate('/search');
                }
              }}
              className="bg-primary text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
            >
              <Search size={22} />
              Qidirish
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-secondary mb-2">Mashhur shaharlar</h2>
              <p className="text-gray-500">Talabalar eng ko'p tanlagan manzillar</p>
            </div>
            <button onClick={() => navigate('/search')} className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
              Barchasini ko'rish <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_CITIES.map((city, idx) => {
              return (
                <motion.div 
                  key={city.slug}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/search?city=${encodeURIComponent(city.name)}`)}
                >
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg bg-gray-100 group-hover:shadow-2xl transition-all duration-500">
                    <img 
                      src={city.image} 
                      alt={city.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradients and Dark overlay for hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500"></div>

                    {/* Content Section */}
                    <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end h-full">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-3xl font-extrabold text-white mb-3 drop-shadow-xl">{city.name}</h3>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md group-hover:bg-primary text-white font-bold py-2 px-5 rounded-xl text-sm transition-colors shadow-lg">
                            Qidirish <ChevronRight size={16} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/10">
                <GraduationCap className="text-primary w-10 h-10" />
              </div>
              <h4 className="text-4xl font-black text-secondary mb-2">50,000+</h4>
              <p className="text-gray-500 font-medium">Baxtli talabalar</p>
            </div>
            <div className="p-8">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/10">
                <MapPin className="text-primary w-10 h-10" />
              </div>
              <h4 className="text-4xl font-black text-secondary mb-2">12+</h4>
              <p className="text-gray-500 font-medium">Viloyatlar bo'ylab</p>
            </div>
            <div className="p-8">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/10">
                <HomeIcon className="text-primary w-10 h-10" />
              </div>
              <h4 className="text-4xl font-black text-secondary mb-2">1,500+</h4>
              <p className="text-gray-500 font-medium">Tasdiqlangan uylar</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
