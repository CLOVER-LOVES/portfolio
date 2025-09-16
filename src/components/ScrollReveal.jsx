import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  threshold = 0.1,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 50,
  once = true,
  className = ''
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(currentRef);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  // Define animation variants based on direction
  const getVariants = () => {
    const variants = {
      hidden: {},
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          // Slightly longer for smoother feel
          duration: Math.max(duration, 0.6),
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    };

    switch (direction) {
      case 'up':
        variants.hidden = { opacity: 0, y: distance, filter: 'blur(8px)' };
        break;
      case 'down':
        variants.hidden = { opacity: 0, y: -distance, filter: 'blur(8px)' };
        break;
      case 'left':
        variants.hidden = { opacity: 0, x: distance, filter: 'blur(8px)' };
        break;
      case 'right':
        variants.hidden = { opacity: 0, x: -distance, filter: 'blur(8px)' };
        break;
      case 'scale':
        variants.hidden = { opacity: 0, scale: 0.9, filter: 'blur(6px)' };
        break;
      default:
        variants.hidden = { opacity: 0, y: distance, filter: 'blur(8px)' };
    }

    return variants;
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={getVariants()}
        style={{ willChange: 'opacity, transform, filter' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
