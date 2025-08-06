import React, { useState, useEffect, useRef } from 'react';
import './ThemeBackground.css';

const ThemeBackground = ({ background, video }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  // Reset state when video prop changes (theme switch)
  useEffect(() => {
    console.log('ThemeBackground: video prop changed:', video);
    setIsVideoLoaded(false);
    setIsVideoPlaying(false);
  }, [video]);

  useEffect(() => {
    if (videoRef.current && video) {
      const videoElement = videoRef.current;
      
      const handleLoadedData = () => {
        console.log('Video loaded successfully:', video);
        setIsVideoLoaded(true);
        setIsVideoPlaying(true);
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
    <div className="theme-background">
      {video && (
        <video 
          key={video} // Force re-render when video changes
          ref={videoRef}
          className={`theme-video ${isVideoLoaded ? 'loaded' : ''}`}
          autoPlay 
          muted 
          loop 
          playsInline
          poster={background}
        >
          <source src={video} type="video/mp4" />
          <img src={background} alt="theme background" />
        </video>
      )}
      
      {(!video || !isVideoPlaying) && (
        <div 
          className="theme-background-image" 
          style={{ backgroundImage: `url(${background})` }} 
        />
      )}
    </div>
  );
};

export default ThemeBackground; 