import "./globals.css"

export const metadata = {
  title: "Ryven",
  description: "Welcome To Bio Link Ryven, Find Out Info About Him, And Stalk Him!",
  author: "Ryven",
  keywords: "Ryven, Ryzen, fikk, ryvenstore, Ryvz",
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
