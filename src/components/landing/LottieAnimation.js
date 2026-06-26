import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const LottieAnimation = ({ src, className = '', preserveAspectRatio = 'xMidYMid meet' }) => {
  const [animationData, setAnimationData] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Animation not found');
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setAnimationData(data);
          setHasError(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAnimationData(null);
          setHasError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  if (hasError || !animationData) {
    return <div className={`animation-placeholder ${className}`.trim()} aria-hidden="true" />;
  }

  return (
    <div className={`lottie-animation-wrapper ${className}`.trim()}>
      <Lottie
        animationData={animationData}
        loop
        autoplay
        rendererSettings={{ preserveAspectRatio }}
      />
    </div>
  );
};

export default LottieAnimation;
