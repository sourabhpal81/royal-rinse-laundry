import React from 'react';

const Services = ({ handleNavigate }) => {
  const coreServices = [
    {
      title: 'Wash & Press',
      desc: 'Expert washing with premium fabric detergents, gentle tumble drying, and sharp professional pressing. Ideal for everyday clothing.',
      tags: ['Shirts', 'Trousers', 'Daily Wear', 'Linens'],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          <path d="M12 6c-3 1.5-3 5.5 0 7s3-5.5 0-7z" fill="currentColor" opacity="0.2"></path>
        </svg>
      )
    },
    {
      title: 'Premium Steam Press',
      desc: 'Wrinkle removal using advanced steam pressing systems. Perfect for formal wear, suits, and delicate fabrics where direct heat must be avoided.',
      tags: ['Silk', 'Woolens', 'Suits', 'Formal Shirts'],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 22h20"></path>
          <path d="M5 22V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v15"></path>
          <path d="M12 5V2"></path>
          <circle cx="12" cy="11" r="2" fill="currentColor"></circle>
          <circle cx="12" cy="17" r="2" fill="currentColor"></circle>
        </svg>
      )
    },
    {
      title: 'Dry Cleaning',
      desc: 'Special solvent washing process that gently dissolves stains, grease, and grime without altering the shape, color, or texture of your garments.',
      tags: ['Suits', 'Blazers', 'Wool Coats', 'Designer Wear'],
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
          <line x1="15" y1="3" x2="15" y2="21"></line>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="3" y1="15" x2="21" y2="15"></line>
        </svg>
      )
    }
  ];

  const traditionalAttire = [
    {
      name: 'Kandura Care',
      desc: 'Crisp finish, customized starch levels (soft, medium, stiff), fabric protection, and flawless seam alignment.',
      icon: '✨',
      className: 'kandura-card'
    },
    {
      name: 'Abaya & Jalabiya',
      desc: 'Delicate dark-wash cycle to protect black intensity, preservation of lace/beadworks, and hand ironing.',
      icon: '🖤',
      className: 'abaya-card'
    },
    {
      name: 'Sheila Care',
      desc: 'Special gentle washing with anti-static treatment keeping fabrics light, smooth, and flowing.',
      icon: '🧕',
      className: 'sheila-card'
    },
    {
      name: 'Ghatra / Shemagh',
      desc: 'Precise starching, symmetrical folding, and sharp crease line execution for a formal, pristine fit.',
      icon: '👑',
      className: 'ghatra-card'
    }
  ];

  return (
    <>
      {/* SECTION 1: CORE SERVICES */}
      <section id="services" className="services-section section-padding">
        <div className="container">
          <div className="section-title">
            <span className="badge badge-blue">Our Offerings</span>
            <h2>Premium <span>Laundry Services</span></h2>
            <p>We treat every garment with personalized care. From daily wear to delicate couture, your wardrobe is safe in our hands.</p>
          </div>

          <div className="services-grid">
            {coreServices.map((service, index) => (
              <div key={index} className="service-card glass">
                <div>
                  <div className="service-icon-box">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
                <div className="service-items-tags">
                  {service.tags.map((tag, i) => (
                    <span key={i} className="service-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: UAE TRADITIONAL CARE */}
      <section id="traditional-care" className="traditional-section section-padding">
        <div className="container">
          <div className="section-title">
            <span className="badge badge-gold">Cultural Heritage Care</span>
            <h2>UAE <span>Traditional Attire</span> Care</h2>
            <p>Specialized washing, starching, and pressing procedures tailored to respect and care for the fabric and shape of traditional UAE clothing.</p>
          </div>

          {/* Traditional Banner */}
          <div className="traditional-banner glass">
            <div className="traditional-banner-content">
              <h3>Gentle Care for Emirati Elegance</h3>
              <p>
                At Royal Rinse Laundry, we understand the cultural significance and delicate nature of UAE traditional clothing. 
                Our experts use specialized, state-of-the-art washing machines and premium cleaning detergents formulated to protect fabrics while delivering a pristine, long-lasting wash.
              </p>
              <div className="traditional-highlights">
                <div className="highlight-item">
                  <span className="hl-icon">✓</span>
                  <div>
                    <h4>Premium Fabric Starching</h4>
                    <p>Get the exact fabric crispness you prefer for your Kandura.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <span className="hl-icon">✓</span>
                  <div>
                    <h4>Embroidery & Lace Safety</h4>
                    <p>Manual checks and net washing to protect intricate Abaya designs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual representation */}
            <div className="about-graphic">
              <div className="about-card-stack">
                <div className="about-card-base about-card-1"></div>
                <div className="about-card-base about-card-2">
                  <div style={{ fontSize: '4rem', marginBottom: '10px' }}>✨</div>
                  <h4 style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>100% Gentle</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>
                    Zero harsh chemicals. Freshness, color retention, and fabric protection guaranteed.
                  </p>
                  <button 
                    onClick={() => handleNavigate('calculator')} 
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: '20px' }}
                    id="traditional-book-cta"
                  >
                    Book Traditional Wash
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Traditional Grid */}
          <div className="traditional-grid">
            {traditionalAttire.map((item, index) => (
              <div key={index} className={`traditional-card glass ${item.className}`}>
                <div className="trad-icon-wrapper">
                  {item.icon}
                </div>
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
