"use client";
import { useEffect, useState } from "react";

export default function Donate() {
  const [showContent, setShowContent] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Donasi";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText[index]);
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 150);
    setTimeout(() => setShowContent(true), 1200);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 relative overflow-hidden"
      style={{ backgroundImage: "radial-gradient(white 0.5px, transparent 1px)", backgroundSize: "15px 15px" }}>

      {/* Animasi teks ketik + glow */}
      <h1 className="text-4xl font-bold mb-4 text-center animate__animated animate__fadeInDown text-white drop-shadow-lg transition-all duration-500 ease-in-out">
        {typedText}
      </h1>

      {showContent && (
        <>
          <p className="text-sm text-gray-300 mb-6 animate__animated animate__fadeIn animate__delay-1s text-center">
            Your support helps us keep things running smoothly. Thank you for considering a donation!
          </p>

          <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-sm text-center animate__animated animate__zoomIn animate__delay-2s">
            <img 
              src="https://files.catbox.moe/jzn65a.jpg" 
              alt="QRIS ALL PAYMENT" 
              className="w-full rounded-md"
            />
            <p className="mt-2 text-sm text-gray-300 font-semibold">𝐐𝐑𝐈𝐒 𝐀𝐋𝐋 𝐏𝐀𝐘𝐌𝐄𝐍𝐓</p>
          </div>

          <div className="mt-6 w-full max-w-sm space-y-4">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4 animate__animated animate__fadeInLeft animate__delay-3s">
              <img 
                src="https://telegra.ph/file/c605b34f0d4f0127735b4.jpg" 
                alt="Dana" 
                className="w-12 h-12 rounded-md"
              />
              <div>
                <p className="text-lg font-semibold">DANA</p>
                <p className="text-sm text-gray-400">082159690832 (M. F**** N*** I****)</p>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4 animate__animated animate__fadeInRight animate__delay-4s">
              <img 
                src="https://files.catbox.moe/hrnxyn.webp" 
                alt="Gopay" 
                className="w-12 h-12 rounded-md"
              />
              <div>
                <p className="text-lg font-semibold">GOPAY</p>
                <p className="text-sm text-gray-400">082159690832 (M. F**** N*** I****)</p>
              </div>
            </div>
          </div>

          <footer className="mt-8 p-4 border border-white bg-black text-center rounded-lg animate__animated animate__bounceInUp animate__delay-5s">
            <p className="text-white font-semibold">Thanks yang sudah Donasi! Semoga rezekinya dilancarkan.</p>
          </footer>
        </>
      )}
    </div>
  );
}
