import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get("userId")
        if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })

        const supabase = await getSupabaseServerClient()

        // 1. Total Automations
        const { count: automationsCount } = await supabase
            .from("automations")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId)

        // 2. Active Triggers
        const { count: activeTriggersCount } = await supabase
            .from("automations")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId)
            .eq("is_active", true)

        // 3. Audience Reached (Total Conversations)
        const { count: audienceCount } = await supabase
            .from("conversations")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId)

        // 4. Messages Sent (where is_from_instagram is false, implying automation/system sent it)
        const { count: messagesSentCount } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("user_id", userId)
            .eq("is_from_instagram", false)

        // 5. Recent Activity (Last 5 messages sent by automation)
        const { data: recentMessages } = await supabase
            .from("messages")
            .select("id, content, created_at, sender_username, conversation_id, recipient:conversations(recipient_username)")
            .eq("user_id", userId)
            .eq("is_from_instagram", false)
            .order("created_at", { ascending: false })
            .limit(5)

        // 6. Get weekly message activity for charts
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        
        const { data: weeklyMessages } = await supabase
            .from("messages")
            .select("created_at, is_from_instagram")
            .eq("user_id", userId)
            .gte("created_at", sevenDaysAgo.toISOString())

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        const dailyStats: Record<string, { name: string; messages: number; comments: number }> = {}
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date()
            date.setDate(date.getDate() - i)
            const dayName = daysOfWeek[date.getDay()]
            const dateStr = date.toISOString().split("T")[0]
            dailyStats[dateStr] = { name: dayName, messages: 0, comments: 0 }
        }

        if (weeklyMessages) {
            weeklyMessages.forEach((msg) => {
                const dateStr = new Date(msg.created_at).toISOString().split("T")[0]
                if (dailyStats[dateStr]) {
                    if (msg.is_from_instagram) {
                        // Incoming interactions (from user) - mapped as comments/engagement trigger
                        dailyStats[dateStr].comments++
                    } else {
                        // Outgoing automated replies (from automation) - mapped as messages
                        dailyStats[dateStr].messages++
                    }
                }
            })
        }

        const chartData = Object.values(dailyStats)

        return NextResponse.json({
            metrics: {
                totalAutomations: automationsCount || 0,
                activeTriggers: activeTriggersCount || 0,
                audienceReached: audienceCount || 0,
                messagesSent: messagesSentCount || 0,
            },
            recentActivity: recentMessages || [],
            chartData: chartData
        })
    } catch (error) {
        console.error("[v0] Dashboard Stats error:", error)
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
    }
}
