import React, { useEffect, useRef, useState } from 'react';

const AudioManager = ({ currentTheme, isMuted, volume, onAudioReady }) => {
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudioSrc, setCurrentAudioSrc] = useState('');

  useEffect(() => {
    if (!currentTheme?.sound) return;

    const audio = audioRef.current;
    if (!audio) return;

    // If it's a new audio source, load it
    if (currentAudioSrc !== currentTheme.sound) {
      setIsLoading(true);
      audio.src = currentTheme.sound;
      audio.load();
      setCurrentAudioSrc(currentTheme.sound);
    }

    // Set volume
    audio.volume = isMuted ? 0 : volume;

    // Play audio if not muted
    if (!isMuted && currentTheme.sound) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoading(false);
            onAudioReady?.();
          })
          .catch((error) => {
            console.log('Audio autoplay prevented:', error);
            setIsLoading(false);
          });
      }
    } else if (isMuted) {
      audio.pause();
    }
  }, [currentTheme, isMuted, volume, currentAudioSrc, onAudioReady]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle mute changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.pause();
    } else if (currentTheme?.sound) {
      audioRef.current.play().catch((error) => {
        console.log('Audio play prevented:', error);
      });
    }
  }, [isMuted, currentTheme]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};

export default AudioManager; 