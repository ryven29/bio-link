
"use client";
import { useEffect, useState } from "react";

export default function Donate() {
  const [showContent, setShowContent] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "𝗗𝗢𝗡𝗔𝗧𝗘";

useEffect(() => {
  let index = 0;
  const interval = setInterval(() => {
    if (index < fullText.length) {
      setTypedText((prev) => prev + fullText[index]);
      index++;
    } else {
      clearInterval(interval);
      setShowContent(true);
    }
  }, 150);
  return () => clearInterval(interval); // prevent memory leaks
}, []);


  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 relative"
      style={{ backgroundImage: "radial-gradient(white 0.5px, transparent 1px)", backgroundSize: "15px 15px" }}>

      <h1 className="text-4xl font-bold mb-4 text-center animate-pulse">{typedText}</h1>

      {showContent && (
        <>
          <p className="text-sm text-gray-300 mb-6 animate-fade-in">
            Your support helps us keep things running smoothly. Thank you for considering a donation!
          </p>

          <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-sm text-center animate-fade-in">
            <img 
              src="https://files.catbox.moe/jzn65a.jpg" 
              alt="QRIS ALL PAYMENT" 
              className="w-full rounded-md"
            />
            <p className="mt-2 text-sm text-gray-300">𝐐𝐑𝐈𝐒 𝐀𝐋𝐋 𝐏𝐀𝐘𝐌𝐄𝐍𝐓</p>
          </div>

          <div className="mt-6 w-full max-w-sm space-y-4 animate-fade-in">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4">
              <img 
                src="https://telegra.ph/file/c605b34f0d4f0127735b4.jpg" 
                alt="Dana" 
                className="w-12 h-12 rounded-md"
              />
              <div>
                <p className="text-lg font-semibold"><b>DANA</b></p>
                <p className="text-sm text-gray-400">082159690832 (M. F**** N*** I****)</p>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4">
              <img 
                src="https://files.catbox.moe/hrnxyn.webp" 
                alt="Gopay" 
                className="w-12 h-12 rounded-md"
              />
              <div>
                <p className="text-lg font-semibold"><b>GOPAY</b></p>
                <p className="text-sm text-gray-400">082159690832 (M. F**** N*** I****)</p>
              </div>
            </div>
          </div>

          <footer className="mt-8 p-4 border border-white bg-black text-center rounded-lg animate-fade-in">
            <p className="text-white font-semibold">Thanks yang sudah Donasi! Semoga rezekinya dilancarkan.</p>
          </footer>
        </>
      )}
    </div>
  );
}
