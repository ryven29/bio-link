"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import Image from "next/image"
import Header from "../components/Header"
import Footer from "../components/Footer"

const TestimonialPage = () => {
    const [imageErrors, setImageErrors] = useState({})
    
    // Data testimoni yang bisa ditambahkan manual
    const testimonials = [
        {
            id: 1,
            image: "https://c.top4top.io/p_3506prg6k1.jpg",
            productName: "Jasa Claim Nitro Trial",
            price: "Rp 25.000",
            rating: 5,
            description: "Claim Nitro Trial berhasil! Proses cepat dan aman. Recommended banget buat yang mau claim Nitro.",
            customerName: "Ahmad Rizki"
        },
        {
            id: 2,
            image: "https://d.top4top.io/p_3506c5zjg2.jpg",
            productName: "Jasa Claim Nitro Trial",
            price: "Rp 25.000",
            rating: 5,
            description: "Claim Nitro Trial berhasil dengan cepat. Admin ramah dan responsive. Terima kasih RYVEN STORE!",
            customerName: "Sarah Putri"
        },
        {
            id: 3,
            image: "https://e.top4top.io/p_3506l56gw3.jpg",
            productName: "Joki Quest Discord",
            price: "Rp 50.000",
            rating: 4.5,
            description: "Joki Quest Discord berhasil dikirim. Proses joki lancar dan harga bersaing.",
            customerName: "Budi Santoso"
        },
        {
            id: 4,
            image: "https://f.top4top.io/p_3506vcfop4.jpg",
            productName: "Akun Telegram Old",
            price: "Rp 100.000",
            rating: 5,
            description: "Akun Telegram Old berhasil! Admin sangat membantu dan prosesnya cepat sekali.",
            customerName: "Dewi Anggraini"
        },
        {
            id: 5,
            image: "https://g.top4top.io/p_35067ihh65.jpg",
            productName: "Joki Quest Discord",
            price: "Rp 50.000",
            rating: 5,
            description: "Joki Quest Discord berhasil dikirim dengan cepat. Harga murah dan terpercaya!",
            customerName: "Rendi Pratama"
        },
        {
            id: 6,
            image: "https://h.top4top.io/p_350653ezy6.jpg",
            productName: "Xbox Gamepass 1 Month",
            price: "Rp 150.000",
            rating: 4.5,
            description: "Xbox Gamepass berhasil. Admin ramah dan prosesnya tidak ribet.",
            customerName: "Nina Safitri"
        },
        {
            id: 7,
            image: "https://i.top4top.io/p_350631men7.jpg",
            productName: "YT Premium 1 Month Invite",
            price: "Rp 75.000",
            rating: 5,
            description: "YT Premium Invite berhasil dikirim. Proses invite sangat cepat dan aman.",
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
                                    {imageErrors[testimonial.id] ? (
                                        <div className="w-full h-48 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-pink-500/10"></div>
                                            <div className="text-center relative z-10">
                                                <div className="text-gray-400 text-5xl mb-3 animate-pulse">🎮</div>
                                                <div className="text-gray-300 text-sm font-semibold mb-1">{testimonial.productName}</div>
                                                <div className="text-gray-500 text-xs">Gambar tidak tersedia</div>
                                                <div className="text-yellow-400 text-xs mt-2">RYVEN STORE</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.productName}
                                            className="w-full h-48 object-cover"
                                            onError={() => {
                                                setImageErrors(prev => ({
                                                    ...prev,
                                                    [testimonial.id]: true
                                                }))
                                            }}
                                        />
                                    )}
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
     image: "https://example.com/gambar-testimoni.jpg",
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
