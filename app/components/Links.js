"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { FaSpotify, FaPlay, FaPause, FaVolumeUp } from "react-icons/fa"
import { HiArrowRight } from "react-icons/hi"
import { HiOutlineChat } from "react-icons/hi"
import { LuBotMessageSquare } from "react-icons/lu"
import { BiSolidDonateHeart } from "react-icons/bi"
import { IoLogoDiscord } from "react-icons/io5"

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
        songTitle: "Motivational Quote",
        artist: "Langkah kecil hari ini akan membawa kamu ke kemenangan besar.",
        albumArt: "https://files.catbox.moe/tjkp83.jpg",
        url: "#",
        audioSrc: "https://files.catbox.moe/e073yw.mp3",
        // Alternative sources if catbox fails:
        // audioSrc: "/audio/sample.mp3", // Put in public/audio/
        // audioSrc: "https://www.soundjay.com/misc/sounds-of-speech.wav",
    },
]

const SpotifyPlayer = ({ link }) => {
    const audioRef = useRef(null)
    const audioContextRef = useRef(null)
    const videoRef = useRef(null)
    
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [audioEnabled, setAudioEnabled] = useState(true) // Auto enable audio
    const [error, setError] = useState(null)
    const [volume, setVolume] = useState(0.7)

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

        // Auto play when audio is ready
        const autoPlay = async () => {
            try {
                await audio.play()
                setIsPlaying(true)
            } catch (err) {
                console.log('Auto play failed (browser policy):', err)
                // If auto play fails due to browser policy, show play button
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
        }
    }, [audioEnabled, volume])

    // Sync background video with audio play/pause
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const controlVideo = async () => {
            try {
                if (isPlaying) {
                    // Ensure video starts when audio plays
                    await video.play()
                } else {
                    // Pause video when audio paused or ended
                    video.pause()
                }
            } catch (err) {
                console.log('Video control error:', err)
            }
        }

        controlVideo()
    }, [isPlaying])

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
            {/* Background Video Overlay */}
            <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
                <video
                    ref={videoRef}
                    src="https://i.top4top.io/m_35488slc91.mp4"
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>

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
                <p className="text-xs text-gray-400 mt-1">
                    <em>{link.artist}</em>
                </p>
            </div>
            

            
            <audio 
                ref={audioRef} 
                src={link.audioSrc} 
                loop
                preload="auto"
                playsInline
                crossOrigin="anonymous"
                autoPlay
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
