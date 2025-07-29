"use client"

import React, { useState } from "react"
import { Star, Shield, Zap, Users, Award, CheckCircle, Clock, Gamepad2 } from "lucide-react"

const games = [
  {
    name: "Mobile Legends",
    description: "Top up diamond Mobile Legends dengan harga terbaik.",
    icon: "⚔️",
    image: "https://files.catbox.moe/jtzb9p.webp",
    totalTopups: "150K+",
    packages: [
      { name: "5 Diamonds", price: 10000 },
      { name: "12 Diamonds", price: 20000 },
      { name: "28 Diamonds", price: 40000 },
      { name: "59 Diamonds", price: 80000 },
      { name: "170 Diamonds", price: 200000 },
    ]
  },
  {
    name: "Free Fire",
    description: "Top up diamond Free Fire cepat & aman.",
    icon: "🔥",
    image: "https://files.catbox.moe/88vkwh.jpg",
    totalTopups: "200K+",
    packages: [
      { name: "5 Diamonds", price: 10000 },
      { name: "12 Diamonds", price: 20000 },
      { name: "50 Diamonds", price: 75000 },
      { name: "100 Diamonds", price: 140000 },
      { name: "200 Diamonds", price: 270000 },
    ]
  },
  {
    name: "PUBG",
    description: "Top up UC PUBG Mobile instan & terpercaya.",
    icon: "🎯",
    image: "https://files.catbox.moe/hxy4br.jpeg",
    totalTopups: "120K+",
    packages: [
      { name: "60 UC", price: 12000 },
      { name: "325 UC", price: 60000 },
      { name: "660 UC", price: 120000 },
      { name: "1800 UC", price: 300000 },
      { name: "3600 UC", price: 600000 },
    ]
  },
]

const whyChooseUs = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Proses Instan",
    description: "Top up langsung masuk dalam hitungan detik"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "100% Aman",
    description: "Sistem keamanan berlapis dengan enkripsi tingkat militer"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Harga Terbaik",
    description: "Dijamin harga termurah dengan kualitas premium"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "24/7 Support",
    description: "Customer service siap membantu kapan saja"
  }
]

const testimonials = [
  {
    name: "Gaming_Pro123",
    rating: 5,
    comment: "Top up super cepat! Dalam 10 detik diamond langsung masuk. Recommended banget!",
    game: "Mobile Legends"
  },
  {
    name: "FireMaster88",
    rating: 5,
    comment: "Udah langganan di Ryven Store, selalu aman dan murah. Gak pernah kecewa!",
    game: "Free Fire"
  },
  {
    name: "PUBGKing99",
    rating: 5,
    comment: "Pelayanan terbaik! CS nya ramah dan responsif. Pasti balik lagi.",
    game: "PUBG Mobile"
  }
]

export default function RyvenStore() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTopUpClick = (game) => {
    setSelectedGame(game);
    setSelectedPackage(null);
    setIsSuccess(false);
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setSelectedGame(null);
        setSelectedPackage(null);
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-black text-white relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 px-4 py-6 md:px-6">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gamepad2 className="w-12 h-12 text-cyan-400 mr-4 flex-shrink-0" />
            <h1 className="text-4xl md:text-6xl font-black whitespace-nowrap">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                RYVEN
              </span>
              <span className="text-white ml-2">STORE</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Platform top up gaming terpercaya dengan teknologi cyber security terdepan
          </p>
          <div className="flex justify-center items-center flex-wrap gap-4 md:gap-8 mt-6 text-sm">
            <div className="flex items-center">
              <Users className="w-4 h-4 text-cyan-400 mr-2" />
              <span>500K+ Gamers</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-2" fill="currentColor" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-green-400 mr-2" />
              <span>24/7 Online</span>
            </div>
          </div>
        </header>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Mengapa Pilih Ryven Store?
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/50 to-blue-900/20 p-6 rounded-xl border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 group">
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-cyan-300">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Games Section */}
        <section className="mb-16 pb-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Pilih Game Favoritmu
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
            {games.map((game) => (
              <div
                key={game.name}
                className="bg-gradient-to-br from-slate-800/80 to-blue-900/40 rounded-xl overflow-hidden border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-400/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 group"
              >
                <div className="relative">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-40 object-contain bg-gradient-to-br from-white to-gray-100 p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 text-3xl">{game.icon}</div>
                  <div className="absolute bottom-2 left-2 bg-cyan-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-400/30">
                    <span className="text-xs text-cyan-300 font-semibold">{game.totalTopups} Top Ups</span>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-2 text-cyan-300">{game.name}</h2>
                  <p className="text-sm text-gray-300 mb-4">{game.description}</p>
                  <button 
                    onClick={() => handleTopUpClick(game)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Top Up Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Testimoni Gamers
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto px-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/50 to-blue-900/20 p-6 rounded-xl border border-cyan-500/20 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-cyan-300 font-semibold">{testimonial.name}</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">"{testimonial.comment}"</p>
                <div className="text-xs text-cyan-400">Game: {testimonial.game}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal for package selection */}
        {selectedGame && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-gradient-to-br from-slate-800/90 to-blue-900/60 rounded-xl max-w-md w-full p-6 relative transform transition-all duration-300 scale-95 animate-scale-in border border-cyan-500/30 backdrop-blur-md">
              <button 
                onClick={() => setSelectedGame(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 text-xl font-bold"
              >
                ✕
              </button>
              
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">{selectedGame.icon}</div>
                <h2 className="text-2xl font-bold text-cyan-400">{selectedGame.name}</h2>
                <p className="text-sm text-gray-300">Packages</p>
              </div>
              
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {selectedGame.packages.map((pkg, index) => (
                  <div 
                    key={index}
                    onClick={() => handlePackageSelect(pkg)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedPackage?.name === pkg.name 
                        ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
                        : 'border-gray-600 hover:border-cyan-400/50 hover:bg-cyan-500/5'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-cyan-300">{pkg.name}</span>
                      <span className="text-cyan-400 font-bold">{formatPrice(pkg.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedPackage && (
                <div className="animate-fade-in">
                  <div className="bg-gradient-to-r from-slate-700/50 to-blue-800/30 p-4 rounded-lg mb-4 border border-cyan-500/20">
                    <h3 className="font-bold mb-2 text-cyan-300 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Order Summary
                    </h3>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Game:</span>
                      <span className="text-cyan-300">{selectedGame.name}</span>
                    </div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Item:</span>
                      <span className="text-cyan-300">{selectedPackage.name}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-cyan-500/20 pt-2">
                      <span>Total:</span>
                      <span className="text-cyan-400">{formatPrice(selectedPackage.price)}</span>
                    </div>
                  </div>
                  
                  {!isSuccess ? (
                    <button
                      onClick={handleConfirmPayment}
                      disabled={isProcessing}
                      className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center ${
                        isProcessing 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/30'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Confirm Payment
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-lg text-center animate-fade-in border border-green-400/30 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      Payment Successful! Top up sedang diproses...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.5);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.7);
        }
      `}</style>
    </main>
  )
}
