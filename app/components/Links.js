"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { FaPlay, FaPause, FaVolumeUp, FaMusic } from "react-icons/fa"
import { HiArrowRight } from "react-icons/hi"
import { HiOutlineChat } from "react-icons/hi"
import { LuBotMessageSquare } from "react-icons/lu"
import { BiSolidDonateHeart } from "react-icons/bi"
import { IoLogoDiscord } from "react-icons/io5"

// Lyrics with timestamps (in seconds) - Accurate timing from provided timestamps
const lyricsWithTimestamps = [
    { time: 0, text: "..." },
    { time: 23, text: "Ku mencinta kau tak pernah tahu" },
    { time: 30, text: "Ku mendekat kau tak pernah sadar" },
    { time: 34, text: "Haruskah ku diam pendam semua rasa?" },
    { time: 41, text: "Biarkan ku sakit tanpa kau tahu" },
    { time: 49, text: "Ada saatnya ku lelah berjuang" },
    { time: 56, text: "Namun hati tetap mau kamu" },
    { time: 60, text: "Tolong kamu sadar ada ku di sini" },
    { time: 67, text: "Yang tak bisa menghilangkan bayanganmu" },
    { time: 73, text: "Jika harus sakit biarkan ku sakit" },
    { time: 80, text: "Jika harus nangis biarkan ku menangis" },
    { time: 86, text: "Jika harus jatuh untuk bisa bersamamu" },
    { time: 93, text: "Biarkan ku jatuh sampai lebam" },
    { time: 99, text: "Jika harus memohon aku siap memohon" },
    { time: 106, text: "Namun ternyata hati kuat ada rapuhnya" },
    { time: 111, text: "Sampai di titik ini aku angkat tangan" },
    { time: 119, text: "Aku menyerah" },
    { time: 129, text: "Ada saatnya ku lelah berjuang" },
    { time: 136, text: "Namun hati tetap mau kamu" },
    { time: 140, text: "Tolong kamu sadar ada ku di sini" },
    { time: 148, text: "Yang tak bisa menghilangkan bayanganmu" },
    { time: 153, text: "Jika harus sakit biarkan ku sakit" },
    { time: 160, text: "Jika harus nangis biarkan ku menangis" },
    { time: 166, text: "Jika harus jatuh untuk bisa bersamamu" },
    { time: 175, text: "Biarkan ku jatuh sampai lebam" },
    { time: 180, text: "Jika harus memohon aku siap memohon" },
    { time: 186, text: "Namun ternyata hati kuat ada rapuhnya" },
    { time: 192, text: "Sampai di titik ini aku angkat tangan" },
    { time: 200, text: "Aku Menyerah" },
    { time: 208, text: "Semua kulakukan agar kau datang ke hatiku" },
    { time: 214, text: "Namun sulit bila kamu tak ingin" },
    { time: 219, text: "Dan batas sabarku telah berakhir" },
    { time: 241, text: "Jika harus jatuh untuk bisa bersamamu" },
    { time: 249, text: "Biarkan ku jatuh sampai lebam" },
    { time: 257, text: "Jika harus sakit biarkan ku sakit" },
    { time: 264, text: "Jika harus nangis biarkan ku menangis" },
    { time: 270, text: "Jika harus jatuh untuk bisa bersamamu" },
    { time: 278, text: "Biarkan ku jatuh sampai lelah" },
    { time: 284, text: "Jika harus memohon aku siap memohon" },
    { time: 290, text: "Namun ternyata hati kuat ada rapuhnya" },
    { time: 296, text: "Sampai di titik ini angkat tangan" },
    { time: 304, text: "Aku..." },
    { time: 312, text: "..." },
    { time: 322, text: "Menyerah..." },
];

const links = [
    {
        title: "Glyphic",
        description: "My First Projects Bot Glyphic",
        url: "https://wa.me/6283875901265",
        icon: <LuBotMessageSquare className="w-6 h-6 text-gray-200" />,
    },
    {
        title: "WhatsApp Channels",
        description: "Follow untuk seputar info/kode",
        url: "https://whatsapp.com/channel/0029VaSY7Lp8F2pCmQLKNn0g",
        icon: <HiOutlineChat className="w-6 h-6 text-gray-200" />,
    },
    {
        title: "Discord Server",
        description: "Gabung untuk bertanya dan berdiskusi ",
        url: "https://discord.gg/vUrwqNAzBd",
        icon: <IoLogoDiscord className="w-6 h-6 text-gray-200" />,
    },
    {
        title: "Donate",
        description: "Jajanin aku please...",
        url: "/donate",
        icon: <BiSolidDonateHeart className="w-6 h-6 text-gray-200" />,
    },
    {
        title: "",
        isSpotify: true,
        songTitle: "Angkat Tangan",
        artist: "Asila Maisa",
        albumArt: "https://files.catbox.moe/tjkp83.jpg",
        url: "#",
        audioSrc: "https://files.catbox.moe/xmgy7h.mp3",
        lyrics: lyricsWithTimestamps
    },
]

