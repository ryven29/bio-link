'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

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

  // Load testimonials from localStorage
  useEffect(() => {
    try {
      const savedTestimonials = localStorage.getItem('ryven-testimonials')
      if (savedTestimonials) {
        setTestimonials(JSON.parse(savedTestimonials))
      } else {
        // Default testimonials
        const defaultTestimonials = [
          {
            id: 1,
            title: "Jasa Claim Nitro Trial",
            image1: "https://c.top4top.io/p_3506prg6k1.jpg",
            image2: "https://d.top4top.io/p_3506c5zjg2.jpg",
            status: "DONE",
            nominal: "50K",
            service: "Nitro Discord Trial",
            description: "Claim Nitro Discord berhasil"
          },
          {
            id: 2,
            title: "Joki Quest Discord",
            image1: "https://e.top4top.io/p_3506l56gw3.jpg",
            image2: "https://g.top4top.io/p_35067ihh65.jpg",
            status: "DONE",
            nominal: "25K",
            service: "Quest Discord Server",
            description: "Joki quest berhasil selesai"
          },
          {
            id: 3,
            title: "Akun Telegram Old",
            image1: "https://f.top4top.io/p_3506vcfop4.jpg",
            image2: "",
            status: "DONE",
            nominal: "100K",
            service: "Telegram Account",
            description: "Akun telegram old berkualitas"
          },
          {
            id: 4,
            title: "Xbox Gamepass 1 Month",
            image1: "https://h.top4top.io/p_350653ezy6.jpg",
            image2: "",
            status: "DONE",
            nominal: "75K",
            service: "Xbox Game Pass",
            description: "Gamepass 1 bulan aktif"
          },
          {
            id: 5,
            title: "YT Premium 1 Month Invite",
            image1: "https://i.top4top.io/p_350631men7.jpg",
            image2: "",
            status: "DONE",
            nominal: "30K",
            service: "YouTube Premium",
            description: "YT Premium 1 bulan invite"
          }
        ]
        setTestimonials(defaultTestimonials)
        localStorage.setItem('ryven-testimonials', JSON.stringify(defaultTestimonials))
      }
    } catch (error) {
      console.error('Error loading testimonials:', error)
      // Fallback to default testimonials
      const defaultTestimonials = [
        {
          id: 1,
          title: "Jasa Claim Nitro Trial",
          image1: "https://c.top4top.io/p_3506prg6k1.jpg",
          image2: "https://d.top4top.io/p_3506c5zjg2.jpg",
          status: "DONE",
          nominal: "50K",
          service: "Nitro Discord Trial",
          description: "Claim Nitro Discord berhasil"
        },
        {
          id: 2,
          title: "Joki Quest Discord",
          image1: "https://e.top4top.io/p_3506l56gw3.jpg",
          image2: "https://g.top4top.io/p_35067ihh65.jpg",
          status: "DONE",
          nominal: "25K",
          service: "Quest Discord Server",
          description: "Joki quest berhasil selesai"
        },
        {
          id: 3,
          title: "Akun Telegram Old",
          image1: "https://f.top4top.io/p_3506vcfop4.jpg",
          image2: "",
          status: "DONE",
          nominal: "100K",
          service: "Telegram Account",
          description: "Akun telegram old berkualitas"
        },
        {
          id: 4,
          title: "Xbox Gamepass 1 Month",
          image1: "https://h.top4top.io/p_350653ezy6.jpg",
          image2: "",
          status: "DONE",
          nominal: "75K",
          service: "Xbox Game Pass",
          description: "Gamepass 1 bulan aktif"
        },
        {
          id: 5,
          title: "YT Premium 1 Month Invite",
          image1: "https://i.top4top.io/p_350631men7.jpg",
          image2: "",
          status: "DONE",
          nominal: "30K",
          service: "YouTube Premium",
          description: "YT Premium 1 bulan invite"
        }
      ]
      setTestimonials(defaultTestimonials)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Check if user is admin (you can modify this logic)
  useEffect(() => {
    try {
      const adminKey = localStorage.getItem('ryven-admin')
      if (adminKey === 'ryven2024') {
        setIsAdmin(true)
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
    }
  }, [])

  const handleAddTestimonial = () => {
    if (!formData.title || !formData.image1) return
    
    const newTestimonial = {
      id: Date.now(),
      ...formData
    }
    
    setTestimonials([...testimonials, newTestimonial])
    try {
      localStorage.setItem('ryven-testimonials', JSON.stringify([...testimonials, newTestimonial]))
    } catch (error) {
      console.error('Error saving testimonial:', error)
    }
    setFormData({
      title: "",
      image1: "",
      image2: "",
      status: "DONE",
      nominal: "",
      service: "",
      description: ""
    })
    setShowAddForm(false)
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
    try {
      localStorage.setItem('ryven-testimonials', JSON.stringify(updatedTestimonials))
    } catch (error) {
      console.error('Error updating testimonial:', error)
    }
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

  const handleDeleteTestimonial = (id) => {
    const filteredTestimonials = testimonials.filter(t => t.id !== id)
    setTestimonials(filteredTestimonials)
    try {
      localStorage.setItem('ryven-testimonials', JSON.stringify(filteredTestimonials))
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    }
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
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Cyberpunk Scanline Effect */}
      <div className="scanline"></div>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-white">R</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                RYVEN STORE
              </h1>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center ml-4">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
            </div>
            <p className="text-xl text-cyan-300 mb-8">TESTIMONI TRANSAKSI</p>
          </motion.div>
        </div>
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="container mx-auto px-4 mb-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Plus size={20} />
              Tambah Testimoni
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-cyan-500/30"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-cyan-400">
                {editingId ? 'Edit Testimoni' : 'Tambah Testimoni'}
              </h3>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingId(null)
                  setFormData({
                    title: "",
                    image1: "",
                    image2: "",
                    status: "DONE",
                    nominal: "",
                    service: "",
                    description: ""
                  })
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Judul</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-700 border border-cyan-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Gambar 1 (URL)</label>
                <input
                  type="url"
                  value={formData.image1}
                  onChange={(e) => setFormData({...formData, image1: e.target.value})}
                  className="w-full bg-slate-700 border border-cyan-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Gambar 2 (URL) - Opsional</label>
                <input
                  type="url"
                  value={formData.image2}
                  onChange={(e) => setFormData({...formData, image2: e.target.value})}
                  className="w-full bg-slate-700 border border-cyan-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Nominal</label>
                <input
                  type="text"
                  value={formData.nominal}
                  onChange={(e) => setFormData({...formData, nominal: e.target.value})}
                  className="w-full bg-slate-700 border border-cyan-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  placeholder="Contoh: 50K"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Layanan</label>
                <input
                  type="text"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full bg-slate-700 border border-cyan-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">Deskripsi</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-700 border border-cyan-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  rows="3"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
              >
                {editingId ? 'Update Testimoni' : 'Tambah Testimoni'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Testimonials Grid */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-105"
            >
              {/* Header */}
              <div className="relative p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">R</span>
                  </div>
                  <h3 className="text-lg font-bold text-cyan-300 text-center flex-1 mx-4">
                    {testimonial.title}
                  </h3>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">S</span>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="relative p-4">
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 relative">
                    <img
                      src={testimonial.image1}
                      alt="Testimoni 1"
                      className="w-full h-32 object-cover rounded-lg border border-cyan-500/30"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                  </div>
                  {testimonial.image2 && (
                    <div className="flex-1 relative">
                      <img
                        src={testimonial.image2}
                        alt="Testimoni 2"
                        className="w-full h-32 object-cover rounded-lg border border-cyan-500/30"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                    </div>
                  )}
                </div>
                
                {/* Overlay R logo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-slate-800">R</span>
                  </div>
                </div>
              </div>

              {/* Thank you banner */}
              <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-center py-2 px-4">
                <p className="text-sm font-semibold">TRIMAKASIH TELAH BERTRANSAKSI</p>
              </div>

              {/* Details */}
              <div className="p-4 space-y-2">
                <div className="text-sm">
                  <span className="text-cyan-300 font-semibold">BARANG:</span> {testimonial.service}
                </div>
                <div className="text-sm">
                  <span className="text-cyan-300 font-semibold">NOMINAL:</span> {testimonial.nominal}
                </div>
                <div className="text-sm">
                  <span className="text-cyan-300 font-semibold">STATUS:</span> {testimonial.status}
                </div>
                {testimonial.description && (
                  <div className="text-sm text-gray-300">
                    {testimonial.description}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-700/50 flex items-center justify-between">
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">R</span>
                </div>
                <span className="text-sm text-cyan-300">ryven</span>
              </div>

              {/* Admin Controls */}
              {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => handleEditTestimonial(testimonial.id)}
                    className="w-8 h-8 bg-cyan-500 hover:bg-cyan-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Edit size={16} className="text-white" />
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Admin Login Hint */}
      {!isAdmin && (
        <div className="text-center py-8 text-gray-400 text-sm">
          <p>Untuk akses admin, set localStorage 'ryven-admin' = 'ryven2024'</p>
        </div>
      )}
    </div>
  )
}
