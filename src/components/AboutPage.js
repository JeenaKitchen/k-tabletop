import React, { useState } from 'react';
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
    '/about-image/carousel-about9.jpg'
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const nextIndex = prev + 2;
      return nextIndex >= carouselImages.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevIndex = prev - 2;
      return prevIndex < 0 ? Math.max(0, carouselImages.length - 2) : prevIndex;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
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
          <div className="carousel-section">
            <h3>Blog in SYD</h3>
            <div className="carousel-container">
              <button className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              <div className="carousel-track">
                {carouselImages.slice(currentSlide, currentSlide + 2).map((image, index) => (
                  <div
                    key={currentSlide + index}
                    className="carousel-slide"
                  >
                    <img src={image} alt={`Carousel ${currentSlide + index + 1}`} />
                  </div>
                ))}
              </div>
              
              <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
            </div>
            
            <div className="carousel-dots">
              {[0, 2, 4, 6, 8].map((startIndex) => (
                <button
                  key={startIndex}
                  className={`carousel-dot ${currentSlide === startIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(startIndex)}
                />
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;