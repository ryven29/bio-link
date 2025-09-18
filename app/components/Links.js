"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { FaSpotify, FaPlay, FaPause, FaVolumeUp } from "react-icons/fa"
import { HiArrowRight } from "react-icons/hi"
import { HiOutlineChat } from "react-icons/hi"
import { LuBotMessageSquare } from "react-icons/lu"
import { BiSolidDonateHeart } from "react-icons/bi"
import { IoLogoDiscord } from "react-icons/io5"

// Lyrics with timestamps (in seconds)
const lyricsWithTimestamps = [
    { time: 0, text: "Ku mencinta kau tak pernah tahu" },
    { time: 5, text: "Ku mendekat kau tak pernah sadar" },
    { time: 10, text: "Haruskah ku diam" },
    { time: 13, text: "Pendam semua rasa" },
    { time: 16, text: "Biarkan ku sakit tanpa kau tahu" },
    { time: 22, text: "Pada saatnya ku lelah berjuang" },
    { time: 27, text: "Namun hati tetap tak mau kamu" },
    { time: 32, text: "Tolong kamu sadar ada ku disini" },
    { time: 37, text: "Yang tak bisa menghilangkan bayanganmu" },
    { time: 43, text: "Jika harus sakit biarkan ku sakit" },
    { time: 48, text: "Jika harus menangis biarkan ku menangis" },
    { time: 53, text: "Jika harus jatuh untuk bisa bersamamu" },
    { time: 58, text: "Biarkan ku jatuh sampai lebam" },
    { time: 63, text: "Jika harus memohon aku siap memohon" },
    { time: 68, text: "Namun ternyata hati kuat ada rapuhnya" },
    { time: 73, text: "Sampai di titik ini aku angkat tangan" },
    { time: 78, text: "Aku menyerah" },
    { time: 82, text: "Ada saatnya ku lelah berjuang" },
    { time: 87, text: "Namun hati tetap tak mau kamu" },
    { time: 92, text: "Tolong kamu sadar ada ku di sini" },
    { time: 97, text: "Yang tak bisa menghilangkan bayanganmu" },
    { time: 103, text: "Jika harus sakit biarkan ku sakit" },
    { time: 108, text: "Jika harus nangis biarkan ku menangis" },
    { time: 113, text: "Jika harus jatuh untuk bisa bersamamu" },
    { time: 118, text: "Biarkan ku jatuh sampai lebam" },
    { time: 123, text: "Jika harus memohon aku siap memohon" },
    { time: 128, text: "Namun ternyata hati kuat ada rapuhnya" },
    { time: 133, text: "Sampai di titik ini aku angkat tangan" },
    { time: 138, text: "Aku menyerah" },
    { time: 142, text: "Semua ku lakukan agar kau datang ke hatiku" },
    { time: 148, text: "Namun sulit bila kamu tak ingin" },
    { time: 152, text: "Dan batas sabarku telah berakhir" },
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
        audioSrc: "https://files.catbox.moe/e073yw.mp3",
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
                        {!audioEnabled ? 'Click to Play' : 
                         isLoading ? 'Loading...' : 
                         error ? 'Error' :
                         isPlaying ? 'Now Playing' : 'Paused'}
                    </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 transition-all duration-500">
                    <em>{currentLyric}</em>
                </p>
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
