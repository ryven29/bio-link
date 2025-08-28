"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import Image from "next/image"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { AnimatePresence } from "framer-motion"

// Image Preview Modal - Responsive sizing
const ImagePreviewModal = ({ isOpen, src, alt, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !src) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 pt-20 md:pt-20 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      <div 
        className="relative w-full max-w-[90vw] md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[80vh] md:max-h-[70vh] lg:max-h-[65vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'scaleIn 0.3s ease-out' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white text-black rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-xl hover:scale-110 transition-all z-10 hover:bg-gray-100"
          aria-label="Close preview"
        >
          <span className="text-lg md:text-xl font-bold">×</span>
        </button>
        
        {/* Image Container */}
        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex items-center justify-center">
          <img
            src={src}
            alt={alt || 'Preview'}
            className="modal-image object-contain rounded-lg"
            style={{
              width: 'auto',
              height: 'auto',
              display: 'block',
              margin: '0 auto'
            }}
            loading="eager"
            draggable="false"
          />
          
          {/* Image Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 md:p-4">
            <div className="text-white text-center">
              <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-yellow-400">{alt}</h3>
              <p className="text-xs md:text-sm text-gray-300 mb-1">🔍 Testimoni RYVEN STORE</p>
              <p className="text-xs text-gray-400">Ketuk di luar atau tekan ESC untuk menutup</p>
            </div>
          </div>
        </div>
        
        {/* Zoom Indicator */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-black/70 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm">
          🔍 Preview
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            transform: scale(0.9); 
            opacity: 0; 
          }
          to { 
            transform: scale(1); 
            opacity: 1; 
          }
        }
        
        /* Responsive image sizing */
        @media (max-width: 768px) {
          .modal-image {
            max-width: 90vw !important;
            max-height: 65vh !important;
            min-height: 200px !important;
          }
        }
        
        @media (min-width: 768px) {
          .modal-image {
            max-width: min(75vw, 600px) !important;
            max-height: min(65vh, 450px) !important;
          }
        }
        
        @media (min-width: 1024px) {
          .modal-image {
            max-width: min(65vw, 650px) !important;
            max-height: min(60vh, 500px) !important;
          }
        }
      `}</style>
    </div>
  );
};

const TestimonialPage = () => {
    const [imageErrors, setImageErrors] = useState({})
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const [currentImageSrc, setCurrentImageSrc] = useState('')
    const [currentImageAlt, setCurrentImageAlt] = useState('')
    
    // Function to handle image click
    const handleImageClick = (imageSrc, imageAlt) => {
        console.log('🖱️ Image clicked:', imageSrc, imageAlt);
        setCurrentImageSrc(imageSrc);
        setCurrentImageAlt(imageAlt);
        setIsImageModalOpen(true);
        console.log('📱 Modal should open now');
    };

    const handleCloseModal = () => {
        console.log('❌ Closing modal');
        setIsImageModalOpen(false);
        setCurrentImageSrc('');
        setCurrentImageAlt('');
    };

    // Data testimoni
    const testimonials = [
        {
            id: 1,
            image: "https://c.top4top.io/p_3506prg6k1.jpg",
            productName: "Jasa Claim Nitro Trial",
            price: "Rp 5.000",
            rating: 5,
            description: "Claim Nitro Trial berhasil! Proses cepat dan aman. Recommended banget buat yang mau claim Nitro.",
            customerName: "Daztan"
        },
        {
            id: 2,
            image: "https://d.top4top.io/p_3506c5zjg2.jpg",
            productName: "Jasa Claim Nitro Trial",
            price: "Rp 5.000",
            rating: 5,
            description: "Claim Nitro Trial berhasil dengan cepat. Admin ramah dan responsive. Terima kasih RYVEN STORE!",
            customerName: "Sentod"
        },
        {
            id: 3,
            image: "https://e.top4top.io/p_3506l56gw3.jpg",
            productName: "Joki Quest Discord",
            price: "Rp 5.000",
            rating: 5,
            description: "Joki Quest Discord berhasil dikirim. Proses joki lancar dan harga bersaing.",
            customerName: "Galih"
        },
        {
            id: 4,
            image: "https://f.top4top.io/p_3506vcfop4.jpg",
            productName: "Akun Telegram Old",
            price: "Rp 100.000",
            rating: 5,
            description: "Akun Telegram Old berhasil! Admin sangat membantu dan prosesnya cepat sekali.",
            customerName: "Fawaz"
        },
        {
            id: 5,
            image: "https://g.top4top.io/p_35067ihh65.jpg",
            productName: "Joki Quest Discord",
            price: "Rp 5.000",
            rating: 5,
            description: "Joki Quest Discord berhasil dikirim dengan cepat. Harga murah dan terpercaya!",
            customerName: "Vinzz"
        },
        {
            id: 6,
            image: "https://h.top4top.io/p_350653ezy6.jpg",
            productName: "Xbox Gamepass 1 Month",
            price: "Rp 10.000",
            rating: 5,
            description: "Xbox Gamepass berhasil. Admin ramah dan prosesnya tidak ribet.",
            customerName: "Gamero"
        },
        {
            id: 7,
            image: "https://i.top4top.io/p_350631men7.jpg",
            productName: "YT Premium 1 Month Invite",
            price: "Rp 2.000",
            rating: 5,
            description: "YT Premium Invite berhasil dikirim. Proses invite sangat cepat dan aman.",
            customerName: "Fawaz"
        },
        {
            id: 8,
            image: "https://c.top4top.io/p_3526prweb1.png",
            productName: "2x Akun Discord Old",
            price: "Rp 8.000",
            rating: 5,
            description: "Akun Discord berkualitas dan aman, sangat direkomendasikan",
            customerName: "Marcel"
        },
        {
            id: 9,
            image: "https://g.top4top.io/p_3526w28if1.png",
            productName: "1x Akun Discord Old",
            price: "Rp 3.000",
            rating: 5,
            description: "Akun Discord berkualitas dan aman, sangat direkomendasikan",
            customerName: "Furukawa Yudi"
        },
           {
            id: 10,
            image: "https://e.top4top.io/p_3526x1cl31.png",
            productName: "8x Akun Discord Old",
            price: "Rp 28.000",
            rating: 5,
            description: "Akun Discord berkualitas dan aman, sangat direkomendasikan",
            customerName: "Furukawa Yudi"
        }
    ]

    // Function to calculate average rating
    const calculateAverageRating = () => {
        if (testimonials.length === 0) return 0;
        
        const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
        const averageRating = totalRating / testimonials.length;
        
        // Round to 1 decimal place
        return Math.round(averageRating * 10) / 10;
    };

    // Function to calculate satisfaction percentage
    const calculateSatisfactionPercentage = () => {
        if (testimonials.length === 0) return 0;
        
        // Count testimonials with rating 4 or above as satisfied customers
        const satisfiedCustomers = testimonials.filter(testimonial => testimonial.rating >= 4).length;
        const percentage = (satisfiedCustomers / testimonials.length) * 100;
        
        return Math.round(percentage);
    };

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

    // Calculate dynamic stats
    const averageRating = calculateAverageRating();
    const satisfactionPercentage = calculateSatisfactionPercentage();
    const totalTestimonials = testimonials.length;

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
                            Lihat testimoni dari pelanggan kami yang telah menggunakan layanan digital kami
                        </p>
                    </motion.div>

                    {/* Stats Section - Now Dynamic */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">
                                {totalTestimonials}+
                            </div>
                            <div className="text-gray-300">Testimoni Positif</div>
                            <div className="text-xs text-gray-500 mt-1">
                                Total testimoni real
                            </div>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">
                                {averageRating}
                            </div>
                            <div className="text-gray-300">Rating Rata-rata</div>
                            <div className="flex justify-center mt-2">
                                {renderStars(averageRating)}
                            </div>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-2">
                                {satisfactionPercentage}%
                            </div>
                            <div className="text-gray-300">Kepuasan Pelanggan</div>
                            <div className="text-xs text-gray-500 mt-1">
                                Rating 4+ bintang
                            </div>
                        </div>
                    </motion.div>

                    {/* Summary Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700 mb-8"
                    >
                        <div className="text-center">
                            <p className="text-gray-300 text-sm">
                                📊 <span className="text-yellow-400 font-semibold">Statistik Real-time:</span> 
                                {' '}{totalTestimonials} testimoni dengan rating rata-rata {averageRating}/5.0
                                {' '}({satisfactionPercentage}% pelanggan sangat puas)
                            </p>
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
                                        <div 
                                            className="relative group cursor-pointer"
                                            onClick={() => {
                                                handleImageClick(testimonial.image, testimonial.productName);
                                            }}
                                        >
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.productName}
                                                className="w-full h-48 object-cover transition-all duration-300 group-hover:scale-105"
                                                style={{
                                                    objectFit: 'cover',
                                                    objectPosition: 'center'
                                                }}
                                                onError={(e) => {
                                                    setImageErrors(prev => ({
                                                        ...prev,
                                                        [testimonial.id]: true
                                                    }));
                                                }}
                                            />
                                            {/* Click Indicator Overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <div className="bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                                                    <span>🔍</span>
                                                    <span>Klik untuk Preview</span>
                                                </div>
                                            </div>
                                        </div>
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

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Hubungi Kami
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Ingin bertanya atau memesan layanan? Silakan hubungi kami melalui:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <motion.a
                                    href="https://wa.me/628991103457"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                    </svg>
                                    <span className="text-sm md:text-base">WhatsApp</span>
                                </motion.a>

                                <motion.a
                                    href="https://discord.com/users/755606790166675518"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                                    </svg>
                                    <span className="text-sm md:text-base">Discord</span>
                                </motion.a>
                                
                                <motion.a
                                    href="mailto:ryven2929@gmail.com"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.819L12 10.183l9.545-6.362h.819c.904 0 1.636.732 1.636 1.636z"/>
                                    </svg>
                                    <span className="text-sm md:text-base">Email</span>
                                </motion.a>
                            </div>
                            
                            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                                <p className="text-sm text-gray-300">
                                    <span className="text-yellow-400 font-medium">Jam Operasional:</span> Senin - Minggu, 08:00 - 22:00 WIB
                                </p>
                                <p className="text-sm text-gray-300 mt-1">
                                    <span className="text-green-400 font-medium">Respon Cepat:</span> Biasanya dalam 5-15 menit
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />

            {/* Image Preview Modal */}
            <ImagePreviewModal
                isOpen={isImageModalOpen}
                src={currentImageSrc}
                alt={currentImageAlt}
                onClose={handleCloseModal}
            />
        </div>
    )
}

export default TestimonialPage

