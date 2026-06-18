import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  // Determine the correct base URL to redirect back to, avoiding internal localhost routing
  let origin = ""
  
  // 1. Try x-forwarded-host and x-forwarded-proto from headers (preserves exact subdomain/host used by browser)
  const forwardedHost = request.headers.get("x-forwarded-host")
  const host = forwardedHost || request.headers.get("host")
  if (host) {
    const proto = request.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https")
    origin = `${proto}://${host}`
  }

  // 2. Try configured redirect URI environment variable
  if (!origin && process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI) {
    try {
      origin = new URL(process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI).origin
    } catch (e) {
      console.error("[Callback GET] Failed to parse NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI:", e)
    }
  }

  // 3. Fallback to request.url
  if (!origin) {
    origin = new URL(request.url).origin
  }

  if (error) {
    const redirectUrl = new URL("/", origin)
    redirectUrl.searchParams.set("error", error)
    return NextResponse.redirect(redirectUrl)
  }

  if (code) {
    const redirectUrl = new URL("/", origin)
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
      const clientId = process.env.INSTAGRAM_APP_ID
      const clientSecret = process.env.INSTAGRAM_APP_SECRET
      let redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI

      if (!redirectUri) {
        const forwardedHost = request.headers.get("x-forwarded-host")
        const host = forwardedHost || request.headers.get("host")
        if (host) {
          const proto = request.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https")
          redirectUri = `${proto}://${host}/api/instagram/callback`
        } else {
          redirectUri = new URL("/api/instagram/callback", request.url).toString()
        }
      }

      if (!clientId || !clientSecret) {
        throw new Error("Missing Env Vars: Check INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET")
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

    // Save/Update User
    const supabase = await getSupabaseServerClient()

    // Get username + IG Professional Account ID
    let username = `user_${loginUserId}`
    let businessAccountId = loginUserId
    let avatarUrl: string | null = null

    try {
      const meRes = await fetch(
        `https://graph.instagram.com/v24.0/me?fields=user_id,username,profile_picture_url&access_token=${accessToken}`
      )
      const meData = await meRes.json()

      if (meData.username) username = meData.username
      if (meData.user_id) {
        businessAccountId = meData.user_id.toString()
      }

      if (meData.profile_picture_url) {
        // First, try to download and re-upload to Supabase for persistence
        try {
          console.log(`[OAuth Callback] Downloading avatar from: ${meData.profile_picture_url}`)
          const imgRes = await fetch(meData.profile_picture_url)
          if (imgRes.ok) {
            const blob = await imgRes.blob()
            const arrayBuffer = await blob.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            const contentType = imgRes.headers.get("content-type") || "image/jpeg"
            let ext = "jpg"
            if (contentType.includes("png")) ext = "png"
            else if (contentType.includes("webp")) ext = "webp"

            const avatarFileName = `avatars/${loginUserId}.${ext}`

            // Upload to the public 'media' bucket
            const { error: uploadError } = await supabase.storage
              .from("media")
              .upload(avatarFileName, buffer, {
                contentType,
                upsert: true,
              })

            if (uploadError) {
              // Supabase upload failed — fall back to the raw Instagram CDN URL
              console.error("[OAuth Callback] Avatar upload error (using raw IG URL as fallback):", uploadError)
              avatarUrl = meData.profile_picture_url
            } else {
              const { data: { publicUrl } } = supabase.storage
                .from("media")
                .getPublicUrl(avatarFileName)
              avatarUrl = publicUrl
              console.log(`[OAuth Callback] Avatar uploaded successfully. URL: ${avatarUrl}`)
            }
          } else {
            // Could not download from IG — use raw URL directly
            avatarUrl = meData.profile_picture_url
          }
        } catch (imgErr) {
          // Network or processing error — fall back to raw IG URL
          console.error("[OAuth Callback] Failed to process profile picture (using raw IG URL as fallback):", imgErr)
          avatarUrl = meData.profile_picture_url
        }
      }
    } catch (e) {
      console.error("[v0] /me request failed:", e)
    }

    // Handle potential duplicate username constraint violation
    try {
      const { data: duplicateUser } = await supabase
        .from("users")
        .select("id, username")
        .eq("username", username)
        .neq("id", loginUserId)
        .maybeSingle()

      if (duplicateUser) {
        console.log(`[OAuth Callback] Found duplicate user with username ${username} and different ID ${duplicateUser.id}.`)
        
        // Try to delete first (if no foreign keys restrict it)
        const { error: deleteError } = await supabase
          .from("users")
          .delete()
          .eq("id", duplicateUser.id)
          
        if (deleteError) {
          console.log(`[OAuth Callback] Could not delete duplicate user (likely due to foreign keys). Renaming instead. error:`, deleteError)
          // Fallback: Rename the duplicate user to free up the unique constraint
          const tempUsername = `${username}_old_${duplicateUser.id}`
          const { error: renameError } = await supabase
            .from("users")
            .update({ username: tempUsername })
            .eq("id", duplicateUser.id)
          
          if (renameError) {
            console.error("[OAuth Callback] Failed to rename duplicate user:", renameError)
          }
        }
      }
    } catch (dbErr) {
      console.error("[OAuth Callback] Error checking/resolving duplicate usernames:", dbErr)
    }

    const baseUpdates: any = {
      username,
      access_token: accessToken,
      token_expires_at: new Date(Date.now() + expiresIn * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Try upsert with avatar_url first (requires migration 10-add-avatar-url.sql to be run)
    let upsertSucceeded = false
    if (avatarUrl) {
      const { error: upsertWithAvatarError } = await supabase
        .from("users")
        .upsert({ id: loginUserId, ...baseUpdates, avatar_url: avatarUrl }, { onConflict: "id" })

      if (!upsertWithAvatarError) {
        upsertSucceeded = true
      } else {
        // If the error is about the avatar_url column not existing, fall back without it
        const isColumnMissing =
          upsertWithAvatarError.message?.toLowerCase().includes("avatar_url") ||
          upsertWithAvatarError.code === "42703" // PostgreSQL undefined_column
        if (isColumnMissing) {
          console.warn("[OAuth Callback] avatar_url column not found in DB — run migration 10-add-avatar-url.sql. Proceeding without avatar.")
          avatarUrl = null
        } else {
          throw upsertWithAvatarError
        }
      }
    }

    // Fall back: upsert without avatar_url (always safe)
    if (!upsertSucceeded) {
      const { error: upsertError } = await supabase
        .from("users")
        .upsert({ id: loginUserId, ...baseUpdates }, { onConflict: "id" })
      if (upsertError) throw upsertError
    }

    const response = NextResponse.json({ success: true, username, userId: loginUserId, avatarUrl })
    response.cookies.set("insta_session", JSON.stringify({ username, userId: loginUserId, avatarUrl }), {
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
