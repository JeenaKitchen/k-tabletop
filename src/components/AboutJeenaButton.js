import React from 'react';
import './AboutJeenaButton.css';

const AboutJeenaButton = ({ onClick }) => {
  return (
    <div className="about-jeena-button-container">
      <button 
        className="about-jeena-button"
        onClick={onClick}
        aria-label="About Jeena's Kitchen"
      >
        <div className="about-jeena-title-section">
          <h2 className="about-jeena-title">About Jeena's Kitchen</h2>
        </div>
      </button>
    </div>
  );
};

export default AboutJeenaButton;
