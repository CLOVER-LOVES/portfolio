import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaChartBar, FaCode } from 'react-icons/fa';

const Skills = () => {
  const skillCategories = [
    {
      title: "Machine Learning & AI",
      icon: <FaBrain />,
      color: "#77A664",
      skills: ["Neural Networks", "Deep Learning", "Supervised Learning", "Unsupervised Learning", "Model Deployment"]
    },
    {
      title: "Data Science",
      icon: <FaChartBar />,
      color: "#D4C281",
      skills: ["Data Analysis", "Data Visualization", "Statistical Modeling", "Feature Engineering", "Predictive Analytics"]
    },
    {
      title: "Programming & Tools",
      icon: <FaCode />,
      color: "#A3AB9A",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "Git/GitHub"]
    },
    {
      title: "Design & UI",
      icon: <FaCode />,
      color: "#9c6bff",
      skills: ["Figma", "Adobe Illustrator", "Framer", "Design Systems", "Prototyping", "Visual Storytelling"]
    }
  ];

  return (
    <section id="skills" className="skills skills-bg">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -10, letterSpacing: '-0.02em', scaleX: 0.96 }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: '0.01em', scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          My Skills
        </motion.h2>

        {/* Skill Categories */}
        <motion.div
          className="skills-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -8, scaleX: 1.02, scaleY: 0.98, boxShadow: `0 10px 25px rgba(${category.color.replace('#', '').match(/.{2}/g).map(hex => parseInt(hex, 16)).join(', ')}, 0.2)`, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
              whileTap={{ scaleX: 0.98, scaleY: 1.02 }}
            >
              <div className="skill-card-header" style={{ backgroundColor: `${category.color}20` }}>
                <div className="skill-icon" style={{ color: category.color }}>
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
              </div>

              <div className="skill-card-content">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (skillIndex * 0.1), duration: 0.4 }}
                    whileHover={{ scale: 1.05, backgroundColor: `${category.color}30` }}
                    style={{ borderColor: `${category.color}40` }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
