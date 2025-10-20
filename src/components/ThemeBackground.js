import React, { useState, useEffect, useRef } from 'react';
import './ThemeBackground.css';

const ThemeBackground = ({ background, video, isTransitioning, transitionDirection }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState(null);
  const videoRef = useRef(null);

  // Reset state when video prop changes (theme switch)
  useEffect(() => {
    console.log('ThemeBackground: video prop changed:', video);
    // If there's no video, mark as loaded immediately
    if (!video) {
      setIsVideoLoaded(true);
      setIsVideoPlaying(false);
      setShowLoading(false);
      setLoadingStartTime(null);
    } else {
      setIsVideoLoaded(false);
      setIsVideoPlaying(false);
      setShowLoading(false);
      setLoadingStartTime(Date.now());
    }
  }, [video]);

  // Show loading after 1 second (only for video themes)
  useEffect(() => {
    if (video && loadingStartTime && !isVideoLoaded) {
      const timer = setTimeout(() => {
        if (!isVideoLoaded) {
          setShowLoading(true);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [video, loadingStartTime, isVideoLoaded]);

  useEffect(() => {
    if (videoRef.current && video) {
      const videoElement = videoRef.current;
      
      const handleLoadedData = () => {
        console.log('Video loaded successfully:', video);
        setIsVideoLoaded(true);
        setIsVideoPlaying(true);
        setShowLoading(false);
      };
      
      const handleCanPlay = () => {
        console.log('Video can play, attempting to start playback:', video);
        videoElement.play().catch((error) => {
          console.error('Failed to play video:', error);
          setIsVideoPlaying(false);
        });
      };

      const handleError = (error) => {
        console.error('Video error:', error);
        setIsVideoPlaying(false);
        setShowLoading(false);
      };

      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      
      return () => {
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, [video]);

  return (
    <div className={`theme-background ${isTransitioning ? 'transitioning' : ''} ${isTransitioning ? `transition-${transitionDirection}` : ''}`}>
      {video ? (
        <video 
          key={video} // Force re-render when video changes
          ref={videoRef}
          className={`theme-video ${isVideoLoaded ? 'loaded' : ''} ${isTransitioning ? 'transitioning' : ''}`}
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : background ? (
        <div 
          className="theme-background-image loaded"
          style={{ backgroundImage: `url(${background})` }}
        />
      ) : null}
      
      {/* Apple-style loading overlay (only show for video themes) */}
      {video && showLoading && !isVideoLoaded && (
        <div className="apple-loading-overlay">
          <div className="apple-loading-content">
            <div className="apple-spinner">
              <div className="apple-spinner-ring"></div>
              <div className="apple-spinner-ring"></div>
              <div className="apple-spinner-ring"></div>
            </div>
            <div className="apple-loading-text">
              <span className="apple-loading-title">Loading Theme</span>
              <span className="apple-loading-subtitle">Please wait...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeBackground; 