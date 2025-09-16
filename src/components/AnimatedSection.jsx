import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

const AnimatedSection = ({ children, className, delay = 0, direction = 'up' }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Define animation variants based on direction
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { y: 50, opacity: 0, filter: 'blur(8px)' },
          visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } }
        };
      case 'down':
        return {
          hidden: { y: -50, opacity: 0, filter: 'blur(8px)' },
          visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } }
        };
      case 'left':
        return {
          hidden: { x: -50, opacity: 0, filter: 'blur(8px)' },
          visible: { x: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } }
        };
      case 'right':
        return {
          hidden: { x: 50, opacity: 0, filter: 'blur(8px)' },
          visible: { x: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } }
        };
      case 'scale':
        return {
          hidden: { scale: 0.92, opacity: 0, filter: 'blur(6px)' },
          visible: { scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } }
        };
      default:
        return {
          hidden: { opacity: 0, filter: 'blur(6px)' },
          visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      style={{ willChange: 'opacity, transform, filter' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
