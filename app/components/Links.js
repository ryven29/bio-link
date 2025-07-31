"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { FaSpotify, FaPlay, FaPause } from "react-icons/fa"
import { HiArrowRight } from "react-icons/hi"

const links = [
    {
        title: "Glyphic",
        description: "My First Projects Bot Glyphic",
        url: "https://wa.me/6283875901265",
        icon: "/fire-svgrepo-com.svg",
    },
    {
        title: "WhatsApp Channels",
        description: "Follow untuk seputar info/kode",
        url: "https://whatsapp.com/channel/0029VaSY7Lp8F2pCmQLKNn0g",
        icon: "/planet-1301-svgrepo-com.svg",
    },
    {
        title: "Owner Ryven",
        description: "Contact me if needed",
        url: "https://wa.me/628991103457",
        icon: "/stars-svgrepo-com.svg",
    },
    {
        title: "Donate",
        description: "Jajanin aku please...",
        url: "/donate",
        icon: "/donate-solid-svgrepo-com.svg",
    },
    {
        title: "",
        isSpotify: true,
        songTitle: "",
        artist: "Langkah kecil hari ini akan membawa kamu ke kemenangan besar.",
        albumArt: "https://files.catbox.moe/tjkp83.jpg",
        url: "",
        audioSrc: "https://files.catbox.moe/jfzauo.mp3",
    },
]

