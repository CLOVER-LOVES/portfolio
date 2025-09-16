import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const highlightVariants = {
    hidden: { width: 0, x: '-50%' },
    visible: {
      width: '100%',
      x: '0%',
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smoother animation
      }
    }
  };

  // Split the name into individual letters for animation
  const firstName = "Anshumaan";
  const lastName = "Rajpurohit";

  // Refs for spark positioning
  const containerRef = useRef(null);
  const firstInitialRef = useRef(null);
  const lastInitialRef = useRef(null);
  const [burstKey, setBurstKey] = useState(0);

  // Helper to compute center of an element relative to the container
  const useCenter = (elRef) => {
    const [center, setCenter] = useState({ x: 0, y: 0 });
    useEffect(() => {
      const update = () => {
        const el = elRef.current;
        const container = containerRef.current;
        if (!el || !container) return;
        const er = el.getBoundingClientRect();
        const cr = container.getBoundingClientRect();
        setCenter({ x: er.left - cr.left + er.width / 2, y: er.top - cr.top + er.height / 2 });
      };
      update();
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }, []);
    return center;
  };

  const firstCenter = useCenter(firstInitialRef);
  const lastCenter = useCenter(lastInitialRef);

  const SparkBurst = ({ center, colors, count = 16, radius = 40 }) => {
    const seeds = useMemo(() => {
      return Array.from({ length: count }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = radius * (0.6 + Math.random() * 0.8);
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        const size = 3 + Math.random() * 4;
        const d = 0.6 + Math.random() * 0.6; // duration
        const delay = Math.random() * 0.15;
        const color = colors[i % colors.length];
        const rotate = Math.random() * 180;
        return { x, y, size, d, delay, color, rotate, key: `${burstKey}-${i}-${Math.random().toString(36).slice(2)}` };
      });
      // re-generate when burstKey changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [burstKey, count, radius, colors]);

    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {seeds.map((s) => (
          <motion.span
            key={s.key}
            initial={{ x: center.x, y: center.y, scale: 0, opacity: 0.9, rotate: 0 }}
            animate={{ x: center.x + s.x, y: center.y + s.y, scale: 1, opacity: 0 }}
            transition={{ duration: s.d, delay: s.delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              width: s.size,
              height: s.size,
              borderRadius: 999,
              background: s.color,
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.4))',
              transformOrigin: 'center',
              rotate: s.rotate,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="wordmark-logo"
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setBurstKey((k) => k + 1)}
    >
      <div ref={containerRef} className="wordmark-container" style={{ position: 'relative' }}>
        <div className="wordmark-name">
          <div className="wordmark-firstname">
            {firstName.split('').map((letter, index) => (
              <motion.span
                key={`first-${index}`}
                variants={letterVariants}
                className={index === 0 ? "wordmark-first-letter" : ""}
                ref={index === 0 ? firstInitialRef : null}
                style={index === 0 ? {} : { fontFamily: 'var(--font-logo-primary)' }}
                whileHover={index === 0 ? { textShadow: '0 0 12px rgba(255,255,255,0.35)', scale: 1.02 } : {}}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <div className="wordmark-lastname">
            {lastName.split('').map((letter, index) => (
              <motion.span
                key={`last-${index}`}
                variants={letterVariants}
                className={index === 0 ? "wordmark-first-letter" : ""}
                ref={index === 0 ? lastInitialRef : null}
                whileHover={index === 0 ? { textShadow: '0 0 12px rgba(255,255,255,0.35)', scale: 1.02 } : {}}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          {/* Spark layers around initials */}
          <SparkBurst center={firstCenter} colors={["#6D5FFD", "#41EAD4", "#D4C281", "#8BC34A"]} count={14} radius={44} />
          <SparkBurst center={lastCenter} colors={["#6D5FFD", "#41EAD4", "#D4C281", "#8BC34A"]} count={10} radius={36} />
        </div>

      </div>
    </motion.div>
  );
};

export default Logo;
