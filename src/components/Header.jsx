import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import ScrollHeader from './ScrollHeader';
import profileImage from '../assets/images/profile.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ScrollHeader>
      <motion.div
        className="header-wrapper"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="container header-content wordmark-header header-main">
          <div className="header-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Logo />
            </motion.div>
          </div>
          <div className="header-center">
            <motion.div
              className="header-hero-profile"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <img src={profileImage} alt="Profile" />
            </motion.div>
          </div>
          <div className="header-right">
            <motion.button
              type="button"
              className="mobile-menu-icon"
              aria-controls="primary-navigation"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.button>
            <motion.nav
              id="primary-navigation"
              role="navigation"
              aria-label="Primary"
              className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
              variants={navVariants}
            >
              <motion.ul variants={navVariants}>
                <motion.li variants={itemVariants}>
                  <motion.a href="#home" onClick={() => setIsMenuOpen(false)} whileHover={{ color: '#64ffda', x: 5 }} transition={{ duration: 0.2 }}>Home</motion.a>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <motion.a href="#about" onClick={() => setIsMenuOpen(false)} whileHover={{ color: '#64ffda', x: 5 }} transition={{ duration: 0.2 }}>About</motion.a>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <motion.a href="#skills" onClick={() => setIsMenuOpen(false)} whileHover={{ color: '#64ffda', x: 5 }} transition={{ duration: 0.2 }}>Skills</motion.a>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <motion.a href="#projects" onClick={() => setIsMenuOpen(false)} whileHover={{ color: '#64ffda', x: 5 }} transition={{ duration: 0.2 }}>Projects</motion.a>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <motion.a href="#contact" onClick={() => setIsMenuOpen(false)} whileHover={{ color: '#64ffda', x: 5 }} transition={{ duration: 0.2 }}>Contact</motion.a>
                </motion.li>
              </motion.ul>
            </motion.nav>
          </div>
        </div>
      </motion.div>
    </ScrollHeader>
  );
};

export default Header;

