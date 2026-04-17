import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, GraduationCap, ChevronRight, Heart, ImageOff } from 'lucide-react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const BACKEND = 'http://localhost:8000';
const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${BACKEND}${url}`;
};

const PropertyCard = ({ property, onMouseEnter, onMouseLeave }) => {
  const { user, token, fetchProfile } = useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasSaved = user?.saved_properties?.includes(property.id);

  const toggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) return alert("Iltimos, oldin tizimga kiring!");
    if (user?.role !== 'TALABA') return alert("Faqat talabalar xonalarni saqlashi mumkin!");

    setIsSaving(true);
    try {
      await api.post(`/users/save-property/${property.id}/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchProfile();
    } catch (error) {
      console.error(error);
    }
    setIsSaving(false);
  };
  
  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
      onMouseEnter={() => onMouseEnter && onMouseEnter(property.id)}
      onMouseLeave={() => onMouseLeave && onMouseLeave()}
    >
      <Link to={`/detail/${property.id}`} className="block relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
        {!imgError ? (
          <img 
            src={getImageUrl(property.main_image)}
            alt={property.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 group-hover:scale-110 transition-all duration-500">
            <ImageOff size={40} className="mb-2 opacity-50" />
            <span className="text-xs font-semibold uppercase tracking-wider">Rasm mavjud emas</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm">
          <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
          4.8 (24 sharh)
        </div>
        <button 
          onClick={toggleSave}
          disabled={isSaving}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all shadow-md active:scale-95 ${hasSaved ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-500 hover:bg-white hover:text-red-500'}`}
        >
          <Heart size={20} className={hasSaved ? "fill-red-500" : ""} />
        </button>
      </Link>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
            {property.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <MapPin size={16} />
          {property.address}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="bg-primary/10 text-primary p-2 rounded-lg">
            <GraduationCap size={18} />
          </div>
          <span className="text-sm font-medium text-gray-600">
            {property.university} • {property.distance_to_uni}m gacha
          </span>
        </div>

        <hr className="mb-4" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Narxdan boshlab</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-secondary">{parseInt(property.min_price).toLocaleString()}</span>
              <span className="text-sm text-gray-500 font-medium">uzs/oy</span>
            </div>
          </div>
          <Link 
            to={`/detail/${property.id}`}
            className="bg-primary text-white p-3 rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
          >
            <ChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
