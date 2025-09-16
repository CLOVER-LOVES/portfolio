import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import LoadingSpinner from './LoadingSpinner';
import ScrollReveal from './ScrollReveal';
import ParallaxBackground from './ParallaxBackground';
// Import SVG backgrounds
import neuralNetworkSvg from '../assets/patterns/neural-network.svg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    privacyPolicy: false
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
    loading: false
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
    privacyPolicy: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox differently than text inputs
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData(prevData => ({
      ...prevData,
      [name]: inputValue
    }));

    // Clear error when user starts typing or checking
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form fields
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;

      case 'privacyPolicy':
        if (!value) {
          error = 'You must agree to the privacy policy';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Validate all form fields
  const validateForm = () => {
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
      privacyPolicy: validateField('privacyPolicy', formData.privacyPolicy)
    };

    setFormErrors(errors);

    // Return true if no errors (all fields are valid)
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();

    if (!isValid) {
      setFormStatus({
        submitted: true,
        error: true,
        message: 'Please correct the errors in the form',
        loading: false
      });
      return;
    }

    // Set loading state
    setFormStatus({
      ...formStatus,
      loading: true,
      submitted: false,
      message: ''
    });

    // Prepare form data for our backend API
    // Prefer configurable endpoint; fall back to env-based defaults
    const apiEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT
      || (import.meta.env.DEV ? '/api/contact' : '/api/contact.php');

    // Send data to our backend API
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle response from our backend
        if (data.success) {
          // Handle successful submission
          setFormStatus({
            submitted: true,
            error: false,
            message: data.message || 'Thank you for your message! I will get back to you soon.',
            loading: false
          });
        } else {
          // Handle validation errors from backend
          if (data.errors) {
            setFormErrors(data.errors);
          }

          setFormStatus({
            submitted: true,
            error: true,
            message: data.message || 'There was an error with your submission. Please check the form and try again.',
            loading: false
          });
        }

        // Only reset form after successful submission
        if (data.success) {
          // Reset form data
          setFormData({
            name: '',
            email: '',
            message: '',
            privacyPolicy: false
          });

          // Reset form errors
          setFormErrors({
            name: '',
            email: '',
            message: '',
            privacyPolicy: ''
          });
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error submitting form:', error);
        setFormStatus({
          submitted: true,
          error: true,
          message: 'There was an error sending your message. Please try again later.',
          loading: false
        });
      });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="contact contact-bg parallax-container">
      {/* Parallax background element */}
      <ParallaxBackground
        imageUrl={neuralNetworkSvg}
        speed={0.1}
        position="bottom right"
        size="50%"
        opacity={0.05}
        className="parallax-neural-network"
      />
      <div className="container parallax-content">
        <ScrollReveal direction="down" distance={20} duration={0.6}>
          <h2 className="section-title">Get In Touch</h2>
        </ScrollReveal>
        <div className="contact-content">
          <AnimatedSection className="contact-info" direction="left" delay={0.2}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="contact-item" variants={itemVariants}>
                <h3>Email</h3>
                <p>anshumaanraj123@gmail.com</p>
              </motion.div>
              <motion.div className="contact-item" variants={itemVariants}>
                <h3>Phone</h3>
                <p>+1 438-979-3104</p>
              </motion.div>
              <motion.div className="contact-item" variants={itemVariants}>
                <h3>Location</h3>
                <p>Montreal, Canada</p>
              </motion.div>
              <motion.div className="social-links" variants={itemVariants}>
                <motion.a
                  href="https://www.linkedin.com/in/anshumaan-rajpurohit-731455221/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1, backgroundColor: '#64ffda', color: '#0a192f' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  LinkedIn
                </motion.a>
                <motion.a
                  href="https://github.com/CLOVER-LOVES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ scale: 1.1, backgroundColor: '#64ffda', color: '#0a192f' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  GitHub
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatedSection>
          <AnimatedSection className="contact-form" direction="right" delay={0.4}>
            {formStatus.submitted && (
              <motion.div
                className={`form-message ${formStatus.error ? 'error' : 'success'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {formStatus.message}
              </motion.div>
            )}
            <motion.form
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="name">Name</label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={formErrors.name ? 'input-error' : ''}
                  onBlur={() => {
                    const error = validateField('name', formData.name);
                    setFormErrors(prev => ({ ...prev, name: error }));
                  }}
                  whileFocus={{ borderColor: '#64ffda', boxShadow: '0 0 0 2px rgba(100, 255, 218, 0.2)' }}
                />
                {formErrors.name && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formErrors.name}
                  </motion.div>
                )}
              </motion.div>
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="email">Email</label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className={formErrors.email ? 'input-error' : ''}
                  onBlur={() => {
                    const error = validateField('email', formData.email);
                    setFormErrors(prev => ({ ...prev, email: error }));
                  }}
                  whileFocus={{ borderColor: '#64ffda', boxShadow: '0 0 0 2px rgba(100, 255, 218, 0.2)' }}
                />
                {formErrors.email && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formErrors.email}
                  </motion.div>
                )}
              </motion.div>
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="message">Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="5"
                  className={formErrors.message ? 'input-error' : ''}
                  onBlur={() => {
                    const error = validateField('message', formData.message);
                    setFormErrors(prev => ({ ...prev, message: error }));
                  }}
                  whileFocus={{ borderColor: '#64ffda', boxShadow: '0 0 0 2px rgba(100, 255, 218, 0.2)' }}
                ></motion.textarea>
                {formErrors.message && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formErrors.message}
                  </motion.div>
                )}
              </motion.div>

              <motion.div className="form-group checkbox-group" variants={itemVariants}>
                <div className="checkbox-container">
                  <motion.input
                    type="checkbox"
                    id="privacyPolicy"
                    name="privacyPolicy"
                    checked={formData.privacyPolicy}
                    onChange={handleChange}
                    className={formErrors.privacyPolicy ? 'input-error' : ''}
                  />
                  <label htmlFor="privacyPolicy" className="checkbox-label">
                    I agree to the <motion.a
                      href="#privacy-policy"
                      whileHover={{ color: '#64ffda' }}
                      onClick={(e) => {
                        e.preventDefault();
                        // You can implement a modal or redirect to privacy policy page
                        alert('Privacy Policy: Your data will be used solely to respond to your inquiry and will not be shared with third parties.');
                      }}
                    >
                      Privacy Policy
                    </motion.a>
                  </label>
                </div>
                {formErrors.privacyPolicy && (
                  <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formErrors.privacyPolicy}
                  </motion.div>
                )}
              </motion.div>

              <motion.button
                type="submit"
                className="btn btn-primary"
                variants={itemVariants}
                whileHover={{ scale: formStatus.loading ? 1 : 1.05 }}
                whileTap={{ scale: formStatus.loading ? 1 : 0.95 }}
                disabled={formStatus.loading}
              >
                {formStatus.loading ? (
                  <div className="button-loading">
                    <LoadingSpinner size={20} thickness={2} color="#ffffff" />
                    <span style={{ marginLeft: '10px' }}>Sending...</span>
                  </div>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </motion.form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
