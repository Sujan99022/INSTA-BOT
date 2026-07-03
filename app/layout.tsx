import type React from "react"
import type { Metadata } from "next"
import { Hanken_Grotesk, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "DMPRO.in — Instagram DM Automation",
  description: "AI-powered automation platform for Instagram DMs, comments, and content publishing.",
  icons: {
    icon: "/logo.png",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${hankenGrotesk.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster 
          position="bottom-center" 
          expand={false} 
          visibleToasts={2}
          closeButton
          toastOptions={{
            style: {
              background: "#1d2027",
              color: "#e0e2ec",
              border: "1px solid #272a31",
              borderRadius: "0px",
              fontFamily: "var(--font-hanken), sans-serif",
            },
          }}
        />
      </body>
    </html>
  )
}
