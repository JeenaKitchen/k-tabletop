import React, { useState } from 'react';
import './ThemeAccordion.css';
import { themeConfig } from '../data/themeConfig';
import { useTranslation } from '../hooks/useTranslation';

const ThemeAccordion = ({ currentTheme, isOpen, onToggle }) => {
  const { currentLanguage } = useTranslation();
  
  const getThemeDescription = (themeName) => {
    const theme = themeConfig.find(t => t.name === themeName);
    
    if ((currentLanguage === 'ko' || currentLanguage === 'ko-KR') && theme?.koreanDescription) {
      return theme.koreanDescription;
    }
    return theme?.description || "Experience the authentic Korean dining atmosphere.";
  };
  
  // Get the Korean name from themeConfig
  const getKoreanName = () => {
    const theme = themeConfig.find(t => t.name === currentTheme?.name);
    return theme?.koreanName || currentTheme?.name;
  };

  return (
    <div className="theme-accordion">
      <button 
        className="theme-accordion-button"
        onClick={onToggle}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} theme information`}
      >
        <div className="theme-title-section">
          <h2 className="theme-title">
            {(currentLanguage === 'ko' || currentLanguage === 'ko-KR') ? getKoreanName() : currentTheme.name}
          </h2>
          <svg 
            className={`caret-icon ${isOpen ? 'open' : ''}`}
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </button>
      
      <div className={`theme-description ${isOpen ? 'open' : ''}`}>
        <p>{getThemeDescription(currentTheme.name)}</p>
      </div>
    </div>
  );
};

export default ThemeAccordion; 