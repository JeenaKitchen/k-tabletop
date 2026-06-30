import React from 'react';
import LottieAnimation from './landing/LottieAnimation';
import './LoadingModal.css';

const LOADING_TEXT = 'Loading...';

const LoadingModal = () => (
  <div className="loading-modal" role="status" aria-label="Loading">
    <div className="loading-modal-content">
      <LottieAnimation
        src="/animations/lottie/loading-pot.json"
        className="loading-modal-lottie"
      />
      <div className="loading-modal-text" aria-hidden="true">
        {LOADING_TEXT.split('').map((char, i) => (
          <span
            key={i}
            className="loading-modal-char"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default LoadingModal;
