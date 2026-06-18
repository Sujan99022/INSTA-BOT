"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard, Zap, LogOut, Settings, BarChart3, MessageSquare, Snowflake, Clapperboard, Sparkles
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  username?: string
  className?: string
  onLogout?: () => void
  onNavigate?: () => void
}

export function Sidebar({ className, username = "Demo User", onLogout, onNavigate, ...props }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <aside className={cn("flex flex-col bg-[#10131a] border-r border-[#272a31] py-8 h-screen w-64 z-50", className)} {...props}>
      <div className="px-6 mb-10 flex items-center gap-3">
        <img src="/logo.png" alt="DMPRO.in Logo" className="w-8 h-8 object-contain" />
        <div>
          <h1 className="font-poppins text-lg font-semibold text-[#e0e2ec] tracking-tighter leading-none">DMPRO.in</h1>
          <p className="text-[9px] text-[#c8c8ae]/70 font-semibold tracking-widest uppercase mt-0.5">Engine v2.4</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem
          href="/dashboard"
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="Dashboard"
          active={isActive("/dashboard")}
          onClick={onNavigate}
        />
        <NavItem
          href="/dashboard/automations"
          icon={<Zap className="w-4 h-4" />}
          label="Automations"
          active={isActive("/dashboard/automations")}
          onClick={onNavigate}
        />
        <NavItem
          href="/dashboard/publisher"
          icon={<Clapperboard className="w-4 h-4" />}
          label="Publisher"
          active={isActive("/dashboard/publisher")}
          onClick={onNavigate}
        />
        <NavItem
          href="/dashboard/ice-breakers"
          icon={<Snowflake className="w-4 h-4" />}
          label="Ice Breakers"
          active={isActive("/dashboard/ice-breakers")}
          onClick={onNavigate}
        />
        <NavItem
          href="/dashboard/inbox"
          icon={<MessageSquare className="w-4 h-4" />}
          label="Inbox"
          active={isActive("/dashboard/inbox")}
          onClick={onNavigate}
        />
        <NavItem
          href="/dashboard/analytics"
          icon={<BarChart3 className="w-4 h-4" />}
          label="Analytics"
          active={isActive("/dashboard/analytics")}
          onClick={onNavigate}
        />

        <div className="px-6 pt-6 pb-2 text-[9px] font-bold uppercase tracking-widest text-[#c8c8ae]/40">
          System
        </div>
        <NavItem
          href="/dashboard/settings"
          icon={<Settings className="w-4 h-4" />}
          label="Settings"
          active={isActive("/dashboard/settings")}
          onClick={onNavigate}
        />
      </nav>

      <div className="px-6 mt-auto space-y-5">
        {/* 
        <Link href="/dashboard/billing" className="w-full block" onClick={onNavigate}>
          <button className="w-full py-3 bg-primary text-primary-foreground font-black uppercase text-xs tracking-wider rounded-sm active:scale-95 transition-transform shadow-[0_0_15px_rgba(227,238,66,0.2)] cursor-pointer">
            Upgrade Plan
          </button>
        </Link>
        */}

        <div className="flex items-center gap-2.5 py-3 border-t border-[#272a31]">
          <div className="w-8 h-8 rounded-sm bg-[#32353c] border border-[#272a31] flex items-center justify-center shrink-0">
            <span className="text-[11px] font-extrabold text-[#e0e2ec] tracking-wider">{username.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-[#e0e2ec] truncate leading-none mb-1">{username}</p>
            <div className="flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <p className="text-[9px] text-[#c8c8ae] font-semibold">Live</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="h-7 w-7 text-[#c8c8ae] hover:text-[#ffb4ab] hover:bg-[#ffb4ab]/10 rounded-sm transition-all shrink-0 active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </aside>
  )
}

function NavItem({
  icon,
  label,
  active = false,
  href,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  href: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-3 transition-colors duration-150 font-bold text-xs uppercase tracking-wider group relative border-l-4 ${
        active
          ? "bg-[#3d4a5b] text-[#acb9ce] border-primary"
          : "text-[#c8c8ae] hover:bg-[#32353c]/50 hover:text-[#e0e2ec] border-transparent"
      }`}
    >
      <span className={`transition-transform duration-150 group-hover:scale-105 ${active ? "text-primary" : "text-[#c8c8ae] group-hover:text-primary"}`}>
        {icon}
      </span>
      <span className="font-semibold tracking-wide text-xs normal-case">{label}</span>
    </Link>
  )
}
