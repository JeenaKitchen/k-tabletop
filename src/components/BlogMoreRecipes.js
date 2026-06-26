import React from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../data/favouritesCollectionData';
import { getMoreRecipeSuggestions } from '../data/blogMoreRecipesData';
import './BlogMoreRecipes.css';

const BlogMoreRecipes = ({ currentLanguage, currentSlug }) => {
  const blogBase = currentLanguage === 'ko' ? '/kr/blog' : '/blog';
  const kTabletopBase = currentLanguage === 'ko' ? '/kr/k-tabletop' : '/k-tabletop';

  const otherBlogPosts = getBlogPosts(currentLanguage).filter(
    (post) => post.slug !== currentSlug
  );
  const recipeSuggestions = getMoreRecipeSuggestions(currentLanguage).map((recipe) => ({
    ...recipe,
    href: `${kTabletopBase}${recipe.href}`,
  }));

  const items = [
    ...otherBlogPosts.map((post) => ({
      key: post.slug,
      href: `${blogBase}/${post.slug}`,
      title: post.title,
      image: post.heroImage,
      label: post.collectionName,
    })),
    ...recipeSuggestions.map((recipe) => ({
      key: recipe.href,
      href: recipe.href,
      title: recipe.title,
      image: recipe.image,
      label: recipe.label,
    })),
  ].slice(0, 12);

  if (!items.length) {
    return null;
  }

  return (
    <section className="blog-more-recipes">
      <div className="blog-more-recipes-inner">
        <h2 className="blog-more-recipes-title">
          {currentLanguage === 'ko' ? '더 많은 블로그' : 'More blogs'}
        </h2>
        <div className="blog-more-recipes-grid">
          {items.map((item) => (
            <Link key={item.key} to={item.href} className="blog-more-recipes-card">
              <div className="blog-more-recipes-card-image-wrap">
                <img src={item.image} alt={item.title} className="blog-more-recipes-card-image" />
              </div>
              <div className="blog-more-recipes-card-body">
                {item.label && <p className="blog-more-recipes-card-label">{item.label}</p>}
                <h3 className="blog-more-recipes-card-title">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogMoreRecipes;
