import "./globals.css"

export const metadata = {
  title: "ხαlzz?—",
  description: "Welcome To Bio Link balzz/balxzzy, Find Out Info About hHim, And Stalk Him!",
  author: "balzz",
  keywords: "balxzzy, balzz, ambalzz, shiina api, iqstore78",
    robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }) {
  return (
    <html lang="id">
      <body className="bg-black grid-bg text-white min-h-screen font-sans transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}