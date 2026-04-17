/**
 * api/index.js — Global Axios instance
 *
 * Interceptorlar:
 *   Request  → har bir so'rovga Authorization: Bearer <token> avtomatik qo'shiladi
 *   Response → 401 token_not_valid bo'lsa refresh token bilan yangi access oladi,
 *              original so'rovni 1 marta qayta yuboradi.
 *              Refresh ham bo'lmasa → tokenlarni tozalaydi → bosh sahifaga olib boradi.
 */
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({ baseURL: BASE_URL });

// ── REQUEST INTERCEPTOR ─────────────────────────────────────────────────────
// localStorage'dan tokenni o'qib har bir so'rovga qo'shadi.
// Shunday qilib komponentlarda manual header qo'shish shart emas.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── RESPONSE INTERCEPTOR ────────────────────────────────────────────────────
let isRefreshing = false;            // bir vaqtda bitta refresh
let pendingQueue = [];               // refresh bo'lguncha kutayotgan so'rovlar

const processQueue = (error, token = null) => {
  pendingQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  pendingQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const is401            = error.response?.status === 401;
    const isTokenNotValid  = error.response?.data?.code === 'token_not_valid';
    const alreadyRetried   = originalRequest._retry;

    // Faqat expired access token uchun refresh qilamiz
    if (is401 && isTokenNotValid && !alreadyRetried) {
      originalRequest._retry = true; // cheksiz loop'ni oldini oladi

      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        // Refresh token yo'q → logout
        _forceLogout();
        return Promise.reject(error);
      }

      // Bir vaqtda bir nechta so'rov bo'lsa, birinchi refresh qiladi,
      // qolganlar navbatda kutadi.
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        // Refresh endpoint: POST /api/users/refresh/
        const res = await axios.post(`${BASE_URL}/users/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem('token', newAccessToken);

        processQueue(null, newAccessToken);

        // Original so'rovni yangi token bilan qayta yuborish
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        _forceLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Tokenlarni tozalab bosh sahifaga yo'naltiradi.
 * To'liq React logout'dan farqi: interceptor React context'ga kira olmaydi,
 * shuning uchun bu yerda localStorage + window.location ishlatamiz.
 * AuthContext o'zi ham tokenni localStorage'dan o'qiydi, shuning uchun
 * keyingi renderda user=null bo'ladi.
 */
function _forceLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  // AuthContext state-ni ham reset qilish uchun window.location ishlatamiz
  if (window.location.pathname !== '/') {
    window.location.href = '/';
  }
}

export default api;
