import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import PropertyDetail from './pages/PropertyDetail';
import AdminDashboard from './pages/AdminDashboard';
import MaklerDashboard from './pages/MaklerDashboard';
import SavedProperties from './pages/SavedProperties';
import About from './pages/About';
import Partners from './pages/Partners';
import Blog from './pages/Blog';
import Jobs from './pages/Jobs';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Guide from './pages/Guide';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Help from './pages/Help';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

const NotFound = () => (
  <MainLayout>
    <div className="h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="text-7xl mb-6">🔍</div>
      <h1 className="text-4xl font-bold text-secondary mb-4">404 — Sahifa topilmadi</h1>
      <p className="text-gray-500">Kechirasiz, siz qidirayotgan sahifa mavjud emas.</p>
    </div>
  </MainLayout>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Core pages */}
          <Route path="/"                element={<Home />} />
          <Route path="/search"          element={<SearchPage />} />
          <Route path="/detail/:id"      element={<PropertyDetail />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-property"    element={<MaklerDashboard />} />
          <Route path="/saved"           element={<SavedProperties />} />

          {/* Footer — Company */}
          <Route path="/about"    element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/blog"     element={<Blog />} />
          <Route path="/jobs"     element={<Jobs />} />

          {/* Footer — Help */}
          <Route path="/help"    element={<Help />} />
          <Route path="/faq"     element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guide"   element={<Guide />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Footer — Bottom bar */}
          <Route path="/terms"   element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
