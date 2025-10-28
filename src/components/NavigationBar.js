import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';
import './NavigationBar.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('common');

  const handleSocialClick = (platform) => {
    if (platform === 'instagram') {
      window.open('https://www.instagram.com/jeenas.kitchen/reels/', '_blank');
    } else if (platform === 'youtube') {
      window.open('https://youtube.com/@jeena.s.kitchen?si=AJNwkKPD3Bh4JH71', '_blank');
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu after navigation
  };

  // No need for click outside handler with full-screen menu

  // Close menu on ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isKTabletopPage = location.pathname === '/k-tabletop';

  return (
    <nav className={`navigation-bar ${isKTabletopPage ? 'compact' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        {/* Home Button */}
        <button 
          className="nav-item home-button"
          onClick={() => handleNavigate('/')}
        >
          <div className="logo-container">
            <img src="/icons/jeena-logo.svg" alt="Jeena's Kitchen" className="logo" />
            <span className="brand-name">Jeena's Kitchen</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="nav-items desktop-nav">
          <button 
            className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={() => handleNavigate('/about')}
          >
            {t('navigation.about')}
          </button>
          <button 
            className={`nav-item ${location.pathname === '/k-tabletop' ? 'active' : ''}`}
            onClick={() => handleNavigate('/k-tabletop')}
          >
            {t('navigation.kTabletop')}
          </button>
          <button 
            className={`nav-item ${location.pathname === '/items' ? 'active' : ''}`}
            onClick={() => handleNavigate('/items')}
          >
            {t('navigation.items')}
          </button>
          <button 
            className="nav-item social-button"
            onClick={() => handleSocialClick('instagram')}
            title="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </button>
          <button 
            className="nav-item social-button"
            onClick={() => handleSocialClick('youtube')}
            title="YouTube"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </button>
          <LanguageSwitcher />
        </div>

        {/* Mobile Navigation - Social + Language + Hamburger */}
        <div className="nav-items mobile-nav">
          {/* Instagram Button */}
          <button 
            className="nav-item mobile-nav-item social-button"
            onClick={() => handleSocialClick('instagram')}
            title="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
            </svg>
          </button>
          
          {/* YouTube Button */}
          <button 
            className="nav-item mobile-nav-item social-button"
            onClick={() => handleSocialClick('youtube')}
            title="YouTube"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </button>
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Hamburger Menu Button */}
          <button 
            className="hamburger-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              // Close Icon (X)
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger Icon (≡)
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Apple Style Full Screen */}
      {isMenuOpen && (
        <div className="mobile-menu-container">
          <div className="mobile-menu">
            <button
              className={`mobile-menu-item ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => handleNavigate('/')}
            >
              {t('navigation.home')}
            </button>
            <button
              className={`mobile-menu-item ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={() => handleNavigate('/about')}
            >
              {t('navigation.about')}
            </button>
            <button
              className={`mobile-menu-item ${location.pathname === '/k-tabletop' ? 'active' : ''}`}
              onClick={() => handleNavigate('/k-tabletop')}
            >
              {t('navigation.kTabletop')}
            </button>
            <button
              className={`mobile-menu-item ${location.pathname === '/items' ? 'active' : ''}`}
              onClick={() => handleNavigate('/items')}
            >
              {t('navigation.items')}
            </button>
            <div className="mobile-language-switcher">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
