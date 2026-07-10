"use client"

import { useInstagramSession } from "@/hooks/use-instagram-session"
import { useEffect, useState } from "react"
import { TrendingUp, Activity, Users, MessageCircle, Zap, ArrowUp, ArrowDown, Eye, BarChart3, Image } from "lucide-react"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Loader } from "@/components/ui/loader"

// Custom tooltip component for recharts - displays data on hover
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
        return (
            <div className="bg-[#1d2027] border border-[#272a31] rounded-none p-3 text-xs shadow-xl min-w-[120px]">
                {/* Tooltip header with the data point label */}
                <p className="font-bold text-[#e0e2ec] mb-1.5 border-b border-[#272a31] pb-1">{label}</p>
                <div className="space-y-1">
                    {/* Render each data entry in the tooltip */}
                    {payload.map((entry: any, i: number) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-1.5">
                                {/* Color indicator dot */}
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

// Main Analytics page component - displays Instagram engagement metrics and charts
export default function AnalyticsPage() {
    // Get user session data and loading state
    const { userId, isLoading: isSessionLoading } = useInstagramSession()
    // Analytics data fetched from API
    const [analyticsData, setAnalyticsData] = useState<any>(null)
    // Local loading state for data fetching
    const [loading, setLoading] = useState(true)
    // Timeframe toggle for charts (weekly or monthly view)
    const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("weekly")

    // Fetch analytics data when userId becomes available
    useEffect(() => {
        if (!userId) {
            setLoading(false)
            return
        }

        const fetchAnalytics = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/dashboard/analytics?userId=${userId}`)
                const data = await res.json()
                if (data && !data.error) {
                    setAnalyticsData(data)
                }
            } catch (err) {
                console.error("Failed to load analytics stats:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchAnalytics()
    }, [userId]) // Re-fetch when userId changes

    // Show loading spinner while session or data is loading
    if (isSessionLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-3">
                    <Loader size="md" />
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Loading analytics...</p>
                </div>
            </div>
        )
    }

    // Extract and prepare chart data based on selected timeframe
    const weeklyDataList = analyticsData?.weeklyData || []
    const monthlyDataList = analyticsData?.monthlyData || []
    const data = timeframe === "weekly" ? weeklyDataList : monthlyDataList
    // Determine x-axis data key based on timeframe
    const dataKey = timeframe === "weekly" ? "day" : "month"

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Page header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Analytics
                    </h1>
                    <p className="text-muted-foreground text-xs mt-0.5">
                        Track your growth, engagement, and response performance.
                    </p>
                </div>
            </div>

            {/* Main metrics cards - engagement, followers, replies, active rules */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: "Total Engagement", value: analyticsData?.metrics.totalEngagement.toLocaleString() || "0", change: "+12.5%", up: true, icon: <Activity className="w-4 h-4" />, color: "text-purple-600" },
                    { label: "Followers", value: analyticsData?.metrics.followers.toLocaleString() || "0", change: "+8.2%", up: true, icon: <Users className="w-4 h-4" />, color: "text-blue-600" },
                    { label: "Replies Sent", value: analyticsData?.metrics.autoReplies.toLocaleString() || "0", change: "+24.3%", up: true, icon: <MessageCircle className="w-4 h-4" />, color: "text-emerald-600" },
                    { label: "Active Rules", value: analyticsData?.metrics.activeRules.toString() || "0", change: "Running", up: true, icon: <Zap className="w-4 h-4" />, color: "text-amber-600" },
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

            {/* Real Instagram Insights - live data from Instagram API */}
            {analyticsData?.instagramInsights && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                        { label: "Weekly Reach", value: (analyticsData.instagramInsights.weeklyReach || 0).toLocaleString(), icon: <Eye className="w-4 h-4" />, color: "text-cyan-500", desc: "Unique accounts reached" },
                        { label: "Weekly Impressions", value: (analyticsData.instagramInsights.weeklyImpressions || 0).toLocaleString(), icon: <BarChart3 className="w-4 h-4" />, color: "text-indigo-500", desc: "Total content views" },
                        { label: "Total Posts", value: (analyticsData.instagramInsights.mediaCount || 0).toLocaleString(), icon: <Image className="w-4 h-4" />, color: "text-pink-500", desc: "Published media" },
                    ].map((stat) => (
                        <Card key={stat.label} className="glass-card p-4 hover:shadow-md transition-all duration-300">
                            <div className="flex items-start justify-between mb-2">
                                <span className={`p-2 rounded-none bg-[#0b0e15] border border-[#272a31] ${stat.color}`}>
                                    {stat.icon}
                                </span>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-none bg-primary/10 text-primary">LIVE</span>
                            </div>
                            <p className="text-xl font-bold text-foreground tracking-tight">{stat.value}</p>
                            <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">{stat.label}</p>
                            <p className="text-[8px] text-muted-foreground/60 mt-0.5">{stat.desc}</p>
                        </Card>
                    ))}
                </div>
            )}

            {/* Engagement Overview - area chart with timeframe toggle */}
            <div className="glass-card p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-sm text-foreground">Engagement Overview</h3>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Track your performance over time</p>
                    </div>
                    {/* Weekly/Monthly toggle buttons */}
                    <div className="flex gap-1 bg-[#0b0e15] p-1 rounded-none border border-[#272a31] shadow-sm">
                        {(["weekly", "monthly"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTimeframe(t)}
                                className={`px-3 py-1.5 rounded-none text-[10px] font-bold transition-all active:scale-95 duration-200 ${
                                    timeframe === t
                                        ? 'bg-[#3d4a5b] text-[#acb9ce] border border-primary/30 shadow-sm'
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
                        <AreaChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
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

            {/* Bottom row - Messages vs Comments bar chart and Growth Metrics progress bars */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="glass-card p-4 sm:p-5">
                    <h3 className="font-bold text-sm text-foreground mb-4">Messages vs Comments</h3>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyDataList} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="msgBar" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="oklch(0.55 0.18 280)" stopOpacity={0.7} />
                                        <stop offset="100%" stopColor="oklch(0.55 0.15 190)" stopOpacity={0.7} />
                                    </linearGradient>
                                    <linearGradient id="cmtBar" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="oklch(0.55 0.15 190)" stopOpacity={0.7} />
                                        <stop offset="100%" stopColor="oklch(0.55 0.15 190)" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'oklch(0.55 0.02 260)', fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'oklch(0.55 0.02 260)', fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} />
                                <Bar dataKey="messages" name="DMs" fill="url(#msgBar)" radius={0} maxBarSize={16} />
                                <Bar dataKey="comments" name="Comments" fill="url(#cmtBar)" radius={0} maxBarSize={16} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="glass-card p-5">
                    <h3 className="font-bold text-sm text-foreground mb-4">Growth Metrics</h3>
                    {/* Progress bars for engagement rate, response time, comment rate, DM rate */}
                    <div className="space-y-4">
                        {[
                            { metric: "Engagement Rate", value: analyticsData?.growthMetrics.engagementRate || "0.0%", change: "Engagement rate", bar: analyticsData?.growthMetrics.engagementRateBar || 0 },
                            { metric: "Response Time", value: analyticsData?.growthMetrics.responseTime || "1.2s", change: "Avg response time", bar: analyticsData?.growthMetrics.responseTimeBar || 0 },
                            { metric: "Comment Rate", value: analyticsData?.growthMetrics.commentRate || "0.0%", change: "Comments received", bar: analyticsData?.growthMetrics.commentRateBar || 0 },
                            { metric: "DM Rate", value: analyticsData?.growthMetrics.conversionRate || "0.0%", change: "DMs received", bar: analyticsData?.growthMetrics.conversionRateBar || 0 },
                        ].map((item) => (
                            <div key={item.metric}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-foreground font-medium">{item.metric}</span>
                                    <span className="text-xs font-bold text-foreground">{item.value}</span>
                                </div>
                                <div className="h-1.5 rounded-none bg-[#0b0e15] border border-[#272a31] overflow-hidden">
                                    <div
                                        className="h-full rounded-none bg-primary transition-all duration-1000"
                                        style={{ width: `${item.bar}%` }}
                                    />
                                </div>
                                <p className="text-[9px] text-emerald-400 mt-0.5">{item.change}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
