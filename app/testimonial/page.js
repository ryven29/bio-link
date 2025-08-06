import React, { useState, useEffect } from 'react';

// Typing Component
const Typing = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = ['𝗥𝘆𝘃𝗲𝗻.', '𝗥𝘆𝘇𝗲𝗻.'];
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (!isDeleting) {
        setCurrentText(current.substring(0, currentText.length + 1));
        
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(current.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);
  
  return (
    <span style={{ 
      position: 'relative',
      background: 'linear-gradient(45deg, #00ffff, #9333ea, #ec4899, #00ffff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      backgroundSize: '200% 200%',
      animation: 'gradientShift 3s ease infinite'
    }}>
      {currentText}
      <span style={{ color: '#00ffff', animation: 'blink 1s infinite' }}>|</span>
    </span>
  );
};

// Header Component
const Header = ({ setCurrentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "testimonials", label: "Testimoni" },
    { id: "admin", label: "Admin Panel" }
  ];
  
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    }}>
      <nav style={{
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #00ffff, #9333ea, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              <Typing />
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              position: 'relative',
              padding: '12px',
              borderRadius: '8px',
              background: 'linear-gradient(to right, rgba(0, 255, 255, 0.2), rgba(147, 51, 234, 0.2))',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '24px' }}>
              <span style={{
                display: 'block',
                height: '2px',
                backgroundColor: '#00ffff',
                transform: isOpen ? 'rotate(45deg) translateY(8px)' : 'none',
                transition: 'all 0.3s ease'
              }}></span>
              <span style={{
                display: 'block',
                height: '2px',
                backgroundColor: '#00ffff',
                opacity: isOpen ? 0 : 1,
                transition: 'all 0.3s ease'
              }}></span>
              <span style={{
                display: 'block',
                height: '2px',
                backgroundColor: '#00ffff',
                transform: isOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                transition: 'all 0.3s ease'
              }}></span>
            </div>
          </button>
        </div>
        
        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setCurrentView(link.id);
                      setIsOpen(false);
                    }}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      color: '#00ffff',
                      textDecoration: 'none',
                      border: '1px solid transparent',
                      background: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#ffffff';
                      e.target.style.borderColor = 'rgba(0, 255, 255, 0.5)';
                      e.target.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#00ffff';
                      e.target.style.borderColor = 'transparent';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
};

