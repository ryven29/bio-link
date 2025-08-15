import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Github, 
  Quote, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Shield
} from 'lucide-react';

// Typing Component
const Typing = () => {
  useEffect(() => {
    let typed;
    const loadTyped = async () => {
      if (typeof window !== 'undefined') {
        const { default: Typed } = await import('typed.js');
        typed = new Typed('.typing', {
          strings: ['𝗥𝘆𝘃𝗲𝗻 𝗦𝘁𝗼𝗿𝗲.', '𝗧𝗿𝘂𝘀𝘁𝗲𝗱 𝗦𝗲𝗿𝘃𝗶𝗰𝗲.'],
          typeSpeed: 50,
          backSpeed: 30,
          loop: true,
        });
      }
    };
    
    loadTyped();
    
    return () => {
      if (typed) {
        typed.destroy();
      }
    };
  }, []);

  return <span className="typing"></span>;
};

// Header Component
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="p-3 bg-black border-b border-gray-800 backdrop-blur-md bg-black/90">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
            <Typing />
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-all"
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span className={`block h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-black border-b border-gray-800 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto p-4">
              <div className="space-y-2">
                <a href="#home" className="block px-4 py-2 rounded-lg text-white hover:bg-gray-700 transition-all">
                  Home
                </a>
                <a href="#testimonials" className="block px-4 py-2 rounded-lg text-white hover:bg-gray-700 transition-all">
                  Testimonials
                </a>
                <a href="#services" className="block px-4 py-2 rounded-lg text-white hover:bg-gray-700 transition-all">
                  Services
                </a>
                <a href="#contact" className="block px-4 py-2 rounded-lg text-white hover:bg-gray-700 transition-all">
                  Contact
                </a>
              </div>
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
};

// Profile Component
const Profile = () => {
  const [imgSrc, setImgSrc] = useState("https://files.catbox.moe/tmobkc.png");

  return (
    <div className="bg-black p-6 rounded-lg border border-gray-500 transition-all duration-300 shadow-lg">
      <div className="text-center">
        <div className="inline-block relative">
          <img
            src={imgSrc}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-gray-500 bg-gray-600 transition-transform hover:scale-105"
            onError={() => setImgSrc("https://files.catbox.moe/tmobkc.png")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
        </div>
        
        <h1 className="text-lg font-bold mt-2 flex items-center justify-center">
          ð…ð¢ð¤ð«ð¢
          <Shield className="inline text-blue-500 ml-1 text-sm" fill="currentColor" />
        </h1>

        <p className="text-gray-400 text-xs">Trusted Digital Services Provider</p>
        
        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          <span className="bg-white/5 px-3 py-1 rounded-full text-xs hover:bg-white/10 transition-all hover:scale-105 ring-1 ring-green-700 text-yellow-400">
            #TrustedService
          </span>
          <span className="bg-white/5 px-3 py-1 rounded-full text-xs hover:bg-white/10 transition-all hover:scale-105 ring-1 ring-green-700 text-yellow-400">
            #FastDelivery
          </span>
          <span className="bg-white/5 px-3 py-1 rounded-full text-xs hover:bg-white/10 transition-all hover:scale-105 ring-1 ring-green-700 text-yellow-400">
            #Quality
          </span>
        </div>
        
        <div className="flex justify-center gap-4 mt-4 text-xl text-gray-400">
          <a href="https://instagram.com/fikrinrirham" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://github.com/ryven29" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://www.tiktok.com/@ry_venz" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <span className="h-5 w-5 flex items-center justify-center">📱</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-black border border-gray-500 rounded-lg p-4 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Quote className="text-black text-xs w-3 h-3" />
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">{testimonial.service}</h3>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 text-xs w-3 h-3 fill-current" />
            ))}
          </div>
        </div>
        <div className="ml-auto">
          <CheckCircle className="text-green-500 text-sm w-4 h-4" />
        </div>
      </div>
      
      <div className="relative mb-3">
        {!imageLoaded && (
          <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
        <img
          src={testimonial.image}
          alt={testimonial.service}
          className={`w-full h-48 object-cover rounded-lg transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.style.display = 'none';
            setImageLoaded(false);
          }}
        />
      </div>
      
      <p className="text-gray-300 text-xs leading-relaxed mb-3">
        {testimonial.review}
      </p>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white font-medium text-xs">{testimonial.customer}</p>
          <p className="text-gray-500 text-xs">{testimonial.date}</p>
        </div>
        <div className="flex items-center gap-1 text-green-500">
          <span className="text-xs font-medium">Verified</span>
          <Shield className="text-xs w-3 h-3" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

