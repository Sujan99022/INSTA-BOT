"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

// Module-level variables shared across all instances of the hook in the browser
let globalCodeSent: string | null = null
let globalHandshakePromise: Promise<{ success: boolean; userId: string; username: string; avatarUrl?: string | null }> | null = null

export function useInstagramSession() {
    const [username, setUsername] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const code = searchParams.get("code")

        const handleSession = async () => {
            // CASE A: New Login from Instagram
            if (code) {
                // If another instance of this hook has already started the handshake for this code
                if (globalCodeSent === code) {
                    if (globalHandshakePromise) {
                        try {
                            const data = await globalHandshakePromise
                            setUserId(data.userId)
                            setUsername(data.username)
                            setAvatarUrl(data.avatarUrl || null)
                        } catch (e) {
                            console.error("Secondary hook instance handshake failed:", e)
                        }
                    }
                    setIsLoading(false)
                    return
                }

                globalCodeSent = code

                const runHandshake = async () => {
                    const res = await fetch("/api/instagram/callback", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ code }),
                    })
                    const data = await res.json()
                    if (!res.ok || !data.success) {
                        throw new Error(data.error || "Token exchange failed")
                    }
                    return data as { success: boolean; userId: string; username: string; avatarUrl?: string | null }
                }

                globalHandshakePromise = runHandshake()

                try {
                    const data = await globalHandshakePromise
                    localStorage.setItem("ig_user_id", data.userId)
                    localStorage.setItem("ig_username", data.username)
                    if (data.avatarUrl) {
                        localStorage.setItem("ig_avatar_url", data.avatarUrl)
                    } else {
                        localStorage.removeItem("ig_avatar_url")
                    }

                    setUserId(data.userId)
                    setUsername(data.username)
                    setAvatarUrl(data.avatarUrl || null)
                    // Remove code from URL
                    router.replace("/dashboard")
                } catch (err: any) {
                    console.error("Primary hook instance handshake failed:", err)
                    alert(`Login failed: ${err.message || err}`)
                    router.replace("/")
                } finally {
                    setIsLoading(false)
                    globalHandshakePromise = null
                }
            }
            // CASE B: Restore Session from LocalStorage
            else {
                const savedId = localStorage.getItem("ig_user_id")
                const savedName = localStorage.getItem("ig_username")
                const savedAvatar = localStorage.getItem("ig_avatar_url")

                if (savedId && savedName) {
                    setUserId(savedId)
                    setUsername(savedName)
                    setAvatarUrl(savedAvatar)
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
        localStorage.removeItem("ig_avatar_url")
        document.cookie = "insta_session=; Max-Age=0; path=/;"
        setUsername(null)
        setUserId(null)
        setAvatarUrl(null)
        // Reset global cache on logout
        globalCodeSent = null
        globalHandshakePromise = null
        router.push("/")
    }

    return { userId, username, avatarUrl, isLoading, logout }
}
