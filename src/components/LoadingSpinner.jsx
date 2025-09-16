import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 40, color = 'var(--primary)', thickness = 3 }) => {
  return (
    <div className="loading-spinner-container" style={{ width: size, height: size }}>
      <motion.div
        className="loading-spinner"
        style={{
          width: size,
          height: size,
          borderWidth: thickness,
          borderTopColor: color,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
