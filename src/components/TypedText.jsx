import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = ({ strings, typeSpeed = 50, backSpeed = 30, loop = true, className = '' }) => {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings,
      typeSpeed,
      backSpeed,
      loop,
      backDelay: 1500,
      smartBackspace: true,
    };

    // Initialize Typed.js
    typed.current = new Typed(el.current, options);

    // Cleanup on unmount
    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={el} className={className}></span>;
};

export default TypedText;
