"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Globe, Instagram, Zap, ArrowRight, Lock, MessageCircle, Send } from "lucide-react"
import type { Automation } from "@/lib/types"
import { toast } from "sonner"

interface AutomationListProps {
  automations: Automation[]
  onDelete: (id: string) => void
  userId: string
  gridCols?: string
}

export function AutomationList({ automations, onDelete, userId, gridCols = "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" }: AutomationListProps) {
  const [mediaMap, setMediaMap] = useState<Record<string, string>>({})
  
  // Modal state for confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [deleteConfirmName, setDeleteConfirmName] = useState("")

  const globalRules = automations.filter((rule) => !rule.specific_media_id)
  const postSpecificRules = automations.filter((rule) => rule.specific_media_id)

  useEffect(() => {
    if (!userId || postSpecificRules.length === 0) return
    const fetchMedia = async () => {
      try {
        const res = await fetch(`/api/instagram/media?userId=${userId}`)
        const data = await res.json()
        if (data.data && Array.isArray(data.data)) {
          const map: Record<string, string> = {}
          data.data.forEach((item: any) => { map[item.id] = item.thumbnail_url || item.media_url })
          setMediaMap(map)
        }
      } catch (e) { console.error("Failed to load thumbnails", e) }
    }
    fetchMedia()
  }, [userId, automations.length])

  const handleDeleteRequest = (id: string, name: string) => {
    setDeleteConfirmId(id)
    setDeleteConfirmName(name)
  }

  if (automations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/40 backdrop-blur-md p-16 text-center shadow-sm max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-300">
        <div className="w-14 h-14 mx-auto mb-5 bg-gradient-to-tr from-primary/15 to-accent/15 rounded-2xl flex items-center justify-center border border-primary/10 shadow-sm shadow-primary/5 relative">
          <Zap className="w-6 h-6 text-primary animate-pulse" />
        </div>
        <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-1">No automations configured</h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Create your first auto-reply funnel above. It takes less than 30 seconds to go live.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
          Active Automation Triggers
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[9px] font-extrabold">{automations.length}</span>
        </h2>
      </div>

      <div className="space-y-8">
        {/* Global rules */}
        {globalRules.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-indigo-500/80 ml-1">
              <Globe className="w-4 h-4" /> Global Triggers
            </div>
            <div className={`grid ${gridCols} gap-4`}>
              {globalRules.map((rule, idx) => (
                <RuleCard key={rule.id} rule={rule} onDeleteRequest={handleDeleteRequest} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Post-specific rules */}
        {postSpecificRules.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-pink-500/80 ml-1">
              <Instagram className="w-4 h-4" /> Post Specific Triggers
            </div>
            <div className={`grid ${gridCols} gap-4`}>
              {postSpecificRules.map((rule, idx) => (
                <RuleCard key={rule.id} rule={rule} onDeleteRequest={handleDeleteRequest} index={idx} mediaUrl={mediaMap[rule.specific_media_id || ""]} isSpecific />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Centralized Glassmorphic Modal for Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="glass-card max-w-sm w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mx-auto border border-red-500/20 shadow-sm">
              <Trash2 className="w-5 h-5 animate-bounce" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-foreground">Delete Automation Rule?</h3>
              <p className="text-xs text-muted-foreground leading-normal">
                Are you sure you want to delete <span className="font-semibold text-foreground font-mono">&ldquo;{deleteConfirmName}&rdquo;</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteConfirmId(null)
                  setDeleteConfirmName("")
                }}
                className="flex-1 h-9 rounded-xl border border-black/10 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:bg-black/5 hover:text-foreground active:scale-95 transition-all"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (deleteConfirmId) {
                    onDelete(deleteConfirmId)
                    setDeleteConfirmId(null)
                    setDeleteConfirmName("")
                    toast.success("Automation rule deleted")
                  }
                }}
                className="flex-1 h-9 rounded-xl bg-gradient-to-tr from-red-500 to-red-600 hover:opacity-95 text-white border-none text-xs font-bold uppercase tracking-wider shadow-md shadow-red-500/10 active:scale-95 transition-all"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RuleCard({ rule, onDeleteRequest, index, isSpecific, mediaUrl }: {
  rule: Automation
  onDeleteRequest: (id: string, name: string) => void
  index: number
  isSpecific?: boolean
  mediaUrl?: string
}) {
  const [isActiveState, setIsActiveState] = useState(rule.is_active)
  const [updatingActive, setUpdatingActive] = useState(false)

  const keywords = rule.trigger_value ? rule.trigger_value.split(",").map(k => k.trim()).filter(Boolean) : []
  const isCard = !!rule.response_content?.card
  const responsePreview = isCard
    ? rule.response_content.card.title
    : rule.response_content?.message

  const handleToggleActive = async () => {
    setUpdatingActive(true)
    const nextState = !isActiveState
    try {
      const res = await fetch("/api/automations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: rule.id, is_active: nextState })
      })
      if (res.ok) {
        setIsActiveState(nextState)
        toast.success(nextState ? "Rule activated" : "Rule paused")
      } else {
        toast.error("Failed to update status")
      }
    } catch {
      toast.error("Network error")
    } finally {
      setUpdatingActive(false)
    }
  }

  return (
    <div
      className="relative overflow-hidden flex flex-col justify-between glass-card h-full min-h-[340px] animate-in fade-in-50 slide-in-from-bottom-2"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Shining effect highlight in corner */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl pointer-events-none" />

      {/* Top Media / Header Image Block */}
      <div className="relative w-full aspect-[16/10] bg-black/20 border-b border-border overflow-hidden shrink-0">
        {isSpecific ? (
          mediaUrl ? (
            <img src={mediaUrl} alt="Linked Instagram Post" className="w-full h-full object-cover transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-pink-500/10 to-purple-500/10">
              <Instagram className="w-6 h-6 text-pink-500 animate-pulse" />
            </div>
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-primary/10 to-accent/10">
            <Globe className="w-7 h-7 text-primary transition-transform duration-300" />
          </div>
        )}

        {/* Source Badge */}
        <Badge className={`absolute top-2.5 left-2.5 text-[8px] font-bold uppercase tracking-wider border-none shadow-sm ${
          isSpecific 
            ? 'bg-pink-500 text-white' 
            : 'bg-indigo-50 text-white'
        }`}>
          {isSpecific ? 'Post Specific' : 'Global Trigger'}
        </Badge>

        {/* Trigger Source Text Overlay */}
        <span className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md text-[8px] font-bold text-white uppercase tracking-wider">
          {rule.trigger_source}s
        </span>
      </div>

      {/* Body Content */}
      <div className="p-4.5 flex-1 flex flex-col justify-between gap-4 relative z-10 w-full">
        {/* Name and Toggle */}
        <div className="space-y-1 w-full">
          <div className="flex items-start justify-between gap-2 w-full">
            <h4 className="text-xs font-bold text-foreground leading-snug line-clamp-2" title={rule.name}>
              {rule.name}
            </h4>
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Toggle Switch */}
              <button
                onClick={handleToggleActive}
                disabled={updatingActive}
                className={`h-4.5 w-8 rounded-full p-0.5 transition-colors cursor-pointer border ${
                  isActiveState 
                    ? 'bg-emerald-500 border-emerald-600' 
                    : 'bg-black/10 border-black/10'
                }`}
                title={isActiveState ? "Pause Rule" : "Activate Rule"}
              >
                <div className={`h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${
                  isActiveState ? 'translate-x-3.5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground/80 font-bold uppercase tracking-wider leading-none">
            Type: {rule.trigger_type}
          </p>
        </div>

        {/* Trigger details & response preview */}
        <div className="space-y-2.5 w-full">
          {/* Keyword Triggers */}
          <div className="flex items-center gap-1 flex-wrap min-h-[16px]">
            {keywords.length > 0 ? (
              keywords.slice(0, 2).map((kw, i) => (
                <Badge key={i} variant="secondary" className="bg-primary/5 text-primary border border-primary/10 text-[8px] font-bold px-2 py-0 rounded shadow-sm max-w-[80px] truncate leading-none">
                  {kw}
                </Badge>
              ))
            ) : (
              <Badge variant="secondary" className="bg-black/5 text-muted-foreground border border-black/5 text-[8px] font-bold px-2 py-0 rounded leading-none">
                All posts
              </Badge>
            )}
            {keywords.length > 2 && (
              <span className="text-[8px] text-muted-foreground/75 font-bold font-mono">+{keywords.length - 2}</span>
            )}
          </div>

          {/* Response bubble */}
          <div className="flex items-start gap-1.5 bg-black/[0.02] border border-black/5 rounded-xl p-2.5 shadow-sm min-w-0 w-full">
            {isCard ? (
              <Send className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            ) : (
              <MessageCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
            )}
            <div className="min-w-0">
              <span className="text-[8px] font-extrabold uppercase tracking-wider text-muted-foreground/90 block leading-none">
                {isCard ? 'Rich Card' : 'DM Reply'}
              </span>
              <span className="text-[9.5px] text-foreground font-semibold truncate block mt-0.5 leading-tight" title={responsePreview}>
                &ldquo;{responsePreview}&rdquo;
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions: Created time, Follow gated, Delete button */}
        <div className="flex items-center justify-between border-t border-black/5 pt-2.5 mt-1 w-full">
          <div className="flex items-center gap-1">
            {rule.response_content?.check_follow && (
              <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border border-amber-500/15 text-[7px] px-1.5 py-0.5 rounded font-bold tracking-wide uppercase leading-none">
                Gated
              </Badge>
            )}
            {!isActiveState && (
              <Badge variant="secondary" className="bg-black/5 text-muted-foreground border border-black/5 text-[7px] px-1.5 py-0.5 rounded font-bold tracking-wide uppercase leading-none">
                Paused
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteRequest(rule.id, rule.name)}
              className="h-6.5 w-6.5 text-muted-foreground/45 hover:text-red-500 hover:bg-red-50 rounded-md transition-all active:scale-90"
              title="Delete rule"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
