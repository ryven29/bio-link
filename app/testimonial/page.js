"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import Header from "../components/Header"
import Footer from "../components/Footer"

const TestimonialPage = () => {
    // Data testimoni yang bisa ditambahkan manual
    const testimonials = [
        {
            id: 1,
            image: "/testimonial/image1.jpg",
            productName: "Diamond Mobile Legends",
            price: "Rp 50.000",
            rating: 5,
            description: "Top up diamond ML berhasil! Proses cepat dan aman. Recommended banget buat yang mau top up game.",
            customerName: "Ahmad Rizki"
        },
        {
            id: 2,
            image: "/testimonial/IMG_20240906_140823.jpg",
            productName: "UC PUBG Mobile",
            price: "Rp 100.000",
            rating: 5,
            description: "Top up UC PUBG berhasil dengan cepat. Admin ramah dan responsive. Terima kasih RYVEN STORE!",
            customerName: "Sarah Putri"
        },
        {
            id: 3,
            image: "/testimonial/IMG_20240906_140839.jpg",
            productName: "Voucher Garena Shell",
            price: "Rp 25.000",
            rating: 4.5,
            description: "Voucher Garena Shell berhasil dikirim. Proses top up lancar dan harga bersaing.",
            customerName: "Budi Santoso"
        },
        {
            id: 4,
            image: "/testimonial/IMG_20240906_140902.jpg",
            productName: "Steam Wallet",
            price: "Rp 200.000",
            rating: 5,
            description: "Top up Steam Wallet berhasil! Admin sangat membantu dan prosesnya cepat sekali.",
            customerName: "Dewi Anggraini"
        },
        {
            id: 5,
            image: "/testimonial/IMG_20240906_140915.jpg",
            productName: "Google Play Gift Card",
            price: "Rp 150.000",
            rating: 5,
            description: "Gift card Google Play berhasil dikirim dengan cepat. Harga murah dan terpercaya!",
            customerName: "Rendi Pratama"
        },
        {
            id: 6,
            image: "/testimonial/IMG_20240906_140950.jpg",
            productName: "Voucher Free Fire",
            price: "Rp 75.000",
            rating: 4.5,
            description: "Top up voucher Free Fire berhasil. Admin ramah dan prosesnya tidak ribet.",
            customerName: "Nina Safitri"
        },
        {
            id: 7,
            image: "/testimonial/IMG_20240906_143031.jpg",
            productName: "Nintendo eShop Card",
            price: "Rp 300.000",
            rating: 5,
            description: "eShop card Nintendo berhasil dikirim. Proses top up sangat cepat dan aman.",
            customerName: "Agus Setiawan"
        }
    ]

    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FaStar key={i} className="text-yellow-400 text-sm" />
            )
        }

        if (hasHalfStar) {
            stars.push(
                <FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />
            )
        }

        const remainingStars = 5 - Math.ceil(rating)
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <FaStar key={`empty-${i}`} className="text-gray-400 text-sm" />
            )
        }

        return stars
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            
            <main className="pt-20 pb-8 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent mb-4">
                            RYVEN STORE
                        </h1>
                        <p className="text-xl text-gray-300 mb-2">
                            Testimoni & Reputasi
                        </p>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Lihat testimoni dari pelanggan kami yang telah menggunakan layanan top up game dan voucher digital kami
                        </p>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">
                                {testimonials.length}+
                            </div>
                            <div className="text-gray-300">Testimoni Positif</div>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">
                                4.8
                            </div>
                            <div className="text-gray-300">Rating Rata-rata</div>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-2">
                                100%
                            </div>
                            <div className="text-gray-300">Kepuasan Pelanggan</div>
                        </div>
                    </motion.div>

                    {/* Testimonials Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.productName}
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='Arial, sans-serif' font-size='16'%3EGambar tidak tersedia%3C/text%3E%3C/svg%3E"
                                        }}
                                    />
                                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                                        {testimonial.price}
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {testimonial.productName}
                                    </h3>
                                    
                                    <div className="flex items-center mb-3">
                                        {renderStars(testimonial.rating)}
                                        <span className="ml-2 text-sm text-gray-400">
                                            ({testimonial.rating})
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                        "{testimonial.description}"
                                    </p>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-yellow-400 font-medium text-sm">
                                            {testimonial.customerName}
                                        </span>
                                        <span className="text-gray-500 text-xs">
                                            Pelanggan Terpercaya
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Add Testimonial Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Ingin Menambah Testimoni?
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Untuk menambah testimoni baru, Anda dapat mengedit file <code className="bg-gray-800 px-2 py-1 rounded text-yellow-400">testimonial/page.js</code> dan menambahkan data testimoni ke dalam array <code className="bg-gray-800 px-2 py-1 rounded text-yellow-400">testimonials</code>.
                            </p>
                            <div className="bg-gray-800 p-4 rounded-lg text-left">
                                <p className="text-sm text-gray-300 mb-2">Format data testimoni:</p>
                                                                 <pre className="text-xs text-green-400 overflow-x-auto">
 {`{
     id: 8,
     image: "/testimonial/nama-gambar.jpg",
     productName: "Nama Produk",
     price: "Rp 50.000",
     rating: 5,
     description: "Deskripsi testimoni...",
     customerName: "Nama Pelanggan"
 }`}
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default TestimonialPage