const SpotifyPlayer = ({ link }) => {
    const audioRef = useRef(null)
    const audioContextRef = useRef(null)
    
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [audioEnabled, setAudioEnabled] = useState(true)
    const [error, setError] = useState(null)
    const [volume, setVolume] = useState(0.7)
    const [currentTime, setCurrentTime] = useState(0)
    const [currentLyric, setCurrentLyric] = useState("Langkah kecil hari ini akan membawa kamu ke kemenangan besar.")

    // Function to get current lyric based on time
    const getCurrentLyric = (time) => {
        if (!link.lyrics) return link.artist || "Motivational Quote"
        
        let currentLyricText = link.artist || "Motivational Quote"
        
        for (let i = 0; i < link.lyrics.length; i++) {
            if (time >= link.lyrics[i].time) {
                currentLyricText = link.lyrics[i].text
            } else {
                break
            }
        }
        
        return currentLyricText
    }

    // Update current time and lyrics
    useEffect(() => {
        if (!audioRef.current || !isPlaying) return

        const updateTime = () => {
            const audio = audioRef.current
            if (audio) {
                const time = audio.currentTime
                setCurrentTime(time)
                setCurrentLyric(getCurrentLyric(time))
            }
        }

        const interval = setInterval(updateTime, 100) // Update every 100ms for smooth lyric changes

        return () => clearInterval(interval)
    }, [isPlaying, link.lyrics])

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
        const handleEnded = () => {
            setIsPlaying(false)
            setCurrentLyric(link.artist || "Motivational Quote") // Reset to default
        }
        const handleError = (e) => {
            setError('Failed to load audio')
            setIsLoading(false)
            console.error('Audio error:', e)
        }
        const handleTimeUpdate = () => {
            const time = audio.currentTime
            setCurrentTime(time)
            setCurrentLyric(getCurrentLyric(time))
        }

        audio.addEventListener('loadstart', handleLoadStart)
        audio.addEventListener('canplay', handleCanPlay)
        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)
        audio.addEventListener('ended', handleEnded)
        audio.addEventListener('error', handleError)
        audio.addEventListener('timeupdate', handleTimeUpdate)

        // Set volume
        audio.volume = volume

        // Auto play when audio is ready
        const autoPlay = async () => {
            try {
                await audio.play()
                setIsPlaying(true)
            } catch (err) {
                console.log('Auto play failed (browser policy):', err)
                setAudioEnabled(false)
            }
        }

        // Try auto play after a short delay
        const timer = setTimeout(autoPlay, 500)

        return () => {
            clearTimeout(timer)
            audio.removeEventListener('loadstart', handleLoadStart)
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
            audio.removeEventListener('ended', handleEnded)
            audio.removeEventListener('error', handleError)
            audio.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [audioEnabled, volume])

    const enableAudio = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        setAudioEnabled(true)
        
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
            setError('Playbook failed')
        }
    }

    return (
        <div className="flex items-center space-x-4 w-full relative cursor-pointer bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 rounded-lg p-4 border border-gray-600 hover:border-purple-500 transition-all duration-300">
            <div className="relative w-16 h-16 group">
                <img
                    src={link.albumArt}
                    alt="Album Art"
                    className="w-full h-full rounded-lg object-cover shadow-lg border-2 border-gray-600"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
                
                {/* Play button overlay */}
                <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={togglePlay}
                >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        {!audioEnabled ? (
                            <FaVolumeUp className="text-white text-lg" />
                        ) : isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : isPlaying ? (
                            <FaPause className="text-white text-lg" />
                        ) : (
                            <FaPlay className="text-white text-lg ml-1" />
                        )}
                    </div>
                </div>
            </div>
            
            <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                    <FaMusic className={`text-purple-400 text-sm ${
                        isPlaying ? 'animate-bounce' : ''
                    }`} />
                    <span className="text-sm text-purple-400 font-semibold">
                        {!audioEnabled ? 'Click to Play Music' : 
                         isLoading ? 'Loading...' : 
                         error ? 'Error Loading' :
                         isPlaying ? '♪ Now Playing' : '⏸ Paused'}
                    </span>
                </div>
                
                <h3 className="text-white font-bold text-base mb-1 truncate">
                    {link.songTitle}
                </h3>
                
                <p className="text-gray-300 text-sm mb-2">
                    by {link.artist}
                </p>
                
                <div className="bg-black/30 rounded-md p-2 border border-gray-700">
                    <p className="text-xs text-gray-300 leading-relaxed italic">
                        "{currentLyric}"
                    </p>
                </div>
                
                {/* Animated sound bars when playing */}
                {isPlaying && (
                    <div className="flex items-center space-x-1 mt-2">
                        <div className="flex space-x-0.5">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
                                    style={{
                                        height: `${Math.random() * 10 + 5}px`,
                                        animationDelay: `${i * 0.1}s`,
                                        animationDuration: '0.6s'
                                    }}
                                ></div>
                            ))}
                        </div>
                        <span className="text-xs text-gray-400 ml-2">
                            Sound waves
                        </span>
                    </div>
                )}
            </div>
            
            <audio 
                ref={audioRef} 
                src={link.audioSrc} 
                preload="auto"
                playsInline
                crossOrigin="anonymous"
            />
        </div>
    )
}

const Links = () => {
    return (
        <div className="w-full max-w-md mt-6 space-y-3">
            {links.map((link, index) => (
                <div key={index}>
                    {link.isSpotify ? (
                        <div className="transition-all duration-300 group">
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
