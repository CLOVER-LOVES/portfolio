import React, { useEffect, useRef, useState } from 'react';

/**
 * AdvancedParallax Component
 * 
 * Creates a more immersive parallax scrolling effect with multiple transformation options
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display with parallax effect
 * @param {number} props.speed - Speed of the parallax effect (0.1 to 1 recommended, default: 0.3)
 * @param {string} props.direction - Direction of movement ('up', 'down', 'left', 'right', default: 'up')
 * @param {boolean} props.scale - Whether to apply scale effect (default: false)
 * @param {number} props.scaleAmount - Amount to scale (0.1 to 0.5 recommended, default: 0.1)
 * @param {boolean} props.fade - Whether to apply opacity effect (default: false)
 * @param {number} props.fadeAmount - Amount to fade (0.1 to 1 recommended, default: 0.3)
 * @param {string} props.className - Additional CSS classes
 */
const AdvancedParallax = ({ 
  children,
  speed = 0.3, 
  direction = 'up',
  scale = false,
  scaleAmount = 0.1,
  fade = false,
  fadeAmount = 0.3,
  className = ''
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elementPosition, setElementPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);
  
  // Calculate the transform values based on scroll position
  const calculateTransform = () => {
    if (!isInView) return {};
    
    // Calculate how far the element is through the viewport (0 to 1)
    const scrollProgress = (scrollPosition - elementPosition + windowHeight) / (elementHeight + windowHeight);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    
    // Calculate movement based on direction
    let translateX = 0;
    let translateY = 0;
    
    const moveAmount = 100 * speed * (clampedProgress - 0.5);
    
    switch (direction) {
      case 'up':
        translateY = moveAmount;
        break;
      case 'down':
        translateY = -moveAmount;
        break;
      case 'left':
        translateX = moveAmount;
        break;
      case 'right':
        translateX = -moveAmount;
        break;
      default:
        translateY = moveAmount;
    }
    
    // Calculate scale if enabled
    const scaleValue = scale 
      ? 1 + scaleAmount * (clampedProgress - 0.5) 
      : 1;
    
    // Calculate opacity if fade is enabled
    const opacityValue = fade 
      ? 1 - fadeAmount * Math.abs(clampedProgress - 0.5) * 2
      : 1;
    
    return {
      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleValue})`,
      opacity: opacityValue,
      transition: 'transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1)'
    };
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    
    const handleResize = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setElementPosition(rect.top + window.pageYOffset);
        setElementHeight(rect.height);
        setWindowHeight(window.innerHeight);
      }
    };
    
    const checkIfInView = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const isVisible = 
          rect.top < window.innerHeight && 
          rect.bottom > 0;
        
        setIsInView(isVisible);
      }
    };
    
    // Initial calculations
    handleResize();
    handleScroll();
    checkIfInView();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', checkIfInView, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', checkIfInView);
    };
  }, []);
  
  return (
    <div 
      ref={elementRef}
      className={`advanced-parallax ${className}`}
      style={calculateTransform()}
    >
      {children}
    </div>
  );
};

export default AdvancedParallax;
