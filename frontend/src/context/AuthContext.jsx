import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser]   = useState(null);
    // Access token — axios interceptor bu yerdan o'qiydi (interceptor ham localStorage'dan o'qiydi)
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // ── Profile yuklash ───────────────────────────────────────────────────
    const fetchProfile = async () => {
        try {
            // Interceptor Authorization headerini o'zi qo'shadi — manual kerak emas
            const res = await api.get('/users/me/');
            setUser(res.data);
        } catch (error) {
            // 401 bo'lsa interceptor refresh qilishga harakat qiladi.
            // Refresh ham bo'lmasa interceptor _forceLogout() chaqiradi.
            // Bu yerda esa faqat saqlanmagan xatoliklar uchun logout.
            logout();
        }
    };

    useEffect(() => {
        if (token) fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    // ── Login ─────────────────────────────────────────────────────────────
    const login = async (email, password) => {
        const res = await api.post('/users/login/', { email, password });

        const accessToken  = res.data.access;
        const refreshToken = res.data.refresh;   // ← refresh token ham olindi

        // Ikkalasini localStorage'ga saqlaymiz
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);

        setToken(accessToken);

        // Profil yuklash (interceptor headerini o'zi qo'shadi)
        const profileRes = await api.get('/users/me/');
        setUser(profileRes.data);
        return profileRes.data;
    };

    // ── Register ──────────────────────────────────────────────────────────
    const register = async (userData) => {
        await api.post('/users/register/', userData);
        return await login(userData.email, userData.password);
    };

    // ── Logout ────────────────────────────────────────────────────────────
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');  // ← refresh token ham o'chirildi
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, fetchProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
