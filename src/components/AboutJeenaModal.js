import React, { useState } from 'react';
import Modal from 'react-modal';
import './AboutJeenaModal.css';

const AboutJeenaModal = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match animation duration
  };

  const handleSocialMediaClick = (platform) => {
    let url;
    switch (platform) {
      case 'instagram':
        url = 'https://www.instagram.com/jeenas.kitchen/reels/'; // Replace with your actual Instagram profile URL
        break;
      case 'youtube':
        url = 'https://www.youtube.com/@Jeena.s.kitchen'; // Replace with your actual YouTube channel URL
        break;
      default:
        return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleVideoClick = (videoUrl) => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramPostClick = (postUrl) => {
    window.open(postUrl, '_blank', 'noopener,noreferrer');
  };

  // YouTube URL parsing function (similar to RecipeModal.js)
  const getYouTubeThumbnailUrl = (url, quality = 'mqdefault') => {
    if (!url) return '';
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoId ? `https://img.youtube.com/vi/${videoId[1]}/${quality}.jpg` : '';
  };

  // Instagram URL parsing function
  const getInstagramThumbnailUrl = (url) => {
    if (!url) return '';
    // Extract post ID from Instagram URL (supports both posts and reels with query parameters)
    const postId = url.match(/instagram\.com\/(?:p|reel)\/([^\/\?#]+)/);
    console.log('Instagram URL:', url, 'Post ID:', postId ? postId[1] : 'Not found');
    if (postId) {
              // Manual mapping of post IDs to image URLs - replace with your actual image URLs
        const imageMap = {
          'C93-oOxx_yP': '/instagram/Potato Salada Sandwich.jpg',
          'C-5Pb10h-WQ': '/instagram/Samgak Gimbap.jpg',
          'DGxHU5uRHfd': '/instagram/Strawberry Chap-sal-tteok.jpg',
          'DIiF1FuRqQY': '/instagram/Tofu Inseolmi.jpg',
        };
      return imageMap[postId[1]] || null;
    }
    // If no post ID found, return null to use CSS background
    return null;
  };

  // YouTube video URLs - Edit these with your actual YouTube video URLs
  const youtubeVideoUrls = [
    'https://youtu.be/bJgz1qTa8Cg', // Replace with your YouTube video URL 1
    'https://youtu.be/naS9csQ4inA'  // Replace with your YouTube video URL 2
  ];

  // Instagram post URLs - Edit these with your actual Instagram post URLs
  const instagramPostUrls = [
    'https://www.instagram.com/p/C93-oOxx_yP/?utm_source=ig_web_copy_link&igsh=c2N4c3lscTBmbTE=', // Replace with your Instagram post URL 1
    'https://www.instagram.com/reel/C-5Pb10h-WQ/?utm_source=ig_web_copy_link&igsh=bnpwc201dXRoNjN6', // Replace with your Instagram post URL 2
    'https://www.instagram.com/reel/DGxHU5uRHfd/?utm_source=ig_web_copy_link&igsh=dnBhdzg4c2g2ZDY=', // Replace with your Instagram post URL 3
    'https://www.instagram.com/reel/DIiF1FuRqQY/?utm_source=ig_web_copy_link&igsh=MXZwYzJicGhubWo4bA=='  // Replace with your Instagram post URL 4
  ];

  // Generate thumbnail URLs from video URLs
  const youtubeThumbnails = youtubeVideoUrls.map(url => getYouTubeThumbnailUrl(url, 'mqdefault'));

  // Generate thumbnail URLs from Instagram post URLs
  const instagramThumbnails = instagramPostUrls.map(url => getInstagramThumbnailUrl(url));

  // Debug logging
  console.log('YouTube Thumbnails:', youtubeThumbnails);
  console.log('Instagram Thumbnails:', instagramThumbnails);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className={`about-jeena-modal ${isClosing ? 'closing' : ''}`}
      overlayClassName={`about-jeena-modal-overlay ${isClosing ? 'closing' : ''}`}
      contentLabel="Jeena's Kitchen Modal"
    >
      <div className="about-jeena-modal-content">
        {/* Header with Close Button */}
        <div className="about-jeena-modal-header">
          <button className="about-jeena-modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="about-jeena-modal-body">
          {/* Image Section */}
          <div className="about-jeena-image-container">
            <img 
              src="/about-image/jeena-about.jpg" 
              alt="Jeena's Kitchen" 
              className="about-jeena-image"
            />
          </div>
          <div className="about-jeena-info">
            {/* Title */}
            <h1 className="about-jeena-modal-title">
              Welcome to<br/>
              <span className="korean-title">Jeena's Kitchen 지나키친</span>
            </h1>
            
            {/* Description */}
            <div className="about-jeena-description">
              <p>
                <strong>Jeena living in Australia</strong><br/>
                Hi, I'm Jeena's Kitchen started as a way for me to reconnect with myself through Korean food, and to find healthier, more meaningful ways of communicating with the world around me.
              </p>
              
              <p>
                <strong>I express and rediscover myself through cooking</strong><br/>
                Jeena's Kitchen is a space where I explore the thoughts, stories, and flavours that have shaped me — especially between the different cultural identities I've come to hold. When I first came to study abroad, my goals were simple: finish school, find a job. Living in a new country with an unfamiliar system, I constantly tried to adapt — reading the room, meeting expectations, doing what was needed to "fit in." But in the process, I slowly began to lose sight of who I really was. That's when questions began to bubble up:
              </p>
              
              <p>
                "Who am I, really?"<br/>
                "What do I truly love?"<br/>
                "How do I want to be as I am in Australia?"
              </p>
              
              <p>
                <strong>My answer started to take shape in the kitchen</strong><br/>
                Through cooking Korean food, I found a way to reconnect with my roots. I also found new ways of telling stories — not just to others, but to myself. Jeena's Kitchen is like a small lab where I explore how to relate to myself, to others, and to society in a healthier way. It's a space where I build my own little universe — through food.
              </p>
              
              <p>
                <strong>You don't have to be a great cook to be here</strong><br/>
                Whether you're missing your mom's food, looking for comfort while eating alone, or simply moving through life at your own pace — I hope Jeena's Kitchen can be a small moment of rest for you. For now, I mostly focus on Korean dishes. But I hope to gently open the door to recipes from all kinds of cultures, and share the joy of inclusive cooking with many more people. Most of all, I hope this becomes a space where a warm, caring community can grow — one meal at a time.
              </p>
            </div>
            
            {/* Social Media Section */}
            <div className="social-media-section">
              
              <div className="social-media-containers">
                {/* YouTube Container */}
                <div className="social-media-container youtube-container">
                  <div className="platform-icon youtube-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div className="content-previews youtube-previews">
                    <div 
                      className="preview-item video-thumbnail"
                      onClick={() => handleVideoClick(youtubeVideoUrls[0])}
                      style={{ cursor: 'pointer' }}
                    >
                      <img 
                        src={youtubeThumbnails[0]}
                        alt="YouTube Video 1"
                        className="thumbnail-image"
                        onError={(e) => {
                          e.target.src = 'https://youtu.be/bJgz1qTa8Cg';
                        }}
                      />
                      <div className="play-button-overlay">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <div 
                      className="preview-item video-thumbnail"
                      onClick={() => handleVideoClick(youtubeVideoUrls[1])}
                      style={{ cursor: 'pointer' }}
                    >
                      <img 
                        src={youtubeThumbnails[1]}
                        alt="YouTube Video 2"
                        className="thumbnail-image"
                        onError={(e) => {
                          e.target.src = 'https://youtu.be/naS9csQ4inA';
                        }}
                      />
                      <div className="play-button-overlay">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="action-button youtube-action"
                    onClick={() => handleSocialMediaClick('youtube')}
                  >
                    Subscribe
                  </button>
                </div>

                {/* Instagram Container */}
                <div className="social-media-container instagram-container">
                  <div className="platform-icon instagram-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="content-previews instagram-previews">
                    <div 
                      className="preview-item image-thumbnail"
                      onClick={() => handleInstagramPostClick(instagramPostUrls[0])}
                      style={{ cursor: 'pointer' }}
                    >
                      {instagramThumbnails[0] ? (
                        <img 
                          src={instagramThumbnails[0]}
                          alt="Instagram Post 1"
                          className="thumbnail-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/180x320/FF6B6B/FFFFFF?text=Instagram+Post+1';
                          }}
                        />
                      ) : (
                        <div 
                          className="thumbnail-placeholder"
                          style={{
                            backgroundColor: '#FF6B6B',
                            color: 'white',
                            fontSize: '12px',
                            textAlign: 'center',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                          }}
                        >
                          <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginBottom: '8px' }}>
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <div>Add Image</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div 
                      className="preview-item image-thumbnail"
                      onClick={() => handleInstagramPostClick(instagramPostUrls[1])}
                      style={{ cursor: 'pointer' }}
                    >
                      {instagramThumbnails[1] ? (
                        <img 
                          src={instagramThumbnails[1]}
                          alt="Instagram Post 2"
                          className="thumbnail-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/180x320/FF6B6B/FFFFFF?text=Instagram+Post+2';
                          }}
                        />
                      ) : (
                        <div 
                          className="thumbnail-placeholder"
                          style={{
                            backgroundColor: '#FF6B6B',
                            color: 'white',
                            fontSize: '12px',
                            textAlign: 'center',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                          }}
                        >
                          <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginBottom: '8px' }}>
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <div>Add Image</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div 
                      className="preview-item image-thumbnail"
                      onClick={() => handleInstagramPostClick(instagramPostUrls[2])}
                      style={{ cursor: 'pointer' }}
                    >
                      {instagramThumbnails[2] ? (
                        <img 
                          src={instagramThumbnails[2]}
                          alt="Instagram Post 3"
                          className="thumbnail-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/180x320/FF6B6B/FFFFFF?text=Instagram+Post+3';
                          }}
                        />
                      ) : (
                        <div 
                          className="thumbnail-placeholder"
                          style={{
                            backgroundColor: '#FF6B6B',
                            color: 'white',
                            fontSize: '12px',
                            textAlign: 'center',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                          }}
                        >
                          <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginBottom: '8px' }}>
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <div>Add Image</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div 
                      className="preview-item image-thumbnail"
                      onClick={() => handleInstagramPostClick(instagramPostUrls[3])}
                      style={{ cursor: 'pointer' }}
                    >
                      {instagramThumbnails[3] ? (
                        <img 
                          src={instagramThumbnails[3]}
                          alt="Instagram Post 4"
                          className="thumbnail-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/180x320/FF6B6B/FFFFFF?text=Instagram+Post+4';
                          }}
                        />
                      ) : (
                        <div 
                          className="thumbnail-placeholder"
                          style={{
                            backgroundColor: '#FF6B6B',
                            color: 'white',
                            fontSize: '12px',
                            textAlign: 'center',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                          }}
                        >
                          <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginBottom: '8px' }}>
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            <div>Add Image</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button 
                    className="action-button instagram-action"
                    onClick={() => handleSocialMediaClick('instagram')}
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AboutJeenaModal;
