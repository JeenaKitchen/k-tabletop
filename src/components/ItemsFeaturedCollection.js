import React from 'react';
import { Link } from 'react-router-dom';
import {
  FEATURED_COLLECTION_SLUG,
  getFeaturedCollection,
} from '../data/favouritesCollectionData';

const ItemsFeaturedCollection = ({
  currentLanguage,
  variant = 'preview',
  collectionSlug = FEATURED_COLLECTION_SLUG,
}) => {
  const content = getFeaturedCollection(collectionSlug, currentLanguage);

  if (!content) {
    return null;
  }

  const kTabletopBase =
    currentLanguage === 'ko' ? '/kr/k-tabletop' : '/k-tabletop';
  const recipePath = `${kTabletopBase}/${content.recipeLink}`;

  const breadcrumb =
    variant === 'blog' ? content.blogBreadcrumb : content.breadcrumb;

  return (
    <section
      className={`items-featured-collection${
        variant === 'blog' ? ' items-featured-collection--blog' : ''
      }`}
    >
      <div className="items-featured-collection-inner">
        <div className="items-featured-collection-content">
          <p className="items-featured-breadcrumb">{breadcrumb}</p>
          <h1 className="items-featured-title">{content.title}</h1>

          <div className="items-featured-meta">
            {content.meta.map((item) => (
              <span key={item} className="items-featured-meta-pill">
                {item}
              </span>
            ))}
          </div>

          <p className="items-featured-description">{content.description}</p>

          {variant === 'preview' && (
            <Link className="items-featured-blog-button" to={recipePath}>
              {content.recipeButton}
            </Link>
          )}

          <div className="items-featured-ingredients-header">
            <h2 className="items-featured-ingredients-title">{content.ingredientsTitle}</h2>
          </div>

          <div className="items-featured-ingredients-grid">
            {content.ingredients.map((ingredient) => {
              const IngredientWrapper = ingredient.link ? 'a' : 'div';
              const wrapperProps = ingredient.link
                ? {
                    href: ingredient.link,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {};

              return (
                <IngredientWrapper
                  key={ingredient.name}
                  className={`items-featured-ingredient${
                    ingredient.link ? ' items-featured-ingredient--link' : ''
                  }`}
                  {...wrapperProps}
                >
                  <div className="items-featured-ingredient-image-wrap">
                    <img
                      src={ingredient.image}
                      alt={ingredient.name}
                      className="items-featured-ingredient-image"
                    />
                  </div>
                  <p className="items-featured-ingredient-name">{ingredient.name}</p>
                </IngredientWrapper>
              );
            })}
          </div>
        </div>

        <div className="items-featured-media">
          <img
            src={content.heroImage}
            alt={content.heroAlt}
            className="items-featured-hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default ItemsFeaturedCollection;
