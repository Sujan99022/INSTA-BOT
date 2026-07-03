import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase-server"
import crypto from "crypto"

function base64decode(str: string) {
  // Convert from base64url to base64
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/")
  // Pad with '=' to make it a multiple of 4
  while (b64.length % 4 !== 0) {
    b64 += "="
  }
  return Buffer.from(b64, "base64")
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || ""
    let signedRequest = ""

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData()
      signedRequest = formData.get("signed_request")?.toString() || ""
    } else if (contentType.includes("application/json")) {
      const body = await request.json()
      signedRequest = body.signed_request || ""
    } else {
      // Sometimes Meta sends raw body text for webhooks depending on configuration
      const bodyText = await request.text()
      const params = new URLSearchParams(bodyText)
      signedRequest = params.get("signed_request") || ""
    }

    if (!signedRequest) {
      return NextResponse.json({ error: "Missing signed_request" }, { status: 400 })
    }

    const appSecret = process.env.INSTAGRAM_APP_SECRET || ""
    if (!appSecret) {
      console.error("[Data Deletion] INSTAGRAM_APP_SECRET is not configured.")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const [encodedSig, payload] = signedRequest.split(".")

    if (!encodedSig || !payload) {
      return NextResponse.json({ error: "Invalid signed_request format" }, { status: 400 })
    }

    // Decode and parse payload
    const decodedPayloadStr = base64decode(payload).toString("utf-8")
    const data = JSON.parse(decodedPayloadStr)

    // Verify signature
    const sig = base64decode(encodedSig)
    const expectedSig = crypto.createHmac("sha256", appSecret).update(payload).digest()

    // Compare signatures safely
    if (sig.length !== expectedSig.length || !crypto.timingSafeEqual(sig, expectedSig)) {
      console.error("[Data Deletion] Bad signature")
      return NextResponse.json({ error: "Bad signature" }, { status: 400 })
    }

    const userId = data.user_id
    if (!userId) {
      return NextResponse.json({ error: "Missing user_id in payload" }, { status: 400 })
    }

    // Initiate deletion from Supabase
    const supabase = await getSupabaseServerClient()
    
    // We try to delete from users. If we set up ON DELETE CASCADE on our FKs, this is sufficient.
    // Otherwise, we manually delete from all related tables. Let's do it manually to be safe.
    await Promise.all([
      supabase.from("ice_breakers").delete().eq("user_id", userId),
      supabase.from("messages").delete().eq("user_id", userId),
      supabase.from("conversations").delete().eq("user_id", userId),
      supabase.from("automations").delete().eq("user_id", userId),
    ])

    // Finally delete the user profile
    await supabase.from("users").delete().eq("id", userId)

    // Generate a confirmation code
    const confirmationCode = crypto.randomBytes(8).toString("hex")

    // Determine base URL
    let origin = process.env.NEXT_PUBLIC_APP_URL
    if (!origin) {
       const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host")
       const proto = request.headers.get("x-forwarded-proto") || "https"
       if (forwardedHost) {
           origin = `${proto}://${forwardedHost}`
       } else {
           origin = new URL(request.url).origin
       }
    }

    return NextResponse.json({
      url: `${origin}/data-deletion?id=${confirmationCode}`,
      confirmation_code: confirmationCode
    })

  } catch (error: any) {
    console.error("[Data Deletion] Error processing request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
