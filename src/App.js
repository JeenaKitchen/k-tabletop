import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import './i18n'; // Initialize i18n
import './App.css';
import NavigationBar from './components/NavigationBar';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import KTabletopPage from './components/KTabletopPage';
import ItemsPage from './components/ItemsPage';
import ContactPage from './components/ContactPage';
import { useTranslation } from './hooks/useTranslation';

// Language wrapper component to handle language detection from URL
const LanguageWrapper = ({ children }) => {
  const { changeLanguage, currentLanguage } = useTranslation();
  const location = useLocation();
  
  React.useEffect(() => {
    // Extract language from URL path
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const language = pathSegments[0];
    
    // Determine target language from URL
    let targetLanguage = null;
    if (language === 'kr' || language === 'ko') {
      targetLanguage = 'ko';
    } else if (language === 'en') {
      targetLanguage = 'en';
    }
    // If no language prefix in URL, keep current language (don't change)
    
    // Only change language if URL explicitly specifies a different language
    if (targetLanguage && targetLanguage !== currentLanguage) {
      changeLanguage(targetLanguage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Intentionally exclude changeLanguage and currentLanguage to prevent infinite loop
  
  return children;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <LanguageWrapper>
          <div className="App">
            <NavigationBar />
            <Routes>
              {/* English routes (default) */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/k-tabletop" element={<KTabletopPage />} />
              <Route path="/k-tabletop/:theme" element={<KTabletopPage />} />
              <Route path="/k-tabletop/:theme/:dish" element={<KTabletopPage />} />
              <Route path="/items" element={<ItemsPage />} />
            <Route path="/contact" element={<ContactPage />} />
              
              {/* Korean routes */}
              <Route path="/kr" element={<LandingPage />} />
              <Route path="/kr/about" element={<AboutPage />} />
              <Route path="/kr/k-tabletop" element={<KTabletopPage />} />
              <Route path="/kr/k-tabletop/:theme" element={<KTabletopPage />} />
              <Route path="/kr/k-tabletop/:theme/:dish" element={<KTabletopPage />} />
              <Route path="/kr/items" element={<ItemsPage />} />
            <Route path="/kr/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </LanguageWrapper>
      </Router>
      <Analytics />
    </HelmetProvider>
  );
}

export default App;