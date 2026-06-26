import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../hooks/useTranslation';
import VideoAnimation from './landing/VideoAnimation';
import LottieAnimation from './landing/LottieAnimation';
import ScrollReveal from './landing/ScrollReveal';
import './landing/ScrollReveal.css';
import './LandingPage.css';
import './AboutPage.css';

const VIDEO_CACHE_VERSION = '2025062315';
const ABOUT_STORY_IMAGE_VERSION = '2025062413';
const HERO_VIDEO_SRC = `/animations/video/animation-1.mp4?v=${VIDEO_CACHE_VERSION}`;
const PARTNERSHIP_LOTTIE_SRC = '/animations/lottie/animation-15.json';
const ABOUT_PARA4_LOTTIE_SRC = '/animations/lottie/about-para-4.json';

const aboutStoryImage = (filename) =>
  `/about-image/${filename}?v=${ABOUT_STORY_IMAGE_VERSION}`;

const AboutPage = () => {
  const { t } = useTranslation('about');
  const { t: tLanding } = useTranslation('landing');

  const blogCarouselImages = [
    { image: '/about-image/reel-photos/reel-photo-1.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
    { image: '/about-image/reel-photos/reel-photo-2.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
    { image: '/about-image/reel-photos/reel-photo-3.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
    { image: '/about-image/reel-photos/reel-photo-4.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
    { image: '/about-image/reel-photos/reel-photo-5.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
    { image: '/about-image/reel-photos/reel-photo-6.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
    { image: '/about-image/reel-photos/reel-photo-7.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
    { image: '/about-image/reel-photos/reel-photo-8.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
    { image: '/about-image/reel-photos/reel-photo-9.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
    { image: '/about-image/reel-photos/reel-photo-10.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
    { image: '/about-image/reel-photos/reel-photo-11.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
    { image: '/about-image/reel-photos/reel-photo-12.jpg', url: 'https://www.instagram.com/jeenas.kitchen/' },
  ];

  const instagramReels = blogCarouselImages.map(({ image, url }, index) => ({
    id: `blog-in-syd-${index + 1}`,
    url,
    thumbnail: image,
    titleKey: `whatICook.reels.${index}.title`,
    theme: index % 2 === 0 ? 'light' : 'dark',
  }));

  const [reelsVisible, setReelsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768 ? 2 : 3;
    }
    return 3;
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
      const visible = mobile ? 2 : 3;
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

  const reelDotIndices = Array.from(
    { length: Math.ceil(totalReels / reelsVisible) },
    (_, i) => i * reelsVisible
  );

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

  const handleInstagramCtaClick = () => {
    window.open('https://www.instagram.com/jeenas.kitchen/reels/', '_blank', 'noopener,noreferrer');
  };

  const renderReelsCarousel = () => (
    <div
      className="instagram-reels-carousel"
      onTouchStart={handleReelsTouchStart}
      onTouchEnd={handleReelsTouchEnd}
    >
      <div className="reels-carousel-container">
        <div className="reels-carousel-track">
          {instagramReels.slice(currentReelSlide, currentReelSlide + reelsVisible).map((reel, index) => (
            <div key={`${reel.id}-${index}`} className="reels-carousel-slide">
              <div
                className={`instagram-reel-item reel-card reel-card--${reel.theme}`}
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
                <div className="reel-card-header">
                  <span className="reel-card-badge">{tLanding('whatICook.badge')}</span>
                  <p className="reel-card-title">{tLanding(reel.titleKey)}</p>
                </div>
                <div className="reel-card-image">
                  <img
                    src={reel.thumbnail}
                    alt={tLanding(reel.titleKey)}
                    className="reel-thumbnail"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="reels-carousel-controls">
          {isMobile ? (
            <>
              <div className="reels-carousel-status">
                <span>
                  {Math.floor(currentReelSlide / reelsVisible) + 1} /{' '}
                  {Math.ceil(totalReels / reelsVisible)}
                </span>
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
  );

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
        {/* Hero Section — Animation 1 */}
        <div className="about-hero">
          <div className="about-hero-overlay">
            <div className="about-hero-video-inner">
              <VideoAnimation
                src={HERO_VIDEO_SRC}
                className="about-hero-video"
                muted
                showMuteToggle
              />
            </div>
          </div>
        </div>

        {/* Jeena's Kitchen Story */}
        <section className="about-story-section">
          <div className="about-section-inner">
            <ScrollReveal className="about-section text-left" delay={0}>
              <div className="about-text">
                <p>
                  <strong>{t('intro.paragraph1Title')}</strong>
                  {'\n\n'}
                  {t('intro.paragraph1')}
                </p>
              </div>
              <div className="about-image">
                <img src={aboutStoryImage('para-about-1.jpg')} alt={t('intro.image1Alt')} />
              </div>
            </ScrollReveal>

            <ScrollReveal className="about-section image-left" delay={100}>
              <div className="about-image">
                <img src={aboutStoryImage('para-about-2.jpg')} alt={t('intro.image2Alt')} />
              </div>
              <div className="about-text">
                <p>
                  <strong>{t('intro.paragraph2Title')}</strong>
                  {'\n\n'}
                  {t('intro.paragraph2')}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal className="about-section text-left" delay={200}>
              <div className="about-text">
                <p>
                  <strong>{t('intro.paragraph3Title')}</strong>
                  {'\n\n'}
                  {t('intro.paragraph3')}
                </p>
              </div>
              <div className="about-image">
                <LottieAnimation
                  src={ABOUT_PARA4_LOTTIE_SRC}
                  className="about-para-4-lottie"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal className="about-section image-left" delay={300}>
              <div className="about-image">
                <img
                  src={aboutStoryImage('para-about-3.jpg')}
                  alt={t('intro.image3Alt')}
                  className="about-image-flip-x"
                />
              </div>
              <div className="about-text">
                <p>
                  <strong>{t('intro.paragraph4Title')}</strong>
                  {'\n\n'}
                  {t('intro.paragraph4')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Instagram Carousel — matches home What I Cook design */}
        <section className="about-carousel-section what-i-cook-section">
          <div className="landing-section-inner">
            <div className="what-i-cook-content">
              <ScrollReveal className="what-i-cook-text" delay={0}>
                <h2 className="section-title">{t('sections.followInstagram')}</h2>
                <p className="section-description">{t('carousel.description')}</p>
                <button
                  className="cta-button"
                  type="button"
                  onClick={handleInstagramCtaClick}
                >
                  <span>{t('carousel.ctaButton')}</span>
                  <div className="button-shine" />
                </button>
              </ScrollReveal>
              <ScrollReveal className="what-i-cook-carousel" delay={120}>
                {renderReelsCarousel()}
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Partnership — matches home Grow Your Brand design */}
        <div className="contact-me-section grow-brand-section">
          <div className="contact-me-content">
            <ScrollReveal className="contact-me-text" delay={0}>
              <h2 className="contact-me-title">{t('contactBanner.title')}</h2>
              <p className="contact-me-description">{t('contactBanner.description')}</p>

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
                  <span>{t('contactBanner.scheduleButton')}</span>
                  <div className="button-shine" />
                </button>
                <button className="contact-me-cta-secondary" type="button" onClick={handleEmailClick}>
                  <span>{t('contactBanner.emailButton')}</span>
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
      </div>
    </>
  );
};

export default AboutPage;