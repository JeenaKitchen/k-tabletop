import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../hooks/useTranslation';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('landing');

  const handleExploreThemes = () => {
    navigate('/k-tabletop');
  };

  // Instagram reel data with custom thumbnails
  const instagramReels = [
    {
      id: 'C-5Pb10h-WQ',
      url: 'https://www.instagram.com/reel/DGxHU5uRHfd/?utm_source=ig_web_copy_link&igsh=dnBhdzg4c2g2ZDY=',
      thumbnail: '/modal-images/tteokbokki.jpg',
      titleKey: 'reel1.title',
      descriptionKey: 'reel1.description'
    },
    {
      id: 'C93-oOxx_yP', 
      url: 'https://www.instagram.com/p/C93-oOxx_yP/',
      thumbnail: '/modal-images/potato-salada-sandwich.jpg',
      titleKey: 'reel2.title',
      descriptionKey: 'reel2.description'
    },
    {
      id: 'DGxHU5uRHfd',
      url: 'https://www.instagram.com/reel/DIiF1FuRqQY/?utm_source=ig_web_copy_link&igsh=MXZwYzJicGhubWo4bA==',
      thumbnail: '/modal-images/tofu-inseolmi.jpg',
      titleKey: 'reel3.title',
      descriptionKey: 'reel3.description'
    }
  ];

  const handleInstagramClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
                {t('hero.welcome')}<br/>
                <span className="highlight">{t('hero.title')}</span>
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
      
      {/* K-Tabletop Preview Section */}
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
              <h3>{t('sections.followInstagram')}</h3>
              <div className="instagram-reels-grid">
                {instagramReels.map((reel, index) => (
                  <div 
                    key={reel.id}
                    className="instagram-reel-item"
                    onClick={() => handleInstagramClick(reel.url)}
                  >
                    <div className="reel-thumbnail-container">
                      <img 
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="reel-thumbnail"
                      />
                      <div className="reel-overlay">
                        <div className="instagram-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <div className="play-button">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="reel-info">
                      <h4 className="reel-title">{t(reel.titleKey)}</h4>
                      <p className="reel-description">{t(reel.descriptionKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
      {/* Kitchen Items Section */}
      <div className="kitchen-items-section">
        <div className="kitchen-items-container">
          <div className="kitchen-items-header">
            <h3>{t('sections.ourKitchenItems')}</h3>
            <button className="kitchen-items-cta" onClick={() => navigate('/items')}>
              <span>{t('buttons.viewAll')}</span>
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
    </div>
    </>
  );
};

export default LandingPage;