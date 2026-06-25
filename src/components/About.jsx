import React from 'react';

const About = () => {
  const pillars = [
    {
      title: 'Fabric Safety First',
      desc: 'We inspect fabric care labels and use soft, premium detergents to prevent shrinkage, pilling, or discoloration.',
      icon: '🛡️'
    },
    {
      title: 'Advanced Steam Press',
      desc: 'Our steam iron systems lift fibers gently to smooth out creases, avoiding the heat damage caused by regular dry iron plates.',
      icon: '💨'
    },
    {
      title: 'Eco-Friendly Solvents',
      desc: 'We utilize biodegradable, skin-safe solvents that remove grease and stains while remaining gentle on the environment.',
      icon: '🌿'
    },
    {
      title: 'Meticulous Inspection',
      desc: 'Every item goes through pre-wash stain treatment, individual cycle sorting, and a final quality check before packaging.',
      icon: '🔍'
    }
  ];

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="about-wrapper">
          {/* Left Side: Stats Graphic */}
          <div className="about-graphic">
            <div className="about-card-stack">
              <div className="about-card-base about-card-1"></div>
              <div className="about-card-base about-card-2" style={{ transform: 'rotate(-4deg)' }}>
                <span className="about-stat-number">100%</span>
                <span className="about-stat-desc">Fabric Care</span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px' }}>
                  From delicate lace to heavy comforters, our specialized wash formulas protect fabric life.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Philosophy & Pillars */}
          <div className="about-content">
            <span className="badge badge-gold">Our Philosophy</span>
            <h3>Clean, Crisp, and Cared For—<span>Every Garment, Every Time</span></h3>
            <p>
              Royal Rinse Laundry L.L.C delivers premium laundry and dry-cleaning services with exceptional care and attention to detail. 
              We handle it all: from wash & press, steam press, and normal press to expert cleaning of comforters, wool garments, denim jackets, suits, blazers, and formal wear.
            </p>
            <p>
              We specialize in gentle care for UAE traditional attire, ensuring freshness, fabric protection, and a flawless finish that leaves you feeling confident and looking your absolute best.
            </p>

            <div className="values-list">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="value-item" id={`value-item-${idx}`}>
                  <span className="value-icon">{pillar.icon}</span>
                  <div>
                    <h4>{pillar.title}</h4>
                    <p>{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
