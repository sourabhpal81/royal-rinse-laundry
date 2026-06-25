import React, { useState, useEffect } from 'react';

const WhatsAppWidget = () => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Show the chat bubble after 3 seconds for better engagement
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const text = "Hello Royal Rinse Laundry L.L.C, I have an enquiry regarding your premium laundry services.";
    const whatsappUrl = `https://wa.me/971566315474?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="whatsapp-widget-container" id="whatsapp-floating-widget">
      {/* Welcome Bubble */}
      <div className={`whatsapp-bubble ${showBubble ? 'show' : ''}`}>
        <span>Need a pick-up? Chat with us! 👋</span>
        <button
          className="whatsapp-bubble-close"
          onClick={(e) => {
            e.stopPropagation();
            setShowBubble(false);
          }}
          aria-label="Close message"
          id="close-whatsapp-bubble"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Floating Button */}
      <button
        onClick={handleClick}
        className="whatsapp-floating-btn"
        aria-label="Contact us on WhatsApp"
        id="whatsapp-chat-button"
      >
        {/* Pulse effect */}
        <div className="whatsapp-btn-pulse"></div>
        {/* WhatsApp Icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.88 1.28c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.92 9.92 0 0 0 12.012 2zm5.83 14.183c-.32.9-1.87 1.742-2.57 1.812-.6.06-1.37.08-3.41-.77-2.6-1.09-4.27-3.77-4.4-3.94-.13-.17-.99-1.33-.99-2.53 0-1.2.62-1.8 1.15-2.07.22-.11.43-.16.59-.16.16 0 .32.01.46.02.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.26.31-.37.42-.12.12-.25.25-.11.49.14.24.63 1.04 1.35 1.68.93.82 1.71 1.08 1.95 1.2.24.12.38.1.52-.06.14-.16.62-.72.79-.97.17-.25.34-.21.57-.12.23.09 1.48.7 1.73.82.25.12.42.18.48.28.06.1.06.58-.14 1.16z" />
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppWidget;
