// page.js
import Header from './Header';

export default function Donate() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 relative pt-20" style={{ backgroundImage: "radial-gradient(white 0.5px, transparent 1px)", backgroundSize: "15px 15px" }}>
        <h1 className="text-3xl font-bold mb-4 animate__animated animate__fadeInDown">𝗗𝗢𝗡𝗔𝗧𝗘</h1>
        
        {/* QRIS Image */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-sm text-center animate__animated animate__fadeIn animate__delay-1s transform hover:scale-105 transition-transform duration-300">
          <img 
            src="https://files.catbox.moe/jzn65a.jpg" 
            alt="QRIS ALL PAYMENT" 
            className="w-full rounded-md hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          />
          <p className="mt-2 text-sm text-gray-300 animate__animated animate__fadeIn animate__delay-2s">𝐐𝐑𝐈𝐒 𝐀𝐋𝐋 𝐏𝐀𝐘𝐌𝐄𝐍𝐓</p>
        </div>
        
        {/* Payment List */}
        <div className="mt-6 w-full max-w-sm space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4 animate__animated animate__fadeInLeft animate__delay-2s hover:bg-gray-700 transition-all duration-300 group">
            <div className="relative">
              <img 
                src="https://telegra.ph/file/c605b34f0d4f0127735b4.jpg" 
                alt="Dana" 
                className="w-12 h-12 rounded-md group-hover:rotate-6 transition-transform duration-300"
              />
              <div className="absolute -inset-1 bg-blue-500 rounded-md blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div>
              <p className="text-lg font-semibold group-hover:text-blue-400 transition-colors duration-300"><b>DANA</b></p>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">082159690832 (M. F**** N*** I****)</p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4 animate__animated animate__fadeInRight animate__delay-2s hover:bg-gray-700 transition-all duration-300 group">
            <div className="relative">
              <img 
                src="https://files.catbox.moe/hrnxyn.webp" 
                alt="Gopay" 
                className="w-12 h-12 rounded-md group-hover:-rotate-6 transition-transform duration-300"
              />
              <div className="absolute -inset-1 bg-green-500 rounded-md blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div>
              <p className="text-lg font-semibold group-hover:text-green-400 transition-colors duration-300"><b>GOPAY</b></p>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">082159690832 (M. F**** N*** I****)</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 p-4 border border-white bg-black text-center rounded-lg animate__animated animate__fadeInUp animate__delay-3s hover:shadow-lg hover:shadow-white/10 transition-all duration-300">
          <p className="text-white font-semibold animate__animated animate__pulse animate__infinite animate__slower">Thanks yang sudah Donasi! Semoga rezekinya dilancarkan.</p>
        </footer>
      </div>
    </>
  );
}
