"use client";
import { useEffect, useState } from "react";

export default function Donate() {
  const [showContent, setShowContent] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = [..."𝗗𝗢𝗡𝗔𝗧𝗘"]; // ✅ FIXED: Unicode-safe split

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

      <h1 className="text-4xl font-bold mb-4 text-center animate__animated animate__fadeInDown text-white drop-shadow-lg transition-all duration-500 ease-in-out">
        {typedText}
      </h1>

      {showContent && (
        <>
          <p className="text-sm text-gray-300 mb-6 animate__animated animate__fadeIn animate__delay-1s text-center">
            Your support helps us keep things running smoothly. Thank you for considering a donation!
          </p>

          {/* ... lanjut konten lainnya seperti sebelumnya ... */}
        </>
      )}
    </div>
  );
}
