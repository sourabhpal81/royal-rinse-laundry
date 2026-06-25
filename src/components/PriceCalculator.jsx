import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import emailjs from '@emailjs/browser';

const PriceCalculator = () => {
  const [activeTab, setActiveTab] = useState('traditional');
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: 'delivery', // 'delivery' or 'dropoff'
    area: 'Muhaisnah 4',
    addressDetails: '',
    pickupDate: '',
    pickupSlot: '09:00 AM - 12:00 PM',
    kanduraStarch: 'None',
    abayaFabricProtection: false,
    jalabiyaFabricProtection: false,
    instructions: ''
  });

  const categories = [
    { id: 'traditional', label: 'Traditional Wear' },
    { id: 'apparel', label: 'Men & Women Apparel' },
    { id: 'home', label: 'Home & Bedding' }
  ];

  const priceList = {
    traditional: [
      { id: 'trad-1', name: 'Kandura (Wash & Press)', price: 8, description: 'Crisp starching & fold' },
      { id: 'trad-2', name: 'Abaya (Wash & Press)', price: 15, description: 'Delicate care for lace/beads' },
      { id: 'trad-3', name: 'Jalabiya (Wash & Press)', price: 15, description: 'Vibrant color protection' },
      { id: 'trad-4', name: 'Sheila (Wash & Press)', price: 6, description: 'Anti-static gentle wash' },
      { id: 'trad-5', name: 'Ghatra / Shemagh (Wash & Press)', price: 6, description: 'Perfect symmetric crease' }
    ],
    apparel: [
      { id: 'app-1', name: 'Suit (2-Piece Dry Clean)', price: 25, description: 'Premium fabric shaping' },
      { id: 'app-2', name: 'Blazer / Suit Jacket (Dry Clean)', price: 15, description: 'Expert structure care' },
      { id: 'app-3', name: 'Denim Jacket (Wash & Press)', price: 12, description: 'Softness retention wash' },
      { id: 'app-4', name: 'Woolen Garment (Dry Clean)', price: 15, description: 'Shrink-proof dry wash' },
      { id: 'app-5', name: 'Shirt / Blouse (Wash & Press)', price: 6, description: 'Perfect collar steam press' },
      { id: 'app-6', name: 'Trousers / Jeans (Wash & Press)', price: 7, description: 'Crisp leg creases' },
      { id: 'app-7', name: 'Dress (Formal / Evening)', price: 20, description: 'Gentle hand pressing' }
    ],
    home: [
      { id: 'home-1', name: 'Comforter (Single / Double)', price: 25, description: 'Deep hygiene sanitize wash' },
      { id: 'home-2', name: 'Comforter (King / Super King)', price: 35, description: 'Fluffy air dry & wash' },
      { id: 'home-3', name: 'Bed Sheet (Wash & Press)', price: 10, description: 'Soft, sanitizing wash' },
      { id: 'home-4', name: 'Blanket / Quilt (Wash & Fold)', price: 20, description: 'Ultra fresh odor shield' }
    ]
  };

  const handleQtyChange = (item, diff) => {
    setCart((prevCart) => {
      const currentQty = prevCart[item.id]?.qty || 0;
      const newQty = Math.max(0, currentQty + diff);
      
      const newCart = { ...prevCart };
      if (newQty === 0) {
        delete newCart[item.id];
      } else {
        newCart[item.id] = {
          name: item.name,
          price: item.price,
          qty: newQty
        };
      }
      return newCart;
    });
  };

  const getCartSubtotal = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Logs category WhatsApp clicks before redirecting
  const triggerWhatsAppInquiry = async (category) => {
    let customerPhone = formData.phone.trim();
    
    if (!customerPhone) {
      const enteredPhone = prompt('Please enter your contact number to connect on WhatsApp:');
      if (!enteredPhone || !enteredPhone.trim()) {
        return;
      }
      customerPhone = enteredPhone.trim();
      setFormData(prev => ({ ...prev, phone: customerPhone }));
    }

    const fallbackText = `Hello Royal Rinse Laundry L.L.C, I would like to make an enquiry regarding your ${category} laundry services.`;
    const whatsappLink = `https://wa.me/971566315474?text=${encodeURIComponent(fallbackText)}`;

    try {
      // Save Inquiry Log in Cloud Firestore
      await addDoc(collection(db, 'inquiries'), {
        phone: customerPhone,
        category: category,
        timestamp: new Date().toISOString(),
        whatsappLink: whatsappLink
      });
      
      window.open(whatsappLink, '_blank');
    } catch (err) {
      console.error("Firestore inquiry error:", err);
      // Fallback
      window.open(whatsappLink, '_blank');
    }
  };

  // Handles standard & premium order creation with Cloud Firestore and EmailJS notifications
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Validations
    if (!formData.name.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your contact number.');
      return;
    }
    if (!formData.pickupDate) {
      alert('Please select a pickup date.');
      return;
    }

    const cartItems = Object.values(cart);
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please select at least one garment.');
      return;
    }

    setLoading(true);

    const bookingData = {
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      serviceType: formData.serviceType,
      area: formData.serviceType === 'delivery' ? formData.area : '',
      addressDetails: formData.serviceType === 'delivery' ? formData.addressDetails.trim() : '',
      pickupDate: formData.pickupDate,
      pickupSlot: formData.pickupSlot,
      status: 'Order Received',
      items: cartItems.map(item => ({ name: item.name, price: item.price, qty: item.qty })),
      customizations: {
        kanduraStarch: formData.kanduraStarch,
        abayaFabricProtection: formData.abayaFabricProtection,
        jalabiyaFabricProtection: formData.jalabiyaFabricProtection
      },
      instructions: formData.instructions.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      // 1. Strict Timeslot capacity validation in Cloud Firestore
      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('pickupDate', '==', bookingData.pickupDate),
        where('pickupSlot', '==', bookingData.pickupSlot)
      );
      
      const querySnapshot = await getDocs(q);
      const existingBookingsCount = querySnapshot.size;

      const MAX_LIMIT_PER_SLOT = 5;
      if (existingBookingsCount >= MAX_LIMIT_PER_SLOT) {
        alert(`The selected timeslot (${bookingData.pickupSlot}) on ${bookingData.pickupDate} is fully booked. Please select a different timeslot or date.`);
        setLoading(false);
        return;
      }

      // 2. Save order to Firebase Cloud Firestore
      const docRef = await addDoc(bookingsRef, bookingData);
      const orderRefId = docRef.id.substring(docRef.id.length - 8).toUpperCase();

      // 3. Trigger Email Notification via EmailJS (relays to royalrinselaundryllc@gmail.com)
      const subtotal = getCartSubtotal();
      const emailParams = {
        to_name: 'Royal Rinse Laundry L.L.C',
        from_name: bookingData.customerName,
        customer_phone: bookingData.phone,
        service_type: bookingData.serviceType === 'delivery' ? 'Pickup & Delivery 🚚' : 'Self Drop-off 🏃',
        area: bookingData.serviceType === 'delivery' ? bookingData.area : 'N/A',
        address_details: bookingData.serviceType === 'delivery' ? bookingData.addressDetails : 'N/A',
        pickup_date: bookingData.pickupDate,
        pickup_slot: bookingData.pickupSlot,
        subtotal: `${subtotal} AED`,
        items_list: bookingData.items.map(item => `${item.qty}x ${item.name} (${item.price} AED)`).join(', '),
        instructions: bookingData.instructions || 'None',
        kandura_starch: bookingData.customizations.kanduraStarch,
        abaya_protection: bookingData.customizations.abayaFabricProtection ? 'Yes' : 'No',
        jalabiya_protection: bookingData.customizations.jalabiyaFabricProtection ? 'Yes' : 'No',
        order_reference: orderRefId,
        business_email: 'royalrinselaundryllc@gmail.com'
      };

      // Send to EmailJS - Configure your Service ID, Template ID & Public Key in EmailJS dashboard
      emailjs.send(
        'service_royal_rinse',  // EmailJS Service ID
        'template_royal_rinse', // EmailJS Template ID
        emailParams,
        'user_fakePublicKey123'  // EmailJS Public API Key
      ).then(
        (res) => console.log('✉️ Email notification sent successfully via EmailJS'),
        (err) => console.warn('⚠️ EmailJS notify failed (order logged in DB):', err)
      );

      // Success Alerts
      alert('🎉 Order Booked Successfully! Opening WhatsApp to coordinate details.');
      
      // Constructing WhatsApp confirmation text
      let text = `👑 *ROYAL RINSE LAUNDRY - BOOKING CONFIRMED*\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
      text += `Hello, I just booked a laundry pickup on your website!\n\n`;
      text += `👤 *Customer Details:*\n`;
      text += `• *Name:* ${bookingData.customerName}\n`;
      text += `• *Phone:* ${bookingData.phone}\n`;
      text += `• *Service:* ${bookingData.serviceType === 'delivery' ? 'Pickup & Delivery 🚚' : 'Self Drop-off 🏃'}\n`;
      if (bookingData.serviceType === 'delivery') {
        text += `• *Area:* ${bookingData.area}\n`;
      }
      text += `• *Pickup Time:* ${bookingData.pickupDate} (${bookingData.pickupSlot})\n\n`;
      text += `💰 *Subtotal:* *${subtotal} AED*\n\n`;
      text += `Please confirm my slot. Thank you! ✨`;

      const whatsappUrl = `https://wa.me/971566315474?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');

      // Clear Cart
      setCart({});
      setFormData(prev => ({
        ...prev,
        pickupDate: '',
        instructions: '',
        kanduraStarch: 'None',
        abayaFabricProtection: false,
        jalabiyaFabricProtection: false
      }));

    } catch (err) {
      console.error("Firestore checkout error:", err);
      alert('Failed to connect to Firebase database. Check security configurations.');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCart({});
  };

  return (
    <section id="calculator" className="calculator-section section-padding">
      <div className="container">
        <div className="section-title">
          <span className="badge badge-gold">Interactive Estimator</span>
          <h2>Price <span>Calculator & Booking</span></h2>
          <p>Estimate your service total based on our transparent rates, and send your pickup details directly to our WhatsApp support team.</p>
        </div>

        <div className="calculator-wrapper">
          {/* Left Side: Category selector & items list */}
          <div className="calc-panel glass">
            <div className="calc-tabs" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                {categories.map((tab) => (
                  <button
                    key={tab.id}
                    className={`calc-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    id={`tab-${tab.id}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => triggerWhatsAppInquiry(activeTab)}
                className="btn btn-outline btn-sm"
                style={{ borderColor: 'var(--whatsapp)', color: 'var(--whatsapp)', fontSize: '0.85rem' }}
                id="quick-whatsapp-enquiry"
              >
                Quick WhatsApp Inquiry 💬
              </button>
            </div>

            <div className="items-list">
              {priceList[activeTab].map((item) => {
                const cartQty = cart[item.id]?.qty || 0;
                return (
                  <div key={item.id} className="calc-item" id={`item-${item.id}`}>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div className="item-controls">
                      <span className="price-tag">{item.price} AED</span>
                      <div className="qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() => handleQtyChange(item, -1)}
                          aria-label="Decrease quantity"
                          id={`dec-${item.id}`}
                        >
                          -
                        </button>
                        <span className="qty-value" id={`qty-${item.id}`}>{cartQty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => handleQtyChange(item, 1)}
                          aria-label="Increase quantity"
                          id={`inc-${item.id}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Cart Summary & Checkout Form */}
          <div className="checkout-panel glass">
            <h3>Booking Summary</h3>
            
            {Object.keys(cart).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🧺</div>
                <p>No items added yet. Click "+" on items to start your calculation.</p>
              </div>
            ) : (
              <>
                <div className="cart-items-summary">
                  {Object.values(cart).map((item, idx) => (
                    <div key={idx} className="cart-summary-row">
                      <span className="cart-summary-name">{item.qty}x {item.name}</span>
                      <span>{item.qty * item.price} AED</span>
                    </div>
                  ))}
                </div>
                
                <div className="price-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{getCartSubtotal()} AED</span>
                  </div>
                  <div className="summary-row">
                    <span>Pickup & Delivery</span>
                    <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>FREE</span>
                  </div>
                  <div className="summary-row total">
                    <span>Estimated Total</span>
                    <span>{getCartSubtotal()} AED</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
                  <button 
                    onClick={clearCart} 
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--text-muted)', color: 'var(--text-muted)' }}
                    id="clear-estimator"
                  >
                    Clear List
                  </button>
                </div>
              </>
            )}

            {/* Booking Form details */}
            <form onSubmit={handleBookingSubmit} className="enquiry-form">
              <div className="form-group">
                <label htmlFor="customer-name">Your Full Name *</label>
                <input
                  type="text"
                  id="customer-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Saeed Al Maktoum"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer-phone">Contact Number *</label>
                <input
                  type="tel"
                  id="customer-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +971 50 123 4567"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="service-type">Service Option</label>
                <select
                  id="service-type"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                >
                  <option value="delivery">Pickup & Delivery (Free)</option>
                  <option value="dropoff">Self Drop-off at Shop</option>
                </select>
              </div>

              {formData.serviceType === 'delivery' && (
                <>
                  <div className="form-group">
                    <label htmlFor="delivery-area">Dubai Region/Area</label>
                    <select
                      id="delivery-area"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                    >
                      <option value="Muhaisnah 4">Muhaisnah 4 (Near Shop)</option>
                      <option value="Muhaisnah 1/2/3">Muhaisnah 1, 2, 3</option>
                      <option value="Al Qusais">Al Qusais</option>
                      <option value="Mirdif">Mirdif</option>
                      <option value="Al Nahda">Al Nahda</option>
                      <option value="International City">International City</option>
                      <option value="Other Dubai Area">Other Dubai Area</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address-details">Building, Apt / Villa No.</label>
                    <input
                      type="text"
                      id="address-details"
                      name="addressDetails"
                      value={formData.addressDetails}
                      onChange={handleInputChange}
                      placeholder="e.g. Building 12, Apt 402"
                    />
                  </div>
                </>
              )}

              {/* Pickup Appointment Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label htmlFor="pickup-date">Pickup Date *</label>
                  <input
                    type="date"
                    id="pickup-date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pickup-slot">Pickup Time *</label>
                  <select
                    id="pickup-slot"
                    name="pickupSlot"
                    value={formData.pickupSlot}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM</option>
                    <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
                    <option value="06:00 PM - 09:00 PM">06:00 PM - 09:00 PM</option>
                  </select>
                </div>
              </div>

              {/* UAE Traditional Attire Customizations */}
              <div style={{ border: '1px solid rgba(212, 175, 55, 0.2)', padding: '15px', borderRadius: 'var(--radius-sm)', backgroundColor: '#fffdf6', marginTop: '10px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>✨</span> UAE Traditional Garment Care
                </h4>
                
                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label htmlFor="kandura-starch" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Kandura Starch Level</label>
                  <select
                    id="kandura-starch"
                    name="kanduraStarch"
                    value={formData.kanduraStarch}
                    onChange={handleInputChange}
                    style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                  >
                    <option value="None">None (Soft)</option>
                    <option value="Light">Light Starch</option>
                    <option value="Medium">Medium Starch</option>
                    <option value="Crisp">Crisp (Stiff)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="abayaFabricProtection"
                      checked={formData.abayaFabricProtection}
                      onChange={handleInputChange}
                    />
                    Abaya Soft Protection
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="jalabiyaFabricProtection"
                      checked={formData.jalabiyaFabricProtection}
                      onChange={handleInputChange}
                    />
                    Jalabiya Color Protect
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="special-instructions">Instructions (e.g. Starch preferences)</label>
                <textarea
                  id="special-instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  placeholder="e.g. Medium starch for Kanduras. Gentle wash for black Abayas."
                  rows="2"
                  style={{
                    padding: '10px 15px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.9rem',
                    resize: 'none'
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-whatsapp w-full"
                style={{ width: '100%', marginTop: '10px', opacity: loading ? 0.7 : 1 }}
                disabled={loading}
                id="submit-whatsapp-booking"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.347a9.96 9.96 0 0 0 4.88 1.28c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.92 9.92 0 0 0 12.012 2zm5.83 14.183c-.32.9-1.87 1.742-2.57 1.812-.6.06-1.37.08-3.41-.77-2.6-1.09-4.27-3.77-4.4-3.94-.13-.17-.99-1.33-.99-2.53 0-1.2.62-1.8 1.15-2.07.22-.11.43-.16.59-.16.16 0 .32.01.46.02.15.01.35-.06.55.42.2.49.69 1.68.75 1.8.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.26.31-.37.42-.12.12-.25.25-.11.49.14.24.63 1.04 1.35 1.68.93.82 1.71 1.08 1.95 1.2.24.12.38.1.52-.06.14-.16.62-.72.79-.97.17-.25.34-.21.57-.12.23.09 1.48.7 1.73.82.25.12.42.18.48.28.06.1.06.58-.14 1.16z" />
                </svg>
                {loading ? 'Processing Booking...' : 'Book Pickup & Connect'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
