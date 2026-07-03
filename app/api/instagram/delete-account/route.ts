import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    const supabase = await getSupabaseServerClient()

    // 1. Fetch user to get access token for revocation
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("access_token")
      .eq("id", userId)
      .single()

    if (userError) {
      console.error("[Delete Account] Error fetching user:", userError)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // 2. Revoke Meta permissions if token exists
    if (user?.access_token) {
      try {
        const revokeUrl = `https://graph.facebook.com/v24.0/${userId}/permissions?access_token=${user.access_token}`
        const revokeRes = await fetch(revokeUrl, {
          method: "DELETE",
        })
        const revokeData = await revokeRes.json()
        console.log(`[Delete Account] Meta revocation response for ${userId}:`, revokeData)
      } catch (err) {
        console.error("[Delete Account] Failed to revoke Meta token:", err)
        // We continue with deletion even if Meta API fails (e.g. token already expired)
      }
    }

    // 3. Delete user data from Supabase
    await Promise.all([
      supabase.from("ice_breakers").delete().eq("user_id", userId),
      supabase.from("messages").delete().eq("user_id", userId),
      supabase.from("conversations").delete().eq("user_id", userId),
      supabase.from("automations").delete().eq("user_id", userId),
    ])

    // Finally delete the user profile
    await supabase.from("users").delete().eq("id", userId)

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error("[Delete Account] Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
