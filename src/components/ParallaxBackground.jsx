import React, { useEffect, useRef, useState } from 'react';

/**
 * ParallaxBackground Component
 * 
 * Creates a parallax scrolling effect for background elements
 * 
 * @param {Object} props
 * @param {string} props.imageUrl - URL of the background image
 * @param {number} props.speed - Speed of the parallax effect (0.1 to 0.8 recommended, default: 0.3)
 * @param {string} props.position - Background position (default: 'center')
 * @param {string} props.size - Background size (default: 'cover')
 * @param {number} props.opacity - Opacity of the background (0-1, default: 0.2)
 * @param {string} props.className - Additional CSS classes
 */
const ParallaxBackground = ({ 
  imageUrl, 
  speed = 0.3, 
  position = 'center',
  size = 'cover',
  opacity = 0.2,
  className = ''
}) => {
  const [offset, setOffset] = useState(0);
  const parallaxRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  useEffect(() => {
    // Respect OS-level reduced motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduceMotion(!!m.matches);
    }
  }, []);

  useEffect(() => {
    if (!parallaxRef.current) return;
    if (reduceMotion) {
      // Disable parallax when reduced motion is preferred
      setOffset(0);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const elementTop = parallaxRef.current.offsetTop;
      const elementHeight = parallaxRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Only update when element is in view
      if (
        scrollTop + viewportHeight > elementTop && 
        scrollTop < elementTop + elementHeight
      ) {
        // Calculate how far the element is from the top of the viewport
        const distance = scrollTop - elementTop + viewportHeight;
        // Apply parallax effect based on distance and speed
        const parallaxOffset = distance * speed;
        setOffset(parallaxOffset);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, reduceMotion]);
  
  return (
    <div 
      ref={parallaxRef}
      className={`parallax-background ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: position,
        backgroundSize: size,
        backgroundRepeat: 'no-repeat',
        opacity: opacity,
        transform: reduceMotion ? 'none' : `translateY(${offset}px)`,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParallaxBackground;
