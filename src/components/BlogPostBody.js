import React from 'react';
import './BlogPostBody.css';

const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (!videoId) return '';
  const startTime = url.match(/[?&]t=(\d+)/);
  const startParam = startTime ? `?start=${startTime[1]}` : '';
  return `https://www.youtube.com/embed/${videoId[1]}${startParam}`;
};

const renderSection = (section, index) => {
  switch (section.type) {
    case 'heading':
      return (
        <h2 key={index} className="blog-post-heading">
          {section.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p key={index} className="blog-post-paragraph">
          {section.text}
        </p>
      );
    case 'steps':
      return (
        <ol key={index} className="blog-post-steps">
          {section.items.map((item, stepIndex) => (
            <li key={stepIndex}>{item}</li>
          ))}
        </ol>
      );
    case 'image':
      return (
        <figure key={index} className="blog-post-figure">
          <img src={section.src} alt={section.alt || ''} className="blog-post-image" />
          {section.caption && (
            <figcaption className="blog-post-caption">{section.caption}</figcaption>
          )}
        </figure>
      );
    case 'youtube': {
      const embedUrl = getYouTubeEmbedUrl(section.url);
      if (!embedUrl) {
        return (
          <a
            key={index}
            href={section.url}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-post-video-link"
          >
            {section.title}
          </a>
        );
      }
      return (
        <div key={index} className="blog-post-video">
          <iframe
            src={embedUrl}
            title={section.title || 'Recipe video'}
            allowFullScreen
          />
        </div>
      );
    }
    default:
      return null;
  }
};

const BlogPostBody = ({ sections }) => {
  if (!sections?.length) {
    return null;
  }

  const introSections = [];
  const recipeSections = [];
  let reachedRecipe = false;

  sections.forEach((section) => {
    if (
      !reachedRecipe &&
      section.type === 'heading' &&
      /ingredients|재료/i.test(section.text)
    ) {
      reachedRecipe = true;
    }

    if (reachedRecipe) {
      recipeSections.push(section);
    } else {
      introSections.push(section);
    }
  });

  return (
    <article className="blog-post-body">
      <div className="blog-post-body-inner">
        {introSections.length > 0 && (
          <div className="blog-post-intro">
            {introSections.map((section, index) => renderSection(section, index))}
          </div>
        )}

        {recipeSections.length > 0 && (
          <div className="blog-post-recipe">
            {recipeSections.map((section, index) => renderSection(section, index))}
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPostBody;
