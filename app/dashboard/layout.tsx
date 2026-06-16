"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { useInstagramSession } from "@/hooks/use-instagram-session"
import { Sparkles } from "lucide-react"
import { Loader } from "@/components/ui/loader"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { username, logout, isLoading } = useInstagramSession()

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse shadow-md shadow-primary/20">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <Loader size="sm" />
                </div>
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
                    <div className="flex items-center gap-2.5">
                        <img src="/logo.png" alt="DMPRO.in Logo" className="w-7 h-7 object-contain" />
                        <span className="font-poppins font-semibold text-base tracking-tight text-foreground">DMPRO.in</span>
                    </div>
                    <MobileNav username={username || "User"} onLogout={logout} />
                </header>

                <main className="flex-1 relative overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
