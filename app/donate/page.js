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
    <span className="relative">
      {currentText}
      <span className="animate-pulse text-cyan-400">|</span>
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
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <nav className="p-4 bg-black/80 border-b border-cyan-500/30 shadow-lg shadow-cyan-500/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              <Typing />
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 group"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`block h-0.5 bg-cyan-400 transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 bg-cyan-400 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-cyan-400 transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/90 border-b border-cyan-500/30 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto p-4">
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <div key={link.href} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="relative block px-4 py-3 rounded-lg text-cyan-300 hover:text-white border border-transparent hover:border-cyan-500/50 transition-all duration-300"
                    >
                      {link.label}
                    </a>
                  </div>
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
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 bg-black">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        ></div>
      </div>
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      <Header />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 pt-24">
        {/* Glitch Title */}
        <div className="relative mb-12">
          <h1 className="text-6xl font-bold text-center relative">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {glitchText}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent opacity-30 animate-pulse">
              {glitchText}
            </div>
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg blur-xl opacity-20 animate-pulse"></div>
        </div>
        
        {/* QRIS Section */}
        <div className="relative group mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-md border border-cyan-500/50 rounded-xl p-6 hover:border-cyan-400 transition-all duration-500 transform hover:scale-105">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://files.catbox.moe/jzn65a.jpg" 
                alt="QRIS ALL PAYMENT" 
                className="w-full max-w-xs mx-auto rounded-lg shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
            <p className="mt-4 text-center text-cyan-300 font-semibold tracking-wider">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                QRIS ALL PAYMENT
              </span>
            </p>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="w-full max-w-md space-y-4">
          {/* DANA */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-md border border-blue-500/50 rounded-xl p-4 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src="https://telegra.ph/file/c605b34f0d4f0127735b4.jpg" 
                    alt="Dana" 
                    className="w-14 h-14 rounded-lg shadow-lg shadow-blue-500/20 transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -inset-1 bg-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">DANA</p>
                  <p className="text-sm text-gray-300 font-mono">082159690832</p>
                  <p className="text-xs text-gray-400">M. F**** N*** I****</p>
                </div>
                <div className="text-blue-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* GOPAY */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-md border border-green-500/50 rounded-xl p-4 hover:border-green-400 transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img 
                    src="https://files.catbox.moe/hrnxyn.webp" 
                    alt="Gopay" 
                    className="w-14 h-14 rounded-lg shadow-lg shadow-green-500/20 transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -inset-1 bg-green-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">GOPAY</p>
                  <p className="text-sm text-gray-300 font-mono">082159690832</p>
                  <p className="text-xs text-gray-400">M. F**** N*** I****</p>
                </div>
                <div className="text-green-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="relative group mt-12">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-md border border-purple-500/50 rounded-xl p-6 text-center hover:border-purple-400 transition-all duration-500">
            <p className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Thanks yang sudah Donasi!
            </p>
            <p className="text-cyan-300 mt-2">Semoga rezekinya dilancarkan</p>
            <div className="mt-3 flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}
