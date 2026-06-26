import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import {
  getFeaturedCollection,
  getFeaturedCollectionBlogContent,
} from '../data/favouritesCollectionData';
import ItemsFeaturedCollection from './ItemsFeaturedCollection';
import BlogPostBody from './BlogPostBody';
import BlogMoreRecipes from './BlogMoreRecipes';
import BlogPartnershipSection from './BlogPartnershipSection';
import './ItemsPage.css';
import './BlogPostBody.css';

const BlogPostPage = () => {
  const { collection, slug } = useParams();
  const location = useLocation();
  const { currentLanguage } = useTranslation();
  const collectionSlug = `${collection}/${slug}`;
  const isKoreanRoute = location.pathname.startsWith('/kr/');

  const heroContent = getFeaturedCollection(collectionSlug, currentLanguage);
  const blogContent = getFeaturedCollectionBlogContent(collectionSlug, currentLanguage);

  if (!heroContent) {
    return <Navigate to={isKoreanRoute ? '/kr/blog' : '/blog'} replace />;
  }

  return (
    <>
      <Helmet>
        <title>{heroContent.title} | Blog | Jeena&apos;s Kitchen</title>
        <meta name="description" content={heroContent.description} />
      </Helmet>
      <div className="blog-post-page">
        <ItemsFeaturedCollection
          currentLanguage={currentLanguage}
          variant="blog"
          collectionSlug={collectionSlug}
        />
        {blogContent && <BlogPostBody sections={blogContent.sections} />}
        <BlogMoreRecipes
          currentLanguage={currentLanguage}
          currentSlug={collectionSlug}
        />
        <BlogPartnershipSection />
      </div>
    </>
  );
};

export default BlogPostPage;
