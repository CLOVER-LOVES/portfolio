import React, { useEffect, useRef, useState } from 'react';

/**
 * ParallaxReveal Component
 * 
 * Creates a reveal effect when scrolling, similar to Rally Interactive's website
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to reveal
 * @param {string} props.direction - Direction to reveal from ('up', 'down', 'left', 'right', default: 'up')
 * @param {number} props.distance - Distance to travel (default: 100)
 * @param {number} props.duration - Animation duration in seconds (default: 1)
 * @param {number} props.delay - Delay before animation starts in seconds (default: 0)
 * @param {string} props.easing - CSS easing function (default: 'cubic-bezier(0.25, 0.1, 0.25, 1)')
 * @param {string} props.className - Additional CSS classes
 */
const ParallaxReveal = ({
  children,
  direction = 'up',
  distance = 100,
  duration = 1,
  delay = 0,
  easing = 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px'
      }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);
  
  // Calculate initial and animated styles
  const getStyles = () => {
    // Initial transform based on direction
    let initialTransform = '';
    
    switch (direction) {
      case 'up':
        initialTransform = `translateY(${distance}px)`;
        break;
      case 'down':
        initialTransform = `translateY(-${distance}px)`;
        break;
      case 'left':
        initialTransform = `translateX(${distance}px)`;
        break;
      case 'right':
        initialTransform = `translateX(-${distance}px)`;
        break;
      default:
        initialTransform = `translateY(${distance}px)`;
    }
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate3d(0, 0, 0)' : initialTransform,
      transition: `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`,
      willChange: 'opacity, transform'
    };
  };
  
  return (
    <div
      ref={elementRef}
      className={`parallax-reveal ${className}`}
      style={getStyles()}
    >
      {children}
    </div>
  );
};

export default ParallaxReveal;
