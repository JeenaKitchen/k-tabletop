import React, { useState, useEffect } from 'react';
import './App.css';
import ThemeBackground from './components/ThemeBackground';
import ThemeSwitcher from './components/ThemeSwitcher';
import DishDock from './components/DishDock';
import RecipeModal from './components/RecipeModal';
import AudioManager from './components/AudioManager';
import SoundControl from './components/SoundControl';
import ThemeAccordion from './components/ThemeAccordion';
import themeService from './services/themeService';

function App() {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
  // Theme integration state
  const [themes, setThemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load themes on component mount
  useEffect(() => {
    const loadThemes = async () => {
      try {
        setIsLoading(true);
        const result = await themeService.getThemes();
        setThemes(result.themes);
        setError(result.error);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load themes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemes();
  }, []);

  // Refresh themes
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const result = await themeService.refreshThemes();
      setThemes(result.themes);
      setError(result.error);
    } catch (err) {
      setError(err.message);
      console.error('Failed to refresh themes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fixed null-safe current theme access
  const currentTheme = themes && themes.length > 0 ? themes[currentThemeIndex] : null;

  const handleThemeChange = (direction) => {
    if (!themes || themes.length === 0) return;
    
    if (direction === 'next') {
      setCurrentThemeIndex((prev) => (prev + 1) % themes.length);
    } else {
      setCurrentThemeIndex((prev) => (prev - 1 + themes.length) % themes.length);
    }
  };

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  const handleMuteToggle = (muted) => {
    setIsMuted(muted);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };

  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="App loading-state">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Korean recipes...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && (!themes || themes.length === 0)) {
    return (
      <div className="App error-state">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>Failed to load recipes: {error}</p>
          <button onClick={handleRefresh} className="retry-button">
            Try Again
          </button>
          <div className="error-help">
            <p>If this persists, the app will fall back to static data.</p>
          </div>
        </div>
      </div>
    );
  }

  // No current theme available
  if (!currentTheme) {
    return (
      <div className="App no-themes-state">
        <div className="no-themes-container">
          <h2>No themes available</h2>
          <p>No recipes found.</p>
          <button onClick={handleRefresh} className="retry-button">
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <ThemeBackground background={currentTheme?.background || ''} video={currentTheme?.video || ''} />
      
      <div className="content">
        <ThemeSwitcher 
          onThemeChange={handleThemeChange}
          currentIndex={currentThemeIndex}
          totalThemes={themes?.length || 0}
        />
        
        <DishDock 
          dishes={currentTheme?.dishes || []}
          onDishClick={handleDishClick}
        />
      </div>

      <ThemeAccordion
        currentTheme={currentTheme}
        isOpen={isAccordionOpen}
        onToggle={handleAccordionToggle}
      />

      <SoundControl
        isMuted={isMuted}
        volume={volume}
        onMuteToggle={handleMuteToggle}
        onVolumeChange={handleVolumeChange}
      />

      <AudioManager
        currentTheme={currentTheme}
        isMuted={isMuted}
        volume={volume}
      />

      <RecipeModal
        isOpen={isModalOpen}
        dish={selectedDish}
        onClose={closeModal}
      />

      {/* Error banner for non-critical errors */}
      {error && themes && themes.length > 0 && (
        <div className="error-banner">
          <span>Info: Using fallback data - {error}</span>
          <button onClick={handleRefresh} className="refresh-button">
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}

export default App;