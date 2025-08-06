import React, { useState } from 'react';
import './ThemeAccordion.css';

const ThemeAccordion = ({ currentTheme, isOpen, onToggle }) => {
  const getThemeDescription = (themeName) => {
    const descriptions = {
      "Korean Netflix Night": "Set the vibe for your next K-drama binge with the trendiest Korean street snacks — from tteokbokki to corn dogs — perfect for a cozy night on the couch.",
      "Korean BBQ Restaurant": "Fire up the grill at one of Korea's hottest BBQ spots — loaded with juicy meats, crisp lettuce wraps, sizzling aromas, and endless banchan.",
      "Korean Cafe in Seong Su": "Step into Seoul's most buzzworthy cafe scene with dreamy desserts, creative drinks, and aesthetic interiors that scream trendsetter.",
      "Korean Retro Dining Room": "Vintage is in. Enjoy classic Korean dishes in a throwback dining room full of charm, nostalgia, and trending retro aesthetics.",
      "Korean Grandmother House": "The cozy comeback of traditional Korean home cooking — hearty stews, side dishes, and recipes passed down through generations, now trending all over.",
      "Pocha Night": "Recreate Korea's most popular late-night vibe with spicy street food, soju, and the electric feel of a bustling pojangmacha under neon lights.",
      "Namdaemun Market": "Dive into the heart of Seoul's liveliest market with trending street eats, bold local flavors, and the buzzing energy of Namdaemun.",
      "Hangang (Han River)": "Channel the coolest outdoor hangout vibes with shareable Korean picnic foods, cute drinks, and blanket spreads inspired by the ever-popular Hangang culture."
    };
    return descriptions[themeName] || "Experience the authentic Korean dining atmosphere.";
  };

  return (
    <div className="theme-accordion">
      <button 
        className="theme-accordion-button"
        onClick={onToggle}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} theme information`}
      >
        <div className="theme-title-section">
          <h2 className="theme-title">{currentTheme.name}</h2>
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