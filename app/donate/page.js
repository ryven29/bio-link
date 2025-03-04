export default function Donate() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 relative" style={{ backgroundImage: "radial-gradient(white 0.5px, transparent 1px)", backgroundSize: "15px 15px" }}>
      <h1 className="text-3xl font-bold mb-4">𝗗𝗢𝗡𝗔𝗧𝗘</h1>
      
      {/* QRIS Image */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-sm text-center">
        <img 
          src="https://telegra.ph/file/254e5d2e9dbbd53990642.jpg" 
          alt="QRIS ALL PAYMENT" 
          className="w-full rounded-md"
        />
        <p className="mt-2 text-sm text-gray-300">𝐐𝐑𝐈𝐒 𝐀𝐋𝐋 𝐏𝐀𝐘𝐌𝐄𝐍𝐓</p>
      </div>
      
      {/* Payment List */}
      <div className="mt-6 w-full max-w-sm">
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
        
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4 mt-4">
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

      {/* Footer */}
      <footer className="mt-8 p-4 border border-white bg-black text-center rounded-lg">
        <p className="text-white font-semibold">Thanks yang sudah Donasi! Semoga rezekinya dilancarkan.</p>
      </footer>
    </div>
  );
}
