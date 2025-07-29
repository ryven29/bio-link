"use client"

import React from "react"

const games = [
  {
    name: "Mobile Legends",
    description: "Top up diamond Mobile Legends dengan harga terbaik.",
    image: "https://static.wikia.nocookie.net/mobile-legends/images/2/27/Mobile_Legends_New_Logo.png",
  },
  {
    name: "Free Fire",
    description: "Top up diamond Free Fire cepat & aman.",
    image: "https://cdn.duniagames.co.id/community/202103/article/1616426063624cbcd7efdc5.jpg",
  },
  {
    name: "PUBG",
    description: "Top up UC PUBG Mobile instan & terpercaya.",
    image: "https://seeklogo.com/images/P/pubg-mobile-logo-8B67FDC5FA-seeklogo.com.png",
  },
]

export default function TopUpPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Top Up Game</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {games.map((game) => (
          <div
            key={game.name}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-40 object-contain bg-white p-2"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{game.name}</h2>
              <p className="text-sm text-gray-300 mt-2">{game.description}</p>
              <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg">
                Top Up Sekarang
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
