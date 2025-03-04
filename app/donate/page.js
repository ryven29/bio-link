import React from 'react';

export default function Donate() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-center text-yellow-400">DONASI</h1>
          
          <div className="flex flex-col items-center">
            <img 
              src="https://telegra.ph/file/662564e95a8fe4c21cb33.jpg" 
              alt="QRIS Payment" 
              className="w-64 h-auto rounded-md mb-2"
            />
            <p className="text-xl font-medium text-center">QRIS</p>
          </div>
          
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3 text-center text-yellow-400">List Pembayaran</h2>
            <ul className="space-y-4">
              <li className="bg-gray-800 p-4 rounded-md">
                <div className="flex flex-col">
                  <span className="font-bold text-yellow-400">DANA</span>
                  <span className="text-gray-200">082159690832</span>
                  <span className="text-sm text-gray-400">(M. F**** N*** I****)</span>
                </div>
              </li>
              <li className="bg-gray-800 p-4 rounded-md">
                <div className="flex flex-col">
                  <span className="font-bold text-yellow-400">GOPAY</span>
                  <span className="text-gray-200">082159690832</span>
                  <span className="text-sm text-gray-400">(M. F**** N*** I****)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 text-center">
          <p className="text-sm">Terima Kasih Atas Donasi Anda</p>
        </div>
      </div>
    </div>
  );
}
