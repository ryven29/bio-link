"use client"

import React, { useState } from "react"

const games = [
  {
    name: "Mobile Legends",
    description: "Top up diamond Mobile Legends dengan harga terbaik.",
    image: "https://static.wikia.nocookie.net/mobile-legends/images/2/27/Mobile_Legends_New_Logo.png",
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
    image: "https://cdn.duniagames.co.id/community/202103/article/1616426063624cbcd7efdc5.jpg",
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
    image: "https://seeklogo.com/images/P/pubg-mobile-logo-8B67FDC5FA-seeklogo.com.png",
    packages: [
      { name: "60 UC", price: 12000 },
      { name: "325 UC", price: 60000 },
      { name: "660 UC", price: 120000 },
      { name: "1800 UC", price: 300000 },
      { name: "3600 UC", price: 600000 },
    ]
  },
]

export default function TopUpPage() {
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
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setSelectedGame(null);
        setSelectedPackage(null);
      }, 2000);
    }, 1500);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10 animate-fade-in">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
          Top Up Game
        </span>
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {games.map((game) => (
          <div
            key={game.name}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative group"
          >
            <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-40 object-contain bg-white p-2 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="p-5">
              <h2 className="text-xl font-bold mb-2">{game.name}</h2>
              <p className="text-sm text-gray-300 mb-4">{game.description}</p>
              <button 
                onClick={() => handleTopUpClick(game)}
                className="w-full mt-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Top Up Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for package selection */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 relative transform transition-all duration-300 scale-95 animate-scale-in">
            <button 
              onClick={() => setSelectedGame(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">{selectedGame.name} Packages</h2>
            
            <div className="space-y-3 mb-6">
              {selectedGame.packages.map((pkg, index) => (
                <div 
                  key={index}
                  onClick={() => handlePackageSelect(pkg)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedPackage?.name === pkg.name ? 'border-yellow-500 bg-gray-700' : 'border-gray-600 hover:border-yellow-400'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{pkg.name}</span>
                    <span className="text-yellow-400 font-bold">{formatPrice(pkg.price)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedPackage && (
              <div className="animate-fade-in">
                <div className="bg-gray-700 p-4 rounded-lg mb-4">
                  <h3 className="font-bold mb-2">Order Summary</h3>
                  <div className="flex justify-between mb-1">
                    <span>Item:</span>
                    <span>{selectedPackage.name}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-yellow-400">{formatPrice(selectedPackage.price)}</span>
                  </div>
                </div>
                
                {!isSuccess ? (
                  <button
                    onClick={handleConfirmPayment}
                    disabled={isProcessing}
                    className={`w-full py-3 rounded-lg font-bold transition-all ${isProcessing ? 'bg-gray-600' : 'bg-yellow-500 hover:bg-yellow-600 text-black'}`}
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Payment'}
                  </button>
                ) : (
                  <div className="bg-green-600 text-white p-3 rounded-lg text-center animate-fade-in">
                    ✅ Payment Successful!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Add some animated floating elements for decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-yellow-500 opacity-10"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }
      `}</style>
    </main>
  )
}
