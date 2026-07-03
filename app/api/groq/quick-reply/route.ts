import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const userId = searchParams.get("userId")

        if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })

        const supabase = await getSupabaseServerClient()
        const { data, error } = await supabase
            .from("users")
            .select("groq_auto_reply_enabled, ai_context")
            .eq("id", userId)
            .single()

        if (error) throw error

        return NextResponse.json({
            enabled: data?.groq_auto_reply_enabled ?? false,
            ai_context: data?.ai_context ?? "",
        })
    } catch (error) {
        console.error("Quick Reply GET Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const { userId, enabled, ai_context } = body

        if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })

        const supabase = await getSupabaseServerClient()
        const updateData: Record<string, any> = {}
        if (typeof enabled === "boolean") updateData.groq_auto_reply_enabled = enabled
        if (typeof ai_context === "string") updateData.ai_context = ai_context

        const { error } = await supabase
            .from("users")
            .update(updateData)
            .eq("id", userId)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Quick Reply PUT Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
