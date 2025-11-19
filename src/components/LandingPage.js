import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../hooks/useTranslation';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('landing');
  const heroTitleLines = t('hero.title').split('\n');
  const showKTabletopPreview = false;

  const handleExploreThemes = () => {
    navigate('/k-tabletop');
  };

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

  const handleContactClick = () => {
    window.open('https://calendar.app.google/EMPURCYjrxK23eRy6', '_blank', 'noopener,noreferrer');
  };

  const handleSocialClick = (platform) => {
    if (platform === 'instagram') {
      window.open('https://www.instagram.com/jeenas.kitchen/reels/', '_blank', 'noopener,noreferrer');
    } else if (platform === 'youtube') {
      window.open('https://youtube.com/@jeena.s.kitchen?si=AJNwkKPD3Bh4JH71', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
        <meta property="og:title" content={t('seo.ogTitle')} />
        <meta property="og:description" content={t('seo.ogDescription')} />
        <meta property="og:image" content="https://www.jeenaskitchen.store/hero-image/hero-custome-image.png" />
        <meta property="og:url" content="https://www.jeenaskitchen.store/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('seo.twitterTitle')} />
        <meta name="twitter:description" content={t('seo.twitterDescription')} />
        <meta name="twitter:image" content="https://www.jeenaskitchen.store/hero-image/hero-custome-image.png" />
      </Helmet>
      <div className="landing-page">
        <div className="landing-content">
          {/* Hero Section */}
          <div 
            className="landing-hero"
          style={{
            backgroundImage: 'url(/hero-image/hero-custome-image.png)'
          }}
        >
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                {heroTitleLines.map((line, index) => (
                  <React.Fragment key={index}>
                    <span className={index === 0 ? 'highlight' : undefined}>{line}</span>
                    {index < heroTitleLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
              <p className="hero-description">
                {t('hero.description')}
              </p>
              <button className="cta-button" onClick={handleExploreThemes}>
                <span>{t('hero.ctaButton')}</span>
                <div className="button-shine"></div>
              </button>
            </div>
            <div className="hero-image">
              <img src="/hero-image/mobile/hero-mobile.png" alt="Jeena's Kitchen" />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <div className="values-container">
          <div className="values-grid">
            <div className="value-item">
              <div className="value-image-container">
                <img src="/values-images/warmth.jpg" alt={t('values.warmth.title')} className="value-image" />
              </div>
              <h4 className="value-title">{t('values.warmth.title')}</h4>
              <p className="value-description">{t('values.warmth.description')}</p>
            </div>
            <div className="value-item">
              <div className="value-image-container">
                <img src="/values-images/connection.jpg" alt={t('values.connection.title')} className="value-image" />
              </div>
              <h4 className="value-title">{t('values.connection.title')}</h4>
              <p className="value-description">{t('values.connection.description')}</p>
            </div>
            <div className="value-item">
              <div className="value-image-container">
                <img src="/values-images/comfort.jpg" alt={t('values.comfort.title')} className="value-image" />
              </div>
              <h4 className="value-title">{t('values.comfort.title')}</h4>
              <p className="value-description">{t('values.comfort.description')}</p>
            </div>
            <div className="value-item">
              <div className="value-image-container">
                <img src="/values-images/thoughtfulness.jpg" alt={t('values.thoughtfulness.title')} className="value-image" />
              </div>
              <h4 className="value-title">{t('values.thoughtfulness.title')}</h4>
              <p className="value-description">{t('values.thoughtfulness.description')}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* K-Tabletop Preview Section */}
      {showKTabletopPreview && (
        <div className="k-tabletop-preview">
          <video 
            className="k-tabletop-video-bg"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/Videos/korean-drama-night.mp4" type="video/mp4" />
          </video>
          <div className="k-tabletop-preview-content">
            <div className="k-tabletop-text">
              <h2 className="k-tabletop-title">{t('hero.subtitle')}</h2>
              <p className="k-tabletop-description">
                {t('hero.description')}
              </p>
              <button className="k-tabletop-cta" onClick={() => navigate('/k-tabletop')}>
                <span>{t('hero.ctaButton')}</span>
                <div className="button-shine"></div>
              </button>
            </div>
            <div className="k-tabletop-image">
              <img src="/custom-images/k-tabletop-preview-image.png" alt="K-Tabletop Preview Image" />
            </div>
          </div>
        </div>
      )}
      
      {/* Social Media Section */}
      <div className="social-media-section">
        <div className="social-media-container">
          
          <div className="embeds-grid">
            {/* YouTube Videos Grid */}
            <div className="youtube-videos-section">
              <h3>{t('sections.watchLatestVideos')}</h3>
              <div className="youtube-grid">
                {/* Row 1 */}
                <div className="youtube-row">
                  <div className="youtube-embed-item">
                    <iframe
                      width="100%"
                      height="auto"
                      src="https://www.youtube.com/embed/bJgz1qTa8Cg?modestbranding=1&rel=0&showinfo=0&controls=0"
                      title="Korean Gimbap Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="youtube-embed-item">
                    <iframe
                      width="100%"
                      height="auto"
                      src="https://www.youtube.com/embed/WjNX3pNa9Oo?modestbranding=1&rel=0&showinfo=0&controls=0"
                      title="Korean Cooking Video 2"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                
                {/* Row 2 */}
                <div className="youtube-row">
                  <div className="youtube-embed-item">
                    <iframe
                      width="100%"
                      height="auto"
                      src="https://www.youtube.com/embed/naS9csQ4inA?modestbranding=1&rel=0&showinfo=0&controls=0"
                      title="Korean Cooking Video 3"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="youtube-embed-item">
                    <iframe
                      width="100%"
                      height="auto"
                      src="https://www.youtube.com/embed/w_QVOV3VJwY?modestbranding=1&rel=0&showinfo=0&controls=0"
                      title="Korean Cooking Video 4"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            
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
        </div>
      </div>
      
      {/* Kitchen Items Section */}
      <div className="kitchen-items-section">
        <div className="kitchen-items-container">
          <div className="kitchen-items-header">
            <h3 className="kitchen-items-title">{t('sections.ourKitchenItems')}</h3>
            <button className="kitchen-items-cta" onClick={() => navigate('/items')}>
              <span>{t('View All')}</span>
              <div className="button-shine"></div>
            </button>
          </div>
          
          <div className="kitchen-items-grid">
            {/* Row 1 */}
            <div className="kitchen-items-row">
              <div className="kitchen-item">
                <div className="kitchen-item-image-container">
                  <img 
                    src="/items-images/Stagg EKG Electric Kettle.jpg" 
                    alt="Stagg EKG Electric Kettle"
                    className="kitchen-item-image"
                  />
                </div>
              </div>
              
              <div className="kitchen-item">
                <div className="kitchen-item-image-container">
                  <img 
                    src="/items-images/Nespresso Vertuo Pop Solo Coconut White.jpg" 
                    alt="Nespresso Vertuo Pop Solo Coconut White"
                    className="kitchen-item-image"
                  />
                </div>
              </div>
              
              <div className="kitchen-item">
                <div className="kitchen-item-image-container">
                  <img 
                    src="/items-images/Staub Round Cocotte 18cm Black.jpg" 
                    alt="Staub Round Cocotte 18cm Black"
                    className="kitchen-item-image"
                  />
                </div>
              </div>
              
              <div className="kitchen-item">
                <div className="kitchen-item-image-container">
                  <img 
                    src="/items-images/Zwilling Four Star 6 Set.jpg" 
                    alt="Zwilling Four Star 6 Set"
                    className="kitchen-item-image"
                  />
                </div>
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="kitchen-items-row">
              <div className="kitchen-item">
                <div className="kitchen-item-image-container">
                  <img 
                    src="/items-images/Mino Pottery Mino Ware Curio 210 Deep Plate.jpg" 
                    alt="Mino Pottery Mino Ware Curio 210 Deep Plate"
                    className="kitchen-item-image"
                  />
                </div>
              </div>
              
              <div className="kitchen-item">
                <div className="kitchen-item-image-container">
                  <img 
                    src="/items-images/Kinto Cast Iced Tea Glass.jpg" 
                    alt="Kinto Cast Iced Tea Glass"
                    className="kitchen-item-image"
                  />
                </div>
              </div>
              
              <div className="kitchen-item">
                <div className="kitchen-item-image-container">
                  <img 
                    src="/items-images/Dusen Dusen Everybody Timer.png" 
                    alt="Dusen Dusen Everybody Timer"
                    className="kitchen-item-image"
                  />
                </div>
              </div>
              
              <div className="kitchen-item">
                <div className="kitchen-item-image-container">
                  <img 
                    src="/items-images/airrmade ceramic butter mug.jpg" 
                    alt="Airrmade Ceramic Butter Mug"
                    className="kitchen-item-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Me Section */}
      <div className="contact-me-section">
        <div className="contact-me-content">
          <div className="contact-me-text">
            <h2 className="contact-me-title">{t('contact.title')}</h2>
            <p className="contact-me-description">
              {t('contact.description')}
            </p>
            
            {/* Social Media and Email Buttons */}
            <div className="contact-me-social-buttons">
              <button 
                className="contact-social-button"
                onClick={() => handleSocialClick('instagram')}
                title="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
              
              <button 
                className="contact-social-button"
                onClick={() => handleSocialClick('youtube')}
                title="YouTube"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </button>
              
              <button 
                className="contact-social-button"
                onClick={() => window.open('mailto:jeenaskitchen153@gmail.com', '_blank', 'noopener,noreferrer')}
                title="Email"
              >
                <img src="/icons/email-icon.svg" alt="Email" width="28" height="28" />
              </button>
            </div>
            
            {/* CTA Buttons */}
            <div className="contact-me-cta-buttons">
              <button className="contact-me-cta" onClick={handleContactClick}>
                <span>{t('contact.ctaButton')}</span>
                <div className="button-shine"></div>
              </button>
              
              <button className="contact-me-cta-secondary" onClick={() => window.open('mailto:jeenaskitchen153@gmail.com', '_blank', 'noopener,noreferrer')}>
                <span>{t('contact.emailButton')}</span>
              </button>
            </div>
          </div>
          <div className="contact-me-image">
            <img src="/contact-images/contact-me-landing.png" alt="Contact Jeena's Kitchen" />
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default LandingPage;