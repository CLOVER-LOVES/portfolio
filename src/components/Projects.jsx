import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { projects } from '../data/projects';
import ParallaxBackground from './ParallaxBackground';
import ParallaxSvgLayers from './ParallaxSvgLayers';
import ParallaxReveal from './ParallaxReveal';
import AdvancedParallax from './AdvancedParallax';
// Import SVG backgrounds
import dataPulseSvg from '../assets/patterns/data-pulse.svg';
import parallaxLayersSvg from '../assets/patterns/parallax-layers.svg';

const Projects = () => {

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  const tagVariants = {
    hidden: { scale: 0.9, opacity: 0, filter: 'blur(4px)' },
    visible: { scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  const tagContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="projects" className="projects projects-bg parallax-container">
      {/* Multi-layered parallax background */}
      <ParallaxBackground
        imageUrl={dataPulseSvg}
        speed={0.05}
        position="center"
        size="cover"
        opacity={0.03}
        className="parallax-data-pulse"
      />
      <ParallaxSvgLayers
        svgUrl={parallaxLayersSvg}
        speeds={[0.02, 0.06, 0.1]}
        className="projects-svg-layers"
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
            My AI & ML Projects
          </motion.h2>
        </ParallaxReveal>

        <AdvancedParallax speed={0.15} direction="up" fade={false}>
          <ParallaxReveal direction="up" distance={25} duration={0.8} delay={0.2}>
            <div className="section-subtitle">
              <span className="desktop-only">Check out some of my recent work</span>
              <span className="mobile-only">My recent work</span>
            </div>
          </ParallaxReveal>
        </AdvancedParallax>
        <motion.div
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
        >
          {projects.map((project, index) => (
            <ParallaxReveal
              key={index}
              direction="up"
              distance={30 + (index * 5)}
              duration={0.8}
              delay={0.1 + (index * 0.1)}
            >
              <motion.div
                className="project-card"
                variants={cardVariants}
                whileHover={{ y: -8, scaleX: 1.02, scaleY: 0.98, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
                whileTap={{ scaleX: 0.98, scaleY: 1.02 }}
                style={{ willChange: 'transform, opacity, filter' }}
              >
              <motion.div
                className="project-image"
                whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
              >
                {project.image ? (
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/projects/placeholder.svg';
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : (
                  <motion.div
                    className="project-placeholder"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span>{project.title}</span>
                  </motion.div>
                )}
              </motion.div>
              <div className="project-info">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {project.description}
                </motion.p>
                <motion.div
                  className="project-tech"
                  variants={tagContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="tech-tag"
                      variants={tagVariants}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div
                  className="project-links"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.a
                    href={`/project/${project.id}`}
                    className="btn btn-sm btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details →
                  </motion.a>
                  <motion.a
                    href={project.codeLink}
                    className="btn btn-sm btn-outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
            </ParallaxReveal>
          ))}
        </motion.div>

        <AdvancedParallax speed={0.2} direction="up" fade={false}>
          <ParallaxReveal direction="up" distance={40} duration={0.8} delay={0.5}>
            <div className="view-all-projects">
              <motion.a
                href="https://github.com/CLOVER-LOVES?tab=repositories"
                className="btn btn-lg"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects on GitHub →
              </motion.a>
            </div>
          </ParallaxReveal>
        </AdvancedParallax>
      </div>
    </section>
  );
};

export default Projects;
