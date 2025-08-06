import React from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = ({ onThemeChange, currentIndex, totalThemes }) => {
  return (
    <div className="theme-switcher">
      <button 
        className="theme-arrow theme-arrow-left"
        onClick={() => onThemeChange('prev')}
        aria-label="Previous theme"
      >
        ‹
      </button>
      
      <div className="theme-indicator">
        {currentIndex + 1} / {totalThemes}
      </div>
      
      <button 
        className="theme-arrow theme-arrow-right"
        onClick={() => onThemeChange('next')}
        aria-label="Next theme"
      >
        ›
      </button>
    </div>
  );
};

export default ThemeSwitcher; 