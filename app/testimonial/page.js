'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Star, CheckCircle } from 'lucide-react'

export default function TestimonialPage() {
  const [testimonials, setTestimonials] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    image1: "",
    image2: "",
    status: "DONE",
    nominal: "",
    service: "",
    description: ""
  })

  // Load testimonials from memory (replacing localStorage)
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const defaultTestimonials = [
        {
          id: 1,
          title: "Jasa Claim Nitro Trial",
          image1: "https://c.top4top.io/p_3506prg6k1.jpg",
          image2: "https://d.top4top.io/p_3506c5zjg2.jpg",
          status: "DONE",
          nominal: "50K",
          service: "Nitro Discord Trial",
          description: "Claim Nitro Discord berhasil dengan cepat dan aman"
        },
        {
          id: 2,
          title: "Joki Quest Discord",
          image1: "https://e.top4top.io/p_3506l56gw3.jpg",
          image2: "https://g.top4top.io/p_35067ihh65.jpg",
          status: "DONE",
          nominal: "25K",
          service: "Quest Discord Server",
          description: "Joki quest berhasil selesai dalam waktu record"
        },
        {
          id: 3,
          title: "Akun Telegram Old",
          image1: "https://f.top4top.io/p_3506vcfop4.jpg",
          image2: "",
          status: "DONE",
          nominal: "100K",
          service: "Telegram Account",
          description: "Akun telegram old berkualitas premium"
        },
        {
          id: 4,
          title: "Xbox Gamepass 1 Month",
          image1: "https://h.top4top.io/p_350653ezy6.jpg",
          image2: "",
          status: "DONE",
          nominal: "75K",
          service: "Xbox Game Pass",
          description: "Gamepass 1 bulan aktif penuh"
        },
        {
          id: 5,
          title: "YT Premium 1 Month Invite",
          image1: "https://i.top4top.io/p_350631men7.jpg",
          image2: "",
          status: "DONE",
          nominal: "30K",
          service: "YouTube Premium",
          description: "YT Premium 1 bulan invite working 100%"
        }
      ]
      setTestimonials(defaultTestimonials)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Check if user is admin
  useEffect(() => {
    // In a real app, this would check actual authentication
    // For demo purposes, we'll make it accessible
    setIsAdmin(true)
  }, [])

  const handleAddTestimonial = () => {
    if (!formData.title || !formData.image1) return
    
    const newTestimonial = {
      id: Date.now(),
      ...formData
    }
    
    setTestimonials(prev => [...prev, newTestimonial])
    resetForm()
  }

  const handleEditTestimonial = (id) => {
    const testimonial = testimonials.find(t => t.id === id)
    setFormData(testimonial)
    setEditingId(id)
    setShowAddForm(true)
  }

  const handleUpdateTestimonial = () => {
    const updatedTestimonials = testimonials.map(t => 
      t.id === editingId ? { ...formData, id: editingId } : t
    )
    setTestimonials(updatedTestimonials)
    resetForm()
  }

  const handleDeleteTestimonial = (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      image1: "",
      image2: "",
      status: "DONE",
      nominal: "",
      service: "",
      description: ""
    })
    setEditingId(null)
    setShowAddForm(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      handleUpdateTestimonial()
    } else {
      handleAddTestimonial()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-cyan-300">LOADING</p>
            <p className="text-cyan-400">Memuat testimoni...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Cyberpunk Scanline Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"></div>
      
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mr-6 animate-pulse">
                <span className="text-3xl font-bold text-white">R</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-30 blur animate-pulse"></div>
            </div>
            
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400" 
                  style={{
                    background: 'linear-gradient(45deg, #06b6d4, #a855f7, #06b6d4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                RYVEN STORE
              </h1>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-2"></div>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center ml-6 animate-pulse">
                <span className="text-3xl font-bold text-white">S</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full opacity-30 blur animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-2xl text-cyan-300 font-semibold tracking-wider">TESTIMONI TRANSAKSI</p>
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Kepercayaan customer adalah prioritas utama kami. Lihat testimoni dari customer yang puas dengan layanan kami.
            </p>
          </div>
        </div>
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="container mx-auto px-4 mb-8">
          <div className="flex justify-center">
            <button
              onClick={() => setShowAddForm(true)}
              className="group flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              Tambah Testimoni Baru
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-cyan-500/30 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-cyan-400">
                {editingId ? 'Edit Testimoni' : 'Tambah Testimoni'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-2">Judul Testimoni</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Masukkan judul testimoni"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-2">Gambar Utama (URL)</label>
                <input
                  type="url"
                  value={formData.image1}
                  onChange={(e) => setFormData({...formData, image1: e.target.value})}
                  className="w-full bg-slate-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-2">Gambar Kedua (URL) - Opsional</label>
                <input
                  type="url"
                  value={formData.image2}
                  onChange={(e) => setFormData({...formData, image2: e.target.value})}
                  className="w-full bg-slate-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="https://example.com/image2.jpg"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-cyan-300 mb-2">Nominal</label>
                  <input
                    type="text"
                    value={formData.nominal}
                    onChange={(e) => setFormData({...formData, nominal: e.target.value})}
                    className="w-full bg-slate-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="50K"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-cyan-300 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-slate-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  >
                    <option value="DONE">DONE</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-2">Layanan</label>
                <input
                  type="text"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full bg-slate-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  placeholder="Contoh: Discord Nitro"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-2">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                  rows="3"
                  placeholder="Deskripsi detail tentang testimoni..."
                />
              </div>
              
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                {editingId ? 'Update Testimoni' : 'Tambah Testimoni'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group bg-slate-800/30 backdrop-blur-md rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl relative animate-pulse"
            >
              {/* Admin Controls */}
              {isAdmin && (
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTestimonial(testimonial.id)}
                      className="w-8 h-8 bg-cyan-500/80 hover:bg-cyan-500 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <Edit size={14} className="text-white" />
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="w-8 h-8 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <Trash2 size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="relative p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-white">R</span>
                  </div>
                  <h3 className="text-lg font-bold text-cyan-300 text-center flex-1 mx-4">
                    {testimonial.title}
                  </h3>
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-white">S</span>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="relative p-6">
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 relative group/img">
                    <img
                      src={testimonial.image1}
                      alt="Testimoni 1"
                      className="w-full h-36 object-cover rounded-xl border border-cyan-500/20 transition-all duration-300 group-hover/img:border-cyan-400/50"
                      onError={(e) => {
                        e.target.src = 'https://c.top4top.io/p_3506prg6k1.jpg'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"></div>
                  </div>
                  {testimonial.image2 && (
                    <div className="flex-1 relative group/img">
                      <img
                        src={testimonial.image2}
                        alt="Testimoni 2"
                        className="w-full h-36 object-cover rounded-xl border border-cyan-500/20 transition-all duration-300 group-hover/img:border-cyan-400/50"
                        onError={(e) => {
                          e.target.src = 'https://d.top4top.io/p_3506c5zjg2.jpg'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"></div>
                    </div>
                  )}
                </div>
                
                {/* Center Logo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border-4 border-cyan-400/30">
                    <span className="text-2xl font-bold text-slate-800">R</span>
                  </div>
                </div>
              </div>

              {/* Thank you banner */}
              <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-center py-3 px-6">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle size={18} />
                  <p className="font-semibold tracking-wide">TERIMA KASIH TELAH BERTRANSAKSI</p>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-300 font-semibold text-sm">LAYANAN:</span>
                    <span className="text-white font-medium">{testimonial.service}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-300 font-semibold text-sm">NOMINAL:</span>
                    <span className="text-green-400 font-bold">{testimonial.nominal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-300 font-semibold text-sm">STATUS:</span>
                    <span className={`font-bold px-3 py-1 rounded-full text-xs ${
                      testimonial.status === 'DONE' ? 'bg-green-500/20 text-green-400' :
                      testimonial.status === 'PROCESSING' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {testimonial.status}
                    </span>
                  </div>
                </div>
                
                {testimonial.description && (
                  <div className="pt-3 border-t border-slate-700/50">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {testimonial.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 bg-slate-700/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">R</span>
                  </div>
                  <span className="text-cyan-300 font-semibold">ryven store</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-12 border-t border-cyan-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">R</span>
            </div>
            <h2 className="text-2xl font-bold text-cyan-300 ml-4">RYVEN STORE</h2>
          </div>
          <p className="text-gray-400 mb-4">Layanan digital terpercaya dengan ribuan customer puas</p>
          <div className="flex justify-center space-x-6 text-cyan-300">
            <span>🎮 Gaming Services</span>
            <span>💬 Social Media</span>
            <span>📱 Digital Accounts</span>
          </div>
        </div>
      </div>
    </div>
  )
}