// Stats Component
const StatsSection = () => {
  const stats = [
    { label: "Happy Customers", value: "500+", icon: "👥" },
    { label: "Services Completed", value: "1000+", icon: "✅" },
    { label: "Success Rate", value: "99.9%", icon: "📈" },
    { label: "Response Time", value: "< 1 Hour", icon: "⚡" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-black border border-gray-500 rounded-lg p-4 text-center hover:border-gray-400 transition-all">
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className="text-white font-bold text-lg">{stat.value}</div>
          <div className="text-gray-400 text-xs">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    { name: "Nitro Discord", icon: "🎮", description: "Premium Discord Nitro services" },
    { name: "Gaming Services", icon: "🎯", description: "Quest completion & boosting" },
    { name: "Social Media", icon: "📱", description: "Account management services" },
    { name: "Streaming", icon: "📺", description: "Premium streaming subscriptions" }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div key={index} className="bg-black border border-gray-500 rounded-lg p-4 hover:border-gray-400 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{service.icon}</div>
              <div>
                <h3 className="text-white font-semibold text-sm group-hover:text-yellow-400 transition-colors">{service.name}</h3>
                <p className="text-gray-400 text-xs">{service.description}</p>
              </div>
              <ArrowRight className="ml-auto text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
const RyvenStoreTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      service: "Jasa Claim Nitro Trial",
      customer: "Customer #001",
      date: "2 days ago",
      review: "Service sangat memuaskan! Proses claim nitro trial berjalan lancar dan cepat. Highly recommended!",
      image: "https://c.top4top.io/p_3506prg6k1.jpg",
      rating: 5
    },
    {
      id: 2,
      service: "Jasa Claim Nitro Trial",
      customer: "Customer #002", 
      date: "3 days ago",
      review: "Pelayanan ramah dan profesional. Nitro trial berhasil diklaim tanpa masalah. Terima kasih!",
      image: "https://d.top4top.io/p_3506c5zjg2.jpg",
      rating: 5
    },
    {
      id: 3,
      service: "Joki Quest Discord",
      customer: "Gamer Pro",
      date: "1 week ago", 
      review: "Quest Discord selesai dengan sempurna! Sangat puas dengan hasilnya. Will order again!",
      image: "https://e.top4top.io/p_3506l56gw3.jpg",
      rating: 5
    },
    {
      id: 4,
      service: "Akun Telegram Old",
      customer: "Business Owner",
      date: "5 days ago",
      review: "Akun telegram old berkualitas tinggi. Sesuai dengan deskripsi dan berfungsi dengan baik.",
      image: "https://f.top4top.io/p_3506vcfop4.jpg", 
      rating: 5
    },
    {
      id: 5,
      service: "Joki Quest Discord",
      customer: "Discord User",
      date: "1 week ago",
      review: "Service joki quest discord sangat memuaskan. Dikerjakan dengan cepat dan hasil sempurna!",
      image: "https://g.top4top.io/p_35067ihh65.jpg",
      rating: 5
    },
    {
      id: 6,
      service: "Xbox Gamepass 1 Month", 
      customer: "Xbox Gamer",
      date: "4 days ago",
      review: "Xbox Gamepass berfungsi dengan baik selama 1 bulan penuh. Harga terjangkau dan pelayanan excellent!",
      image: "https://h.top4top.io/p_350653ezy6.jpg",
      rating: 5
    },
    {
      id: 7,
      service: "YT Premium 1 Month Invite",
      customer: "Content Creator",
      date: "6 days ago", 
      review: "YouTube Premium invite works perfectly! No ads and background play working great. Thank you!",
      image: "https://i.top4top.io/p_350631men7.jpg",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        {/* Hero Section */}
        <section id="home" className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            Welcome to Ryven Store
          </h1>
          
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Your trusted digital services provider with 99.9% success rate and thousands of satisfied customers
          </p>
          
          <StatsSection />
        </section>

        {/* Services Section */}
        <section id="services" className="mb-12">
          <ServicesSection />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Customer Testimonials
            </h2>
            <p className="text-gray-400">
              Real feedback from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="text-center">
            <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
              View More Testimonials
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-16 text-center">
          <div className="bg-black border border-gray-500 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 text-white">Ready to Order?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Contact us now for fast and reliable service
            </p>
            <div className="space-y-3">
              <a
                href="https://wa.me/628991103457"
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <span>💬</span>
                WhatsApp
              </a>
              <a
                href="https://t.me/ryven29"
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <span>📱</span>
                Telegram
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center mt-12 text-sm text-gray-400 border-t border-gray-800 pt-8">
        <div className="flex justify-center items-center gap-2 mt-1">
          <Sparkles className="text-gray-500 w-4 h-4" />
          <p>Ryven Store • © 2025 • Trusted Digital Services</p>
        </div>
      </footer>
    </div>
  );
};

export default RyvenStoreTestimonials;