const Links = () => {
    const canvasRef = useRef(null)
    const audioRef = useRef(null)
    const audioContextRef = useRef(null)
    const analyserRef = useRef(null)
    const dataArrayRef = useRef(null)
    const sourceRef = useRef(null)
    const animationRef = useRef(null)
    
    const [isPlaying, setIsPlaying] = useState(false)
    const [isAudioReady, setIsAudioReady] = useState(false)
    const [hasUserInteracted, setHasUserInteracted] = useState(false)

    // Handle user interaction untuk enable autoplay
    useEffect(() => {
        const handleUserInteraction = () => {
            setHasUserInteracted(true)
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('touchstart', handleUserInteraction)
            document.removeEventListener('keydown', handleUserInteraction)
        }

        document.addEventListener('click', handleUserInteraction)
        document.addEventListener('touchstart', handleUserInteraction)
        document.addEventListener('keydown', handleUserInteraction)

        return () => {
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('touchstart', handleUserInteraction)
            document.removeEventListener('keydown', handleUserInteraction)
        }
    }, [])

    // Setup audio context dan visualizer
    useEffect(() => {
        if (!canvasRef.current || !audioRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        const audio = audioRef.current

        canvas.width = 100
        canvas.height = 40

        // Audio event listeners
        const handleCanPlayThrough = () => {
            setIsAudioReady(true)
        }

        const handlePlay = () => {
            setIsPlaying(true)
        }

        const handlePause = () => {
            setIsPlaying(false)
        }

        const handleEnded = () => {
            setIsPlaying(false)
        }

        audio.addEventListener('canplaythrough', handleCanPlayThrough)
        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)
        audio.addEventListener('ended', handleEnded)

        // Setup audio context
        const setupAudioContext = async () => {
            try {
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
                }
                const audioContext = audioContextRef.current

                if (audioContext.state === 'suspended') {
                    await audioContext.resume()
                }

                if (!analyserRef.current) {
                    analyserRef.current = audioContext.createAnalyser()
                    analyserRef.current.fftSize = 64
                    analyserRef.current.smoothingTimeConstant = 0.8
                }
                const analyser = analyserRef.current

                if (!dataArrayRef.current) {
                    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
                }

                if (!sourceRef.current) {
                    sourceRef.current = audioContext.createMediaElementSource(audio)
                    sourceRef.current.connect(analyser)
                    analyser.connect(audioContext.destination)
                }
            } catch (error) {
                console.log('Audio context setup failed:', error)
            }
        }

        setupAudioContext()

        // Visualizer animation
        const draw = () => {
            if (!analyserRef.current || !dataArrayRef.current) {
                animationRef.current = requestAnimationFrame(draw)
                return
            }

            analyserRef.current.getByteFrequencyData(dataArrayRef.current)
            
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const barWidth = canvas.width / dataArrayRef.current.length
            const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0)
            gradient.addColorStop(0, '#10b981')
            gradient.addColorStop(0.5, '#3b82f6')
            gradient.addColorStop(1, '#8b5cf6')

            dataArrayRef.current.forEach((value, index) => {
                const barHeight = isPlaying ? (value / 255) * canvas.height * 0.8 : Math.random() * 5
                ctx.fillStyle = isPlaying ? gradient : '#374151'
                ctx.fillRect(
                    index * barWidth, 
                    canvas.height - barHeight, 
                    barWidth - 2, 
                    barHeight
                )
            })

            animationRef.current = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            audio.removeEventListener('canplaythrough', handleCanPlayThrough)
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
            audio.removeEventListener('ended', handleEnded)
            
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isPlaying])

    // Auto play when user has interacted
    useEffect(() => {
        if (hasUserInteracted && isAudioReady && audioRef.current) {
            const playAudio = async () => {
                try {
                    await audioRef.current.play()
                } catch (error) {
                    console.log('Autoplay prevented:', error)
                }
            }
            playAudio()
        }
    }, [hasUserInteracted, isAudioReady])

    const togglePlay = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (!audioRef.current || !isAudioReady) return

        try {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                // Resume audio context if suspended
                if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                    await audioContextRef.current.resume()
                }
                await audioRef.current.play()
            }
        } catch (error) {
            console.log('Play/pause error:', error)
        }
    }

    return (
        <div className="w-full max-w-md mt-6 space-y-3">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url}
                    className="flex items-center justify-between p-3 bg-black border border-gray-500 transition-all duration-300 cursor-pointer group text-white rounded-lg hover:border-gray-400">
                    {link.isSpotify ? (
                        <div 
                            className="flex items-center space-x-3 w-full relative"
                            onClick={togglePlay}>
                            <div className="relative w-10 h-10 group">
                                <img
                                    src={link.albumArt}
                                    alt="Album Art"
                                    className={`rounded-full transition-all duration-300 ${isPlaying ? 'animate-spin' : ''}`}
                                    style={{ animationDuration: '3s' }}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></div>
                                
                                {/* Play/Pause Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {isPlaying ? (
                                        <FaPause className="text-white text-xs" />
                                    ) : (
                                        <FaPlay className="text-white text-xs ml-0.5" />
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <FaSpotify className={`text-green-500 text-sm ${isPlaying ? 'animate-pulse' : ''}`} />
                                    <span className="text-xs text-green-500 font-medium">
                                        {isPlaying ? 'Now Playing' : 'Paused'}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    <em>{link.artist}</em>
                                </p>
                            </div>
                            
                            <div className="relative">
                                <canvas 
                                    ref={canvasRef} 
                                    className="opacity-70 rounded"
                                ></canvas>
                            </div>
                            
                            <audio 
                                ref={audioRef} 
                                src={link.audioSrc} 
                                loop
                                preload="auto"
                                playsInline
                            />
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3 w-full">
                            {typeof link.icon === "string" &&
                            link.icon.endsWith(".svg") ? (
                                <img
                                    src={link.icon}
                                    alt={link.title}
                                    className="w-6 h-6"
                                    style={{ filter: "invert(1)" }}/>
                            ) : (
                                <span className="text-lg">{link.icon}</span>
                            )}
                            <div className="flex-1">
                                <h3 className="text-sm font-medium">
                                    {link.title}
                                </h3>
                                <p className="text-xs text-gray-400">
                                    {link.description}
                                </p>
                            </div>
                            <HiArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                    )}
                </Link>
            ))}
        </div>
    )
}

export default Links
