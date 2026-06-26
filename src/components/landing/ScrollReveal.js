import React, { useEffect, useRef, useState } from 'react';
import './ScrollReveal.css';

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const ScrollReveal = ({
  as: Component = 'div',
  className = '',
  delay = 0,
  children,
  style,
  ...rest
}) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setIsActive(true);
      setIsVisible(true);
      return undefined;
    }

    setIsActive(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const classes = [
    'scroll-reveal',
    isActive ? 'scroll-reveal--active' : '',
    isVisible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={ref}
      className={classes}
      style={{
        ...style,
        '--scroll-reveal-delay': `${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
