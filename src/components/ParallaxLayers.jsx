import React, { useEffect, useRef, useState } from 'react';

/**
 * ParallaxLayers Component
 * 
 * Creates multiple parallax layers with different speeds for a 3D effect
 * 
 * @param {Object} props
 * @param {Array} props.layers - Array of layer objects with imageUrl, speed, and zIndex
 * @param {string} props.className - Additional CSS classes
 */
const ParallaxLayers = ({
  layers = [],
  className = ''
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const [containerTop, setContainerTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  useEffect(() => {
    // Respect OS-level reduced motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduceMotion(!!m.matches);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!reduceMotion) setScrollPosition(window.pageYOffset);
    };
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerTop(rect.top + window.pageYOffset);
      }
    };
    
    const checkIfInView = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isVisible = 
          rect.top < window.innerHeight + 200 && 
          rect.bottom > -200;
        
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
  }, [reduceMotion]);
  
  // Calculate parallax offset for each layer
  const getLayerStyle = (layer) => {
    if (!isInView) return {};
    if (reduceMotion) {
      return {
        transform: 'none',
        zIndex: layer.zIndex ?? -1,
        transition: 'none'
      };
    }
    
    const { speed = 0.2, zIndex = -1 } = layer;
    
    // Calculate relative position (how far the container is from the top of the viewport)
    const relativePosition = scrollPosition - containerTop;
    const parallaxOffset = relativePosition * speed;
    
    return {
      transform: `translate3d(0, ${parallaxOffset}px, 0)`,
      zIndex,
      transition: 'transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1)'
    };
  };
  
  return (
    <div 
      ref={containerRef}
      className={`parallax-layers-container ${className}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {layers.map((layer, index) => (
        <div
          key={index}
          className="parallax-layer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${layer.imageUrl})`,
            backgroundSize: layer.size || 'cover',
            backgroundPosition: layer.position || 'center',
            backgroundRepeat: 'no-repeat',
            opacity: layer.opacity || 0.2,
            ...getLayerStyle(layer)
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxLayers;
