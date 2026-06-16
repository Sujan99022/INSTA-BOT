"use client"

import { useInstagramSession } from "@/hooks/use-instagram-session"
import { useEffect, useState } from "react"
import { TrendingUp, Activity, Users, MessageCircle, Zap, ArrowUp, ArrowDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Loader } from "@/components/ui/loader"

const weeklyData = [
    { day: "Mon", messages: 12, comments: 8, engagement: 20 },
    { day: "Tue", messages: 18, comments: 15, engagement: 33 },
    { day: "Wed", messages: 24, comments: 20, engagement: 44 },
    { day: "Thu", messages: 15, comments: 12, engagement: 27 },
    { day: "Fri", messages: 30, comments: 22, engagement: 52 },
    { day: "Sat", messages: 22, comments: 18, engagement: 40 },
    { day: "Sun", messages: 8, comments: 5, engagement: 13 },
]

const monthlyData = [
    { month: "Jan", followers: 120, engagement: 340 },
    { month: "Feb", followers: 180, engagement: 420 },
    { month: "Mar", followers: 250, engagement: 510 },
    { month: "Apr", followers: 310, engagement: 580 },
    { month: "May", followers: 400, engagement: 650 },
    { month: "Jun", followers: 520, engagement: 720 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
        return (
            <div className="bg-[#1d2027] border border-[#272a31] rounded-none p-3 text-xs shadow-xl min-w-[120px]">
                <p className="font-bold text-[#e0e2ec] mb-1.5 border-b border-[#272a31] pb-1">{label}</p>
                <div className="space-y-1">
                    {payload.map((entry: any, i: number) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 shrink-0" style={{ backgroundColor: entry.color || entry.payload?.fill || '#e3ee42' }} />
                                <span className="text-[#c8c8ae] text-[10px] font-semibold">{entry.name || 'Value'}:</span>
                            </div>
                            <span className="text-[#e3ee42] font-black text-[10px]">{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    return null
}

export default function AnalyticsPage() {
    const { isLoading } = useInstagramSession()
    const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("weekly")

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader size="md" />
            </div>
        )
    }

    const data = timeframe === "weekly" ? weeklyData : monthlyData
    const dataKey = timeframe === "weekly" ? "day" : "month"

    return (
        <div className="p-4 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Analytics
                    </h1>
                    <p className="text-muted-foreground text-xs mt-0.5">
                        Track your growth, engagement, and automation performance.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: "Total Engagement", value: "2,847", change: "+12.5%", up: true, icon: <Activity className="w-4 h-4" />, color: "text-purple-600" },
                    { label: "Followers", value: "1,234", change: "+8.2%", up: true, icon: <Users className="w-4 h-4" />, color: "text-blue-600" },
                    { label: "Auto Replies", value: "847", change: "+24.3%", up: true, icon: <MessageCircle className="w-4 h-4" />, color: "text-emerald-600" },
                    { label: "Active Rules", value: "5", change: "2 paused", up: false, icon: <Zap className="w-4 h-4" />, color: "text-amber-600" },
                ].map((stat) => (
                    <Card key={stat.label} className="glass-card p-4 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start justify-between mb-2">
                            <span className={`p-2 rounded-none bg-[#0b0e15] border border-[#272a31] ${stat.color}`}>
                                {stat.icon}
                            </span>
                            <span className={`flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-none ${stat.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                {stat.up ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-xl font-bold text-foreground tracking-tight">{stat.value}</p>
                        <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">{stat.label}</p>
                    </Card>
                ))}
            </div>

            <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-sm text-foreground">Engagement Overview</h3>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Track your performance over time</p>
                    </div>
                    <div className="flex gap-1 bg-[#0b0e15] p-1 rounded-none border border-[#272a31] shadow-sm">
                        {(["weekly", "monthly"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTimeframe(t)}
                                className={`px-3 py-1.5 rounded-none text-[10px] font-bold transition-all active:scale-95 duration-200 ${
                                    timeframe === t
                                        ? 'bg-[#3d4a5b] text-[#acb9ce] border border-[#e3ee42]/30 shadow-sm'
                                        : 'text-[#c8c8ae] hover:text-[#e0e2ec] hover:bg-[#32353c]/35'
                                }`}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="engagementGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="oklch(0.55 0.18 280)" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="oklch(0.55 0.18 280)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey={dataKey} axisLine={false} tickLine={false} tick={{ fill: 'oklch(0.55 0.02 260)', fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'oklch(0.55 0.02 260)', fontSize: 11 }} />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.1)', strokeWidth: 1.5 }} />
                            <Area type="monotone" dataKey="engagement" stroke="oklch(0.55 0.18 280)" fill="url(#engagementGrad)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="glass-card p-5">
                    <h3 className="font-bold text-sm text-foreground mb-4">Messages vs Comments</h3>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="msgBar" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="oklch(0.55 0.18 280)" stopOpacity={0.7} />
                                        <stop offset="100%" stopColor="oklch(0.55 0.15 190)" stopOpacity={0.7} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'oklch(0.55 0.02 260)', fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'oklch(0.55 0.02 260)', fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} />
                                <Bar dataKey={timeframe === "weekly" ? "messages" : "followers"} fill="url(#msgBar)" radius={0} maxBarSize={36} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="glass-card p-5">
                    <h3 className="font-bold text-sm text-foreground mb-4">Growth Metrics</h3>
                    <div className="space-y-4">
                        {[
                            { metric: "Engagement Rate", value: "8.4%", change: "+2.1%", bar: 84 },
                            { metric: "Response Time", value: "1.2s", change: "-0.3s", bar: 65 },
                            { metric: "Comment Rate", value: "12.7%", change: "+4.5%", bar: 72 },
                            { metric: "DM Conversion", value: "23.1%", change: "+6.8%", bar: 91 },
                        ].map((item) => (
                            <div key={item.metric}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-foreground font-medium">{item.metric}</span>
                                    <span className="text-xs font-bold text-foreground">{item.value}</span>
                                </div>
                                <div className="h-1.5 rounded-none bg-[#0b0e15] border border-[#272a31] overflow-hidden">
                                    <div
                                        className="h-full rounded-none bg-[#e3ee42] transition-all duration-1000"
                                        style={{ width: `${item.bar}%` }}
                                    />
                                </div>
                                <p className="text-[9px] text-emerald-400 mt-0.5">{item.change} vs last period</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
