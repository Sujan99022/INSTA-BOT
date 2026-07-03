"use client"

import { useState } from "react"
import { useInstagramSession } from "@/hooks/use-instagram-session"
import { ConversationList } from "@/components/inbox/ConversationList"
import { ChatWindow } from "@/components/inbox/ChatWindow"
import { Loader } from "@/components/ui/loader"
import { cn } from "@/lib/utils"

export default function InboxPage() {
    const { userId, isLoading } = useInstagramSession()
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
    const [selectedRecipientName, setSelectedRecipientName] = useState<string | null>(null)
    const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null)

    const handleSelect = (id: string, name: string, recipientId: string) => {
        setSelectedConversationId(id)
        setSelectedRecipientName(name)
        setSelectedRecipientId(recipientId)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader size="md" />
            </div>
        )
    }

    if (!userId) {
        return null
    }

    return (
        <div className="h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] overflow-hidden glass-panel-strong border-t md:rounded-sm shadow-lg flex relative md:m-8">
            <div className={cn(
                "w-full md:w-[320px] flex-shrink-0 border-r border-border bg-sidebar/50 absolute md:static inset-0 z-10 transition-transform duration-300 md:translate-x-0 h-full",
                selectedConversationId ? "-translate-x-full md:translate-x-0" : "translate-x-0"
            )}>
                <ConversationList
                    userId={userId}
                    selectedId={selectedConversationId}
                    onSelect={handleSelect}
                />
            </div>

            <div className={cn(
                "flex-1 w-full absolute md:static inset-0 z-20 bg-[#10131a] md:bg-transparent transition-transform duration-300 md:translate-x-0 h-full",
                selectedConversationId ? "translate-x-0" : "translate-x-full md:translate-x-0"
            )}>
                <ChatWindow
                    conversationId={selectedConversationId}
                    recipientName={selectedRecipientName}
                    recipientId={selectedRecipientId || undefined}
                    userId={userId}
                    onBack={() => setSelectedConversationId(null)}
                />
            </div>
        </div>
    )
}
