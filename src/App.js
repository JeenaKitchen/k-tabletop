import React, { useState, useEffect } from 'react';
import './App.css';
import ThemeBackground from './components/ThemeBackground';
import ThemeSwitcher from './components/ThemeSwitcher';
import DishDock from './components/DishDock';
import RecipeModal from './components/RecipeModal';
import AudioManager from './components/AudioManager';
import TopControls from './components/TopControls';
import AboutJeenaModal from './components/AboutJeenaModal';
import themeService from './services/themeService';

function App() {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  
  // Theme integration state
  const [themes, setThemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Theme transition state
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('next');

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
    if (!themes || themes.length === 0 || isThemeTransitioning) return;
    
    // Start transition
    setIsThemeTransitioning(true);
    setTransitionDirection(direction);
    
    // Calculate new index
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentThemeIndex + 1) % themes.length;
    } else {
      newIndex = (currentThemeIndex - 1 + themes.length) % themes.length;
    }
    
    // Delay the actual theme change to allow for transition animation
    setTimeout(() => {
      setCurrentThemeIndex(newIndex);
      setIsThemeTransitioning(false);
    }, 400); // Match the CSS transition duration (0.4s)
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

  const handleAboutModalOpen = () => {
    setIsAboutModalOpen(true);
  };

  const handleAboutModalClose = () => {
    setIsAboutModalOpen(false);
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
    <div className={`App ${isThemeTransitioning ? 'theme-transitioning' : ''} ${isThemeTransitioning ? `transition-${transitionDirection}` : ''}`}>
      <ThemeBackground 
        background={currentTheme?.background || ''} 
        video={currentTheme?.video || ''} 
        isTransitioning={isThemeTransitioning}
        transitionDirection={transitionDirection}
      />
      
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

      <TopControls
        currentTheme={currentTheme}
        isAccordionOpen={isAccordionOpen}
        onAccordionToggle={handleAccordionToggle}
        onAboutModalOpen={handleAboutModalOpen}
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

      <AboutJeenaModal
        isOpen={isAboutModalOpen}
        onClose={handleAboutModalClose}
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