// Star Rating Component
const StarRating = ({ rating }) => {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            color: i < rating ? '#fbbf24' : '#374151',
            fontSize: '16px'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index }) => {
  return (
    <div
      style={{
        position: 'relative',
        padding: '24px',
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s`,
        opacity: 0,
        transform: 'translateY(30px)'
      }}
      onMouseEnter={(e) => {
        e.target.style.borderColor = '#00ffff';
        e.target.style.transform = 'scale(1.02) rotate(0.5deg)';
        e.target.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.borderColor = 'rgba(0, 255, 255, 0.3)';
        e.target.style.transform = 'scale(1) rotate(0deg)';
        e.target.style.boxShadow = 'none';
      }}
    >
      {testimonial.image && (
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
          <img
            src={testimonial.image}
            alt="Testimonial"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 255, 255, 0.1)'
            }}
          />
        </div>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #00ffff, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 4px 0'
          }}>
            {testimonial.customerName}
          </h3>
          <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
            {testimonial.productName}
          </p>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '12px 0',
        borderTop: '1px solid rgba(0, 255, 255, 0.1)'
      }}>
        <span style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#22c55e'
        }}>
          Rp {testimonial.price?.toLocaleString('id-ID') || 'N/A'}
        </span>
        <span style={{
          fontSize: '12px',
          color: '#00ffff',
          backgroundColor: 'rgba(0, 255, 255, 0.1)',
          padding: '4px 8px',
          borderRadius: '4px'
        }}>
          ✓ Verified
        </span>
      </div>
    </div>
  );
};

// Main App Component
export default function CyberpunkReputationWeb() {
  const [currentView, setCurrentView] = useState('home');
  const [glitchText, setGlitchText] = useState('REPUTATION');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Initial testimonials based on images
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      customerName: "Gamero",
      productName: "PC Game Pass",
      price: 50000,
      rating: 5,
      image: "https://files.catbox.moe/example1.jpg", // Placeholder
      date: "2023-11-30"
    },
    {
      id: 2,
      customerName: "Ven",
      productName: "Discord Nitro",
      price: 75000,
      rating: 5,
      image: "https://files.catbox.moe/example2.jpg", // Placeholder
      date: "2024-12-31"
    },
    {
      id: 3,
      customerName: "W/AZ",
      productName: "Dana Top Up",
      price: 25000,
      rating: 5,
      image: "https://files.catbox.moe/example3.jpg", // Placeholder
      date: "2024-05-10"
    },
    {
      id: 4,
      customerName: "Vinzz | XII",
      productName: "Discord Avatar Decoration",
      price: 30000,
      rating: 5,
      image: "https://files.catbox.moe/example4.jpg", // Placeholder
      date: "2024-08-15"
    }
  ]);

  const [newTestimonial, setNewTestimonial] = useState({
    customerName: '',
    productName: '',
    price: '',
    rating: 5,
    image: ''
  });

  // Admin form handlers
  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setAdminPassword('');
    } else {
      alert('Password salah!');
    }
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.customerName || !newTestimonial.productName) {
      alert('Nama customer dan produk harus diisi!');
      return;
    }

    const testimonial = {
      id: Date.now(),
      ...newTestimonial,
      price: parseInt(newTestimonial.price) || 0,
      date: new Date().toISOString().split('T')[0]
    };

    setTestimonials([testimonial, ...testimonials]);
    setNewTestimonial({
      customerName: '',
      productName: '',
      price: '',
      rating: 5,
      image: ''
    });
    alert('Testimoni berhasil ditambahkan!');
  };

  // Glitch effect
  useEffect(() => {
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    const originalText = 'REPUTATION';
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        const glitched = originalText
          .split('')
          .map(char => Math.random() > 0.8 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
          .join('');
        setGlitchText(glitched);
        
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 100);
    
    return () => clearInterval(glitchInterval);
  }, []);

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    backgroundImage: `
      linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    animation: 'gridMove 20s linear infinite',
    opacity: 0.2
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 10,
    minHeight: '100vh',
    padding: '24px',
    paddingTop: '96px',
    backgroundColor: '#000000',
    color: '#ffffff'
  };

  return (
    <>
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={{ minHeight: '100vh', backgroundColor: '#000000', position: 'relative', overflow: 'hidden' }}>
        <div style={backgroundStyle}></div>
        
        {/* Floating Particles */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 5 }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                backgroundColor: '#00ffff',
                borderRadius: '50%',
                opacity: 0.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <Header setCurrentView={setCurrentView} />

        <div style={contentStyle}>
          {/* Home View */}
          {currentView === 'home' && (
            <div style={{ textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
              <h1 style={{
                fontSize: '60px',
                fontWeight: 'bold',
                marginBottom: '24px',
                background: 'linear-gradient(to right, #00ffff, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
              }}>
                {glitchText}
              </h1>
              
              <p style={{
                fontSize: '18px',
                color: '#9ca3af',
                marginBottom: '48px',
                maxWidth: '600px',
                margin: '0 auto 48px auto'
              }}>
                Kepercayaan Customer adalah Prioritas Utama Kami. Lihat testimoni dari customer yang puas dengan layanan kami.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '32px',
                marginTop: '48px'
              }}>
                {testimonials.slice(0, 4).map((testimonial, index) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                ))}
              </div>

              <div style={{ marginTop: '48px' }}>
                <button
                  onClick={() => setCurrentView('testimonials')}
                  style={{
                    padding: '16px 32px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #00ffff, #9333ea)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#000000',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Lihat Semua Testimoni
                </button>
              </div>
            </div>
          )}

          {/* Testimonials View */}
          {currentView === 'testimonials' && (
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '48px',
                background: 'linear-gradient(to right, #00ffff, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Testimoni Customer
              </h1>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '24px'
              }}>
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Admin Panel */}
          {currentView === 'admin' && (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '48px',
                background: 'linear-gradient(to right, #00ffff, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Admin Panel
              </h1>

              {!isAdmin ? (
                <div style={{
                  padding: '32px',
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 255, 255, 0.3)'
                }}>
                  <h2 style={{ color: '#00ffff', marginBottom: '24px' }}>Login Admin</h2>
                  <input
                    type="password"
                    placeholder="Masukkan password admin"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '16px',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(0, 255, 255, 0.3)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '16px'
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  />
                  <button
                    onClick={handleAdminLogin}
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(to right, #00ffff, #9333ea)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#000000',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Login
                  </button>
                  <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '16px' }}>
                    Default password: admin123
                  </p>
                </div>
              ) : (
                <div style={{
                  padding: '32px',
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 255, 255, 0.3)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ color: '#00ffff' }}>Tambah Testimoni Baru</h2>
                    <button
                      onClick={() => setIsAdmin(false)}
                      style={{
                        padding: '8px 16px',
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid #ef4444',
                        borderRadius: '8px',
                        color: '#ef4444',
                        cursor: 'pointer'
                      }}
                    >
                      Logout
                    </button>
                  </div>

                  <div style={{ display: 'grid', gap: '16px' }}>
                    <input
                      type="text"
                      placeholder="Nama Customer"
                      value={newTestimonial.customerName}
                      onChange={(e) => setNewTestimonial({...newTestimonial, customerName: e.target.value})}
                      style={{
                        padding: '12px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(0, 255, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '16px'
                      }}
                    />
                    
                    <input
                      type="text"
                      placeholder="Nama Produk"
                      value={newTestimonial.productName}
                      onChange={(e) => setNewTestimonial({...newTestimonial, productName: e.target.value})}
                      style={{
                        padding: '12px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(0, 255, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '16px'
                      }}
                    />
                    
                    <input
                      type="number"
                      placeholder="Harga (tanpa titik/koma)"
                      value={newTestimonial.price}
                      onChange={(e) => setNewTestimonial({...newTestimonial, price: e.target.value})}
                      style={{
                        padding: '12px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(0, 255, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '16px'
                      }}
                    />
                    
                    <input
                      type="url"
                      placeholder="URL Foto (opsional)"
                      value={newTestimonial.image}
                      onChange={(e) => setNewTestimonial({...newTestimonial, image: e.target.value})}
                      style={{
                        padding: '12px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(0, 255, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '16px'
                      }}
                    />
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <label style={{ color: '#00ffff' }}>Rating:</label>
                      <select
                        value={newTestimonial.rating}
                        onChange={(e) => setNewTestimonial({...newTestimonial, rating: parseInt(e.target.value)})}
                        style={{
                          padding: '8px',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          border: '1px solid rgba(0, 255, 255, 0.3)',
                          borderRadius: '8px',
                          color: '#ffffff'
                        }}
                      >
                        {[5,4,3,2,1].map(rating => (
                          <option key={rating} value={rating}>{rating} Bintang</option>
                        ))}
                      </select>
                    </div>
                    
                    <button
                      onClick={handleAddTestimonial}
                      style={{
                        padding: '16px',
                        background: 'linear-gradient(to right, #22c55e, #16a34a)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '16px'
                      }}
                    >
                      Tambah Testimoni
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
