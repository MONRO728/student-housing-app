import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import MainLayout from '../layouts/MainLayout';
import PropertyCard from '../components/PropertyCard';
import { AuthContext } from '../context/AuthContext';
import { Bookmark, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SavedProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext); // Removed unused 'user'
    const navigate = useNavigate();

    const fetchSaved = async () => {
        try {
            // Interceptor Authorization headerini o'zi qo'shadi
            const res = await api.get('/users/saved/');
            setProperties(Array.isArray(res.data) ? res.data : (res.data.results || []));
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        fetchSaved();
    }, [token, navigate]);

    if (loading) return <div className="h-screen flex items-center justify-center">Yuklanmoqda...</div>;

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-primary/10 p-3 rounded-xl">
                            <Bookmark className="text-primary w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-secondary">Saqlangan uylar</h1>
                            <p className="text-gray-500">Sizga yoqqan va kelajakda ijaraga olishni niyat qilgan uylaringiz.</p>
                        </div>
                    </div>

                    {properties.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center">
                            <AlertCircle className="w-16 h-16 text-gray-300 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-700 mb-2">Hozircha hech narsa yo'q</h2>
                            <p className="text-gray-500 max-w-md mx-auto mb-6">Uylarni ko'rish jarayonida "Saqlash" tugmasini bosib, o'zingizga yoqqan variantlarni shu yerga yig'ishingiz mumkin.</p>
                            <button onClick={() => navigate('/search')} className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-dark transition-all">Qidiruvga o'tish</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {properties.map(prop => (
                                <PropertyCard key={prop.id} property={prop} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default SavedProperties;
