import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X, Home, LogOut, Bookmark, PlusCircle, MessageSquare } from 'lucide-react';
import AuthModal from './AuthModal';
import { AuthContext } from '../context/AuthContext';
import Chatbot from './Chatbot';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const { user, logout } = useContext(AuthContext);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Home className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-secondary">
            Talaba<span className="text-primary">Uy</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/search" className="hover:text-primary transition-all">Qidirish</Link>
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)} 
            className="flex items-center gap-1 hover:text-primary transition-all"
          >
            <MessageSquare size={18} /> Yordam
          </button>
          <div className="flex items-center gap-4 ml-4">
            {!user ? (
              <>
                <button 
                  onClick={() => openAuth('login')}
                  className="text-secondary font-medium hover:text-primary transition-all"
                >
                  Kirish
                </button>
                <button 
                  onClick={() => openAuth('register')}
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-all shadow-md"
                >
                  Ro'yxatdan o'tish
                </button>
              </>
            ) : (
              <div className="flex items-center gap-6">
                {user.is_staff && (
                  <Link to="/admin-dashboard" className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-all font-bold bg-red-50 px-3 py-1.5 rounded-xl">
                    Super Admin
                  </Link>
                )}
                {user.role === 'MAKLER' && (
                  <Link to="/add-property" className="flex items-center gap-1 text-primary hover:text-primary-dark transition-all font-bold">
                    <PlusCircle size={18} /> E'lon Berish
                  </Link>
                )}
                {user.role === 'TALABA' && (
                  <Link to="/saved" className="flex items-center gap-1 text-gray-500 hover:text-primary transition-all font-medium">
                    <Bookmark size={18} /> Saqlanganlar
                  </Link>
                )}
                <div className="flex items-center gap-2 border border-gray-200 px-4 py-1.5 rounded-full bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {user.first_name ? user.first_name.charAt(0) : <User size={16} />}
                  </div>
                  <span className="font-bold text-sm truncate max-w-[100px]">{user.first_name || user.username}</span>
                  <button onClick={logout} className="ml-2 text-gray-400 hover:text-red-500 transition-colors" title="Chiqish">
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 absolute w-full shadow-xl">
          <div className="flex flex-col gap-4">
            <Link to="/search" className="py-2 text-lg">Qidirish</Link>
            <button 
              onClick={() => { setIsChatOpen(true); setIsMenuOpen(false); }} 
              className="text-left py-2 text-lg flex items-center gap-2"
            >
              <MessageSquare size={20} /> Yordam
            </button>
            <hr />
            <button 
              onClick={() => openAuth('login')}
              className="text-left py-2 text-lg"
            >
              Kirish
            </button>
            <button 
              onClick={() => openAuth('register')}
              className="bg-primary text-white p-3 rounded-xl text-center font-bold"
            >
              Ro'yxatdan o'tish
            </button>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        mode={authMode} 
      />
      <Chatbot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </header>
  );
};

export default Header;
