import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import MainLayout from '../layouts/MainLayout';
import { AuthContext } from '../context/AuthContext';
import {
    ShieldAlert, Users, Home, Trash2, Ban, Map, Edit, Plus,
    Building, PlusCircle, CheckCircle2, MapPin, KeyRound, X, Eye, EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BACKEND = 'http://localhost:8000';

const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${BACKEND}${url}`;
};

const getListingThumbnail = (listing) => {
    if (listing.images && listing.images.length > 0) {
        return getImageUrl(listing.images[0].image);
    }
    if (listing.main_image) {
        return getImageUrl(listing.main_image);
    }
    return null;
};

const ThumbnailCell = ({ listing }) => {
    const [hasError, setHasError] = useState(false);
    const imgSrc = getListingThumbnail(listing);

    if (!imgSrc || hasError) {
        return (
            <div className="w-16 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
                <Home size={20} />
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            className="w-16 h-12 object-cover rounded-xl shadow-sm"
            alt={listing.name || "E'lon rasmi"}
            onError={() => setHasError(true)}
        />
    );
};

// ─── Set Password Modal ────────────────────────────────────────────────────
const SetPasswordModal = ({ targetUser, token, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [show, setShow] = useState(false);
    const [customPassword, setCustomPassword] = useState('');

    const handleSetPassword = async () => {
        if (customPassword && customPassword.length < 6) {
            alert('Parol kamida 6 ta belgidan iborat bo\'lishi kerak');
            return;
        }

        setLoading(true);
        try {
            const payload = customPassword ? { new_password: customPassword } : {};
            const res = await api.post(
                `/users/admin/reset-password/${targetUser.id}/`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setResult(res.data);
        } catch {
            alert('Xatolik yuz berdi');
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
                    <X size={20} />
                </button>
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-amber-100 p-3 rounded-xl">
                        <KeyRound className="text-amber-600 w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-extrabold text-secondary">Yangi Parol O'rnatish</h2>
                        <p className="text-sm text-gray-500">Foydalanuvchi: <span className="font-bold text-secondary">{targetUser.username}</span></p>
                    </div>
                </div>

                {!result ? (
                    <>
                        <p className="text-gray-600 mb-4 text-sm bg-amber-50 border border-amber-100 rounded-xl p-4">
                            ⚠️ Yangi parolni xavfsizlik maqsadida admin o'rnatishi yoki tizim avtomatik vaqtinchalik parol yaratib berishi mumkin. Foydalanuvchining joriy parolini ko'rish mumkin emas.
                        </p>
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Yangi parol (yoki bo'sh qoldirib avtomatik yarating)</label>
                            <input 
                                type="text"
                                value={customPassword}
                                onChange={(e) => setCustomPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary transition-colors"
                                placeholder="Kuchli parol kiriting..."
                            />
                        </div>
                        <button
                            onClick={handleSetPassword}
                            disabled={loading}
                            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all disabled:opacity-60"
                        >
                            {loading ? 'O\'rnatilmoqda...' : (customPassword ? 'Yangi parolni o\'rnatish' : 'Vaqtinchalik parol berish')}
                        </button>
                    </>
                ) : (
                    <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                        <p className="text-green-700 font-bold mb-3 flex items-center gap-2">
                            <CheckCircle2 size={18} /> {result.message}
                        </p>
                        
                        {result.is_temp && (
                            <>
                                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3">
                                    <code className="text-lg font-mono font-bold text-secondary flex-1">
                                        {show ? result.new_password : '•'.repeat(result.new_password.length)}
                                    </code>
                                    <button onClick={() => setShow(!show)} className="text-gray-400 hover:text-gray-700 transition-colors">
                                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-400 mt-3">Bu vaqtinchalik parolni darhol nusxalab oling. Oyna yopilgach qayta ko'rsatilmaydi.</p>
                            </>
                        )}
                        <button onClick={onClose} className="w-full mt-4 py-2 bg-secondary text-white rounded-xl font-bold hover:bg-secondary/90 transition-all">
                            Yopish
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [cities, setCities] = useState([]);
    const [activeTab, setActiveTab] = useState('users');
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    // Reset password modal state
    const [resetTarget, setResetTarget] = useState(null);

    // Create property form
    const [formData, setFormData] = useState({
        name: '', city: '1', address: '', description: '', distance_to_uni: 500, price: 1000000
    });
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState(null);
    const [createLoading, setCreateLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    
    // Edit property modal state
    const [amenitiesList, setAmenitiesList] = useState([]);
    const [editTarget, setEditTarget] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: '', city: '1', address: '', description: '', distance_to_uni: 500, price: 1000000,
        room_type: 'entire', amenities: []
    });
    const [editMainImage, setEditMainImage] = useState(null);
    const [editGalleryImages, setEditGalleryImages] = useState(null);

    const fetchData = async () => {
        try {
            const [usersRes, propsRes, citiesRes, amenitiesRes] = await Promise.all([
                api.get('/users/admin/all-users/', { headers: { Authorization: `Bearer ${token}` } }),
                api.get('/listings/properties/'),
                api.get('/listings/cities/'),
                api.get('/listings/amenities/'),
            ]);
            setUsers(usersRes.data);
            setProperties(propsRes.data.results || propsRes.data);
            setCities(citiesRes.data.results || citiesRes.data);
            setAmenitiesList(amenitiesRes.data.results || amenitiesRes.data);
        } catch (error) {
            console.error('Fetch Data error:', error);
        }
    };

    useEffect(() => {
        if (!token || !user?.is_staff) { navigate('/'); return; }
        fetchData();
    }, [token, user, navigate]);

    // ── User Actions ──────────────────────────────────────────────────────────
    const toggleBlock = async (userId) => {
        if (!window.confirm("Rostdan ham ushbu foydalanuvchi holatini o'zgartirmoqchimisiz?")) return;
        try {
            await api.post(`/users/admin/toggle-block/${userId}/`, {}, { headers: { Authorization: `Bearer ${token}` } });
            fetchData();
        } catch { alert('Xatolik yuz berdi'); }
    };

    const deleteUser = async (userId) => {
        if (!window.confirm("Bunday foydalanuvchini o'chirib yuborsangiz, barcha ma'lumotlari yo'qoladi. Rozimisiz?")) return;
        try {
            await api.delete(`/users/admin/delete-user/${userId}/`, { headers: { Authorization: `Bearer ${token}` } });
            fetchData();
        } catch { alert('Xatolik yuz berdi'); }
    };

    // ── Property Actions ──────────────────────────────────────────────────────
    const deleteProperty = async (propId) => {
        if (!window.confirm("Ushbu uyni o'chirib tashlaysizmi? Bu amalni ortga qaytarib bo'lmaydi!")) return;
        try {
            await api.delete(`/listings/properties/${propId}/`, { headers: { Authorization: `Bearer ${token}` } });
            fetchData();
        } catch { alert('Xatolik yuz berdi'); }
    };

    const openEditProperty = async (prop) => {
        setActiveTab('properties'); // ensure we stay
        try {
            // fetch detailed data to get room, amenities, and full info
            const res = await api.get(`/listings/properties/${prop.id}/`);
            const detailed = res.data;
            const minPrice = detailed.rooms?.length > 0 ? detailed.rooms[0].price_per_month : 0;
            const rType = detailed.rooms?.length > 0 ? detailed.rooms[0].room_type : 'entire';
            setEditFormData({
                name: detailed.name || '',
                city: detailed.city?.id || '1',
                address: detailed.address || '',
                description: detailed.description || '',
                distance_to_uni: detailed.distance_to_uni || 0,
                price: parseFloat(minPrice || 0),
                room_type: rType,
                amenities: detailed.amenities?.map(a => a.id) || []
            });
            setEditMainImage(null);
            setEditGalleryImages(null);
            setEditTarget(detailed);
        } catch (err) {
            alert("Ma'lumot yuklashda xatolik");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        try {
            const fd = new FormData();
            fd.append('name', editFormData.name);
            fd.append('city', parseInt(editFormData.city));
            fd.append('address', editFormData.address);
            fd.append('description', editFormData.description);
            fd.append('distance_to_uni', parseInt(editFormData.distance_to_uni));
            fd.append('price', parseInt(editFormData.price));
            fd.append('room_type', editFormData.room_type);
            
            // Amenities array logic (DRF handles multiple appending)
            editFormData.amenities.forEach(a_id => {
                fd.append('amenities', a_id);
            });
            
            if (editMainImage) {
                fd.append('main_image', editMainImage);
            }
            if (editGalleryImages) {
                for (let i = 0; i < editGalleryImages.length; i++) {
                    fd.append('gallery_images', editGalleryImages[i]);
                }
            }

            await api.patch(`/listings/properties/${editTarget.id}/`, fd, { headers: { Authorization: `Bearer ${token}` } });
            setSuccessMsg("E'lon muvaffaqiyatli tahrirlandi!");
            setEditTarget(null);
            fetchData();
            setTimeout(() => setSuccessMsg(''), 5000);
        } catch (error) {
            alert("Xatolik: " + JSON.stringify(error.response?.data || error.message));
        }
        setEditLoading(false);
    };

    const handleCreateProperty = async (e) => {
        e.preventDefault();
        setCreateLoading(true);
        try {
            if (!mainImage) { alert("Iltimos, uyning asosiy rasmini yuklang"); setCreateLoading(false); return; }
            const fd = new FormData();
            fd.append('name', formData.name);
            fd.append('city', parseInt(formData.city));
            fd.append('address', formData.address);
            fd.append('description', formData.description);
            fd.append('distance_to_uni', parseInt(formData.distance_to_uni));
            fd.append('price', parseInt(formData.price));
            fd.append('latitude', 41.2995);
            fd.append('longitude', 69.2401);
            fd.append('main_image', mainImage);
            if (galleryImages) {
                for (let i = 0; i < galleryImages.length; i++) fd.append('gallery_images', galleryImages[i]);
            }
            await api.post('/listings/properties/', fd, { headers: { Authorization: `Bearer ${token}` } });
            setSuccessMsg("Uy muvaffaqiyatli qo'shildi!");
            setActiveTab('properties');
            fetchData();
            setFormData({ name: '', city: '1', address: '', description: '', distance_to_uni: 500, price: 1000000 });
            setMainImage(null);
            setGalleryImages(null);
            setTimeout(() => setSuccessMsg(''), 5000);
        } catch (error) {
            alert("Xatolik: " + JSON.stringify(error.response?.data || error.message));
        }
        setCreateLoading(false);
    };

    // ── City Actions ──────────────────────────────────────────────────────────
    const handleCityAction = async (action, cityId = null, currentName = '') => {
        if (action === 'add') {
            const name = window.prompt("Yangi shahar nomini kiriting:");
            if (!name) return;
            try { await api.post(`/listings/cities/`, { name }, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }
            catch { alert('Xatolik'); }
        } else if (action === 'edit') {
            const name = window.prompt("Shaharning yangi nomini kiriting:", currentName);
            if (!name || name === currentName) return;
            try { await api.patch(`/listings/cities/${cityId}/`, { name }, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }
            catch { alert('Xatolik'); }
        } else if (action === 'delete') {
            if (!window.confirm("Shaharni o'chirishga ishonchingiz komilmi?")) return;
            try { await api.delete(`/listings/cities/${cityId}/`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }
            catch { alert('Xatolik'); }
        }
    };

    if (!user?.is_staff) return null;

    const tabs = [
        { id: 'users', label: 'Foydalanuvchilar', icon: <Users size={18} /> },
        { id: 'properties', label: "E'lon qilingan Uylar", icon: <Home size={18} /> },
        { id: 'add-property', label: "Uy qo'shish", icon: <PlusCircle size={18} /> },
        { id: 'cities', label: 'Shaharlar', icon: <Map size={18} /> },
    ];

    const roleBadge = (u) => {
        if (u.is_staff) return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">ADMIN</span>;
        if (u.role === 'MAKLER') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">MAKLER</span>;
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">TALABA</span>;
    };

    return (
        <MainLayout>
            {resetTarget && (
                <SetPasswordModal targetUser={resetTarget} token={token} onClose={() => setResetTarget(null)} />
            )}
            
            {editTarget && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto pt-24 pb-24">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 relative my-auto mt-10 mb-10">
                        <button onClick={() => setEditTarget(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-10 bg-gray-100 p-2 rounded-full">
                            <X size={20} />
                        </button>
                        
                        <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                            <div className="bg-blue-100 p-2.5 rounded-xl">
                                <Edit className="text-blue-600 w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold text-secondary">E'lonni Tahrirlash</h2>
                                <p className="text-gray-500 text-sm">#{editTarget.id} - {editTarget.name}</p>
                            </div>
                        </div>

                        <form onSubmit={handleEditSubmit} className="max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Sarlavha</label>
                                    <input required value={editFormData.name} onChange={e => setEditFormData({ ...editFormData, name: e.target.value })} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Shahar</label>
                                    <select required value={editFormData.city} onChange={e => setEditFormData({ ...editFormData, city: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all">
                                        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">To'liq Manzil</label>
                                    <input required value={editFormData.address} onChange={e => setEditFormData({ ...editFormData, address: e.target.value })} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Ta'rif</label>
                                    <textarea required value={editFormData.description} onChange={e => setEditFormData({ ...editFormData, description: e.target.value })} rows="4" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all resize-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Oliygohgacha masofa (m)</label>
                                    <input required value={editFormData.distance_to_uni} onChange={e => setEditFormData({ ...editFormData, distance_to_uni: e.target.value })} type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Narxi (1 oy uchun)</label>
                                    <input required value={editFormData.price} onChange={e => setEditFormData({ ...editFormData, price: e.target.value })} type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Uy Turi</label>
                                    <select value={editFormData.room_type} onChange={e => setEditFormData({ ...editFormData, room_type: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary transition-all">
                                        <option value="entire">Butun uy/kvartira</option>
                                        <option value="private">Shaxsiy xona</option>
                                        <option value="shared">Umumiy xona</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Qulayliklar</label>
                                    <div className="flex flex-wrap gap-3">
                                        {amenitiesList.map(amenity => (
                                            <label key={amenity.id} className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 hover:border-primary transition-all">
                                                <input 
                                                    type="checkbox" 
                                                    checked={editFormData.amenities.includes(amenity.id)} 
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        if (checked) setEditFormData({ ...editFormData, amenities: [...editFormData.amenities, amenity.id] });
                                                        else setEditFormData({ ...editFormData, amenities: editFormData.amenities.filter(id => id !== amenity.id) });
                                                    }}
                                                    className="w-4 h-4 text-primary rounded outline-none"
                                                />
                                                <span className="text-sm text-secondary font-bold">{amenity.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Yangi Asosiy Rasm <span className="text-xs text-gray-400">(faqat almashtirish uchun yuklang)</span></label>
                                    <input type="file" accept="image/*" onChange={e => setEditMainImage(e.target.files[0])} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none font-semibold text-sm transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Yangi Galereya Rasmlari <span className="text-xs text-red-500">(yuklasangiz, eskilar o'chadi)</span></label>
                                    <input type="file" multiple accept="image/*" onChange={e => setEditGalleryImages(e.target.files)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none font-semibold text-sm transition-all" />
                                </div>
                            </div>

                            <button type="submit" disabled={editLoading} className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all mt-4 ${editLoading ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark shadow-primary/20'}`}>
                                {editLoading ? 'Saqlanmoqda...' : 'Ozgarishlarni saqlash'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-gray-50 min-h-screen py-10">
                <div className="container max-w-6xl">

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-red-500/10 p-3 rounded-xl">
                            <ShieldAlert className="text-red-500 w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-secondary">Super Admin Panel</h1>
                            <p className="text-gray-500">Platformadagi barcha boshqaruv huquqlari.</p>
                        </div>
                    </div>

                    {/* Tab Bar */}
                    <div className="flex flex-wrap bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 mb-6 gap-1">
                        {tabs.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                className={`flex-1 min-w-[120px] px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm
                                    ${activeTab === t.id
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                {t.icon} {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Success message */}
                    {successMsg && (
                        <div className="mb-4 bg-green-50 border border-green-100 text-green-700 p-4 rounded-xl flex items-center gap-3 font-bold">
                            <CheckCircle2 className="w-5 h-5 shrink-0" /> {successMsg}
                        </div>
                    )}

                    {/* ── USERS TAB ─────────────────────────────────────────── */}
                    {activeTab === 'users' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="py-4 px-5 font-bold text-gray-500 w-16">ID</th>
                                        <th className="py-4 px-5 font-bold text-gray-500">Username</th>
                                        <th className="py-4 px-5 font-bold text-gray-500">Email</th>
                                        <th className="py-4 px-5 font-bold text-gray-500">Rol</th>
                                        <th className="py-4 px-5 font-bold text-gray-500">Status</th>
                                        <th className="py-4 px-5 font-bold text-gray-500 text-right">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-5 text-gray-400 font-mono text-sm font-bold">#{u.id}</td>
                                            <td className="py-4 px-5 font-bold text-secondary">{u.username}</td>
                                            <td className="py-4 px-5 text-gray-500 text-sm">{u.email || '—'}</td>
                                            <td className="py-4 px-5">{roleBadge(u)}</td>
                                            <td className="py-4 px-5">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                    {u.is_active ? 'Faol' : 'Bloklangan'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-5 text-right">
                                                {!u.is_staff && (
                                                    <div className="flex gap-2 justify-end flex-wrap">
                                                        <button
                                                            onClick={() => setResetTarget(u)}
                                                            className="px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all"
                                                        >
                                                            <KeyRound size={13} /> Parol o'rnatish
                                                        </button>
                                                        <button
                                                            onClick={() => toggleBlock(u.id)}
                                                            className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${u.is_active ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                                                        >
                                                            <Ban size={13} /> {u.is_active ? 'Bloklash' : 'Ochish'}
                                                        </button>
                                                        <button
                                                            onClick={() => deleteUser(u.id)}
                                                            className="px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                                                        >
                                                            <Trash2 size={13} /> O'chirish
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {users.length === 0 && (
                                <div className="py-16 text-center text-gray-400 font-bold">Foydalanuvchilar topilmadi</div>
                            )}
                        </div>
                    )}

                    {/* ── PROPERTIES TAB ───────────────────────────────────── */}
                    {activeTab === 'properties' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="py-4 px-5 font-bold text-gray-500 w-14">#</th>
                                        <th className="py-4 px-5 font-bold text-gray-500">Rasm</th>
                                        <th className="py-4 px-5 font-bold text-gray-500">Nomlanishi</th>
                                        <th className="py-4 px-5 font-bold text-gray-500">Joylashuv</th>
                                        <th className="py-4 px-5 font-bold text-gray-500">Egasi</th>
                                        <th className="py-4 px-5 font-bold text-gray-500 text-right">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.map((p, index) => (
                                        <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-5 text-gray-400 font-bold text-sm">{index + 1}</td>
                                            <td className="py-4 px-5">
                                                <ThumbnailCell listing={p} />
                                            </td>
                                            <td className="py-4 px-5 font-bold text-secondary max-w-[200px] truncate">{p.name}</td>
                                            <td className="py-4 px-5 text-gray-500 text-sm max-w-[180px] truncate">
                                                <span className="flex items-center gap-1"><MapPin size={13} />{p.address}</span>
                                            </td>
                                            <td className="py-4 px-5 text-sm text-gray-500 font-medium">
                                                {p.owner_username || '—'}
                                            </td>
                                            <td className="py-4 px-5 text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <button
                                                        onClick={() => openEditProperty(p)}
                                                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-all"
                                                    >
                                                        <Edit size={13} /> Tahrirlash
                                                    </button>
                                                    <button
                                                        onClick={() => deleteProperty(p.id)}
                                                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-all"
                                                    >
                                                        <Trash2 size={13} /> O'chirish
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {properties.length === 0 && (
                                <div className="py-16 text-center text-gray-400 font-bold">Hali uylar e'lon qilinmagan</div>
                            )}
                        </div>
                    )}

                    {/* ── ADD PROPERTY TAB ──────────────────────────────────── */}
                    {activeTab === 'add-property' && (
                        <form onSubmit={handleCreateProperty} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                                <div className="bg-primary/10 p-2.5 rounded-xl">
                                    <Building className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-extrabold text-secondary">Yangi uy e'lonini kiritish</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Sarlavha (Mulk nomi)</label>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                                        placeholder="Masalan: Chilonzorda 2 xonali kvartira"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Shahar</label>
                                    <select
                                        required
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                                    >
                                        {cities.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">To'liq Manzil</label>
                                    <input
                                        required
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                                        placeholder="Toshkent shahar, Chilonzor 8-mavze, 14-uy"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Ta'rif</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        rows="4"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                                        placeholder="Uy haqida batafsil ma'lumot..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Oliygohgacha masofa (metrda)</label>
                                    <input
                                        required
                                        value={formData.distance_to_uni}
                                        onChange={e => setFormData({ ...formData, distance_to_uni: e.target.value })}
                                        type="number"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Narxi (1 oy uchun, so'mda)</label>
                                    <input
                                        required
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        type="number"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                                        placeholder="Masalan: 1500000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Asosiy Rasm</label>
                                    <input
                                        id="admin_image_upload"
                                        required
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setMainImage(e.target.files[0])}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Qo'shimcha rasmlar (Galereya)</label>
                                    <input
                                        id="admin_gallery_upload"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={e => setGalleryImages(e.target.files)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                    />
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-100 text-blue-700 p-4 rounded-xl mb-6 text-sm flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                                <p>Admin sifatida qo'shilgan e'lonning egasi siz bo'lasiz. Egasi keyinchalik tahrirlash orqali o'zgartirilishi mumkin.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={createLoading}
                                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${createLoading ? 'bg-primary/60 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark shadow-primary/20'}`}
                            >
                                {createLoading ? 'Yuklanmoqda...' : "E'lonni chop etish"}
                            </button>
                        </form>
                    )}

                    {/* ── CITIES TAB ────────────────────────────────────────── */}
                    {activeTab === 'cities' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <span className="font-bold text-secondary text-lg">Shaharlar ro'yxati</span>
                                <button
                                    onClick={() => handleCityAction('add')}
                                    className="bg-primary text-white hover:bg-primary-dark px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-primary/20 text-sm"
                                >
                                    <Plus size={16} /> Yangi shahar qo'shish
                                </button>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="py-4 px-6 font-bold text-gray-500 w-16">#</th>
                                        <th className="py-4 px-6 font-bold text-gray-500">Shahar Nomi</th>
                                        <th className="py-4 px-6 font-bold text-gray-500 text-right">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cities.map((c, index) => (
                                        <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6 font-bold text-gray-400 text-sm">{index + 1}</td>
                                            <td className="py-4 px-6 font-bold text-secondary">{c.name}</td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <button
                                                        onClick={() => handleCityAction('edit', c.id, c.name)}
                                                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-all"
                                                    >
                                                        <Edit size={13} /> Tahrirlash
                                                    </button>
                                                    <button
                                                        onClick={() => handleCityAction('delete', c.id)}
                                                        className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-all"
                                                    >
                                                        <Trash2 size={13} /> O'chirish
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        </MainLayout>
    );
};

export default AdminDashboard;
