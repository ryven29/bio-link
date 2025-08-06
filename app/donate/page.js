"use client"
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
    <span style={{ position: 'relative' }}>
      {currentText}
      <span style={{ color: '#00ffff', animation: 'blink 1s infinite' }}>|</span>
    </span>
  );
};

// Header Component
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/topup", label: "Top Up Game" }
  ];
  
  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  };
  
  const navStyle = {
    padding: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
    boxShadow: '0 4px 20px rgba(0, 255, 255, 0.1)'
  };
  
  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
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
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      color: '#00ffff',
                      textDecoration: 'none',
                      border: '1px solid transparent',
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
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
};

// Main Page Component
export default function CyberpunkDonatePage() {
  const [glitchText, setGlitchText] = useState('DONATE');
  
  useEffect(() => {
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    const originalText = 'DONATE';
    
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
  
  const mainStyle = {
    minHeight: '100vh',
    backgroundColor: '#000000',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden'
  };
  
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '24px',
    paddingTop: '96px'
  };
  
  const titleStyle = {
    fontSize: '60px',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
    marginBottom: '48px',
    background: 'linear-gradient(to right, #00ffff, #9333ea, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
  };
  
  const qrisContainerStyle = {
    position: 'relative',
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    backdropFilter: 'blur(10px',
    border: '1px solid rgba(0, 255, 255, 0.5)',
    borderRadius: '12px',
    transition: 'all 0.5s ease',
    cursor: 'pointer'
  };
  
  const paymentCardStyle = {
    position: 'relative',
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };
  
  const footerStyle = {
    position: 'relative',
    marginTop: '48px',
    padding: '24px',
    border: '1px solid rgba(147, 51, 234, 0.5)',
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    borderRadius: '12px',
    textAlign: 'center',
    transition: 'all 0.5s ease'
  };
  
  return (
    <>
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
        }
      `}</style>
      
      <div style={mainStyle}>
        {/* Animated Grid Background */}
        <div style={backgroundStyle}></div>
        
        {/* Floating Particles */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 5 }}>
          {[...Array(15)].map((_, i) => (
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
        
        <Header />
        
        <main style={contentStyle}>
          {/* Glitch Title */}
          <h1 style={titleStyle}>
            {glitchText}
          </h1>
          
          {/* QRIS Section */}
          <div 
            className="hover-scale hover-glow"
            style={qrisContainerStyle}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#00ffff';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(0, 255, 255, 0.5)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
              <img 
                src="https://files.catbox.moe/jzn65a.jpg" 
                alt="QRIS ALL PAYMENT" 
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  margin: '0 auto',
                  display: 'block',
                  borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(0, 255, 255, 0.2)'
                }}
              />
            </div>
            <p style={{
              marginTop: '16px',
              textAlign: 'center',
              color: '#00ffff',
              fontWeight: '600',
              letterSpacing: '2px',
              background: 'linear-gradient(to right, #00ffff, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              QRIS ALL PAYMENT
            </p>
          </div>
          
          {/* Payment Methods */}
          <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* DANA */}
            <div 
              style={{
                ...paymentCardStyle,
                border: '1px solid rgba(59, 130, 246, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.transform = 'scale(1.05) rotate(1deg)';
                e.target.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <img 
                    src="https://telegra.ph/file/c605b34f0d4f0127735b4.jpg" 
                    alt="Dana" 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.2)'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #3b82f6, #00ffff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>DANA</p>
                  <p style={{ fontSize: '14px', color: '#d1d5db', fontFamily: 'monospace' }}>082159690832</p>
                  <p style={{ fontSize: '12px', color: '#9ca3af' }}>M. F**** N*** I****</p>
                </div>
                <div style={{ color: '#3b82f6', opacity: 0.5 }}>
                  <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* GOPAY */}
            <div 
              style={{
                ...paymentCardStyle,
                border: '1px solid rgba(34, 197, 94, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#22c55e';
                e.target.style.transform = 'scale(1.05) rotate(-1deg)';
                e.target.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                e.target.style.transform = 'scale(1) rotate(0deg)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <img 
                    src="https://files.catbox.moe/hrnxyn.webp" 
                    alt="Gopay" 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(34, 197, 94, 0.2)'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #22c55e, #10b981)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>GOPAY</p>
                  <p style={{ fontSize: '14px', color: '#d1d5db', fontFamily: 'monospace' }}>082159690832</p>
                  <p style={{ fontSize: '12px', color: '#9ca3af' }}>M. F**** N*** I****</p>
                </div>
                <div style={{ color: '#22c55e', opacity: 0.5 }}>
                  <svg style={{ width: '24px', height: '24px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div 
            style={footerStyle}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#9333ea';
              e.target.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(147, 51, 234, 0.5)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <p style={{
              fontSize: '18px',
              fontWeight: '600',
              background: 'linear-gradient(to right, #9333ea, #ec4899, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Thanks yang sudah Donasi!
            </p>
            <p style={{ color: '#00ffff', marginTop: '8px' }}>Semoga rezekinya dilancarkan</p>
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#9333ea',
                    borderRadius: '50%',
                    animation: `pulse ${2}s ease-in-out infinite ${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
