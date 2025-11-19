import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../hooks/useTranslation';
import './AboutPage.css';

const AboutPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation('about');
  
  // Carousel images
  const carouselImages = [
    '/about-image/carousel-about1.jpg',
    '/about-image/carousel-about2.jpg',
    '/about-image/carousel-about3.jpg',
    '/about-image/carousel-about4.jpg',
    '/about-image/carousel-about5.jpg',
    '/about-image/carousel-about6.jpg',
    '/about-image/carousel-about7.jpg',
    '/about-image/carousel-about8.jpg',
    '/about-image/carousel-about9.jpg',
    '/about-image/carousel-about11.jpg',
    '/about-image/carousel-about11-1.jpg',
    '/about-image/carousel-about11-2.jpg'
  ];

  const [numVisible, setNumVisible] = useState(() => (typeof window !== 'undefined' && window.innerWidth <= 768 ? 2 : 4));

  useEffect(() => {
    const onResize = () => {
      setNumVisible(window.innerWidth <= 768 ? 2 : 4);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Blog in SYD carousel images reused for Instagram reels section
  const blogCarouselImages = [
    {
      image: '/about-image/carousel-about1.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    },
    {
      image: '/about-image/carousel-about2.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    },
    {
      image: '/about-image/carousel-about3.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    },
    {
      image: '/about-image/carousel-about4.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    },
    {
      image: '/about-image/carousel-about5.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    },
    {
      image: '/about-image/carousel-about6.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    },
    {
      image: '/about-image/carousel-about7.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    },
    {
      image: '/about-image/carousel-about8.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    },
    {
      image: '/about-image/carousel-about9.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    },
    {
      image: '/about-image/carousel-about10.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    },
    {
      image: '/about-image/carousel-about11.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    },
    {
      image: '/about-image/carousel-about12.jpg',
      url: 'https://www.instagram.com/jeenas.kitchen/'
    }
  ];

  const instagramReels = blogCarouselImages.map(({ image, url }, index) => ({
    id: `blog-in-syd-${index + 1}`,
    url,
    thumbnail: image
  }));

  const [reelsVisible, setReelsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768 ? 2 : 4;
    }
    return 4;
  });
  const [currentReelSlide, setCurrentReelSlide] = useState(0);
  const totalReels = instagramReels.length;
  const [touchStartX, setTouchStartX] = useState(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const updateVisible = () => {
      const mobile = window.innerWidth <= 768;
      const visible = mobile ? 2 : 4;
      setIsMobile(mobile);
      setReelsVisible(visible);
      setCurrentReelSlide((prev) => {
        const maxStart = Math.max(0, totalReels - visible);
        return Math.min(prev, maxStart);
      });
    };

    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, [totalReels]);

  const handleNextReels = () => {
    setCurrentReelSlide((prev) => {
      const next = prev + reelsVisible;
      return next >= totalReels ? 0 : next;
    });
  };

  const handlePrevReels = () => {
    setCurrentReelSlide((prev) => {
      const prevIndex = prev - reelsVisible;
      const lastStart = Math.max(0, totalReels - reelsVisible);
      return prevIndex < 0 ? lastStart : prevIndex;
    });
  };

  const handleGoToReels = (index) => {
    setCurrentReelSlide(index);
  };

  const reelDotIndices = Array.from({ length: Math.ceil(totalReels / reelsVisible) }, (_, i) => i * reelsVisible);

  const handleReelsTouchStart = (event) => {
    if (event.touches && event.touches.length === 1) {
      setTouchStartX(event.touches[0].clientX);
    }
  };

  const handleReelsTouchEnd = (event) => {
    if (touchStartX === null || !event.changedTouches || event.changedTouches.length === 0) {
      return;
    }
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const swipeThreshold = 40;
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX < 0) {
        handleNextReels();
      } else {
        handlePrevReels();
      }
    }
    setTouchStartX(null);
  };

  const handleInstagramClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const nextIndex = prev + numVisible;
      return nextIndex >= carouselImages.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevIndex = prev - numVisible;
      const lastStart = Math.max(0, carouselImages.length - numVisible);
      return prevIndex < 0 ? lastStart : prevIndex;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleContactClick = () => {
    window.open('https://calendar.app.google/EMPURCYjrxK23eRy6', '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = () => {
    window.open('mailto:jeenaskitchen153@gmail.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content="Learn about Jeena's journey from Korea to Australia, sharing authentic Korean recipes and building connections through food. Discover the story behind Jeena's Kitchen." />
        <meta property="og:title" content="About Jeena - Korean Cooking Journey" />
        <meta property="og:description" content="Learn about Jeena's journey from Korea to Australia, sharing authentic Korean recipes and building connections through food." />
        <meta property="og:image" content="https://www.jeenaskitchen.store/about-image/hero-about.jpg" />
        <meta property="og:url" content="https://www.jeenaskitchen.store/about" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="about-page">
        {/* Hero Section with Background Image */}
        <div className="about-hero" style={{ backgroundImage: 'url(/about-image/hero-about.jpg)' }}>
          <div className="about-hero-overlay"></div>
        </div>

        {/* Main Content */}
        <div className="about-page-content">
          <div className="about-main-content">
          {/* Paragraph 1 - Text Left, Image Right */}
          <div className="about-section text-left">
            <div className="about-text">
              <h1 className="about-title">
                {t('hero.title')}
              </h1>
              <p>
                {t('intro.paragraph1')}
              </p>
            </div>
            <div className="about-image">
              <img src="/about-image/para-about-1.jpg" alt="Jeena in Australia" />
            </div>
          </div>
          
          {/* Paragraph 2 - Image Left, Text Right */}
          <div className="about-section image-left">
            <div className="about-image">
              <img src="/about-image/para-about-2.jpg" alt="Cooking and self-discovery" />
            </div>
            <div className="about-text">
              <p>
                <strong>{t('intro.paragraph2Title')}</strong><br/>
                {t('intro.paragraph2')}
              </p>
            </div>
          </div>
          
          {/* Paragraph 3 - Text Left, Image Right */}
          <div className="about-section text-left">
            <div className="about-text">
              <p>
                <strong>{t('intro.paragraph3Title')}</strong><br/>
                {t('intro.paragraph3')}
              </p>
            </div>
            <div className="about-image">
              <img src="/about-image/para-about-3.jpg" alt="Kitchen stories" />
            </div>
          </div>

          {/* Paragraph 4 - Image Left, Text Right */}
          <div className="about-section image-left">
            <div className="about-image">
              <img src="/about-image/para-about-4.jpg" alt="Community and cooking" />
            </div>
            <div className="about-text">
              <p>
                <strong>{t('intro.paragraph4Title')}</strong><br/>
                {t('intro.paragraph4')}
              </p>
            </div>
          </div>

          {/* Carousel Section - 3 Images Visible */}

          {/* Instagram Reels with Custom Thumbnails */}
          <div className="instagram-reels-section">
            <div className="instagram-reels-header">
              <h3 className="section-title section-title--h3">{t('sections.followInstagram')}</h3>
              <div className="section-divider"></div>
            </div>
            <div
              className="instagram-reels-carousel"
              onTouchStart={handleReelsTouchStart}
              onTouchEnd={handleReelsTouchEnd}
            >
              <div className="reels-carousel-container">
                <div className="reels-carousel-track">
                  {instagramReels.slice(currentReelSlide, currentReelSlide + reelsVisible).map((reel, index) => (
                    <div
                      key={`${reel.id}-${index}`}
                      className="reels-carousel-slide"
                    >
                      <div
                        className="instagram-reel-item"
                        onClick={() => handleInstagramClick(reel.url)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleInstagramClick(reel.url);
                          }
                        }}
                      >
                        <div className="reel-thumbnail-container">
                          <img 
                            src={reel.thumbnail}
                            alt="Instagram reel thumbnail"
                            className="reel-thumbnail"
                          />
                          <div className="reel-overlay" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="reels-carousel-controls">
                  {isMobile ? (
                    <>
                      <div className="reels-carousel-status">
                        <span>{Math.floor(currentReelSlide / reelsVisible) + 1} / {Math.ceil(totalReels / reelsVisible)}</span>
                      </div>
                      <div className="reels-carousel-arrows">
                        <button
                          className="reels-carousel-arrow"
                          onClick={handlePrevReels}
                          aria-label="Previous Instagram reel slide"
                          type="button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                          </svg>
                        </button>
                        <button
                          className="reels-carousel-arrow"
                          onClick={handleNextReels}
                          aria-label="Next Instagram reel slide"
                          type="button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="reels-carousel-dots">
                        {reelDotIndices.map((index) => {
                          const currentPage = Math.floor(currentReelSlide / reelsVisible);
                          const dotPage = index / reelsVisible;
                          return (
                            <button
                              key={index}
                              className={`reels-carousel-dot ${currentPage === dotPage ? 'active' : ''}`}
                              onClick={() => handleGoToReels(index)}
                              aria-label={`Go to slide ${dotPage + 1}`}
                              type="button"
                            />
                          );
                        })}
                      </div>
                      <div className="reels-carousel-arrows">
                        <button
                          className="reels-carousel-arrow"
                          onClick={handlePrevReels}
                          aria-label="Previous Instagram reel slide"
                          type="button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                          </svg>
                        </button>
                        <button
                          className="reels-carousel-arrow"
                          onClick={handleNextReels}
                          aria-label="Next Instagram reel slide"
                          type="button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

        {/* Contact Banner Section */}
        <div className="about-contact-banner">
          <div className="about-contact-content">
            <div className="about-contact-text">
              <h2 className="about-contact-title">{t('contactBanner.title')}</h2>
              <p className="about-contact-description">{t('contactBanner.description')}</p>
              <div className="about-contact-cta-buttons">
                <button className="about-contact-cta" onClick={handleContactClick}>
                  <span>{t('contactBanner.scheduleButton')}</span>
                </button>
                <button className="about-contact-cta-secondary" onClick={handleEmailClick}>
                  <span>{t('contactBanner.emailButton')}</span>
                </button>
              </div>
            </div>
            <div className="about-contact-image">
              <img src="/contact-images/contact-me-landing.png" alt="Contact Jeena's Kitchen" />
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;