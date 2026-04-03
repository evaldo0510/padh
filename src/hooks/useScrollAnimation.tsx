import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsVisible(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) {
      setIsVisible(true);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const revealIfNearViewport = () => {
      const rect = currentRef.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const revealOffset = Math.min(120, viewportHeight * 0.12);
      const shouldReveal = rect.top <= viewportHeight - revealOffset && rect.bottom >= 0;

      if (shouldReveal) {
        setIsVisible(true);
      }

      return shouldReveal;
    };

    if (revealIfNearViewport()) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      const handleFallbackReveal = () => {
        if (revealIfNearViewport()) {
          window.removeEventListener('scroll', handleFallbackReveal);
          window.removeEventListener('resize', handleFallbackReveal);
        }
      };

      window.addEventListener('scroll', handleFallbackReveal, { passive: true });
      window.addEventListener('resize', handleFallbackReveal);

      return () => {
        window.removeEventListener('scroll', handleFallbackReveal);
        window.removeEventListener('resize', handleFallbackReveal);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || revealIfNearViewport()) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(currentRef);

    const handleResize = () => {
      if (revealIfNearViewport()) {
        observer.disconnect();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
};
