import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    const redirectUrl = new URL("/", request.url)
    redirectUrl.searchParams.set("error", error)
    return NextResponse.redirect(redirectUrl)
  }

  if (code) {
    const redirectUrl = new URL("/", request.url)
    redirectUrl.searchParams.set("code", code)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.json({ error: "Invalid callback" }, { status: 400 })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, access_token, user_id } = body

    let accessToken: string
    let loginUserId: string
    let expiresIn = 5184000

    if (access_token && user_id) {
      // Manual token input from dashboard
      accessToken = access_token
      loginUserId = String(user_id)
    } else if (code) {
      // OAuth code exchange flow
      const clientId = process.env.INSTAGRAM_APP_ID
      const clientSecret = process.env.INSTAGRAM_APP_SECRET
      const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI

      if (!clientId || !clientSecret || !redirectUri) {
        throw new Error("Missing Env Vars: Check INSTAGRAM_APP_ID")
      }

      const tokenParams = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code,
      })

      const tokenRes = await fetch("https://api.instagram.com/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: tokenParams.toString(),
      })

      const tokenData = await tokenRes.json()
      if (!tokenRes.ok) {
        if (tokenData.error_message?.includes("authorization code has been used")) {
          return NextResponse.json({ error: "Code already used" }, { status: 400 })
        }
        console.error("[v0] Token Error:", JSON.stringify(tokenData, null, 2))
        return NextResponse.json({ error: tokenData.error_description || "Token failed" }, { status: 400 })
      }

      const shortToken = tokenData.access_token
      loginUserId = tokenData.user_id.toString()

      const longLivedUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${shortToken}`
      const longRes = await fetch(longLivedUrl)
      const longData = await longRes.json()
      accessToken = longData.access_token || shortToken
      expiresIn = longData.expires_in || 5184000
    } else {
      return NextResponse.json({ error: "No code or token provided" }, { status: 400 })
    }

    // Get username + IG Professional Account ID
    let username = `user_${loginUserId}`
    let businessAccountId = loginUserId

    try {
      const meRes = await fetch(
        `https://graph.instagram.com/v24.0/me?fields=user_id,username&access_token=${accessToken}`
      )
      const meData = await meRes.json()

      if (meData.username) username = meData.username
      if (meData.user_id) {
        businessAccountId = meData.user_id.toString()
      }
    } catch (e) {
      console.error("[v0] /me request failed:", e)
    }

    // Save/Update User
    const supabase = await getSupabaseServerClient()

    const updates: any = {
      username,
      access_token: accessToken,
      token_expires_at: new Date(Date.now() + expiresIn * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { error: upsertError } = await supabase
      .from("users")
      .upsert({ id: loginUserId, ...updates }, { onConflict: "id" })

    if (upsertError) throw upsertError

    const response = NextResponse.json({ success: true, username, userId: loginUserId })
    response.cookies.set("insta_session", JSON.stringify({ username, userId: loginUserId }), {
      path: "/",
      maxAge: expiresIn,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    return response

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
