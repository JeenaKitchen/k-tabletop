import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleExploreThemes = () => {
    navigate('/k-tabletop');
  };

  // Instagram reel data with custom thumbnails
  const instagramReels = [
    {
      id: 'C-5Pb10h-WQ',
      url: 'https://www.instagram.com/reel/DGxHU5uRHfd/?utm_source=ig_web_copy_link&igsh=dnBhdzg4c2g2ZDY=',
      thumbnail: '/modal-images/tteokbokki.jpg',
      title: 'Tteokbokki(Spicy Rice Cakes)',
      description: 'Korean street food for Movie Nights'
    },
    {
      id: 'C93-oOxx_yP', 
      url: 'https://www.instagram.com/p/C93-oOxx_yP/',
      thumbnail: '/modal-images/potato-salada-sandwich.jpg',
      title: 'Potato Salada Sandwich',
      description: 'Childhood Nostalgia Snack'
    },
    {
      id: 'DGxHU5uRHfd',
      url: 'https://www.instagram.com/reel/DIiF1FuRqQY/?utm_source=ig_web_copy_link&igsh=MXZwYzJicGhubWo4bA==',
      thumbnail: '/modal-images/tofu-inseolmi.jpg',
      title: 'Tofu Injeolmi (Rice Cake with Tofu)',
      description: 'Low calorie, high protein, and easy to make'
    }
  ];

  const handleInstagramClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
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
                Welcome to<br/>
                <span className="highlight">Jeena's Kitchen<br/>지나키친</span>
              </h1>
              <p className="hero-description">
                Jeena's Kitchen is where I share Korean flavors, stories, and a love for cooking that connects people across cultures.
              </p>
              <button className="cta-button" onClick={handleExploreThemes}>
                <span>Explore Themes</span>
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
          <source src="/Videos/pocha-night.mp4" type="video/mp4" />
        </video>
        <div className="k-tabletop-preview-content">
          <div className="k-tabletop-text">
            <h2 className="k-tabletop-title">Eat. Play. Experience Korea on Your Table</h2>
            <p className="k-tabletop-description">
            Immerse yourself in interactive dining themes, authentic Jeena’s Kitchen recipes, and cultural stories — from cozy Netflix nights to bustling market scenes, experience the rich world of Korean food culture on your table.
            </p>
            <button className="k-tabletop-cta" onClick={() => navigate('/k-tabletop')}>
              <span>Enter K-Tabletop</span>
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
              <h3>Watch My Latest Videos</h3>
              <div className="youtube-grid">
                {/* Row 1 */}
                <div className="youtube-row">
                  <div className="youtube-embed-item">
                    <iframe
                      width="100%"
                      height="auto"
                      src="https://www.youtube.com/embed/bJgz1qTa8Cg"
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
                      src="https://www.youtube.com/embed/WjNX3pNa9Oo"
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
                      src="https://www.youtube.com/embed/naS9csQ4inA"
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
                      src="https://www.youtube.com/embed/w_QVOV3VJwY"
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
              <h3>Follow on Instagram</h3>
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
                      <h4 className="reel-title">{reel.title}</h4>
                      <p className="reel-description">{reel.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;