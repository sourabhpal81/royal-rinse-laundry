import React from 'react';

const Hero = ({ handleNavigate }) => {
  return (
    <section id="home" className="hero-section">
      {/* Background Animated Water Bubbles */}
      <div className="hero-bubbles">
        <span className="bubble-element b1"></span>
        <span className="bubble-element b2"></span>
        <span className="bubble-element b3"></span>
        <span className="bubble-element b4"></span>
        <span className="bubble-element b5"></span>
      </div>

      <div className="hero-container container">
        {/* Left Column: Text & CTAs */}
        <div className="hero-content animate-fade-in-up">
          <span className="badge badge-gold font-semibold tracking-wider">
            ✨ Premium Care in Dubai
          </span>
          <h1 className="hero-title">
            Royal Care for <br />
            <span>Every Garment</span>
          </h1>
          <p className="hero-description">
            Royal Rinse Laundry delivers premium laundry and dry-cleaning services with exceptional care and attention to detail. 
            Clean, crisp, and cared for—every garment, every time.
          </p>

          <div className="hero-features-list">
            <div className="hero-feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="feature-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>UAE Traditional Attire Experts</span>
            </div>
            <div className="hero-feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="feature-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Steam Pressing & Delicate Fabrics</span>
            </div>
            <div className="hero-feature-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="feature-icon">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Located in Muhaisnah 4, Dubai</span>
            </div>
          </div>

          <div className="hero-actions">
            <button
              onClick={() => handleNavigate('calculator')}
              className="btn btn-gold"
              id="hero-book-cta"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Book Pickup / Calculate Price
            </button>
            <button
              onClick={() => handleNavigate('services')}
              className="btn btn-outline"
              id="hero-services-cta"
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Right Column: Premium Interactive CSS Graphics */}
        <div className="hero-graphic float">
          <div className="drum-wrapper">
            {/* Spinning Laundry Drum */}
            <div className="washing-drum spin-slow">
              <div className="drum-ribs"></div>
              <div className="drum-ribs rib-2"></div>
              <div className="drum-ribs rib-3"></div>
              <div className="drum-inner-circle">
                <div className="drum-bubbles">
                  <span className="drum-bubble db1"></span>
                  <span className="drum-bubble db2"></span>
                  <span className="drum-bubble db3"></span>
                </div>
              </div>
            </div>
            {/* Glossy Front Window Cover */}
            <div className="drum-glass">
              <div className="drum-reflection"></div>
              {/* Garment silhouette representing care */}
              <div className="garment-silhouette">
                <svg viewBox="0 0 100 100" className="kandura-icon">
                  {/* Traditional Kandura Silhouette */}
                  <path d="M50,15 L62,18 L68,28 L62,35 L62,90 L38,90 L38,35 L32,28 L38,18 Z" fill="rgba(255,255,255,0.7)" />
                  <path d="M50,15 L50,45" stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M45,28 C50,30 50,30 55,28" stroke="#1e3a8a" strokeWidth="1" />
                </svg>
              </div>
            </div>
            
            {/* Sparkling indicators of cleanliness */}
            <div className="sparkle s1">✨</div>
            <div className="sparkle s2">✨</div>
            <div className="sparkle s3">⭐</div>
          </div>
          
          {/* Quick Info Glass Card */}
          <div className="quick-info-card glass">
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div>
              <h4>Fast Turnaround</h4>
              <p>Fresh & clean within 24-48 hrs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
