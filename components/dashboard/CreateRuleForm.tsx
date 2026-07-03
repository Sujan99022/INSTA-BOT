"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Lock, Film, ArrowRight, ArrowLeft, Check, Sparkles, MessageCircle, Send, AtSign, Heart, MessageSquare } from "lucide-react"
import { TagInput } from "@/components/ui/tag-input"
import type { ProButton } from "@/lib/types"
import { toast } from "sonner"

interface CreateRuleFormProps {
  userId: string
  triggerSource: 'comment' | 'dm' | 'story'
  onSuccess: () => void
}

export function CreateRuleForm({ userId, triggerSource, onSuccess }: CreateRuleFormProps) {
  const [step, setStep] = useState(1)

  // Step 1: Prompt
  const [replyToAll, setReplyToAll] = useState(false)
  const [triggers, setTriggers] = useState<string[]>([])
  const [storyTriggerType, setStoryTriggerType] = useState<'mention' | 'reaction' | 'reply'>('mention')
  const [selectedReel, setSelectedReel] = useState<any | null>(null)
  const [showReelPicker, setShowReelPicker] = useState(false)

  // Step 2: Response
  const [type, setType] = useState<"text" | "card">("text")
  const [messageText, setMessageText] = useState("")
  const [cardTitle, setCardTitle] = useState("")
  const [cardSubtitle, setCardSubtitle] = useState("")
  const [cardImage, setCardImage] = useState("")
  const [buttons, setButtons] = useState<ProButton[]>([])

  // Step 3: Settings
  const [name, setName] = useState("")
  const [checkFollow, setCheckFollow] = useState(false)

  // Media
  const [reels, setReels] = useState<any[]>([])
  const [loadingReels, setLoadingReels] = useState(false)

  useEffect(() => {
    if (userId) loadReels()
  }, [userId])

  // Auto-generate name suggestion
  useEffect(() => {
    if (name) return // Don't overwrite user's custom name
    if (replyToAll) {
      setName(`All Comments → Reply`)
    } else if (triggers.length > 0) {
      setName(`${triggers.slice(0, 2).join(", ")} → Reply`)
    }
  }, [triggers, replyToAll])

  const loadReels = async () => {
    try {
      setLoadingReels(true)
      const res = await fetch(`/api/instagram/media?userId=${userId}`)
      const responseJson = await res.json()
      if (responseJson.data && Array.isArray(responseJson.data)) setReels(responseJson.data)
      else if (Array.isArray(responseJson)) setReels(responseJson)
    } catch (err) {
      console.error("[v0] Failed to load reels:", err)
    } finally {
      setLoadingReels(false)
    }
  }

  const handleAddButton = () => {
    if (buttons.length >= 3) return
    setButtons([...buttons, { id: Date.now().toString(), type: "web_url", title: "", url: "", payload: "" }])
  }

  const updateButton = (id: string, field: keyof ProButton, value: string) => {
    setButtons(buttons.map((b) => (b.id === id ? { ...b, [field]: value } : b)))
  }

  const removeButton = (id: string) => {
    setButtons(buttons.filter((b) => b.id !== id))
  }

  // Validation per step
  const canProceedStep1 = () => {
    const isStoryMentionOrReaction = triggerSource === 'story' && (storyTriggerType === 'mention' || storyTriggerType === 'reaction')
    if (replyToAll && !selectedReel) {
      toast.error("Select a Post", { description: "Reply-All requires selecting a specific post." })
      return false
    }
    if (!replyToAll && !isStoryMentionOrReaction && triggers.length === 0) {
      toast.error("Add Keywords", { description: "Add at least one keyword prompt." })
      return false
    }
    return true
  }

  const canProceedStep2 = () => {
    if (type === "text" && !messageText.trim()) {
      toast.error("Missing Reply", { description: "Enter the message to auto-send." })
      return false
    }
    if (type === "card" && !cardTitle.trim()) {
      toast.error("Missing Title", { description: "Rich cards need a title." })
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Name Required", { description: "Give your rule a name." })
      return
    }

    const content: any = { check_follow: checkFollow }
    if (type === "text") {
      content.message = messageText
    } else {
      const cleanButtons = buttons
        .map((b) => {
          if (b.type === "web_url") {
            let cleanUrl = b.url?.trim() || ""
            if (cleanUrl.startsWith("https://https://")) cleanUrl = cleanUrl.replace("https://https://", "https://")
            return { type: "web_url", title: b.title, url: cleanUrl }
          }
          return { type: "postback", title: b.title, payload: b.payload }
        })
        .filter((b) => b.title)

      content.card = {
        title: cardTitle,
        subtitle: cardSubtitle || undefined,
        image_url: cardImage || undefined,
        buttons: cleanButtons,
      }
    }

    try {
      const loadingToast = toast.loading("Creating...")
      const res = await fetch("/api/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          name,
          trigger_source: triggerSource,
          trigger_type: replyToAll ? "reply_all" : (triggerSource === 'story' ? storyTriggerType : "keyword"),
          trigger_value: replyToAll ? "ALL_COMMENTS" :
            (triggerSource === 'story' && storyTriggerType === 'mention') ? "ALL_MENTIONS" :
              (triggerSource === 'story' && storyTriggerType === 'reaction' && triggers.length === 0) ? "ALL_REACTIONS" :
                triggers.length > 0 ? triggers.join(", ") : "ALL",
          content,
          specific_media_id: selectedReel?.id || null,
        }),
      })

      toast.dismiss(loadingToast)
      if (res.ok) {
        toast.success("Rule Created! 🎉")
        // Reset everything
        setStep(1)
        setName("")
        setTriggers([])
        setReplyToAll(false)
        setMessageText("")
        setCardTitle("")
        setCardSubtitle("")
        setCardImage("")
        setButtons([])
        setSelectedReel(null)
        setCheckFollow(false)
        onSuccess()
      } else {
        toast.error("Failed", { description: "Please try again." })
      }
    } catch (err) {
      toast.error("Network Error")
    }
  }

  // --- SUB COMPONENTS ---

  const StepIndicator = () => (
    <div className="flex items-center gap-2 mb-6 border-b border-[#272a31] pb-4">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <button
            onClick={() => {
              if (s < step) setStep(s)
            }}
            className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black transition-all duration-300 ${
              s === step
                ? "bg-primary text-primary-foreground scale-110 shadow-md shadow-[#e3ee42]/20"
                : s < step
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-pointer hover:scale-105"
                  : "bg-[#1d2027] text-muted-foreground/60 border border-[#272a31]"
            }`}
          >
            {s < step ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : s}
          </button>
          {s < 3 && (
            <div className={`w-8 h-0.5 transition-colors duration-500 ${s < step ? "bg-emerald-500/40" : "bg-[#272a31]"}`} />
          )}
        </div>
      ))}
      <span className="text-[10px] text-[#e0e2ec] ml-2 uppercase tracking-widest font-black">
        {step === 1 ? "Prompt Configuration" : step === 2 ? "Response Content" : "Launch Options"}
      </span>
    </div>
  )

  const ReelPicker = () => {
    const filteredReels = triggerSource === 'story'
      ? reels.filter((r: any) => r.media_type === 'STORY' || r.media_product_type === 'STORY')
      : reels

    if (loadingReels) {
      return (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#191c23] border border-[#272a31] rounded-sm text-center z-50 shadow-xl">
          <p className="text-muted-foreground text-xs font-semibold animate-pulse">Loading media library...</p>
        </div>
      )
    }

    if (filteredReels.length === 0) {
      return (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#191c23] border border-[#272a31] rounded-sm text-center z-50 shadow-xl">
          <p className="text-muted-foreground text-xs font-semibold">{triggerSource === 'story' ? 'No active stories' : 'No posts found'}</p>
        </div>
      )
    }

    return (
      <div className="absolute top-full left-0 right-0 mt-2 max-h-56 overflow-y-auto bg-[#191c23] border border-[#272a31] rounded-sm z-50 shadow-xl overflow-x-hidden">
        {filteredReels.map((reel: any) => {
          const isStory = reel.media_type === 'STORY' || reel.media_product_type === 'STORY'
          if (triggerSource === 'story' && !isStory) return null
          const label = isStory ? 'Story' : reel.media_type === 'VIDEO' ? 'Reel' : reel.media_type === 'CAROUSEL_ALBUM' ? 'Carousel' : 'Post'

          return (
            <button
              key={reel.id}
              type="button"
              onClick={() => { setSelectedReel(reel); setShowReelPicker(false) }}
              className="w-full p-3 flex items-center gap-3 hover:bg-[#32353c]/30 transition-colors text-left border-b border-[#272a31] last:border-0 cursor-pointer"
            >
              {reel.image_url ? (
                <img src={reel.image_url} alt="" className="w-9 h-9 rounded-lg object-cover border border-black/5 shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center shrink-0 border border-black/5">
                  <Film className="w-4 h-4 text-muted-foreground/50" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground truncate">{reel.caption || 'Untitled'}</p>
                <span className="text-[9px] font-extrabold uppercase text-muted-foreground/60 tracking-wider mt-0.5 block">{label}</span>
              </div>
            </button>
          )
        })}
      </div>
    )
  }

  // DM Preview Bubble (Instagram Styled)
  const DMPreview = () => {
    const previewText = type === "text" ? messageText : cardTitle
    if (!previewText) return null

    return (
      <div className="mt-4 flex justify-end">
        <div className="max-w-[260px] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-gradient-to-tr from-sky-500 to-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-md shadow-blue-500/10">
            {type === "text" ? (
              <p className="text-xs leading-relaxed font-medium">{messageText}</p>
            ) : (
              <div className="space-y-2">
                <p className="font-bold text-xs">{cardTitle}</p>
                {cardSubtitle && <p className="text-[10px] opacity-90 leading-tight">{cardSubtitle}</p>}
                {buttons.filter(b => b.title).map((b, i) => (
                  <div key={i} className="bg-white/20 hover:bg-white/30 rounded-lg py-1.5 text-[9px] font-bold text-center mt-1.5 border border-white/10 uppercase tracking-wider">{b.title}</div>
                ))}
              </div>
            )}
          </div>
          <p className="text-[9px] text-muted-foreground/80 font-bold uppercase tracking-wider mt-1 text-right">Instagram DM Preview</p>
        </div>
      </div>
    )
  }

  // --- STEP RENDERS ---

  const renderStep1 = () => (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h3 className="text-base font-bold text-foreground mb-1">
          {triggerSource === 'comment' ? '💬 Comment Rule' :
            triggerSource === 'dm' ? '📩 DM Rule' :
              '📸 Story Rule'}
        </h3>
        <p className="text-xs text-muted-foreground">
          {triggerSource === 'comment' 
            ? 'Send a reply when someone comments on your post.'
            : triggerSource === 'dm'
              ? 'Send a reply when someone DMs your account.'
              : 'Send a reply when someone interacts with your stories.'}
        </p>
      </div>

      {/* Story type selector */}
      {triggerSource === 'story' && (
        <div className="grid grid-cols-3 gap-2">
          {([
            { key: 'mention' as const, icon: <AtSign className="w-4 h-4" />, label: 'Mentions' },
            { key: 'reaction' as const, icon: <Heart className="w-4 h-4" />, label: 'Reactions' },
            { key: 'reply' as const, icon: <MessageSquare className="w-4 h-4" />, label: 'Replies' },
          ]).map(({ key, icon, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setStoryTriggerType(key)}
              className={`p-3 rounded-sm border transition-all flex flex-col items-center gap-1.5 active:scale-95 cursor-pointer ${
                storyTriggerType === key
                  ? 'border-primary/30 bg-primary/10 text-primary shadow-sm'
                  : 'border-[#272a31] text-muted-foreground bg-[#191c23] hover:bg-[#32353c]/30 hover:text-foreground'
              }`}
            >
              {icon}
              <span className="text-[10px] font-extrabold uppercase tracking-wider">{label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Reply to all toggle — comments only */}
      {triggerSource === 'comment' && (
        <button
          type="button"
          onClick={() => setReplyToAll(!replyToAll)}
          className={`w-full p-4 rounded-sm border transition-all flex items-center gap-3 active:scale-[0.99] cursor-pointer ${
            replyToAll ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-[#272a31] bg-[#191c23]'
          }`}
        >
          <div className={`w-9 h-9 rounded-sm flex items-center justify-center ${
            replyToAll ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800/40 text-slate-400'
          }`}>
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div className="text-left flex-1">
            <p className={`text-xs font-black uppercase tracking-wider ${replyToAll ? 'text-emerald-400' : 'text-[#e0e2ec]'}`}>Reply to All Comments</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Automate replies to every single comment on the selected post</p>
          </div>
          <div className={`w-5 h-5 rounded-sm border-2 transition-all shrink-0 ${
            replyToAll ? 'border-emerald-500 bg-emerald-500' : 'border-[#272a31] bg-[#0b0e15]'
          }`}>
            {replyToAll && <Check className="w-3 h-3 text-black font-extrabold m-auto mt-0.5" />}
          </div>
        </button>
      )}

      {/* Keyword input — conditional */}
      {!(triggerSource === 'comment' && replyToAll) && !(triggerSource === 'story' && storyTriggerType === 'mention') && (
        <div className="space-y-2">
          <Label className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider ml-1">
            {triggerSource === 'story' && storyTriggerType === 'reaction' ? 'Emoji Filters' : 'Prompt Keywords'}
          </Label>
          <TagInput
            value={triggers}
            onChange={setTriggers}
            placeholder={
              triggerSource === 'comment' ? 'e.g. hello, price, info' :
                triggerSource === 'story' && storyTriggerType === 'reaction' ? 'e.g. ❤️, 🔥, 👍' :
                  'e.g. menu, hours, book'
            }
          />
          <p className="text-[9px] text-muted-foreground ml-1">Press Enter or comma to insert multiple prompts</p>
        </div>
      )}

      {/* Post/Reel picker */}
      {(triggerSource === 'comment' || triggerSource === 'story') && (
        <div className="space-y-2">
          <Label className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider ml-1">
            {replyToAll ? 'Post Selection (Required)' :
              triggerSource === 'story' ? 'Target Story (Optional)' : 'Target Post / Reel (Optional)'}
          </Label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowReelPicker(!showReelPicker)}
              className="w-full p-3.5 rounded-sm border border-[#272a31] bg-[#191c23] hover:bg-[#32353c]/30 transition-all text-left flex items-center gap-3 cursor-pointer"
            >
              {selectedReel ? (
                <>
                  {selectedReel.image_url && (
                    <img src={selectedReel.image_url} alt="" className="w-9 h-9 rounded-sm object-cover border border-[#272a31] shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{selectedReel.caption || 'No caption'}</p>
                    <p className="text-[9px] text-primary font-bold uppercase tracking-wider mt-0.5">✓ Target Post Linked</p>
                  </div>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {replyToAll ? '📌 Select target post...' : '📌 Apply rule globally or tap to select a specific post'}
                </span>
              )}
            </button>
            {showReelPicker && <ReelPicker />}
          </div>
        </div>
      )}
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h3 className="text-base font-bold text-foreground mb-1">✉️ Response DM Message</h3>
        <p className="text-xs text-muted-foreground">Define what information goes back to the customer.</p>
      </div>

      {/* Response type toggle */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setType("text")}
          className={`p-3 rounded-sm border transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
            type === "text" 
              ? 'border-primary/30 bg-primary/10 text-primary shadow-sm' 
              : 'border-[#272a31] text-muted-foreground bg-[#191c23] hover:bg-[#32353c]/30 hover:text-foreground'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Plain Text</span>
        </button>
        <button
          type="button"
          onClick={() => setType("card")}
          className={`p-3 rounded-sm border transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
            type === "card" 
              ? 'border-primary/30 bg-primary/10 text-primary shadow-sm' 
              : 'border-[#272a31] text-muted-foreground bg-[#191c23] hover:bg-[#32353c]/30 hover:text-foreground'
          }`}
        >
          <Send className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Rich Card</span>
        </button>
      </div>

      {type === "text" ? (
        <div className="space-y-1">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full glass-textarea min-h-[110px]"
            placeholder="Type your auto-response message..."
          />
          <p className="text-[9px] text-muted-foreground text-right font-mono">{messageText.length}/1000</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3 p-4.5 rounded-sm bg-[#191c23] border border-[#272a31]">
            <Input
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              className="glass-input font-bold w-full"
              placeholder="Card Title (bold)"
            />
            <Input
              value={cardSubtitle}
              onChange={(e) => setCardSubtitle(e.target.value)}
              className="glass-input w-full animate-none"
              placeholder="Description (optional)"
            />
            <Input
              value={cardImage}
              onChange={(e) => setCardImage(e.target.value)}
              className="glass-input w-full"
              placeholder="Media Image URL (optional)"
            />
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider">Interactive Buttons ({buttons.length}/3)</span>
              <Button size="sm" variant="ghost" onClick={handleAddButton} disabled={buttons.length >= 3} className="h-7 text-xs font-bold hover:bg-black/5 text-primary">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Button
              </Button>
            </div>
            {buttons.map((btn) => (
              <div key={btn.id} className="flex gap-2 items-center bg-[#191c23] p-2 rounded-sm border border-[#272a31] animate-in fade-in">
                <Input
                  value={btn.title}
                  onChange={(e) => updateButton(btn.id, "title", e.target.value)}
                  className="h-8.5 text-xs flex-1 glass-input px-2 w-full"
                  placeholder="Title"
                />
                <Select value={btn.type} onValueChange={(v) => updateButton(btn.id, "type", v as any)}>
                  <SelectTrigger className="h-8.5 w-[85px] text-[10px] font-bold glass-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web_url">Link</SelectItem>
                    <SelectItem value="postback">Action</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={btn.type === "web_url" ? btn.url : btn.payload}
                  onChange={(e) => updateButton(btn.id, btn.type === "web_url" ? "url" : "payload", e.target.value)}
                  className="h-8.5 text-xs flex-1 glass-input px-2 w-full"
                  placeholder={btn.type === "web_url" ? "https://link.com" : "Keyword"}
                />
                <Button size="icon" variant="ghost" onClick={() => removeButton(btn.id)} className="h-8.5 w-8.5 text-red-500 hover:bg-red-500/10 hover:text-red-400 rounded-sm cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <DMPreview />
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h3 className="text-base font-bold text-foreground mb-1">🚀 Launch Rule</h3>
        <p className="text-xs text-muted-foreground">Complete details and deploy the rules live.</p>
      </div>

      <div className="space-y-2">
        <Label className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider ml-1">Rule Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/50 border-black/10 focus:bg-white/80"
          placeholder="e.g., Lead Magnet Funnel, Discount Reply"
        />
      </div>

      <button
        type="button"
        onClick={() => setCheckFollow(!checkFollow)}
        className={`w-full p-4 rounded-sm border transition-all flex items-center gap-3 active:scale-[0.99] cursor-pointer ${
          checkFollow ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : 'border-[#272a31] bg-[#191c23]'
        }`}
      >
        <div className={`w-9 h-9 rounded-sm flex items-center justify-center ${
          checkFollow ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800/40 text-slate-400'
        }`}>
          <Lock className="w-4.5 h-4.5" />
        </div>
        <div className="text-left flex-1">
          <p className={`text-xs font-black uppercase tracking-wider ${checkFollow ? 'text-amber-400' : 'text-[#e0e2ec]'}`}>Follower Gate</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Restrict this rule to followers of your profile only</p>
        </div>
        <div className={`w-5 h-5 rounded-sm border-2 transition-all shrink-0 ${
          checkFollow ? 'border-amber-500 bg-amber-500' : 'border-[#272a31] bg-[#0b0e15]'
        }`}>
          {checkFollow && <Check className="w-3 h-3 text-black font-extrabold m-auto mt-0.5" />}
        </div>
      </button>

      {/* Summary card */}
      <div className="p-4 rounded-sm bg-[#191c23] border border-[#272a31] space-y-2.5">
        <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">Rule Summary</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground/75 font-semibold">Event:</span>
          <span className="text-foreground font-bold uppercase tracking-wider text-[10px]">
            {replyToAll ? 'All comments' :
              triggerSource === 'story' && storyTriggerType === 'mention' ? 'Story mention' :
                triggers.length > 0 ? triggers.join(", ") : 'Any incoming message'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground/75 font-semibold">Reply Type:</span>
          <span className="text-foreground font-bold">
            {type === 'text' ? 'Plain Text Message' : `Rich Template Card: ${cardTitle}`}
          </span>
        </div>
        {checkFollow && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground/75 font-semibold">Visibility:</span>
            <span className="text-amber-500 font-extrabold uppercase text-[10px] tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-sm border border-amber-500/10">Followers Only</span>
          </div>
        )}
      </div>
    </div>
  )

  // --- MAIN RENDER ---
  return (
    <div className="space-y-6">
      <StepIndicator />

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}

      {/* Navigation */}
      <div className="flex gap-3 pt-2.5">
        {step > 1 && (
          <Button
            variant="ghost"
            onClick={() => setStep(step - 1)}
            className="flex-1 h-11 rounded-sm border border-[#272a31] bg-[#1a222a] text-[#acb9ce] font-black uppercase tracking-wider text-[10px] hover:bg-[#202933] active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        )}

        {step < 3 ? (
          <Button
            onClick={() => {
              if (step === 1 && !canProceedStep1()) return
              if (step === 2 && !canProceedStep2()) return
              setStep(step + 1)
            }}
            className="flex-1 bg-primary hover:brightness-110 text-[#1b1d00] font-black uppercase tracking-wider text-[10px] h-11 rounded-sm active:scale-95 transition-transform shadow-[0_0_15px_rgba(227,238,66,0.15)] cursor-pointer border-none"
          >
            Next Step <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:brightness-110 text-[#1b1d00] font-black uppercase tracking-wider text-[10px] h-11 rounded-sm active:scale-95 transition-transform shadow-[0_0_15px_rgba(227,238,66,0.15)] cursor-pointer border-none"
          >
            <Sparkles className="w-4 h-4 mr-2" /> Go Live
          </Button>
        )}
      </div>
    </div>
  )
}
