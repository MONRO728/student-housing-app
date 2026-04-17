import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import MainLayout from '../layouts/MainLayout';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, MapPin, Building, PlusCircle, Trash2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BACKEND = 'http://localhost:8000';
const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${BACKEND}${url}`;
};

const MaklerDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [activeTab, setActiveTab] = useState('list');
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    // Cities loaded from backend
    const [cities, setCities] = useState([]);
    const [citiesLoading, setCitiesLoading] = useState(true);
    const [citiesError, setCitiesError] = useState('');

    // Form inputs — city defaults to '' until API loads
    const [formData, setFormData] = useState({
        name: '', city: '', address: '', description: '', distance_to_uni: 500, price: 1000000
    });
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState(null);
    const [createLoading, setCreateLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [submitError, setSubmitError] = useState('');

    const fetchProperties = async () => {
        try {
            // Interceptor Authorization headerini o'zi qo'shadi
            const res = await api.get(`/listings/properties/?owner=${user.id}`);
            setProperties(res.data.results || res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch cities from backend on mount
    useEffect(() => {
        api.get('/listings/cities/')
            .then(res => {
                const list = Array.isArray(res.data)
                    ? res.data
                    : (res.data.results || []);
                setCities(list);
                // Default city = first item from DB (real ID, not hardcoded)
                if (list.length > 0) {
                    setFormData(prev => ({ ...prev, city: String(list[0].id) }));
                }
                setCitiesLoading(false);
            })
            .catch(() => {
                setCitiesError("Shaharlar ro'yxatini yuklab bo'lmadi. Sahifani yangilang.");
                setCitiesLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!token || user?.role !== 'MAKLER') {
            navigate('/');
            return;
        }
        fetchProperties();
    }, [token, user, navigate]);

    const deleteProperty = async (propId) => {
        if (!window.confirm("Rostdan ham ushbu e'lonni o'chirasizmi?")) return;
        try {
            // Interceptor Authorization headerini o'zi qo'shadi
            await api.delete(`/listings/properties/${propId}/`);
            fetchProperties();
        } catch (error) {
            alert("O'chirishda xatolik yuz berdi");
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        setSubmitError('');
        try {
            if (!mainImage) {
                setSubmitError("Iltimos, uyning asosiy rasmini yuklang");
                setCreateLoading(false);
                return;
            }

            const fd = new FormData();
            fd.append('name', formData.name);
            fd.append('city', parseInt(formData.city));
            fd.append('address', formData.address);
            fd.append('description', formData.description);
            fd.append('distance_to_uni', parseInt(formData.distance_to_uni));
            fd.append('price', parseInt(formData.price));
            fd.append('latitude', 41.2995); // Fake lat for Tashkent
            fd.append('longitude', 69.2401);
            fd.append('main_image', mainImage); // File blob/object
            
            if (galleryImages) {
                for (let i = 0; i < galleryImages.length; i++) {
                    fd.append('gallery_images', galleryImages[i]);
                }
            }

            // Interceptor Authorization headerini o'zi qo'shadi
            await api.post('/listings/properties/', fd);
            setSuccessMsg("Uy muvaffaqiyatli qo'shildi!");
            setActiveTab('list');
            fetchProperties();
            // Reset city to first available city from loaded list
            const firstCityId = cities.length > 0 ? String(cities[0].id) : '';
            setFormData({ name: '', city: firstCityId, address: '', description: '', distance_to_uni: 500, price: 1000000 });
            setMainImage(null);
            setGalleryImages(null);
            document.getElementById('image_upload_input').value = ''; // Clear input visually
            document.getElementById('gallery_upload_input').value = '';
            
            setTimeout(() => setSuccessMsg(''), 5000);
        } catch (error) {
            console.error('[handleCreate] error:', error);
            const data = error.response?.data;
            if (data) {
                // Birinchi field xatosini topib ko'rsatamiz
                const firstKey = Object.keys(data)[0];
                const msg = Array.isArray(data[firstKey]) ? data[firstKey][0] : String(data[firstKey]);
                setSubmitError(`Xatolik (${firstKey}): ${msg}`);
            } else {
                setSubmitError("E'lon yuborishda xatolik yuz berdi. Qayta urinib ko'ring.");
            }
        }
        setCreateLoading(false);
    };

    if (user?.role !== 'MAKLER') return null;

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container max-w-5xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-500/10 p-3 rounded-xl">
                                <Briefcase className="text-blue-500 w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-secondary">Makler Paneli</h1>
                                <p className="text-gray-500">O'z uylaringizni shu yerdan turib e'lon qiling.</p>
                            </div>
                        </div>
                        <div className="flex bg-white rounded-xl shadow-sm p-1">
                            <button onClick={() => setActiveTab('list')} className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${activeTab === 'list' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                                <Building size={18} /> Mening uylarim
                            </button>
                            <button onClick={() => setActiveTab('add')} className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${activeTab === 'add' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                                <PlusCircle size={18} /> Yangi qo'shish
                            </button>
                        </div>
                    </div>

                    {activeTab === 'list' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            {successMsg && (
                                <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6" />
                                    <span className="font-bold">{successMsg}</span>
                                </div>
                            )}
                            
                            {properties.length === 0 ? (
                                <div className="text-center py-12">
                                    <h2 className="text-xl font-bold text-gray-400 mb-2">Hali uylar e'lon qilmadingiz</h2>
                                    <button onClick={() => setActiveTab('add')} className="text-primary font-bold hover:underline">Birinchi uyni qo'shish</button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {properties.map(p => (
                                        <div key={p.id} className="flex items-center justify-between border border-gray-100 p-4 rounded-xl hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-4">
                                                <img src={getImageUrl(p.main_image) || ''} className="w-24 h-16 object-cover rounded-lg" alt="" onError={(e) => { e.target.style.display='none'; }} />
                                                <div>
                                                    <h3 className="font-bold text-lg text-secondary truncate max-w-sm">{p.name}</h3>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14}/> {p.address}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => deleteProperty(p.id)} className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1 transition-all">
                                                <Trash2 size={16} /> E'lonni o'chirish
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'add' && (
                        <form onSubmit={handleCreate} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold mb-6 border-b pb-4">Yangi uy e'lonini kiritish</h2>
                            
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Sarlavha (Mulk nomi)</label>
                                    <input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Masalan: Chilonzorda 2 xonali kvartira" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Shahar</label>
                                    {citiesError ? (
                                        <div className="w-full bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                                            {citiesError}
                                        </div>
                                    ) : citiesLoading ? (
                                        <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-400 text-sm animate-pulse">
                                            Shaharlar yuklanmoqda...
                                        </div>
                                    ) : (
                                        <select
                                            required
                                            value={formData.city}
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"
                                        >
                                            {cities.length === 0 && (
                                                <option value="" disabled>Shaharlar mavjud emas</option>
                                            )}
                                            {cities.map(city => (
                                                <option key={city.id} value={String(city.id)}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">To'liq Manzil</label>
                                    <input required value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Toshkent shahar, Chilonzor 8-mavze, 14-uy" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Ta'rif</label>
                                    <textarea required value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Uy haqida batafsil ma'lumot..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Oliygohgacha masofa (metrda)</label>
                                    <input required value={formData.distance_to_uni} onChange={e=>setFormData({...formData, distance_to_uni: e.target.value})} type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Narxi (1 oy uchun, so'mda)</label>
                                    <input required value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" placeholder="Masalan: 1500000" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Asosiy Rasm</label>
                                    <input id="image_upload_input" required type="file" accept="image/*" onChange={e => setMainImage(e.target.files[0])} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-primary transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Qo'shimcha rasmlar (Galereya uchun)</label>
                                    <input id="gallery_upload_input" type="file" multiple accept="image/*" onChange={e => setGalleryImages(e.target.files)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-primary transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                                    <p className="text-xs text-gray-400 mt-1">Bir necha rasm tanlashingiz mumkin (Ctrl yoki Cmd bosib turing).</p>
                                </div>
                            </div>
                            
                            {submitError && (
                                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                                    <span className="font-semibold text-sm">{submitError}</span>
                                </div>
                            )}

                            <div className="bg-yellow-50 text-yellow-700 p-4 rounded-xl mb-6 text-sm flex gap-3 items-center">
                                <CheckCircle2 className="w-8 h-8 shrink-0" />
                                <p>Siz kiritgan e'lon avtomatik tarzda tizimdan tasdiqlanib qidiruvga qo'shiladi. E'tiborli bo'ling, nomaqbul rasmlar tizim tomondan bekor qilinishi mumkin.</p>
                            </div>

                            <button type="submit" disabled={createLoading} className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl mt-4 ${createLoading ? 'bg-primary/60' : 'bg-primary hover:bg-primary-dark transition-all'}`}>
                                {createLoading ? 'Yuklanmoqda...' : "E'lonni chop etish"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default MaklerDashboard;
