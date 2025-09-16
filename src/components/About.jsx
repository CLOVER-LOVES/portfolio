import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import ScrollReveal from './ScrollReveal';
import ParallaxBackground from './ParallaxBackground';
import AdvancedParallax from './AdvancedParallax';
import ParallaxReveal from './ParallaxReveal';
import ParallaxLayers from './ParallaxLayers';
// Import SVG backgrounds
import neuralNetworkSvg from '../assets/patterns/neural-network.svg';
import dataGridSvg from '../assets/patterns/data-grid.svg';
import codePatternSvg from '../assets/patterns/code-pattern.svg';

const About = () => {
  return (
    <section id="about" className="about about-bg parallax-container">
      {/* Multiple parallax layers for depth */}
      <ParallaxLayers
        layers={[
          {
            imageUrl: neuralNetworkSvg,
            speed: 0.025,
            position: 'bottom left',
            size: '50%',
            opacity: 0.06,
            zIndex: -1
          },
          {
            imageUrl: dataGridSvg,
            speed: 0.06,
            position: 'top right',
            size: '60%',
            opacity: 0.045,
            zIndex: -2
          },
          {
            imageUrl: codePatternSvg,
            speed: 0.08,
            position: 'center',
            size: '70%',
            opacity: 0.03,
            zIndex: -3
          }
        ]}
        className="about-parallax-layers"
      />
      <div className="container parallax-content">
        <ParallaxReveal direction="down" distance={30} duration={0.8}>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -10, letterSpacing: '-0.02em', scaleX: 0.96 }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '0.01em', scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
          >
            About Me
          </motion.h2>
        </ParallaxReveal>
        <div className="about-content">
          <div className="about-text">
            <AdvancedParallax speed={0.1} direction="up" fade={false}>
              <ParallaxReveal direction="up" distance={40} duration={0.8} delay={0.1}>
                <p>
                  Hello! I'm Anshumaan Rajpurohit, a passionate Machine Learning developer dedicated to creating intelligent solutions that solve real-world problems. With a blend of technical expertise and creative thinking, I transform complex data into actionable insights and innovative applications.
                </p>
              </ParallaxReveal>
            </AdvancedParallax>

            <AdvancedParallax speed={0.15} direction="up" fade={false}>
              <ParallaxReveal direction="up" distance={40} duration={0.8} delay={0.3}>
                <p>
                  My expertise encompasses cutting-edge machine learning algorithms, deep neural networks, and advanced data analysis techniques. I specialize in developing sophisticated applications in computer vision, natural language processing, and predictive analytics. What sets me apart is my ability to bridge the gap between complex AI technologies and practical, user-friendly implementations that deliver tangible results.
                </p>
              </ParallaxReveal>
            </AdvancedParallax>

            <AdvancedParallax speed={0.2} direction="up" fade={false}>
              <ParallaxReveal direction="up" distance={40} duration={0.8} delay={0.5}>
                <p>
                  I'm deeply committed to continuous learning and staying at the cutting edge of AI advancements. I approach each project with a focus on ethical AI development, ensuring solutions that are not only powerful but also responsible and transparent. I thrive in collaborative environments where I can combine my technical expertise with clear communication to deliver exceptional results. I'm particularly passionate about projects that challenge conventional thinking and push the boundaries of what's possible with machine learning.
                </p>
              </ParallaxReveal>
            </AdvancedParallax>
          </div>

          <div className="about-details">
            <AdvancedParallax speed={0.12} direction="left" fade={false}>
              <ParallaxReveal direction="left" distance={40} duration={0.8} delay={0.2}>
                <div className="detail-item">
                  <h3>Education</h3>
                  <p>Advanced Diploma in Artificial Intelligence and Machine Learning</p>
                  <p>Specialized Certification in Deep Learning Architectures</p>
                  <p>Professional Training in NLP and Computer Vision</p>
                </div>
              </ParallaxReveal>
            </AdvancedParallax>

            <AdvancedParallax speed={0.18} direction="left" fade={false}>
              <ParallaxReveal direction="left" distance={40} duration={0.8} delay={0.4}>
                <div className="detail-item">
                  <h3>Core Competencies</h3>
                  <p>Advanced Machine Learning Algorithms</p>
                  <p>Deep Neural Network Architectures</p>
                  <p>Computer Vision & Image Processing</p>
                  <p>Natural Language Understanding</p>
                  <p>Predictive Analytics & Forecasting</p>
                  <p>Data Visualization & Interpretation</p>
                </div>
              </ParallaxReveal>
            </AdvancedParallax>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
