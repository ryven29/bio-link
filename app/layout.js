import "./globals.css"

export const metadata = {
  title: "𝐑𝐲𝐯𝐞𝐧.",
  description: "Welcome To Bio Link Ryven, Find Out Info About Him, And Stalk Him!",
  author: "Ryven",
  keywords: "ryven, venzy, ryzen, fikk, fikri, ryvenz",
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
