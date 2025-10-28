import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: 'en', flag: '/icons/flags/australia-flag.svg', name: 'English', alt: 'Australia Flag' },
    { code: 'ko', flag: '/icons/flags/korea-flag.svg', name: '한국어', alt: 'Korea Flag' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setIsOpen(false);
    
    // Navigate to the correct language URL
    const currentPath = location.pathname;
    let newPath;
    
    if (lng === 'ko') {
      // Switch to Korean URLs
      if (currentPath === '/' || currentPath === '/en') {
        newPath = '/kr';
      } else if (currentPath.startsWith('/en/')) {
        newPath = currentPath.replace('/en', '/kr');
      } else if (!currentPath.startsWith('/kr/')) {
        newPath = '/kr' + currentPath;
      } else {
        newPath = currentPath; // Already Korean
      }
    } else {
      // Switch to English URLs
      if (currentPath === '/kr' || currentPath === '/') {
        newPath = '/';
      } else if (currentPath.startsWith('/kr/')) {
        newPath = currentPath.replace('/kr', '');
      } else if (!currentPath.startsWith('/en/')) {
        newPath = currentPath; // Already English
      } else {
        newPath = currentPath.replace('/en', '');
      }
    }
    
    navigate(newPath);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <img 
          src={currentLang.flag} 
          alt={currentLang.alt} 
          className="flag-icon"
        />
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
              aria-label={`Switch to ${lang.name}`}
            >
              <img 
                src={lang.flag} 
                alt={lang.alt} 
                className="flag-icon"
              />
              <span className="language-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
