"use client"

import "./globals.css"
import { useState, useEffect } from "react"
import Profile from "./components/Profile"
import Links from "./components/Links"
import Loading from "./components/Loading"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [showTopUpModal, setShowTopUpModal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(null)

  // Top up packages (in IDR)
  const topUpPackages = [
    { id: 1, amount: 10, price: 10000, bonus: 0 },
    { id: 2, amount: 25, price: 25000, bonus: 5 },
    { id: 3, amount: 50, price: 50000, bonus: 10 },
    { id: 4, amount: 100, price: 100000, bonus: 25 },
    { id: 5, amount: 250, price: 250000, bonus: 75 },
    { id: 6, amount: 500, price: 500000, bonus: 200 },
  ]

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault()
      alert("inspect this bio is not allowed :)\nRyven")
    }
    document.addEventListener("contextmenu", handleContextMenu)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  const handleTopUpClick = () => {
    setShowTopUpModal(true)
  }

  const handleCloseModal = () => {
    setShowTopUpModal(false)
    setSelectedAmount(null)
  }

  const handlePayment = () => {
    // Here you would normally integrate with payment gateway
    alert(`Processing payment for ${selectedAmount.amount} coins (Rp ${selectedAmount.price.toLocaleString()})`)
    handleCloseModal()
  }

  return (
    <main className="min-h-screen">
      <div className="grid-bg flex flex-col items-center justify-center px-4 py-20">
        {!loadingComplete ? (
          <Loading onLoadComplete={() => setLoadingComplete(true)} />
        ) : (
          <>
            <Header />
            <Profile />
            <Links onTopUpClick={handleTopUpClick} />
            <Footer />
          </>
        )}
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 border border-purple-500 animate-slideUp">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Top Up Coins</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {topUpPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedAmount(pkg)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                    selectedAmount?.id === pkg.id
                      ? "border-purple-500 bg-purple-900 bg-opacity-30"
                      : "border-gray-700 hover:border-purple-400"
                  }`}
                >
                  <div className="font-bold text-white text-center">{pkg.amount} Coins</div>
                  <div className="text-sm text-center text-gray-300">Rp {pkg.price.toLocaleString()}</div>
                  {pkg.bonus > 0 && (
                    <div className="text-xs text-center text-purple-300 mt-1">+{pkg.bonus} Bonus</div>
                  )}
                </div>
              ))}
            </div>
            
            {selectedAmount && (
              <div className="bg-gray-800 rounded-lg p-4 mb-4 animate-fadeIn">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Amount:</span>
                  <span className="font-bold text-white">{selectedAmount.amount} Coins</span>
                </div>
                {selectedAmount.bonus > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Bonus:</span>
                    <span className="font-bold text-purple-300">+{selectedAmount.bonus} Coins</span>
                  </div>
                )}
                <div className="flex justify-between text-lg">
                  <span className="text-gray-300">Total:</span>
                  <span className="font-bold text-white">
                    {selectedAmount.amount + selectedAmount.bonus} Coins
                  </span>
                </div>
              </div>
            )}
            
            <button
              onClick={handlePayment}
              disabled={!selectedAmount}
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                selectedAmount
                  ? "bg-purple-600 hover:bg-purple-700 hover:scale-[1.02] active:scale-95"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              {selectedAmount ? `Pay Rp ${selectedAmount.price.toLocaleString()}` : "Select Amount"}
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
