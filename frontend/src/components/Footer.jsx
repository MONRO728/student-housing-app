import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Facebook, Instagram, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-2 rounded-lg">
                <Home className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Talaba<span className="text-primary-light">Uy</span></span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              O'zbekistondagi talabalar uchun maxsus uy-joy qidirish platformasi. Biz talabalarga eng yaxshi xonalarni topishda yordam beramiz.
            </p>
            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a
                href="tel:+998940987005"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                📞 +998 94 098 70 05
              </a>
              <a
                href="https://t.me/f0z1l_2005"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Send size={14} /> Telegram: @f0z1l_2005
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Kompaniya</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/about"    className="hover:text-white transition-colors">Biz haqimizda</Link></li>
              <li><Link to="/partners" className="hover:text-white transition-colors">Hamkorlarimiz</Link></li>
              <li><Link to="/blog"     className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/jobs"     className="hover:text-white transition-colors">Vakansiyalar</Link></li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Yordam</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/faq"     className="hover:text-white transition-colors">Tez-tez so'raladigan savollar</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Biz bilan bog'lanish</Link></li>
              <li><Link to="/guide"   className="hover:text-white transition-colors">Talabalar uchun qo'llanma</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Maxfiylik siyosati</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-bold mb-6">Bizni kuzatib boring</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://instagram.com/f0z1l_2005" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-primary transition-all" title="Instagram"><Instagram size={20} /></a>
              <a href="https://t.me/f0z1l_2005" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-primary transition-all" title="Telegram"><Send size={20} /></a>
              <a href="https://facebook.com/f0z1l_2005" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full hover:bg-primary transition-all" title="Facebook"><Facebook size={20} /></a>
            </div>
            <p className="text-gray-400 text-sm">
              Eng so'nggi yangiliklar va takliflardan xabardor bo'ling.
            </p>
          </div>
        </div>
        
        <hr className="border-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2026 TalabaUy. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-6">
            <Link to="/terms"   className="hover:text-white transition-colors">Foydalanish shartlari</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
