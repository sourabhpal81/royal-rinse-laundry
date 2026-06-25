import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const OrderTracker = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const statusSteps = [
    { label: 'Order Received', desc: 'We logged your pick-up request' },
    { label: 'Picked Up', desc: 'Garments collected by driver' },
    { label: 'In Progress', desc: 'Washing/cleaning in progress' },
    { label: 'Out for Delivery', desc: 'Fresh garments heading back' },
    { label: 'Delivered', desc: 'Garments delivered. Clean & crisp!' }
  ];

  const getStatusIndex = (status) => {
    return statusSteps.findIndex(step => step.label === status);
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError('Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(false);
    setOrders([]);

    try {
      // Query Firebase Cloud Firestore bookings collection
      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('phone', '==', phone.trim())
      );
      
      const querySnapshot = await getDocs(q);
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({
          _id: doc.id, // Map Firestore ID as _id for backwards compatibility
          ...doc.data()
        });
      });

      // Sort client-side by date descending
      fetchedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setOrders(fetchedOrders);
      setSearched(true);
    } catch (err) {
      console.error("Firestore tracking error:", err);
      setError('Connection failed. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="tracker" className="tracker-section section-padding" style={{ backgroundColor: '#fcfdfd' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="section-title">
          <span className="badge badge-blue">Live Tracking</span>
          <h2>Track Your <span>Laundry Order</span></h2>
          <p>Input your registered contact number to check the real-time status of your active laundry, dry cleaning, or pick-up bookings.</p>
        </div>

        {/* Search Bar */}
        <div className="glass" style={{ padding: '30px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', marginBottom: '40px', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
          <form onSubmit={handleTrack} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +971566315474"
                style={{
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #cbd5e1',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'var(--transition)',
                  backgroundColor: 'white',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                }}
                id="tracker-phone-input"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ borderRadius: 'var(--radius-full)', padding: '12px 35px' }}
              disabled={loading}
              id="tracker-search-btn"
            >
              {loading ? 'Searching...' : 'Track Status'}
            </button>
          </form>
          {error && <p style={{ color: '#ef4444', marginTop: '10px', fontSize: '0.9rem', fontWeight: 600 }}>⚠️ {error}</p>}
        </div>

        {/* Results */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px 0' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #f3f4f6',
              borderTop: '4px solid var(--primary)',
              borderRadius: '50%',
              animation: 'spin-slow 1s linear infinite',
              marginBottom: '15px'
            }}></div>
            <p style={{ color: 'var(--text-muted)' }}>Retrieving live tracking info...</p>
          </div>
        )}

        {searched && orders.length === 0 && (
          <div className="glass" style={{ textAlign: 'center', padding: '50px 30px', borderRadius: 'var(--radius-md)', border: '1px dashed #cbd5e1' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔍</div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No Active Bookings Found</h4>
            <p style={{ color: 'var(--text-muted)', maxWidth: '450px', margin: '0 auto' }}>
              We could not find any active bookings under "{phone}". Ensure the phone number matches the one registered during booking.
            </p>
          </div>
        )}

        {searched && orders.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {orders.map((order) => {
              const currentStepIdx = getStatusIndex(order.status);
              
              return (
                <div key={order._id} className="glass" style={{ padding: '35px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212, 175, 55, 0.25)', boxShadow: 'var(--shadow-lg)' }} id={`order-${order._id}`}>
                  {/* Order Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>Order Reference</span>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginTop: '2px' }}>#{order._id.substring(order._id.length - 8).toUpperCase()}</h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>Scheduled Pickup</span>
                      <p style={{ fontWeight: '700', color: 'var(--primary)', marginTop: '2px' }}>{order.pickupDate} ({order.pickupSlot})</p>
                    </div>
                  </div>

                  {/* Order Progress Line */}
                  <div className="timeline-wrapper" style={{ margin: '40px 0', padding: '0 10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', width: '100%' }}>
                      
                      {/* Connection Progress Bar */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '0',
                        width: '100%',
                        height: '4px',
                        backgroundColor: '#e2e8f0',
                        zIndex: '1',
                        borderRadius: '2px'
                      }}>
                        <div style={{
                          height: '100%',
                          backgroundColor: 'var(--primary)',
                          width: `${(currentStepIdx / (statusSteps.length - 1)) * 100}%`,
                          transition: 'width 0.8s ease-in-out',
                          borderRadius: '2px'
                        }}></div>
                      </div>

                      {/* Timeline Steps */}
                      {statusSteps.map((step, idx) => {
                        const isCompleted = idx < currentStepIdx;
                        const isActive = idx === currentStepIdx;

                        let stepBg = '#e2e8f0';
                        let stepBorder = '4px solid #fff';
                        let textColor = 'var(--text-muted)';
                        
                        if (isCompleted) {
                          stepBg = 'var(--primary)';
                          textColor = 'var(--primary)';
                        } else if (isActive) {
                          stepBg = 'white';
                          stepBorder = '4px solid var(--secondary)';
                          textColor = 'var(--primary)';
                        }

                        return (
                          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: '2', width: '20%', textAlign: 'center' }}>
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              backgroundColor: stepBg,
                              border: stepBorder,
                              boxShadow: isActive ? '0 0 10px rgba(212, 175, 55, 0.4)' : 'var(--shadow-sm)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: isCompleted ? 'white' : (isActive ? 'var(--secondary)' : '#94a3b8'),
                              fontWeight: 'bold',
                              fontSize: '0.85rem',
                              transition: 'all 0.3s ease'
                            }}>
                              {isCompleted ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              ) : (idx + 1)}
                            </div>
                            <h4 style={{ fontSize: '0.8rem', fontWeight: isActive || isCompleted ? '700' : '500', color: textColor, marginTop: '12px', lineHeight: '1.2' }}>{step.label}</h4>
                            <span className="hide-mobile" style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '4px', maxWidth: '100px', display: 'block' }}>{step.desc}</span>
                          </div>
                        );
                      })}

                    </div>
                  </div>

                  {/* Order Details & Summary */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '20px', fontSize: '0.9rem' }}>
                    <div>
                      <h4 style={{ color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.5px' }}>Customizations</h4>
                      <ul style={{ paddingLeft: '20px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <li>Kandura Starch: <strong>{order.customizations?.kanduraStarch || 'None'}</strong></li>
                        <li>Abaya Protection: <strong>{order.customizations?.abayaFabricProtection ? 'Yes' : 'No'}</strong></li>
                        <li>Jalabiya Protection: <strong>{order.customizations?.jalabiyaFabricProtection ? 'Yes' : 'No'}</strong></li>
                        {order.instructions && <li>Instructions: <em>"{order.instructions}"</em></li>}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      <div style={{ textAlign: 'right', width: '100%', maxWidth: '250px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: 'var(--text-muted)' }}>
                          <span>Garments ({order.items.reduce((sum, i) => sum + i.qty, 0)}):</span>
                          <span>{order.subtotal || order.items.reduce((sum, i) => sum + i.price * i.qty, 0)} AED</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                          <span>Delivery:</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>FREE</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', marginTop: '8px', paddingTop: '8px', fontWeight: '800', color: 'var(--primary)', fontSize: '1.1rem' }}>
                          <span>Estimated Total:</span>
                          <span style={{ color: 'var(--secondary)' }}>{order.subtotal || order.items.reduce((sum, i) => sum + i.price * i.qty, 0)} AED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Small Inline CSS to support responsive hiding */}
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default OrderTracker;
