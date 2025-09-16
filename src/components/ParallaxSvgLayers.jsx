import React, { useEffect, useRef, useState } from 'react';

/**
 * ParallaxSvgLayers Component
 * 
 * Creates a parallax effect with SVG layers moving at different speeds
 * 
 * @param {Object} props
 * @param {string} props.svgUrl - URL of the SVG with layers
 * @param {Array} props.speeds - Array of speed values for each layer
 * @param {string} props.className - Additional CSS classes
 */
const ParallaxSvgLayers = ({
  svgUrl,
  speeds = [0.05, 0.1, 0.2],
  className = ''
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [svgContent, setSvgContent] = useState(null);
  const [containerTop, setContainerTop] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  // Fetch SVG content
  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(svgUrl);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };
    
    fetchSvg();
  }, [svgUrl]);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!reduceMotion) setScrollPosition(window.pageYOffset);
    };
    
    const handleResize = () => {
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

  // Respect OS-level reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduceMotion(!!m.matches);
    }
  }, []);
  
  // Apply parallax effect to SVG layers
  useEffect(() => {
    if (!svgContent || !isInView) return;
    if (reduceMotion) return;
    
    const svgContainer = containerRef.current.querySelector('.svg-container');
    if (!svgContainer) return;
    
    const layers = svgContainer.querySelectorAll('.parallax-layer-1, .parallax-layer-2, .parallax-layer-3');
    
    if (layers.length > 0) {
      const relativePosition = scrollPosition - containerTop;
      
      layers.forEach((layer, index) => {
        const speed = speeds[index % speeds.length];
        const parallaxOffset = relativePosition * speed;
        
        layer.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
      });
    }
  }, [scrollPosition, svgContent, isInView, containerTop, speeds, reduceMotion]);
  
  return (
    <div 
      ref={containerRef}
      className={`parallax-svg-container ${className}`}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1
      }}
    >
      {svgContent && (
        <div 
          className="svg-container"
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      )}
    </div>
  );
};

export default ParallaxSvgLayers;
