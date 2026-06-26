import React from 'react';
import LottieAnimation from './LottieAnimation';

const VerticalLottieCarousel = ({ sources }) => {
  const loopItems = [...sources, ...sources];

  return (
    <div className="vertical-lottie-carousel" aria-hidden="true">
      <div className="vertical-lottie-carousel-track">
        {loopItems.map((src, index) => {
          const animNumber = (index % sources.length) + 11;

          return (
            <div
              key={`${src}-${index}`}
              className="vertical-lottie-carousel-item"
              data-anim={animNumber}
            >
              <LottieAnimation src={src} className="vertical-lottie-animation" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalLottieCarousel;
