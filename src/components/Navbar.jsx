import React, { useState, useEffect } from 'react';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'traditional-care', label: 'Traditional Care' },
    { id: 'calculator', label: 'Price Calculator' },
    { id: 'tracker', label: 'Track Order' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
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

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        {/* Logo and Shop Name */}
        <a href="#home" className="nav-logo" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
          <img src="/logo.svg" alt="Royal Rinse Logo" className="logo-img" />
          <div className="logo-text">
            <span className="logo-title">Royal Rinse</span>
            <span className="logo-subtitle">Laundry L.L.C</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="nav-actions">
          <a
            href="https://wa.me/971566315474?text=Hello%20Royal%20Rinse%20Laundry%2C%20I%20have%20an%20enquiry%20regarding%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm nav-btn"
            id="nav-whatsapp-cta"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.88 1.28c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.92 9.92 0 0 0 12.012 2zm5.83 14.183c-.32.9-1.87 1.742-2.57 1.812-.6.06-1.37.08-3.41-.77-2.6-1.09-4.27-3.77-4.4-3.94-.13-.17-.99-1.33-.99-2.53 0-1.2.62-1.8 1.15-2.07.22-.11.43-.16.59-.16.16 0 .32.01.46.02.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.26.31-.37.42-.12.12-.25.25-.11.49.14.24.63 1.04 1.35 1.68.93.82 1.71 1.08 1.95 1.2.24.12.38.1.52-.06.14-.16.62-.72.79-.97.17-.25.34-.21.57-.12.23.09 1.48.7 1.73.82.25.12.42.18.48.28.06.1.06.58-.14 1.16z" />
            </svg>
            Chat Now
          </a>

          {/* Hamburger Menu Icon */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            id="mobile-nav-toggle"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ marginTop: '20px' }}>
            <a
              href="https://wa.me/971566315474?text=Hello%20Royal%20Rinse%20Laundry%2C%20I%20have%20an%20enquiry%20regarding%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full"
              style={{ width: '100%' }}
              id="mobile-whatsapp-cta"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.88 1.28c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.92 9.92 0 0 0 12.012 2zm5.83 14.183c-.32.9-1.87 1.742-2.57 1.812-.6.06-1.37.08-3.41-.77-2.6-1.09-4.27-3.77-4.4-3.94-.13-.17-.99-1.33-.99-2.53 0-1.2.62-1.8 1.15-2.07.22-.11.43-.16.59-.16.16 0 .32.01.46.02.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.26.31-.37.42-.12.12-.25.25-.11.49.14.24.63 1.04 1.35 1.68.93.82 1.71 1.08 1.95 1.2.24.12.38.1.52-.06.14-.16.62-.72.79-.97.17-.25.34-.21.57-.12.23.09 1.48.7 1.73.82.25.12.42.18.48.28.06.1.06.58-.14 1.16z" />
              </svg>
              Book via WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
