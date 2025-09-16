import React from 'react'
import './App.css'
import './assets/patterns/patterns.css'
import './assets/fonts/the-scientist.css'
import './styles/responsive-typography.css'
import './styles/micro-interactions.css'
import './styles/glass-morphism.css'
import './styles/modern-grid.css'
import './styles/modern-ui.css'
import './styles/parallax.css'
import './styles/motion.css'

// Import components
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import SocialMediaShowcase from './components/SocialMediaShowcase'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'
import ScrollToTop from './components/ScrollToTop'
import IntroOverlay from './components/IntroOverlay'

function App() {
  return (
    <div className="app">
      <IntroOverlay />
      <SmoothScroll />
      <ScrollToTop />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <SocialMediaShowcase />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App


