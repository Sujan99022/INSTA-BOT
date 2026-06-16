"use client"

import { useEffect, useState } from "react"
import { Search, User, MessageCircle } from "lucide-react"
import { Loader } from "@/components/ui/loader"
import { cn } from "@/lib/utils"
import type { Conversation } from "@/types/db"

interface ConversationListProps {
    userId: string
    selectedId: string | null
    onSelect: (id: string, username: string, recipientId: string) => void
}

export function ConversationList({ userId, selectedId, onSelect }: ConversationListProps) {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (!userId) return

        const fetchConversations = async () => {
            try {
                const res = await fetch(`/api/inbox/conversations?userId=${userId}`)
                const data = await res.json()
                if (Array.isArray(data)) {
                    setConversations(data)
                }
            } catch (error) {
                console.error("Failed to load conversations", error)
            } finally {
                setLoading(false)
            }
        }

        fetchConversations()
    }, [userId])

    const filteredConversations = conversations.filter(conv => 
        conv.recipient_username.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full border-r border-[#272a31] bg-[#10131a]">
                <Loader size="md" />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full border-r border-[#272a31] bg-[#1d2027]/50 w-full md:w-[320px] shrink-0">
            <div className="p-4 border-b border-[#272a31] space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        Conversations
                    </h2>
                    {filteredConversations.length > 0 && (
                        <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                            {filteredConversations.length}
                        </span>
                    )}
                </div>
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                    <input
                        className="w-full glass-input !pl-10 pr-4 py-2 text-xs"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
                {filteredConversations.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground text-xs font-medium">
                        {searchQuery ? "No matching conversations." : "No conversations yet."}
                    </div>
                ) : (
                    filteredConversations.map((conv) => {
                        const isSelected = selectedId === conv.id
                        return (
                            <div
                                key={conv.id}
                                onClick={() => onSelect(conv.id, conv.recipient_username, conv.recipient_id.toString())}
                                className={cn(
                                    "p-3 rounded-none flex items-center gap-3 cursor-pointer transition-all duration-200 border",
                                    isSelected
                                        ? "bg-[#3d4a5b]/45 border-[#e3ee42]/30 shadow-sm"
                                        : "bg-transparent border-transparent hover:bg-[#32353c]/35 hover:border-[#272a31]"
                                )}
                            >
                                <div className={cn(
                                    "w-11 h-11 rounded-none flex items-center justify-center shrink-0 shadow-sm border transition-all",
                                    isSelected 
                                        ? "bg-primary/20 border-primary/30 text-primary" 
                                        : "bg-[#10131a] border-[#272a31] text-muted-foreground/75"
                                )}>
                                    <User className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className={cn(
                                            "text-xs truncate",
                                            isSelected ? "font-bold text-primary" : "font-semibold text-foreground"
                                        )}>
                                            {conv.recipient_username}
                                        </span>
                                        <span className="text-[9px] text-muted-foreground/85 font-medium whitespace-nowrap">
                                            {new Date(conv.last_message_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground/80 truncate">
                                        Open conversation thread
                                    </p>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
