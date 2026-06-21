"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { useInstagramSession } from "@/hooks/use-instagram-session"
import { Activity, Users, MessageCircle, Zap, Sparkles, TrendingUp, BarChart3, MessageSquare, ArrowRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Loader } from "@/components/ui/loader"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardStats {
    metrics: {
        totalAutomations: number
        activeTriggers: number
        audienceReached: number
        messagesSent: number
    }
    recentActivity: Array<{
        id: string
        content: string
        created_at: string
        recipient?: {
            recipient_username: string
        }
    }>
}



const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
        return (
            <div className="bg-[#1d2027] border border-[#272a31] rounded-none p-3 text-xs shadow-xl min-w-[120px]">
                <p className="font-bold text-[#e0e2ec] mb-1.5 border-b border-[#272a31] pb-1">{label}</p>
                <div className="space-y-1">
                    {payload.map((entry: any, i: number) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 shrink-0" style={{ backgroundColor: entry.color || entry.payload?.fill || 'var(--primary)' }} />
                                <span className="text-[#c8c8ae] text-[10px] font-semibold">{entry.name || 'Value'}:</span>
                            </div>
                            <span className="text-primary font-black text-[10px]">{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    return null
}

export default function DashboardPage() {
    const { username, userId, avatarUrl, isLoading: isSessionLoading } = useInstagramSession()
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [imgError, setImgError] = useState(false)
    const [chartData, setChartData] = useState<Array<{ name: string; messages: number; comments: number }>>([
        { name: "Mon", messages: 0, comments: 0 },
        { name: "Tue", messages: 0, comments: 0 },
        { name: "Wed", messages: 0, comments: 0 },
        { name: "Thu", messages: 0, comments: 0 },
        { name: "Fri", messages: 0, comments: 0 },
        { name: "Sat", messages: 0, comments: 0 },
        { name: "Sun", messages: 0, comments: 0 },
    ])

    useEffect(() => {
        if (!userId) {
            setLoading(false)
            return
        }

        const fetchStats = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/dashboard/stats?userId=${userId}`)
                const data = await res.json()
                if (data && !data.error) {
                    setStats(data)
                    if (data.chartData) {
                        setChartData(data.chartData)
                    }
                }
            } catch (err) {
                console.error("Failed to load dashboard stats", err)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [userId])

    if (isSessionLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3">
                    <Loader size="md" />
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                    {avatarUrl && !imgError ? (
                        <img 
                            src={avatarUrl} 
                            alt={`${username}'s avatar`} 
                            className="w-12 h-12 rounded-full border border-primary/20 object-cover shadow-[0_0_15px_rgba(227,238,66,0.1)] shrink-0"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-lg shrink-0">
                            {username ? username.charAt(0).toUpperCase() : "?"}
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                            Welcome back, <span className="gradient-text">{username}</span>
                        </h1>
                        <p className="text-muted-foreground text-xs mt-1">Here&apos;s your automated marketing overview.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    All systems operational
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Automations"
                    value={stats?.metrics.totalAutomations.toString() || "0"}
                    trend={`${stats?.metrics.activeTriggers || 0} active`}
                    icon={<Zap className="w-4 h-4" />}
                    iconColor="text-indigo-500 bg-indigo-500/10 border-indigo-500/20"
                    loading={loading}
                    href="/dashboard/automations"
                />
                <StatCard
                    title="Messages Sent"
                    value={stats?.metrics.messagesSent.toString() || "0"}
                    trend="Lifetime"
                    icon={<MessageCircle className="w-4 h-4" />}
                    iconColor="text-blue-500 bg-blue-500/10 border-blue-500/20"
                    loading={loading}
                />
                <StatCard
                    title="Active Triggers"
                    value={stats?.metrics.activeTriggers.toString() || "0"}
                    trend="Running"
                    icon={<Activity className="w-4 h-4" />}
                    iconColor="text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                    loading={loading}
                    href="/dashboard/automations"
                />
                <StatCard
                    title="Audience Reached"
                    value={stats?.metrics.audienceReached.toString() || "0"}
                    trend="Unique Users"
                    icon={<Users className="w-4 h-4" />}
                    iconColor="text-pink-500 bg-pink-500/10 border-pink-500/20"
                    loading={loading}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-panel-strong p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Activity Overview</h3>
                            <p className="text-[10px] text-muted-foreground mt-0.5">Automated DMs & comments this week</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Messages</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Comments</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="oklch(0.55 0.18 280)" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="oklch(0.55 0.18 280)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="oklch(0.55 0.15 190)" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="oklch(0.55 0.15 190)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'oklch(0.55 0.02 260)', fontSize: 10, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'oklch(0.55 0.02 260)', fontSize: 10, fontWeight: 600 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1.5 }} />
                                <Area type="monotone" dataKey="messages" name="DMs" stroke="oklch(0.55 0.18 280)" fill="url(#colorMessages)" strokeWidth={2.5} />
                                <Area type="monotone" dataKey="comments" name="Comments" stroke="oklch(0.55 0.15 190)" fill="url(#colorComments)" strokeWidth={2.5} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="glass-panel-strong p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">Growth Trend</h3>
                            <p className="text-[10px] text-muted-foreground mt-0.5">Weekly engagement rate</p>
                        </div>
                        <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500">
                            <TrendingUp className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="oklch(0.55 0.18 280)" stopOpacity={0.85} />
                                        <stop offset="100%" stopColor="oklch(0.55 0.15 190)" stopOpacity={0.85} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'oklch(0.55 0.02 260)', fontSize: 10, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'oklch(0.55 0.02 260)', fontSize: 10, fontWeight: 600 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} />
                                <Bar dataKey="messages" fill="url(#colorBar)" radius={0} maxBarSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="glass-panel-strong p-6 lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        Recent Activity
                    </h3>
                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/40 border border-white/20 shadow-sm shadow-black/[0.01]">
                                    <Skeleton className="w-9 h-9 rounded-xl shrink-0 bg-white/10" />
                                    <div className="min-w-0 flex-1 space-y-2">
                                        <Skeleton className="h-3.5 w-1/3 bg-white/10" />
                                        <Skeleton className="h-2.5 w-3/4 bg-white/10" />
                                    </div>
                                    <Skeleton className="h-4 w-12 rounded bg-white/10" />
                                </div>
                            ))
                        ) : stats?.recentActivity && stats.recentActivity.length > 0 ? (
                            stats.recentActivity.map((msg) => (
                                <div key={msg.id} className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/40 border border-white/20 hover:bg-white/70 transition-all duration-200 shadow-sm shadow-black/[0.01]">
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary/10 to-accent/10 flex items-center justify-center text-primary shrink-0 border border-primary/5">
                                        <MessageCircle className="w-4 h-4" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-foreground font-bold truncate">
                                            Auto-reply to @{msg.recipient?.recipient_username || "user"}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground truncate max-w-[400px] mt-0.5">{msg.content}</p>
                                    </div>
                                    <div className="text-[9px] text-muted-foreground font-semibold whitespace-nowrap shrink-0 bg-white/50 border border-black/5 px-2 py-0.5 rounded-full">
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center bg-white/30 border border-dashed border-black/5 rounded-2xl">
                                <MessageCircle className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">No recent activity yet</p>
                                <p className="text-[10px] text-muted-foreground mt-1">Activity logs appear here when triggers are hit.</p>
                            </div>
                        )}
                    </div>
                </Card>

                <Card className="glass-panel-strong p-6 space-y-4">
                    <h3 className="font-bold text-sm text-foreground uppercase tracking-wider flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        Quick Actions
                    </h3>
                    <div className="space-y-3">
                        <QuickAction
                            icon={<Zap className="w-4 h-4" />}
                            label="New Automation Rule"
                            gradient="from-indigo-500/10 to-indigo-500/5 hover:from-indigo-500/20 border-indigo-500/20 hover:border-indigo-500/30"
                            iconColor="text-indigo-500"
                            href="/dashboard/automations"
                        />
                        <QuickAction
                            icon={<MessageSquare className="w-4 h-4" />}
                            label="Open Live Inbox"
                            gradient="from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 border-blue-500/20 hover:border-blue-500/30"
                            iconColor="text-blue-500"
                            href="/dashboard/inbox"
                        />
                        <QuickAction
                            icon={<BarChart3 className="w-4 h-4" />}
                            label="View Growth Analytics"
                            gradient="from-emerald-500/10 to-emerald-500/5 hover:from-emerald-500/20 border-emerald-500/20 hover:border-emerald-500/30"
                            iconColor="text-emerald-500"
                            href="/dashboard/analytics"
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}

