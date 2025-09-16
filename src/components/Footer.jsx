import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope, FaArrowUp, FaInstagram, FaYoutube } from 'react-icons/fa';
import waveDivider from '../assets/wave-divider.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300 } }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Wave Divider */}
      <div className="wave-divider">
        <img src={waveDivider} alt="Wave divider" />
      </div>

      <motion.footer
        className="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="container">
          {/* Back to top button */}
          <motion.button
            className="back-to-top"
            onClick={scrollToTop}
            whileHover={{ y: -5, boxShadow: '0 5px 15px rgba(119, 166, 100, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <FaArrowUp />
          </motion.button>

          {/* Main footer content */}
          <div className="footer-grid">
            {/* Column 1: Logo and tagline */}
            <motion.div className="footer-brand" variants={itemVariants}>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Anshumaan Rajpurohit
              </motion.h3>
              <motion.p
                className="footer-tagline"
                variants={itemVariants}
              >
                Building intelligent solutions with AI & Machine Learning
              </motion.p>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div className="footer-links" variants={itemVariants}>
              <h4>Quick Links</h4>
              <ul>
                <motion.li variants={itemVariants}>
                  <motion.a
                    href="#home"
                    whileHover={{ color: '#77A664', x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Home
                  </motion.a>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <motion.a
                    href="#about"
                    whileHover={{ color: '#77A664', x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    About
                  </motion.a>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <motion.a
                    href="#skills"
                    whileHover={{ color: '#77A664', x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Skills
                  </motion.a>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <motion.a
                    href="#projects"
                    whileHover={{ color: '#77A664', x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Projects
                  </motion.a>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <motion.a
                    href="#contact"
                    whileHover={{ color: '#77A664', x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Contact
                  </motion.a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Column 3: Connect */}
            <motion.div className="footer-connect" variants={itemVariants}>
              <h4>Connect</h4>
              <div className="footer-social-icons">
                <motion.a
                  href="https://www.linkedin.com/in/anshumaan-rajpurohit-731455221/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon linkedin"
                  variants={iconVariants}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { type: 'spring', stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  title="Connect on LinkedIn"
                >
                  <FaLinkedin />
                  <span className="social-icon-tooltip">LinkedIn</span>
                </motion.a>
                <motion.a
                  href="https://github.com/CLOVER-LOVES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon github"
                  variants={iconVariants}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { type: 'spring', stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  title="View my GitHub projects"
                >
                  <FaGithub />
                  <span className="social-icon-tooltip">GitHub</span>
                </motion.a>
                <motion.a
                  href="mailto:anshumaanraj123@gmail.com"
                  className="social-icon email"
                  variants={iconVariants}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { type: 'spring', stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  title="Send me an email"
                >
                  <FaEnvelope />
                  <span className="social-icon-tooltip">Email</span>
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/your_instagram_username/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon instagram"
                  variants={iconVariants}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { type: 'spring', stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  title="Follow me on Instagram"
                >
                  <FaInstagram />
                  <span className="social-icon-tooltip">Instagram</span>
                </motion.a>
                <motion.a
                  href="https://www.youtube.com/@anshumaanrajpurohit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon youtube"
                  variants={iconVariants}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { type: 'spring', stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  title="Subscribe to my YouTube channel"
                >
                  <FaYoutube />
                  <span className="social-icon-tooltip">YouTube</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            className="footer-bottom"
            variants={itemVariants}
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{ textAlign: 'center', width: '100%' }}
            >
              &copy; {currentYear} Anshumaan Rajpurohit. All Rights Reserved.
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
