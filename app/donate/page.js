export default function Donate() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Donate</h1>
      
      {/* QRIS Image */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-sm text-center">
        <img 
          src="https://telegra.ph/file/254e5d2e9dbbd53990642.jpg" 
          alt="QRIS ALL PAYMENT" 
          className="w-full rounded-md"
        />
        <p className="mt-2 text-sm text-gray-300">QRIS ALL PAYMENT</p>
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
            <p className="text-lg font-semibold">DANA</p>
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
            <p className="text-lg font-semibold">GOPAY</p>
            <p className="text-sm text-gray-400">082159690832 (M. F**** N*** I****)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