function StatCard({ title, value, trend, icon, iconColor, loading, href }: {
    title: string; value: string; trend: string; icon: React.ReactNode; iconColor: string; loading?: boolean; href?: string
}) {
    const cardContent = (
        <Card 
            className={`tonal-gradient card-inner-border border border-black/20 p-5 flex flex-col gap-4 group rounded transition-all duration-300 ${href ? "hover:border-primary/40 hover:bg-[#32353c]/10 cursor-pointer" : ""}`}
        >
            <div className="flex justify-between items-start">
                <div className={`p-2 bg-primary/10 rounded border border-primary/15 text-primary shrink-0 ${iconColor}`}>
                    {icon}
                </div>
                <div className="flex flex-col items-end gap-1">
                    {loading ? (
                        <Skeleton className="h-4 w-12 rounded bg-white/10" />
                    ) : (
                        <span className="bg-primary/20 text-primary px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-sm border border-primary/25">
                            {trend}
                        </span>
                    )}
                </div>
            </div>
            <div>
                {loading ? (
                    <div className="space-y-2 mt-1">
                        <Skeleton className="h-6 w-16 bg-white/10" />
                        <Skeleton className="h-3.5 w-28 bg-white/10" />
                    </div>
                ) : (
                    <>
                        <p className="text-2xl font-black text-[#e0e2ec] tracking-tight leading-none mb-1">{value}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{title}</p>
                    </>
                )}
            </div>
        </Card>
    )

    if (href) {
        return (
            <Link href={href} className="block">
                {cardContent}
            </Link>
        )
    }

    return cardContent
}

function QuickAction({ icon, label, gradient, iconColor, href }: {
    icon: React.ReactNode; label: string; gradient: string; iconColor: string; href: string
}) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-4 p-4 rounded bg-gradient-to-r border border-border/40 transition-all duration-300 group cursor-pointer hover:border-primary/30 hover:bg-[#32353c]/30 ${gradient}`}
        >
            <span className={`p-2 rounded bg-black/20 border border-border/40 ${iconColor} group-hover:scale-105 transition-transform duration-200`}>
                {icon}
            </span>
            <div className="flex-1">
                <span className="text-xs font-bold text-foreground/80 group-hover:text-primary transition-colors">
                    {label}
                </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </Link>
    )
}
