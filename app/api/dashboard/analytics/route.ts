import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get("userId")
        if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })

        const supabase = await getSupabaseServerClient()

        // 1. Fetch counts
        // Total messages (Engagement)
        const { count: totalMessages } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId)

        // Unique recipients (Followers proxy)
        const { count: uniqueRecipients } = await supabase
            .from("conversations")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId)

        // Auto Replies
        const { count: autoRepliesCount } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId)
            .eq("is_from_instagram", false)

        // Active Rules
        const { count: activeRulesCount } = await supabase
            .from("automations")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId)
            .eq("is_active", true)

        // 2. Fetch weekly chart data (last 7 days)
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        
        const { data: weeklyMessages } = await supabase
            .from("messages")
            .select("created_at, is_from_instagram")
            .eq("user_id", userId)
            .gte("created_at", sevenDaysAgo.toISOString())

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        const weeklyStats: Record<string, { day: string; messages: number; comments: number; engagement: number }> = {}
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date()
            date.setDate(date.getDate() - i)
            const dayName = daysOfWeek[date.getDay()]
            const dateStr = date.toISOString().split("T")[0]
            weeklyStats[dateStr] = { day: dayName, messages: 0, comments: 0, engagement: 0 }
        }

        if (weeklyMessages) {
            weeklyMessages.forEach((msg) => {
                const dateStr = new Date(msg.created_at).toISOString().split("T")[0]
                if (weeklyStats[dateStr]) {
                    if (msg.is_from_instagram) {
                        weeklyStats[dateStr].comments++
                    } else {
                        weeklyStats[dateStr].messages++
                    }
                    weeklyStats[dateStr].engagement++
                }
            })
        }

        const weeklyDataList = Object.values(weeklyStats)

        // 3. Fetch monthly chart data (last 6 months)
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

        const { data: monthlyMessages } = await supabase
            .from("messages")
            .select("created_at")
            .eq("user_id", userId)
            .gte("created_at", sixMonthsAgo.toISOString())

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const monthlyStats: Record<string, { month: string; followers: number; engagement: number }> = {}

        for (let i = 5; i >= 0; i--) {
            const date = new Date()
            date.setMonth(date.getMonth() - i)
            const monthName = months[date.getMonth()]
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
            monthlyStats[key] = { month: monthName, followers: uniqueRecipients || 0, engagement: 0 }
        }

        if (monthlyMessages) {
            monthlyMessages.forEach((msg) => {
                const date = new Date(msg.created_at)
                const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
                if (monthlyStats[key]) {
                    monthlyStats[key].engagement++
                }
            })
        }

        const monthlyDataList = Object.values(monthlyStats)

        // 4. Calculate response time (average difference between incoming and outgoing messages in same conversation)
        let avgResponseTime = 0
        let hasResponseTime = false
        try {
            const { data: allConversationMessages } = await supabase
                .from("messages")
                .select("conversation_id, created_at, is_from_instagram")
                .eq("user_id", userId)
                .order("created_at", { ascending: true })

            if (allConversationMessages && allConversationMessages.length > 0) {
                const convGroups: Record<string, typeof allConversationMessages> = {}
                allConversationMessages.forEach((msg) => {
                    if (msg.conversation_id) {
                        if (!convGroups[msg.conversation_id]) {
                            convGroups[msg.conversation_id] = []
                        }
                        convGroups[msg.conversation_id].push(msg)
                    }
                })

                let totalDiffMs = 0
                let countDiffs = 0

                Object.values(convGroups).forEach((msgs) => {
                    for (let i = 0; i < msgs.length - 1; i++) {
                        const current = msgs[i]
                        const next = msgs[i + 1]
                        // Incoming followed by outgoing
                        if (current.is_from_instagram && !next.is_from_instagram) {
                            const diff = new Date(next.created_at).getTime() - new Date(current.created_at).getTime()
                            if (diff > 0) {
                                totalDiffMs += diff
                                countDiffs++
                            }
                        }
                    }
                })

                if (countDiffs > 0) {
                    avgResponseTime = Number((totalDiffMs / countDiffs / 1000).toFixed(1))
                    hasResponseTime = true
                }
            }
        } catch (e) {
            console.error("Failed to calculate response time:", e)
        }

        // 5. Calculate rates
        const engagementRate = uniqueRecipients ? ((totalMessages || 0) / uniqueRecipients * 10).toFixed(1) + "%" : "0.0%"
        const commentRate = totalMessages ? ((weeklyDataList.reduce((acc, curr) => acc + curr.comments, 0) / totalMessages) * 100).toFixed(1) + "%" : "0.0%"
        const conversionRate = totalMessages ? ((autoRepliesCount || 0) / totalMessages * 100).toFixed(1) + "%" : "0.0%"

        const engRateNum = parseFloat(engagementRate)
        const cmtRateNum = parseFloat(commentRate)
        const convRateNum = parseFloat(conversionRate)

        return NextResponse.json({
            metrics: {
                totalEngagement: totalMessages || 0,
                followers: uniqueRecipients || 0,
                autoReplies: autoRepliesCount || 0,
                activeRules: activeRulesCount || 0,
            },
            weeklyData: weeklyDataList,
            monthlyData: monthlyDataList,
            growthMetrics: {
                engagementRate,
                responseTime: hasResponseTime ? `${avgResponseTime}s` : "0s",
                commentRate,
                conversionRate,
                engagementRateBar: isNaN(engRateNum) ? 0 : Math.min(100, Math.round(engRateNum)),
                responseTimeBar: hasResponseTime ? Math.max(5, Math.min(100, Math.round((2 / Math.max(0.2, avgResponseTime)) * 50))) : 0,
                commentRateBar: isNaN(cmtRateNum) ? 0 : Math.min(100, Math.round(cmtRateNum)),
                conversionRateBar: isNaN(convRateNum) ? 0 : Math.min(100, Math.round(convRateNum)),
            }
        })
    } catch (error) {
        console.error("[v0] Dashboard Analytics error:", error)
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
    }
}
