"use client"

import { useState, useEffect } from "react"
import { useInstagramSession } from "@/hooks/use-instagram-session"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, RefreshCw } from "lucide-react"
import { Loader } from "@/components/ui/loader"
import { toast } from "sonner"
import type { IceBreaker } from "@/types/db"

export function IceBreakersManager() {
    const { userId, isLoading } = useInstagramSession()
    const [breakers, setBreakers] = useState<Partial<IceBreaker>[]>([])
    const [saving, setSaving] = useState(false)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        if (!userId) return
        fetch(`/api/ice-breakers?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setBreakers(data)
                setFetching(false)
            })
            .catch(err => {
                console.error(err)
                setFetching(false)
            })
    }, [userId])

    const handleAdd = () => {
        if (breakers.length >= 4) {
            toast.error("Maximum 4 Ice Breakers allowed by Instagram")
            return
        }
        setBreakers([...breakers, { question: "", response: "" }])
    }

    const handleChange = (index: number, field: "question" | "response", value: string) => {
        const newBreakers = [...breakers]
        newBreakers[index] = { ...newBreakers[index], [field]: value }
        setBreakers(newBreakers)
    }

    const handleRemove = (index: number) => {
        setBreakers(breakers.filter((_, i) => i !== index))
    }

    const handleSave = async () => {
        if (!userId) return

        // Validation
        if (breakers.some(b => !b.question?.trim() || !b.response?.trim())) {
            toast.error("Please fill in all fields")
            return
        }

        setSaving(true)
        try {
            const res = await fetch("/api/ice-breakers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, iceBreakers: breakers })
            })
            const data = await res.json()
            if (data.success) {
                toast.success("Ice Breakers saved & synced usually!")
            } else {
                toast.error("Failed to save")
            }
        } catch (e) {
            toast.error("Error saving")
        } finally {
            setSaving(false)
        }
    }

    if (isLoading || fetching && !breakers.length) {
        return <div className="p-10 flex justify-center"><Loader size="md" /></div>
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-foreground">Ice Breakers</h2>
                    <p className="text-muted-foreground text-xs mt-0.5">
                        Define common questions people see when they message you.
                    </p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="bg-[#e3ee42] text-[#1b1d00] hover:brightness-110 font-black text-xs px-5 py-2.5 rounded-sm active:scale-95 transition-transform shadow-[0_0_15px_rgba(227,238,66,0.15)] cursor-pointer border-none">
                    {saving ? <Loader size="sm" className="mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
                    Save & Sync
                </Button>
            </div>

            <div className="space-y-4">
                {breakers.map((item, idx) => (
                    <div key={idx} className="bg-[#191c23] border border-[#272a31] p-5 rounded-sm space-y-4 relative group">
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1 space-y-3.5">
                                <div>
                                    <label className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider block ml-1 mb-1">Ice Breaker Question</label>
                                    <Input
                                        value={item.question}
                                        onChange={e => handleChange(idx, "question", e.target.value)}
                                        placeholder="e.g., What are your services?"
                                        className="glass-input w-full"
                                        maxLength={80}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider block ml-1 mb-1">Automated DM Response</label>
                                    <Textarea
                                        value={item.response}
                                        onChange={e => handleChange(idx, "response", e.target.value)}
                                        placeholder="Type the message sent back automatically when tapped..."
                                        className="glass-textarea h-20 w-full"
                                        rows={2}
                                    />
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemove(idx)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-sm shrink-0 active:scale-95"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}

                {breakers.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-[#272a31] rounded-sm text-muted-foreground bg-[#191c23]/40">
                        <Plus className="w-6 h-6 text-muted-foreground/30 mx-auto mb-2" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">No ice breakers configured</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Tap the button below to add custom startup questions.</p>
                    </div>
                )}

                {breakers.length < 4 && (
                    <Button variant="outline" onClick={handleAdd} className="w-full border-dashed border-[#272a31] hover:border-[#e3ee42]/30 bg-[#191c23]/45 hover:bg-[#32353c]/30 text-muted-foreground hover:text-foreground font-black text-xs uppercase tracking-wider h-11 rounded-sm cursor-pointer transition-colors duration-150">
                        <Plus className="w-4 h-4 mr-2" /> Add Question
                    </Button>
                )}
            </div>

            <div className="bg-[#12161f] border border-[#272a31] p-4.5 rounded-sm flex gap-3 text-xs text-[#acb9ce] leading-relaxed">
                <RefreshCw className="w-5 h-5 shrink-0 text-[#e3ee42] animate-spin-slow" />
                <p className="font-medium">
                    Ice breakers are synced directly to your Instagram Messenger profile. It may take up to a few minutes for changes to update for new chatters.
                </p>
            </div>
        </div>
    )
}
