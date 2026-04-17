import React, { useState, useEffect, useContext } from 'react';
import { X, Mail, Lock, Home, User, Briefcase, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose, mode: initialMode = 'login' }) => {
  const { login, register, user } = useContext(AuthContext);
  const [mode, setMode] = useState(initialMode);
  const navigate = useNavigate();
  
  // Form stats
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('TALABA'); // TALABA ёки MAKLER
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setError('');
  }, [initialMode, isOpen]);

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };

  // Backend DRF xato xabarini chiqaruvchi yordamchi funksiya
  const extractErrorMessage = (error) => {
    const data = error?.response?.data;
    if (!data) return "Server bilan bog'lanishda xato yuz berdi.";
    if (typeof data === 'string') return data;
    if (data.detail) return data.detail;
    // DRF field validation xatolari: {field: ["xato1", ...]}
    const fieldMap = { username: 'Foydalanuvchi nomi', email: 'Email', password: 'Parol', role: 'Rol', non_field_errors: '' };
    const messages = [];
    for (const field in data) {
      const errs = Array.isArray(data[field]) ? data[field] : [data[field]];
      errs.forEach(msg => {
        const prefix = fieldMap[field] !== undefined ? (fieldMap[field] ? fieldMap[field] + ': ' : '') : field + ': ';
        messages.push(prefix + msg);
      });
    }
    return messages.join(' | ') || "Kiritilgan ma'lumotlar xato.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let loggedUser;
      if (mode === 'login') {
        loggedUser = await login(email, password);
      } else {
        loggedUser = await register({
          username: email.split('@')[0] + Math.floor(Math.random() * 100),
          email,
          password,
          first_name: name,
          role: role
        });
      }
      setIsLoading(false);
      onClose();
      if (loggedUser?.is_staff || loggedUser?.role === 'ADMIN') {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      setIsLoading(false);
      setError(extractErrorMessage(error));
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          ></motion.div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-secondary transition-all"
            >
              <X size={24} />
            </button>

            <div className="p-10 pt-12">
              <div className="flex items-center gap-2 mb-8 justify-center">
                <div className="bg-primary p-2 rounded-lg">
                  <Home className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-bold text-secondary">
                  Talaba<span className="text-primary">Uy</span>
                </span>
              </div>

              <h2 className="text-2xl font-black text-center mb-2">
                {mode === 'login' ? 'Tizimga kirish' : 'Ro\'yxatdan o\'tish'}
              </h2>
              <p className="text-gray-500 text-center mb-8">
                {mode === 'login' ? 'Hisobingizga kiring va uylarni band qiling' : 'Yangi hisob yarating va imkoniyatlardan foydalaning'}
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm font-bold text-center">
                        {error}
                    </div>
                )}
                
                {mode === 'register' && (
                  <>
                    <div className="flex gap-2 mb-4">
                      <button 
                        type="button"
                        onClick={() => setRole('TALABA')}
                        className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${role === 'TALABA' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-400'}`}
                      >
                        <GraduationCap size={24} className="mb-1" />
                        <span className="font-bold text-sm">Men Talabaman</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setRole('MAKLER')}
                        className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${role === 'MAKLER' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-400'}`}
                      >
                        <Briefcase size={24} className="mb-1" />
                        <span className="font-bold text-sm">Men Uy Egasiman</span>
                      </button>
                    </div>

                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="To'liq ismingiz" 
                        className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white outline-none rounded-2xl py-4 pl-12 pr-4 transition-all font-medium"
                      />
                    </div>
                  </>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email manzili" 
                    className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white outline-none rounded-2xl py-4 pl-12 pr-4 transition-all font-medium"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Parol" 
                    className="w-full bg-gray-50 border border-transparent focus:border-primary focus:bg-white outline-none rounded-2xl py-4 pl-12 pr-12 transition-all font-medium"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {mode === 'login' && (
                  <div className="text-right">
                    <button type="button" className="text-sm font-bold text-primary hover:underline">Parolni unutdingizmi?</button>
                  </div>
                )}

                <button 
                  disabled={isLoading}
                  className={`w-full text-white py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-primary/20 mt-4 ${isLoading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
                >
                  {isLoading ? 'Iltimos kuting...' : (mode === 'login' ? 'Kirish' : 'Davom etish')}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-500 font-medium">
                  {mode === 'login' ? 'Hisobingiz yo\'qmi?' : 'Hisobingiz bormi?'}
                  <button onClick={toggleMode} className="text-primary font-bold ml-2 hover:underline">
                    {mode === 'login' ? `Ro'yxatdan o'tish` : 'Kirish'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
