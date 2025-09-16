import { useEffect } from 'react';

const SmoothScroll = () => {
  useEffect(() => {
    // Handle smooth scrolling for anchor links
    const handleLinkClick = (e) => {
      const target = e.target.closest('a');
      
      if (!target) return;
      
      // Check if it's an internal anchor link
      if (
        target.getAttribute('href') &&
        target.getAttribute('href').startsWith('#') &&
        target.getAttribute('href').length > 1
      ) {
        e.preventDefault();
        
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Add a class to the body to indicate transition
          document.body.classList.add('page-transitioning');
          
          // Scroll to the target element with smooth behavior
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth',
          });
          
          // Update URL hash without scrolling
          window.history.pushState(null, null, target.getAttribute('href'));
          
          // Remove the transition class after animation completes
          setTimeout(() => {
            document.body.classList.remove('page-transitioning');
          }, 800);
        }
      }
    };
    
    // Add event listener to the document
    document.addEventListener('click', handleLinkClick);
    
    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default SmoothScroll;
