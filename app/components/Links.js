"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { FaSpotify, FaPlay, FaPause, FaVolumeUp } from "react-icons/fa"
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
        songTitle: "Motivational Quote",
        artist: "Langkah kecil hari ini akan membawa kamu ke kemenangan besar.",
        albumArt: "https://files.catbox.moe/tjkp83.jpg",
        url: "#",
        audioSrc: "https://files.catbox.moe/jfzauo.mp3",
    },
]

const SpotifyPlayer = ({ link }) => {
    const canvasRef = useRef(null)
    const audioRef = useRef(null)
    const audioContextRef = useRef(null)
    const analyserRef = useRef(null)
    const sourceRef = useRef(null)
    const animationRef = useRef(null)
    
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [audioEnabled, setAudioEnabled] = useState(false)
    const [error, setError] = useState(null)
    const [volume, setVolume] = useState(0.7)

    // Initialize canvas and audio context
    useEffect(() => {
        if (typeof window === 'undefined') return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        canvas.width = 100
        canvas.height = 40

        // Draw static bars initially
        const drawStaticBars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const barCount = 16
            const barWidth = canvas.width / barCount
            
            for (let i = 0; i < barCount; i++) {
                const barHeight = Math.random() * 15 + 5
                ctx.fillStyle = '#374151'
                ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight)
            }
        }

        drawStaticBars()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    // Setup audio when enabled
    useEffect(() => {
        if (!audioEnabled || !audioRef.current) return

        const audio = audioRef.current
        
        // Audio event listeners
        const handleLoadStart = () => setIsLoading(true)
        const handleCanPlay = () => {
            setIsLoading(false)
            setError(null)
        }
        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)
        const handleEnded = () => setIsPlaying(false)
        const handleError = (e) => {
            setError('Failed to load audio')
            setIsLoading(false)
            console.error('Audio error:', e)
        }

        audio.addEventListener('loadstart', handleLoadStart)
        audio.addEventListener('canplay', handleCanPlay)
        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)
        audio.addEventListener('ended', handleEnded)
        audio.addEventListener('error', handleError)

        // Set volume
        audio.volume = volume

        // Setup Web Audio API for visualization
        const setupAudioContext = async () => {
            try {
                if (!audioContextRef.current) {
                    const AudioContext = window.AudioContext || window.webkitAudioContext
                    audioContextRef.current = new AudioContext()
                }

                const audioContext = audioContextRef.current

                // Resume if suspended
                if (audioContext.state === 'suspended') {
                    await audioContext.resume()
                }

                if (!analyserRef.current) {
                    analyserRef.current = audioContext.createAnalyser()
                    analyserRef.current.fftSize = 64
                    analyserRef.current.smoothingTimeConstant = 0.8
                }

                if (!sourceRef.current && audioContext.state === 'running') {
                    sourceRef.current = audioContext.createMediaElementSource(audio)
                    sourceRef.current.connect(analyserRef.current)
                    analyserRef.current.connect(audioContext.destination)
                }

                startVisualization()
            } catch (err) {
                console.error('Audio context setup failed:', err)
            }
        }

        setupAudioContext()

        return () => {
            audio.removeEventListener('loadstart', handleLoadStart)
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
            audio.removeEventListener('ended', handleEnded)
            audio.removeEventListener('error', handleError)
        }
    }, [audioEnabled, volume])

    const startVisualization = () => {
        if (!canvasRef.current || !analyserRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        const analyser = analyserRef.current
        const dataArray = new Uint8Array(analyser.frequencyBinCount)

        const draw = () => {
            if (!analyser) return

            analyser.getByteFrequencyData(dataArray)
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const barWidth = canvas.width / dataArray.length
            
            // Create gradient
            const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0)
            gradient.addColorStop(0, '#10b981')
            gradient.addColorStop(0.5, '#3b82f6')
            gradient.addColorStop(1, '#8b5cf6')

            dataArray.forEach((value, index) => {
                const barHeight = isPlaying ? (value / 255) * canvas.height * 0.8 : Math.random() * 8 + 2
                ctx.fillStyle = isPlaying ? gradient : '#374151'
                ctx.fillRect(
                    index * barWidth, 
                    canvas.height - barHeight, 
                    barWidth - 1, 
                    barHeight
                )
            })

            animationRef.current = requestAnimationFrame(draw)
        }

        draw()
    }

    const enableAudio = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        setAudioEnabled(true)
        
        // Small delay to ensure state is updated
        setTimeout(async () => {
            try {
                if (audioRef.current) {
                    await audioRef.current.play()
                }
            } catch (err) {
                console.log('Initial play failed:', err)
            }
        }, 100)
    }

    const togglePlay = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (!audioEnabled) {
            return enableAudio(e)
        }

        if (!audioRef.current) return

        try {
            if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume()
            }

            if (isPlaying) {
                audioRef.current.pause()
            } else {
                await audioRef.current.play()
            }
        } catch (err) {
            console.error('Toggle play error:', err)
            setError('Playback failed')
        }
    }

    return (
        <div 
            className="flex items-center space-x-3 w-full relative cursor-pointer"
            onClick={togglePlay}
        >
            <div className="relative w-10 h-10 group">
                <img
                    src={link.albumArt}
                    alt="Album Art"
                    className={`rounded-full transition-all duration-300 ${
                        isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '4s' }}
                />
                <div className={`absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-full ${
                    isPlaying ? 'animate-pulse' : ''
                }`}></div>
                
                {/* Control Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {!audioEnabled ? (
                        <FaVolumeUp className="text-white text-xs" />
                    ) : isLoading ? (
                        <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : isPlaying ? (
                        <FaPause className="text-white text-xs" />
                    ) : (
                        <FaPlay className="text-white text-xs ml-0.5" />
                    )}
                </div>
            </div>
            
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <FaSpotify className={`text-green-500 text-sm ${
                        isPlaying ? 'animate-pulse' : ''
                    }`} />
                    <span className="text-xs text-green-500 font-medium">
                        {!audioEnabled ? 'Click to Enable' : 
                         isLoading ? 'Loading...' : 
                         error ? 'Error' :
                         isPlaying ? 'Now Playing' : 'Paused'}
                    </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                    <em>{link.artist}</em>
                </p>
            </div>
            
            <div className="relative">
                <canvas 
                    ref={canvasRef} 
                    className="opacity-70 rounded bg-gray-800"
                />
            </div>
            
            {audioEnabled && (
                <audio 
                    ref={audioRef} 
                    src={link.audioSrc} 
                    loop
                    preload="metadata"
                    playsInline
                    crossOrigin="anonymous"
                />
            )}
        </div>
    )
}

const Links = () => {
    return (
        <div className="w-full max-w-md mt-6 space-y-3">
            {links.map((link, index) => (
                <div key={index}>
                    {link.isSpotify ? (
                        <div className="flex items-center justify-between p-3 bg-black border border-gray-500 transition-all duration-300 group text-white rounded-lg hover:border-gray-400">
                            <SpotifyPlayer link={link} />
                        </div>
                    ) : (
                        <Link
                            href={link.url}
                            className="flex items-center justify-between p-3 bg-black border border-gray-500 transition-all duration-300 cursor-pointer group text-white rounded-lg hover:border-gray-400"
                        >
                            <div className="flex items-center space-x-3 w-full">
                                {typeof link.icon === "string" && link.icon.endsWith(".svg") ? (
                                    <img
                                        src={link.icon}
                                        alt={link.title}
                                        className="w-6 h-6"
                                        style={{ filter: "invert(1)" }}
                                    />
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
                        </Link>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Links
