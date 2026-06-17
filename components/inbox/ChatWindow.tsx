"use client"

import { useEffect, useState, useRef } from "react"
import { Send, MoreVertical, Phone, Video, Zap, ChevronLeft } from "lucide-react"
import { Loader } from "@/components/ui/loader"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Message } from "@/types/db"

interface ChatWindowProps {
    conversationId: string | null
    recipientId?: string
    recipientName: string | null
    userId: string
    onBack?: () => void
}

export function ChatWindow({ conversationId, recipientId, recipientName, userId, onBack }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [inputText, setInputText] = useState("")
    const [sending, setSending] = useState(false)
    const [isAutomationOpen, setIsAutomationOpen] = useState(false)
    const [automations, setAutomations] = useState<any[]>([])
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!conversationId) return

        const fetchMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/inbox/messages?conversationId=${conversationId}`)
                const data = await res.json()
                if (Array.isArray(data)) {
                    setMessages(data)
                }
            } catch (error) {
                console.error("Failed to load messages", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [conversationId])

    // Fetch automations for quick reply
    useEffect(() => {
        if (userId) {
            fetch(`/api/automations?userId=${userId}`).then(res => res.json()).then(data => {
                if (Array.isArray(data)) setAutomations(data)
            })
        }
    }, [userId])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSendMessage = async (text: string = inputText) => {
        if (!text.trim() || !recipientId || !userId) return

        setSending(true)
        try {
            const res = await fetch("/api/inbox/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    recipientId,
                    message: text
                })
            })

            if (res.ok) {
                setInputText("")
                // Optimistic update
                const newMsg: Message = {
                    id: `temp_${Date.now()}`,
                    conversation_id: conversationId!,
                    user_id: userId,
                    sender_id: "me",
                    sender_username: "Me",
                    content: text,
                    is_from_instagram: false,
                    created_at: new Date().toISOString()
                }
                setMessages(prev => [...prev, newMsg])
            }
        } catch (e) {
            console.error("Send failed", e)
        } finally {
            setSending(false)
            setIsAutomationOpen(false)
        }
    }

    if (!conversationId) {
        return (
            <div className="flex-1 flex items-center justify-center flex-col gap-4 text-center bg-[#10131a] h-full">
                <div className="w-16 h-16 rounded-none bg-[#1d2027] border border-[#272a31] flex items-center justify-center shadow-sm">
                    <Send className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-foreground">Select a Chat</h3>
                    <p className="text-muted-foreground/80 text-[11px] max-w-[240px] mx-auto mt-1 leading-relaxed">
                        Pick a conversation from the listing to start sending live responses to your audience.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-[#10131a] relative">
            {/* Header */}
            <div className="h-16 border-b border-[#272a31] flex items-center justify-between px-4 md:px-6 bg-[#1d2027]/80 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                    {onBack && (
                        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden -ml-2 text-muted-foreground rounded-none">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                    )}
                    <div className="w-9 h-9 rounded-none bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-sm border border-white/10 text-white font-bold text-xs uppercase">
                        {recipientName?.slice(0, 2) || "IG"}
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-foreground text-xs truncate">@{recipientName}</h3>
                        <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active on Instagram
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden md:flex rounded-none"><Phone className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden md:flex rounded-none"><Video className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-none"><MoreVertical className="w-4 h-4" /></Button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader size="md" />
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMe = !msg.is_from_instagram
                        return (
                            <div key={msg.id} className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}>
                                <div className={cn(
                                    "max-w-[80%] md:max-w-[65%] rounded-none px-4 py-2.5 text-xs shadow-sm break-words",
                                    isMe
                                        ? "bg-[#3d4a5b] border border-primary/20 text-[#acb9ce]"
                                        : "bg-[#1d2027] border border-[#272a31] text-foreground"
                                )}>
                                    <p className="leading-relaxed">{msg.content}</p>
                                    <div className={cn(
                                        "text-[9px] mt-1 font-medium",
                                        isMe ? "text-white/80 text-right" : "text-muted-foreground/80"
                                    )}>
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
                <div ref={bottomRef} />
            </div>

            {/* Automation Popup */}
            {isAutomationOpen && (
                <div className="absolute bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-[#1d2027] border border-[#272a31] rounded-none shadow-2xl backdrop-blur-xl p-2.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-250">
                    <div className="px-2 py-1 text-[10px] font-bold text-muted-foreground/80 uppercase tracking-wider mb-1.5 border-b border-[#272a31] pb-1">Quick Responses</div>
                    <div className="max-h-52 overflow-y-auto space-y-1 scrollbar-thin">
                        {automations.map(auto => (
                            <button
                                key={auto.id}
                                onClick={() => handleSendMessage(auto.response_content?.message || auto.name)}
                                className="w-full text-left px-3 py-2 rounded-none hover:bg-[#32353c]/50 text-[11px] text-foreground transition-all flex items-center gap-2 font-medium"
                            >
                                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20 shrink-0" />
                                <span className="truncate">{auto.name}</span>
                            </button>
                        ))}
                        {automations.length === 0 && (
                            <div className="px-3 py-6 text-center text-muted-foreground/80 text-xs">No automations found.</div>
                        )}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-3 md:p-4 border-t border-[#272a31] bg-[#1d2027]/80 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-2 bg-[#0b0e15] rounded-none border border-[#272a31] p-1.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsAutomationOpen(!isAutomationOpen)}
                        className={cn(
                            "h-9 w-9 hover:bg-[#32353c] text-muted-foreground/75 hover:text-primary transition-all rounded-none", 
                            isAutomationOpen && "text-primary bg-[#3d4a5b]/45"
                        )}
                        title="Insert Trigger Rule Quick-Reply"
                    >
                        <Zap className="w-4 h-4" />
                    </Button>
                    <input
                        className="flex-1 bg-transparent px-3 py-2 text-xs text-foreground focus:outline-none placeholder:text-muted-foreground/45 min-w-0"
                        placeholder="Type a message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !sending) {
                                e.preventDefault()
                                handleSendMessage()
                            }
                        }}
                        disabled={sending}
                    />
                    <Button
                        onClick={() => handleSendMessage()}
                        disabled={sending || !inputText.trim()}
                        size="icon"
                        className="h-9 w-9 bg-primary text-primary-foreground hover:brightness-110 rounded-none shadow-sm disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-all active:scale-95"
                    >
                        {sending ? <Loader size="sm" /> : <Send className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </div>
    )
}
