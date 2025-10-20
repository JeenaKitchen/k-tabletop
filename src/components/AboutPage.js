import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './AboutPage.css';

const AboutPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
      const nextIndex = prev + 3;
      return nextIndex >= carouselImages.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevIndex = prev - 3;
      return prevIndex < 0 ? Math.max(0, carouselImages.length - 3) : prevIndex;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <Helmet>
        <title>About Jeena - Korean Cooking Journey | Jeena's Kitchen</title>
        <meta name="description" content="Learn about Jeena's journey from Korea to Australia, sharing authentic Korean recipes and building connections through food. Discover the story behind Jeena's Kitchen." />
        <meta property="og:title" content="About Jeena - Korean Cooking Journey" />
        <meta property="og:description" content="Learn about Jeena's journey from Korea to Australia, sharing authentic Korean recipes and building connections through food." />
        <meta property="og:image" content="https://www.jeenaskitchen.store/about-image/hero-about.jpg" />
        <meta property="og:url" content="https://www.jeenaskitchen.store/about" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="about-page">
        <div className="about-page-content">
          {/* Hero Section with Background Image */}
          <div className="about-hero" style={{ backgroundImage: 'url(/about-image/hero-about.jpg)' }}>
          <div className="about-hero-overlay"></div>
        </div>

        {/* Main Content */}
        <div className="about-main-content">
          {/* Paragraph 1 - Text Left, Image Right */}
          <div className="about-section text-left">
            <div className="about-text">
              <h1 className="about-title">
                Welcome to<br/>
                <span className="korean-title">Jeena's Kitchen 지나키친</span>
              </h1>
              <p>
                Hello, and welcome to Jeena's Kitchen.

I was born and raised in Korea, and I moved to Australia 11 years ago.

For me, sharing the food I cook is more than just a conversation — it feels like a deep connection.

A meal prepared with care can be an act of self-love, a source of comfort, and at the same time, a tender expression of affection toward family and friends.

Even with cultural differences, food has allowed me to build bridges — to grow closer to friends and colleagues, and to create a sense of intimacy.

No matter how tough the day was, cooking has always been a moment of healing for me.
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
                <strong>Rediscover myself through cooking</strong><br/>
                Jeena's Kitchen is a space where I explore the thoughts, stories, and flavors that have shaped me.

Through cooking, I found a way to reconnect with the roots of my identity. At the same time, I discovered new ways of speaking to myself — learning what I truly enjoy and what brings me comfort.
              </p>
            </div>
          </div>
          
          {/* Paragraph 3 - Text Left, Image Right */}
          <div className="about-section text-left">
            <div className="about-text">
              <p>
                <strong>Connect with the world</strong><br/>
                To me, Jeena’s Kitchen is like a little lab — a place to reflect on how I can build healthier relationships with myself, with others, and with society, through food.

I hope to continue learning and growing as a humble member of a multicultural community, while sharing the beauty of Korean food here in Australia. And through cooking, I wish to create a positive impact, both as a Korean and as part of the society I now call home.
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
                <strong>Joy and Healing Through Cooking</strong><br/>
                Cooking can be playful, and in those moments of joy, the weight of a long or difficult day often fades away.

I hope it can become that way for you too — a source of fun, healing, and inspiration.

If you ever find yourself thinking, “I want to taste that,” or “I want to try making this,” that would be the greatest happiness for me.

Whether you’re missing your mom’s food, looking for comfort in a solo meal, or simply moving at your own pace — I hope Jeena’s Kitchen can be a gentle pause, a warm space for you to rest.
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
                {carouselImages.slice(currentSlide, currentSlide + 3).map((image, index) => (
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
              {[0, 3, 6].map((startIndex) => (
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