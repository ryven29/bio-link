"use client"

import "./globals.css"
import { useState, useEffect } from "react"
import Profile from "./components/Profile"
import Links from "./components/Links"
import Loading from "./components/Loader"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem("loaded")

    if (alreadyLoaded) {
      setLoadingComplete(true)
    } else {
      sessionStorage.setItem("loaded", "true")
    }

    const handleContextMenu = (event) => {
      event.preventDefault()
      alert("inspect this bio is not allowed :)\nRyven")
    }
    document.addEventListener("contextmenu", handleContextMenu)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  return (
    <main>
      <div className="grid-bg flex flex-col items-center justify-center px-4 py-20">
        {
          !loadingComplete ? (
            <Loading onLoadComplete={() => setLoadingComplete(true)} />
          ) : (
            <>
              <Header />
              <Profile />
              <Links />
              <Footer />
            </>
          )
        }
      </div>
    </main>
  )
}
