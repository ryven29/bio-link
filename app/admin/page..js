'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Save, X, Eye, Upload, Settings } from 'lucide-react'

export default function AdminPage() {
  const [testimonials, setTestimonials] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
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

  // Save testimonials to localStorage whenever it changes
  useEffect(() => {
    if (testimonials.length > 0) {
      try {
        localStorage.setItem('ryven-testimonials', JSON.stringify(testimonials))
      } catch (error) {
        console.error('Error saving testimonials:', error)
      }
    }
  }, [testimonials])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'ryven2024') {
      setIsAuthenticated(true)
      try {
        localStorage.setItem('ryven-admin', 'ryven2024')
      } catch (error) {
        console.error('Error saving admin status:', error)
      }
    } else {
      alert('Password salah!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    try {
      localStorage.removeItem('ryven-admin')
    } catch (error) {
      console.error('Error removing admin status:', error)
    }
  }

  const handleAddTestimonial = () => {
    if (!formData.title || !formData.image1) return
    
    const newTestimonial = {
      id: Date.now(),
      ...formData
    }
    
    setTestimonials([...testimonials, newTestimonial])
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
    if (confirm('Yakin ingin menghapus testimoni ini?')) {
      setTestimonials(testimonials.filter(t => t.id !== id))
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

  const exportData = () => {
    try {
      const dataStr = JSON.stringify(testimonials, null, 2)
      const dataBlob = new Blob([dataStr], {type: 'application/json'})
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'ryven-testimonials.json'
      link.click()
    } catch (error) {
      console.error('Error exporting data:', error)
      alert('Error saat export data')
    }
  }

  const importData = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          setTestimonials(data)
          alert('Data berhasil diimpor!')
        } catch (error) {
          console.error('Error importing data:', error)
          alert('Format file tidak valid!')
        }
      }
      reader.readAsText(file)
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800 rounded-xl p-8 w-full max-w-md border border-cyan-500/30"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-cyan-400 mb-2">RYVEN ADMIN</h1>
            <p className="text-gray-400">Masukkan password untuk akses admin</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-700 border border-cyan-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                <Settings size={24} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-cyan-400">RYVEN ADMIN</h1>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            <Plus size={20} />
            Tambah Testimoni
          </button>
          
          <button
            onClick={exportData}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            <Upload size={20} />
            Export Data
          </button>
          
          <label className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer">
            <Upload size={20} />
            Import Data
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-cyan-500/30 max-h-[90vh] overflow-y-auto"
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

      {/* Testimonials List */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
            >
              {/* Preview */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-cyan-300">{testimonial.title}</h3>
                  <div className="flex gap-2">
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
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><span className="text-cyan-300 font-semibold">Layanan:</span> {testimonial.service}</div>
                  <div><span className="text-cyan-300 font-semibold">Nominal:</span> {testimonial.nominal}</div>
                  <div><span className="text-cyan-300 font-semibold">Status:</span> {testimonial.status}</div>
                  {testimonial.description && (
                    <div className="text-gray-300">{testimonial.description}</div>
                  )}
                </div>
                
                <div className="mt-4 flex gap-2">
                  {testimonial.image1 && (
                    <img
                      src={testimonial.image1}
                      alt="Preview 1"
                      className="w-16 h-16 object-cover rounded border border-cyan-500/30"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  )}
                  {testimonial.image2 && (
                    <img
                      src={testimonial.image2}
                      alt="Preview 2"
                      className="w-16 h-16 object-cover rounded border border-cyan-500/30"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
