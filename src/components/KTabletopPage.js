import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../hooks/useTranslation';
import LottieAnimation from './landing/LottieAnimation';
import ScrollReveal from './landing/ScrollReveal';
import './landing/ScrollReveal.css';
import './LandingPage.css';
import './KTabletopPage.css';
import ThemeBackground from './ThemeBackground';
import ThemeSwitcher from './ThemeSwitcher';
import DishDock from './DishDock';
import RecipeModal from './RecipeModal';
import AudioManager from './AudioManager';
import TopControls from './TopControls';
import AboutJeenaModal from './AboutJeenaModal';
import themeService from '../services/themeService';

const PARTNERSHIP_LOTTIE_SRC = '/animations/lottie/animation-15.json';

const KTabletopPage = () => {
  const { theme, dish } = useParams();
  const { t } = useTranslation('common');
  const { t: tAbout } = useTranslation('about');
  
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
  const [hideTopControls, setHideTopControls] = useState(false);
  const partnershipRef = useRef(null);

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

  useEffect(() => {
    const partnership = partnershipRef.current;
    if (!partnership) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideTopControls(entry.isIntersecting);
      },
      { threshold: 0.08 }
    );

    observer.observe(partnership);
    return () => observer.disconnect();
  }, [currentTheme]);

  useEffect(() => {
    if (hideTopControls && isAccordionOpen) {
      setIsAccordionOpen(false);
    }
  }, [hideTopControls, isAccordionOpen]);

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
  }, [theme, themes]); // Removed currentThemeIndex from dependencies

  // Handle dish parameter to open modal (runs after theme is set)
  useEffect(() => {
    console.log('KTabletopPage - Dish parameter effect:', { dish, currentTheme: currentTheme?.name, dishesCount: currentTheme?.dishes?.length, isModalOpen });
    
    if (!currentTheme || !dish || !currentTheme.dishes || currentTheme.dishes.length === 0) {
      console.log('KTabletopPage - Missing requirements for dish modal');
      return;
    }

    const dishName = dish.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    console.log('KTabletopPage - Looking for dish:', dishName);
    console.log('KTabletopPage - Available dishes:', currentTheme.dishes.map(d => d.name));
    
    const foundDish = currentTheme.dishes?.find(d => 
      d.name.toLowerCase() === dishName.toLowerCase()
    );

    console.log('KTabletopPage - Found dish:', foundDish?.name);

    if (foundDish) {
      // Always update the selected dish and open modal when dish parameter changes
      console.log('KTabletopPage - Opening modal for:', foundDish.name);
      setSelectedDish(foundDish);
      setIsModalOpen(true);
    }
  }, [dish, currentTheme]);

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

  const handleContactClick = () => {
    window.open('https://calendar.app.google/EMPURCYjrxK23eRy6', '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = () => {
    window.open('mailto:jeenaskitchen153@gmail.com', '_blank', 'noopener,noreferrer');
  };

  const handleSocialClick = (platform) => {
    if (platform === 'instagram') {
      window.open('https://www.instagram.com/jeenas.kitchen/reels/', '_blank', 'noopener,noreferrer');
    } else if (platform === 'youtube') {
      window.open('https://youtube.com/@jeena.s.kitchen?si=AJNwkKPD3Bh4JH71', '_blank', 'noopener,noreferrer');
    }
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
        <div className="k-tabletop-stage">
          <ThemeBackground 
            background={currentTheme?.background || ''} 
            video={currentTheme?.video || ''} 
            isTransitioning={isThemeTransitioning}
            transitionDirection={transitionDirection}
            isMuted={isMuted}
            volume={volume}
            hasSeparateSound={!!currentTheme?.sound}
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
            isHidden={hideTopControls}
          />

          <AudioManager
            currentTheme={currentTheme}
            isMuted={isMuted}
            volume={volume}
          />
        </div>

        <div
          ref={partnershipRef}
          className="contact-me-section grow-brand-section k-tabletop-partnership"
        >
          <div className="contact-me-content">
            <ScrollReveal className="contact-me-text" delay={0}>
              <h2 className="contact-me-title">{tAbout('contactBanner.title')}</h2>
              <p className="contact-me-description">{tAbout('contactBanner.description')}</p>

              <div className="contact-me-social-buttons">
                <button
                  className="contact-social-button"
                  onClick={() => handleSocialClick('instagram')}
                  title="Instagram"
                  type="button"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </button>
                <button
                  className="contact-social-button"
                  onClick={() => handleSocialClick('youtube')}
                  title="YouTube"
                  type="button"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </button>
                <button
                  className="contact-social-button"
                  onClick={handleEmailClick}
                  title="Email"
                  type="button"
                >
                  <img src="/icons/email-icon.svg" alt="Email" width="28" height="28" />
                </button>
              </div>

              <div className="contact-me-cta-buttons">
                <button className="contact-me-cta" type="button" onClick={handleContactClick}>
                  <span>{tAbout('contactBanner.scheduleButton')}</span>
                  <div className="button-shine" />
                </button>
                <button className="contact-me-cta-secondary" type="button" onClick={handleEmailClick}>
                  <span>{tAbout('contactBanner.emailButton')}</span>
                </button>
              </div>
            </ScrollReveal>
            <ScrollReveal className="contact-me-image grow-brand-animation" delay={120}>
              <LottieAnimation
                src={PARTNERSHIP_LOTTIE_SRC}
                className="grow-brand-lottie"
                preserveAspectRatio="xMidYMid slice"
              />
            </ScrollReveal>
          </div>
        </div>

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
