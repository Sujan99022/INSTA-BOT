"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export function useInstagramSession() {
    const [username, setUsername] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const searchParams = useSearchParams()
    const router = useRouter()
    const codeSentRef = useRef<string | null>(null)

    useEffect(() => {
        const code = searchParams.get("code")

        const handleSession = async () => {
            // CASE A: New Login from Instagram
            if (code) {
                if (codeSentRef.current === code) {
                    return
                }
                codeSentRef.current = code

                try {
                    const res = await fetch("/api/instagram/callback", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ code }),
                    })
                    const data = await res.json()

                    if (data.success) {
                        localStorage.setItem("ig_user_id", data.userId)
                        localStorage.setItem("ig_username", data.username)

                        setUserId(data.userId)
                        setUsername(data.username)
                        // Remove code from URL
                        router.replace("/dashboard")
                    } else {
                        console.error("Login failed:", data.error)
                        alert(`Login failed: ${data.error || "Unknown error"}`)
                        router.replace("/")
                    }
                } catch (err: any) {
                    console.error("Login failed:", err)
                    alert(`Login connection error: ${err.message || err}`)
                    router.replace("/")
                } finally {
                    setIsLoading(false)
                }
            }
            // CASE B: Restore Session from LocalStorage
            else {
                const savedId = localStorage.getItem("ig_user_id")
                const savedName = localStorage.getItem("ig_username")

                if (savedId && savedName) {
                    setUserId(savedId)
                    setUsername(savedName)
                    setIsLoading(false)
                } else {
                    // No session found and not performing a handshake - redirect to landing page
                    setIsLoading(false)
                    router.replace("/")
                }
            }
        }

        handleSession()
    }, [searchParams, router])

    const logout = () => {
        localStorage.removeItem("ig_user_id")
        localStorage.removeItem("ig_username")
        document.cookie = "insta_session=; Max-Age=0; path=/;"
        setUsername(null)
        setUserId(null)
        router.push("/")
    }

    return { userId, username, isLoading, logout }
}
