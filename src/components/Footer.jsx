import React from 'react';

const Footer = ({ activeSection, setActiveSection }) => {
  const handleNavClick = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'traditional-care', label: 'Traditional Care' },
    { id: 'calculator', label: 'Price Calculator' },
    { id: 'tracker', label: 'Track Order' },
    { id: 'about', label: 'About Us' }
  ];

  return (
    <footer id="contact" className="contact-footer-wrapper">
      <div className="container">
        
        {/* Contact Info Row */}
        <div className="contact-info-grid">
          {/* Address */}
          <div className="contact-info-card" id="contact-address-card">
            <div className="contact-info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="contact-info-content">
              <h4>Shop Location</h4>
              <p>
                Royal Rinse Laundry L.L.C<br />
                Muhaisanah Fourth - Muhaisnah 4,<br />
                Dubai - United Arab Emirates
              </p>
              <a
                href="https://maps.google.com/?q=Muhaisanah+Fourth+Muhaisnah+4+Dubai+United+Arab+Emirates"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.85rem', color: 'var(--secondary)', display: 'inline-block', marginTop: '6px' }}
                id="google-maps-link"
              >
                Get Directions ➔
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="contact-info-card" id="contact-details-card">
            <div className="contact-info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="contact-info-content">
              <h4>Call or Message</h4>
              <p style={{ fontSize: '1.15rem', fontWeight: '700', color: 'white', margin: '4px 0' }}>
                <a href="tel:+971566315474" id="phone-link">+971 56 631 5474</a>
              </p>
              <p>Email: <a href="mailto:royalrinselaundryllc@gmail.com" id="email-link">royalrinselaundryllc@gmail.com</a></p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="contact-info-card" id="contact-hours-card">
            <div className="contact-info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="contact-info-content">
              <h4>Operating Hours</h4>
              <p>Saturday – Thursday: <br /><span style={{ color: 'white', fontWeight: 600 }}>8:00 AM – 10:00 PM</span></p>
              <p>Friday: <br /><span style={{ color: 'white', fontWeight: 600 }}>2:00 PM – 10:00 PM</span></p>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="map-container" id="google-map-iframe-container">
          <iframe
            title="Royal Rinse Laundry Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.7289569661413!2d55.40523091501438!3d25.28299198385686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5df7a1cfdfbd%3A0xc3f608bf893c5d64!2sMuhaisnah%204%20-%20Dubai!5e0!3m2!1sen!2sae!4v1655000000000!5m2!1sen!2sae"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>Royal Rinse</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', letterSpacing: '1px' }}>LAUNDRY L.L.C</span>
          </div>
          
          <ul className="footer-bottom-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.id);
                  }}
                  id={`footer-link-${link.id}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', textAlign: 'right' }}>
            <p>© {new Date().getFullYear()} Royal Rinse Laundry L.L.C. All rights reserved.</p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)' }}>
              Designed &amp; Developed by <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>Palviontech Pvt. Ltd.</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
