import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './KTabletopPage.css';
import ThemeBackground from './ThemeBackground';
import ThemeSwitcher from './ThemeSwitcher';
import DishDock from './DishDock';
import RecipeModal from './RecipeModal';
import AudioManager from './AudioManager';
import TopControls from './TopControls';
import AboutJeenaModal from './AboutJeenaModal';
import themeService from '../services/themeService';

const KTabletopPage = () => {
  const { theme, dish } = useParams();
  
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

  // Fixed null-safe current theme access
  const currentTheme = themes && themes.length > 0 ? themes[currentThemeIndex] : null;

  // Handle URL parameters for theme and dish
  useEffect(() => {
    if (!themes || themes.length === 0) return;

    // Find theme by name (URL-friendly format)
    if (theme) {
      const themeName = theme.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const themeIndex = themes.findIndex(t => 
        t.name.toLowerCase() === themeName.toLowerCase()
      );
      
      if (themeIndex !== -1 && themeIndex !== currentThemeIndex) {
        setCurrentThemeIndex(themeIndex);
      }
    }
  }, [theme, themes, currentThemeIndex]); // Added currentThemeIndex back but with proper logic

  // Handle dish parameter to open modal (runs after theme is set)
  useEffect(() => {
    if (!currentTheme || !dish || !currentTheme.dishes || currentTheme.dishes.length === 0) {
      return;
    }

    const dishName = dish.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const foundDish = currentTheme.dishes?.find(d => 
      d.name.toLowerCase() === dishName.toLowerCase()
    );

    if (foundDish && !isModalOpen) {
      setSelectedDish(foundDish);
      setIsModalOpen(true);
    }
  }, [dish, currentTheme, isModalOpen]);

  // Update URL when theme changes (but not from URL params)
  useEffect(() => {
    if (!currentTheme || !themes || themes.length === 0) return;
    
    // Don't update URL if we're processing URL parameters
    if (theme) return;
    
    const themeName = currentTheme.name.toLowerCase().replace(/\s+/g, '-');
    const currentPath = window.location.pathname;
    const expectedPath = `/k-tabletop/${themeName}`;
    
    // Only update URL if we're not already on the correct path
    if (currentPath !== expectedPath && currentPath !== `/k-tabletop`) {
      window.history.pushState({}, '', `/k-tabletop/${themeName}`);
    }
  }, [currentTheme, themes, theme]);

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
      
      // Update URL
      const themeName = themes[newIndex].name.toLowerCase().replace(/\s+/g, '-');
      const newUrl = `/k-tabletop/${themeName}`;
      window.history.pushState({}, '', newUrl);
    }, 400); // Match the CSS transition duration (0.4s)
  };

  const handleDishClick = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
    
    // Update URL with dish parameter
    const themeName = currentTheme.name.toLowerCase().replace(/\s+/g, '-');
    const dishName = dish.name.toLowerCase().replace(/\s+/g, '-');
    const newUrl = `/k-tabletop/${themeName}/${dishName}`;
    window.history.pushState({}, '', newUrl);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
    
    // Update URL to remove dish parameter
    const themeName = currentTheme.name.toLowerCase().replace(/\s+/g, '-');
    const newUrl = `/k-tabletop/${themeName}`;
    window.history.pushState({}, '', newUrl);
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
      <div className="k-tabletop-page loading-state">
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
      <div className="k-tabletop-page error-state">
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
      <div className="k-tabletop-page no-themes-state">
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

  // Generate SEO meta tags
  const pageTitle = selectedDish 
    ? `${selectedDish.name} Recipe - ${currentTheme.name} | Jeena's Kitchen`
    : `${currentTheme.name} Recipes | Jeena's Kitchen`;
  
  const pageDescription = selectedDish
    ? selectedDish.description
    : currentTheme.description || `Explore authentic Korean recipes from ${currentTheme.name}. Learn to cook traditional Korean dishes with video tutorials.`;
  
  const pageImage = selectedDish
    ? `https://www.jeenaskitchen.store${selectedDish.modalImage || selectedDish.image}`
    : currentTheme.background 
      ? `https://www.jeenaskitchen.store${currentTheme.background}`
      : 'https://www.jeenaskitchen.store/hero-image/hero-custome-image.png';
  
  const pageUrl = selectedDish
    ? `https://www.jeenaskitchen.store/k-tabletop/${currentTheme.name.toLowerCase().replace(/\s+/g, '-')}/${selectedDish.name.toLowerCase().replace(/\s+/g, '-')}`
    : `https://www.jeenaskitchen.store/k-tabletop/${currentTheme.name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
      </Helmet>
      <div className={`k-tabletop-page ${isThemeTransitioning ? 'theme-transitioning' : ''} ${isThemeTransitioning ? `transition-${transitionDirection}` : ''}`}>
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
    </>
  );
};

export default KTabletopPage;
