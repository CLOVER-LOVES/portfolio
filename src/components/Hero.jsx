import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import AnimatedText from './AnimatedText';
import DataParticles from './DataParticles';
import ParallaxBackground from './ParallaxBackground';
import TypedText from './TypedText';
// Import your profile image after adding it to the assets/images folder
import profileImage from '../assets/images/profile.jpg';
// Import SVG backgrounds
import neuralNetworkSvg from '../assets/patterns/neural-network.svg';
import dataPulseSvg from '../assets/patterns/data-pulse.svg';

const Hero = () => {
  return (
    <section id="home" className="hero hero-bg parallax-container">
      {/* Parallax background elements */}
      <ParallaxBackground
        imageUrl={neuralNetworkSvg}
        speed={0.04} // Much subtler movement
        position="center right"
        size="contain"
        opacity={0.08}
        className="parallax-neural-network"
      />
      <ParallaxBackground
        imageUrl={dataPulseSvg}
        speed={0.09} // Subtle middle layer
        position="center"
        size="cover"
        opacity={0.035}
        className="parallax-data-pulse"
      />
      <DataParticles
        count={24}
        speed={0.22}
        color="#6D5FFD"
        secondaryColor="#41EAD4"
        opacity={0.1}
        connectDistance={140}
        maxLineWidth={1.4}
        glow={false}
        pulse={false}
        spawnRate={0.6}
        propagateProb={0.15}
        pulseSpeed={120}
      />
      <div className="container hero-content parallax-content">
        <AnimatedSection className="hero-text" direction="left">
          <h1>
            Hello, I'm{' '}
            <span className="hero-name">
              <motion.span
                initial={{ letterSpacing: '-0.02em', scaleX: 0.96 }}
                animate={{ letterSpacing: '0.015em', scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'inline-block' }}
              >
                <AnimatedText
                  text="Anshumaan"
                  className="highlight"
                  delay={0}
                />
              </motion.span>
              <br />
              <motion.span
                initial={{ letterSpacing: '-0.02em', scaleX: 0.96 }}
                animate={{ letterSpacing: '0.015em', scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'inline-block' }}
              >
                <AnimatedText
                  text="Rajpurohit"
                  className="highlight"
                  delay={0}
                />
              </motion.span>
            </span>
          </h1>
          <motion.div
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <span className="hero-role-prefix">I'm a </span>
            <TypedText
              strings={[
                'Machine Learning Developer',
                'Creative Coder + Visual Designer',
                'Deep Learning Specialist',
                'Computer Vision Engineer',
                'UI/UX Prototyper',
                'NLP Enthusiast'
              ]}
              className="hero-role-typed"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="hero-description"
          >
            Specializing in creating intelligent solutions that solve real-world problems. Turning complex data into meaningful insights and building innovative applications.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <motion.a
              href="#contact"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
            <motion.a
              href="#projects"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </motion.div>
        </AnimatedSection>
        <AnimatedSection className="hero-image" direction="right" delay={0.3}>
          <div className="profile-frame">
            <motion.div
              className="profile-image-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(156, 39, 176, 0.5)' }}
            >
              <img
                src={profileImage}
                alt="Anshumaan Rajpurohit"
                className="profile-image"
                decoding="async"
                loading="eager"
                fetchPriority="high"
                draggable={false}
              />
              <div className="profile-glow"></div>
            </motion.div>
            {/* Creative aurora ring around the image */}
            <div className="aurora-ring" aria-hidden="true"></div>
            {/* Orbiting dots for subtle motion */}
            <div className="orbit" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="profile-shape-1"></div>
            <div className="profile-shape-2"></div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
