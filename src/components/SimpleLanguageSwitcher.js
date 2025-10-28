import React, { useState } from 'react';
import './LanguageSwitcher.css';

const SimpleLanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = [
    { code: 'en', flag: '/icons/flags/australia-flag.svg', name: 'English', alt: 'Australia Flag' },
    { code: 'ko', flag: '/icons/flags/korea-flag.svg', name: '한국어', alt: 'Korea Flag' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (lng) => {
    setCurrentLanguage(lng);
    setIsOpen(false);
    console.log('Language changed to:', lng);
  };

  return (
    <div className="language-switcher">
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

export default SimpleLanguageSwitcher;
