import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import PriceCalculator from './components/PriceCalculator';
import OrderTracker from './components/OrderTracker';
import About from './components/About';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Navigation scroll handler
  const handleNavigate = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // IntersectionObserver to set active section based on scroll position
  useEffect(() => {
    const sections = ['home', 'services', 'traditional-care', 'calculator', 'tracker', 'about', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // Trigger when section occupies the middle of the viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Hero handleNavigate={handleNavigate} />
        <Services handleNavigate={handleNavigate} />
        <PriceCalculator />
        <OrderTracker />
        <About />
      </main>
      <Footer activeSection={activeSection} setActiveSection={setActiveSection} />
      <WhatsAppWidget />
    </div>
  );
}

export default App;
