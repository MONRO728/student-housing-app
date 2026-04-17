import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { MapPin, Star, Share2, Heart, ShieldCheck, Check, Calendar, Users, ChevronRight, GraduationCap, ImageOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../api';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const ROOM_TYPE_MAP = {
    'entire': 'Butun uy/kvartira',
    'private': 'Shaxsiy xona',
    'shared': 'Umumiy xona'
};

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [activeImg, setActiveImg] = useState(0);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingMsg, setBookingMsg] = useState('');
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [imgError, setImgError] = useState(false);

    // user.saved_properties dan haqiqiy save holatini olamiz
    const { token, user, fetchProfile } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        setActiveImg(0);
        window.scrollTo(0, 0);
        
        api.get(`/listings/properties/${id}/`)
            .then(res => {
                setProperty(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Xatolik yuz berdi", err);
                setProperty(null);
                setLoading(false);
            });
    }, [id]);
    // isSaved ni user.saved_properties bilan sinxronlashtirish
    useEffect(() => {
        if (user && property) {
            setIsSaved(user.saved_properties?.includes(property.id) ?? false);
        }
    }, [user, property]);

    // REAL toggleSave — API orqali backend bilan ishlaydi
    const toggleSave = async () => {
        if (!token) {
            setIsAuthOpen(true);  // login modal ochiladi
            return;
        }
        if (user?.role !== 'TALABA') {
            alert("Faqat talabalar xonalarni saqlay oladi!");
            return;
        }
        setIsSaving(true);
        try {
            // PropertyCard'dagi bilan bir xil endpoint
            await api.post(`/users/save-property/${property.id}/`);
            // user.saved_properties ni yangilaymiz — isSaved useEffect orqali o'zgaradi
            await fetchProfile();
        } catch (err) {
            console.error('[toggleSave] error:', err);
        }
        setIsSaving(false);
    };

    const handleBooking = async () => {
        if (!token) {
            setIsAuthOpen(true);
            return;
        }
        setBookingLoading(true);
        setBookingMsg('');
        try {
            // Interceptor Authorization headerini o'zi qo'shadi
            await api.post('/listings/bookings/', { property: property.id });
            setBookingMsg("So'rov yuborildi! Uy egasi siz bilan tez orada bog'lanadi.");
        } catch (err) {
            setBookingMsg(err.response?.data?.error || "Xatolik yuz berdi. Qayta urinib ko'ring.");
        }
        setBookingLoading(false);
    };

    const getAvailableText = () => {
        const fromStr = property.rooms?.[0]?.available_from;
        if (!fromStr) return "Noma'lum";
        const fromDate = new Date(fromStr);
        if (fromDate <= new Date()) return "Ayni vaqtda bo'sh";
        return fromDate.toLocaleDateString('uz-UZ');
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-500 font-semibold">Yuklanmoqda...</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!property) {
        return (
            <MainLayout>
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                    <div className="text-7xl">🔍</div>
                    <h1 className="text-3xl font-extrabold text-secondary">E'lon topilmadi</h1>
                    <p className="text-gray-500 font-medium">Bunday e'lon mavjud emas yoki o'chirilgan.</p>
                    <Link to="/" className="mt-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                        Bosh sahifaga qaytish
                    </Link>
                </div>
            </MainLayout>
        );
    }

    const allImages = property.images?.length > 0
        ? property.images
        : [{ id: 0, image: property.main_image }];

    return (
        <MainLayout>
            {/* Auth Modal — login talab qilinganda chiqadi */}
            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                mode="login"
            />
            <div className="bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 py-6">

                    {/* Breadcrumbs */}
                    <div className="flex items-center text-sm text-gray-500 mb-6 font-medium flex-wrap gap-1">
                        <Link to="/" className="hover:text-primary transition-colors">Bosh sahifa</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to={`/search?city=${property.city}`} className="hover:text-primary transition-colors capitalize">
                            {property.city_name}
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-800">{property.district} tumani</span>
                    </div>

                    {/* Title Row */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-extrabold text-secondary mb-2 leading-tight">
                                {property.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
                                <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-50 px-3 py-1 rounded-lg">
                                    <Star size={15} className="fill-current" />
                                    <span className="text-yellow-700 font-bold">4.8 sharh</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <MapPin size={15} className="text-primary shrink-0" />
                                    <span>{property.address}</span>
                                </div>
                                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {property.type}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-xl hover:border-gray-300 shadow-sm transition-all font-bold text-sm text-gray-700">
                                <Share2 size={16} /> Ulashish
                            </button>
                            <button
                                onClick={toggleSave}
                                disabled={isSaving}
                                className={`flex items-center gap-2 border px-4 py-2 rounded-xl shadow-sm transition-all font-bold text-sm
                                    ${isSaved ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
                            >
                                <Heart size={16} className={isSaved ? 'fill-red-500 text-red-500' : ''} />
                                {isSaved ? "Saqlangan" : "Saqlash"}
                            </button>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="mb-10">
                        {/* Main big image */}
                        <div className="relative w-full h-[320px] md:h-[480px] rounded-[28px] overflow-hidden mb-3 bg-gray-100 group flex items-center justify-center">
                            {!imgError ? (
                                <img
                                    key={allImages[activeImg]?.image}
                                    src={allImages[activeImg]?.image}
                                    alt={`E'lon rasmi ${activeImg + 1}`}
                                    onError={() => setImgError(true)}
                                    className="w-full h-full object-cover transition-opacity duration-500"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-400">
                                    <ImageOff size={64} className="mb-4 opacity-50" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Rasm vaqtincha mavjud emas</span>
                                </div>
                            )}
                            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                                {activeImg + 1} / {allImages.length}
                            </div>
                        </div>
                        {/* Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-1">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={() => { setActiveImg(idx); setImgError(false); }}
                                        className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all bg-gray-100 flex items-center justify-center
                                            ${activeImg === idx ? 'border-primary shadow-lg shadow-primary/30' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                    >
                                        <img
                                            src={img.image}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-16">

                        {/* Left — Details */}
                        <div className="lg:col-span-2 space-y-10">
                            
                            {/* University banner */}
                            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 flex flex-wrap gap-6 items-center">
                                <div className="flex items-center gap-4 pr-6 border-r border-primary/20">
                                    <div className="bg-primary text-white w-11 h-11 rounded-full flex items-center justify-center shrink-0">
                                        <GraduationCap size={22} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Eng yaqin OTM</p>
                                        <p className="font-extrabold text-secondary">{property.university?.name || property.university || "Noma'lum"}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Masofa</p>
                                    <p className="font-extrabold text-secondary">{property.distance_to_uni || 0} m gacha</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Xonalar</p>
                                    <p className="font-extrabold text-secondary">{property.rooms?.length ? property.rooms.length : 1} xona</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Turi</p>
                                    <p className="font-extrabold text-secondary">{property.rooms?.[0]?.room_type || property.type || 'Noma\'lum'}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <section>
                                <h2 className="text-xl font-extrabold mb-3 text-secondary">Uy haqida</h2>
                                <p className="text-gray-600 leading-relaxed text-base font-medium">{property.description}</p>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Amenities */}
                            <section>
                                <h2 className="text-xl font-extrabold mb-5 text-secondary">Qulayliklar</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {property.amenities?.map(amenity => (
                                        <div key={amenity.id} className="flex items-center gap-3 text-gray-700">
                                            <div className="bg-green-50 p-2 rounded-lg border border-green-100 shrink-0">
                                                <Check size={18} className="text-green-600" />
                                            </div>
                                            <span className="font-semibold text-sm">{amenity.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <hr className="border-gray-100" />

                            {/* Map */}
                            <section>
                                <h2 className="text-xl font-extrabold mb-4 text-secondary">Manzil va xarita</h2>
                                <p className="text-gray-500 mb-4 flex items-center gap-2 font-medium text-sm">
                                    <MapPin size={16} className="text-primary shrink-0" />
                                    {property.address}
                                </p>
                                <div className="h-[360px] rounded-[28px] overflow-hidden border border-gray-200 shadow-sm relative z-0">
                                    <MapContainer
                                        center={[property.latitude, property.longitude]}
                                        zoom={14}
                                        style={{ height: '100%', width: '100%' }}
                                        scrollWheelZoom={false}
                                    >
                                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <Marker position={[property.latitude, property.longitude]}>
                                            <Popup>
                                                <div className="font-bold text-sm">{property.name}</div>
                                                <div className="text-xs text-gray-500">{property.address}</div>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </section>
                        </div>

                        {/* Right — Sticky Booking Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-[28px] p-7 shadow-xl shadow-gray-100/80 sticky top-28">
                                <div className="mb-6">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Oylik ijara narxi</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-4xl font-black text-secondary">
                                            {property.min_price ? property.min_price.toLocaleString('uz-UZ') : 'Kelishiladi'}
                                        </span>
                                        {property.min_price && <span className="text-gray-400 font-medium mb-1 text-sm">uzs/oy</span>}
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="p-3.5 border border-gray-100 rounded-xl flex items-center gap-3 bg-gray-50/60">
                                        <Calendar size={18} className="text-primary shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ko'chib kelish</p>
                                            <p className="font-bold text-secondary text-sm">{getAvailableText()}</p>
                                        </div>
                                    </div>
                                    <div className="p-3.5 border border-gray-100 rounded-xl flex items-center gap-3 bg-gray-50/60">
                                        <Users size={18} className="text-primary shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tur</p>
                                            <p className="font-bold text-secondary text-sm">{ROOM_TYPE_MAP[property.rooms?.[0]?.room_type] || property.type || "Noma'lum"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Booking success/error message */}
                                {bookingMsg && (
                                    <div className={`p-3 rounded-xl text-sm font-medium text-center ${
                                        bookingMsg.includes('Xatolik') || bookingMsg.includes('xatolik')
                                            ? 'bg-red-50 text-red-600'
                                            : 'bg-green-50 text-green-700'
                                    }`}>
                                        {bookingMsg}
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <button 
                                        onClick={handleBooking}
                                        disabled={bookingLoading}
                                        className="w-full bg-primary text-white py-3.5 px-6 rounded-xl text-base font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 disabled:opacity-60"
                                    >
                                        {bookingLoading ? "Yuborilmoqda..." : "Band qilish so'rovi"}
                                    </button>
                                    <a 
                                        href={`tel:${property.owner_phone || '+998940987005'}`}
                                        onClick={(e) => {
                                            if (!token) {
                                                e.preventDefault();
                                                alert("Uy egasi bilan bog'lanish uchun avval tizimga kiring.");
                                                navigate('/login');
                                            }
                                        }}
                                        className="block text-center w-full bg-white border-2 border-primary text-primary py-3.5 px-6 rounded-xl text-base font-bold hover:bg-primary/5 transition-colors"
                                    >
                                        Uy egasi bilan bog'lanish
                                    </a>
                                </div>

                                <p className="text-center text-gray-400 font-medium text-xs mt-5 flex justify-center items-center gap-1.5">
                                    <ShieldCheck size={14} /> TalabaUy xavfsizlik kafolati
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default PropertyDetail;
