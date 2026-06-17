"use client"

import { useEffect } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { useInstagramSession } from "@/hooks/use-instagram-session"
import { Sparkles } from "lucide-react"
import { Loader } from "@/components/ui/loader"
import Link from "next/link"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { username, logout, isLoading } = useInstagramSession()

    // Load and apply appearance preferences globally in the dashboard
    useEffect(() => {
        const savedAppearance = localStorage.getItem("dmpro_appearance")
        if (savedAppearance) {
            try {
                const prefs = JSON.parse(savedAppearance)
                const root = document.documentElement
                
                // Allowed Accent Colors matching system guidelines
                const colors = [
                    { hex: "#e3ee42", fg: "#1b1d00" },
                    { hex: "#82cfff", fg: "#00344b" },
                    { hex: "#b89cff", fg: "#211047" },
                    { hex: "#ffaa42", fg: "#4a2100" },
                    { hex: "#e0e2ec", fg: "#1b1b1f" }
                ]
                
                // Find active color config
                const activeColor = colors.find(c => c.hex === prefs.accent) || colors[0]
                
                // Apply accent colors dynamically
                root.style.setProperty("--primary", activeColor.hex)
                root.style.setProperty("--primary-foreground", activeColor.fg)
                root.style.setProperty("--ring", activeColor.hex)

                // Apply sidebar density class
                if (prefs.density === "compact") {
                    root.classList.add("density-compact")
                } else {
                    root.classList.remove("density-compact")
                }

                // Apply transition blocker class
                if (!prefs.animate) {
                    root.classList.add("animations-disabled")
                } else {
                    root.classList.remove("animations-disabled")
                }
            } catch (e) {
                console.error("Failed to parse global appearance storage settings:", e)
            }
        }
    }, [])

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader size="sm" />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground relative overflow-hidden">
            {/* Soft Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50">
                <Sidebar
                    className="h-full border-r border-sidebar-border bg-sidebar backdrop-blur-2xl"
                    username={username || "User"}
                    onLogout={logout}
                />
            </div>

            <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
                <header className="md:hidden h-14 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 sticky top-0 z-40">
                    <Link href="/dashboard" className="flex items-center gap-2.5 active:opacity-85">
                        <img src="/logo.png" alt="DMPRO.in Logo" className="w-7 h-7 object-contain" />
                        <span className="font-poppins font-semibold text-base tracking-tight text-foreground">DMPRO.in</span>
                    </Link>
                    <MobileNav username={username || "User"} onLogout={logout} />
                </header>

                <main className="flex-1 relative overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
