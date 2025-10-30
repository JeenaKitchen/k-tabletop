import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../hooks/useTranslation';
import './LandingPage.css';
import './ContactPage.css';

const ContactPage = () => {
  const { t } = useTranslation('landing');

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
        <title>{t('contact.title')}</title>
        <meta name="description" content={t('contact.description')} />
      </Helmet>
      <div className="contact-page">
        <div className="contact-me-section">
        <div className="contact-me-content">
          <div className="contact-me-text">
            <h2 className="contact-me-title">{t('contact.title')}</h2>
            <p className="contact-me-description">{t('contact.description')}</p>
            <div className="contact-me-social-buttons">
              <button 
                className="contact-social-button"
                onClick={() => handleSocialClick('instagram')}
                title="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
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
    </>
  );
};

export default ContactPage;


