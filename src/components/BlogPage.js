import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { getBlogPosts } from '../data/favouritesCollectionData';
import BlogPartnershipSection from './BlogPartnershipSection';
import './BlogPage.css';

const BlogPage = () => {
  const { t, currentLanguage } = useTranslation('common');
  const posts = getBlogPosts(currentLanguage);
  const blogBase = currentLanguage === 'ko' ? '/kr/blog' : '/blog';

  return (
    <>
      <Helmet>
        <title>{t('navigation.blog')} | Jeena&apos;s Kitchen</title>
        <meta name="description" content="Blog - Jeena's Kitchen" />
      </Helmet>
      <div className="blog-page">
        <div className="blog-page-content">
          <header className="blog-page-header">
            <h1 className="blog-page-title">{t('navigation.blog')}</h1>
            <p className="blog-page-description">
              {currentLanguage === 'ko'
                ? '지나의 즐겨찾기 컬렉션과 레시피 이야기를 만나보세요.'
                : "Jeena's favourites collections, and kitchen stories."}
            </p>
          </header>

          <div className="blog-post-list">
            {posts.slice(0, 12).map((post) => (
              <Link
                key={post.slug}
                to={`${blogBase}/${post.slug}`}
                className="blog-post-card"
              >
                <div className="blog-post-card-image-wrap">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="blog-post-card-image"
                  />
                </div>
                <div className="blog-post-card-body">
                  <h2 className="blog-post-card-title">{post.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <BlogPartnershipSection />
      </div>
    </>
  );
};

export default BlogPage;
