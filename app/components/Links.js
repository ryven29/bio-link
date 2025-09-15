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
    
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [hasInteracted, setHasInteracted] = useState(false)
    const [error, setError] = useState(null)
    const [volume, setVolume] = useState(0.7)
    const [canAutoplay, setCanAutoplay] = useState(false)

    // Check if autoplay is allowed
    useEffect(() => {
        const checkAutoplay = async () => {
            if (!audioRef.current) return

            try {
                // Try to play with volume 0 first to test autoplay capability
                const audio = audioRef.current
                audio.volume = 0
                const playPromise = audio.play()
                
                if (playPromise !== undefined) {
                    await playPromise
                    audio.pause()
                    audio.currentTime = 0
                    audio.volume = volume
                    setCanAutoplay(true)
                    setIsLoading(false)
                    
                    // Now try actual autoplay
                    setTimeout(async () => {
                        try {
                            await audio.play()
                            setIsPlaying(true)
                            setHasInteracted(true)
                        } catch (err) {
                            console.log('Autoplay prevented by browser policy')
                            setCanAutoplay(false)
                        }
                    }, 300)
                }
            } catch (err) {
                console.log('Autoplay not supported')
                setCanAutoplay(false)
                setIsLoading(false)
            }
        }

        if (audioRef.current) {
            checkAutoplay()
        }
    }, [volume])

    // Setup audio event listeners
    useEffect(() => {
        if (!audioRef.current) return

        const audio = audioRef.current
        
        const handleLoadStart = () => setIsLoading(true)
        const handleCanPlay = () => {
            setIsLoading(false)
            setError(null)
        }
        const handleLoadedData = () => {
            setIsLoading(false)
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
        audio.addEventListener('loadeddata', handleLoadedData)
        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)
        audio.addEventListener('ended', handleEnded)
        audio.addEventListener('error', handleError)

        // Set volume
        audio.volume = volume

        return () => {
            audio.removeEventListener('loadstart', handleLoadStart)
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('loadeddata', handleLoadedData)
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
            audio.removeEventListener('ended', handleEnded)
            audio.removeEventListener('error', handleError)
        }
    }, [volume])

    // Add global click listener to enable autoplay after first user interaction
    useEffect(() => {
        const handleFirstInteraction = async () => {
            if (!hasInteracted && audioRef.current && !isPlaying) {
                setHasInteracted(true)
                try {
                    await audioRef.current.play()
                    setIsPlaying(true)
                } catch (err) {
                    console.log('Could not start autoplay after interaction:', err)
                }
            }
        }

        // Listen for any user interaction on the page
        const events = ['click', 'touchstart', 'keydown']
        events.forEach(event => {
            document.addEventListener(event, handleFirstInteraction, { once: true })
        })

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, handleFirstInteraction)
            })
        }
    }, [hasInteracted, isPlaying])

    const togglePlay = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (!audioRef.current) return

        setHasInteracted(true)

        try {
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

    const getStatusText = () => {
        if (error) return 'Error'
        if (isLoading) return 'Loading...'
        if (!hasInteracted && !canAutoplay) return 'Click to Play'
        if (isPlaying) return 'Now Playing'
        return 'Paused'
    }

    const getControlIcon = () => {
        if (!hasInteracted && !canAutoplay) {
            return <FaVolumeUp className="text-white text-xs" />
        }
        if (isLoading) {
            return <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
        }
        if (isPlaying) {
            return <FaPause className="text-white text-xs" />
        }
        return <FaPlay className="text-white text-xs ml-0.5" />
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
                    {getControlIcon()}
                </div>
            </div>
            
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                    <FaSpotify className={`text-green-500 text-sm ${
                        isPlaying ? 'animate-pulse' : ''
                    }`} />
                    <span className="text-xs text-green-500 font-medium">
                        {getStatusText()}
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
                preload="metadata"
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
