import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../hooks/useTranslation';
import './LandingPage.css';

const BlogPage = () => {
  const { t } = useTranslation('landing');

  return (
    <>
      <Helmet>
        <title>{t('seo.title')} - Blog</title>
        <meta name="description" content="Blog - Jeena's Kitchen" />
      </Helmet>
      <div className="contact-me-section" style={{ background: 'transparent' }}>
        <div className="contact-me-content">
          <div className="contact-me-text">
            <h2 className="contact-me-title">{t('navigation.blog') || 'Blog'}</h2>
            <p className="contact-me-description">
              Coming soon.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;


