"use client"

import { useState, useCallback, useEffect } from "react"
import { useInstagramSession } from "@/hooks/use-instagram-session"
import { AutomationList } from "@/components/dashboard/AutomationList"
import { CreateRuleForm } from "@/components/dashboard/CreateRuleForm"
import { MessageCircle, Send, Sparkles, Zap, Plus, Brain, X } from "lucide-react"
import { IceBreakersManager } from "@/components/dashboard/IceBreakersManager"
import type { Automation } from "@/lib/types"
import { Loader } from "@/components/ui/loader"

export default function AutomationsPage() {
    const { userId, isLoading: isSessionLoading } = useInstagramSession()
    const [automations, setAutomations] = useState<Automation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'comment' | 'dm' | 'story'>('comment')
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [aiEnabled, setAiEnabled] = useState(false)
    const [aiLoading, setAiLoading] = useState(true)
    const [aiToggling, setAiToggling] = useState(false)
    const [showAiContext, setShowAiContext] = useState(false)
    const [aiContext, setAiContext] = useState("")
    const [aiContextSaving, setAiContextSaving] = useState(false)
    const [aiContextSaved, setAiContextSaved] = useState(false)

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (!userId) return
        fetch(`/api/groq/auto-reply?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                setAiEnabled(data.enabled ?? false)
                setAiContext(data.ai_context ?? "")
            })
            .catch(() => {})
            .finally(() => setAiLoading(false))
    }, [userId])

    const handleSaveAiContext = async () => {
        if (aiContextSaving) return
        setAiContextSaving(true)
        try {
            await fetch("/api/groq/auto-reply", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, enabled: aiEnabled, ai_context: aiContext }),
            })
            setAiContextSaved(true)
            setTimeout(() => setAiContextSaved(false), 2000)
        } catch {}
        setAiContextSaving(false)
    }

    const handleToggleAI = async () => {
        if (aiToggling) return
        setAiToggling(true)
        const newState = !aiEnabled
        try {
            const res = await fetch("/api/groq/auto-reply", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, enabled: newState }),
            })
            if (res.ok) setAiEnabled(newState)
        } catch {}
        setAiToggling(false)
    }

    const fetchAutomations = useCallback(async () => {
        if (!userId) return
        try {
            const res = await fetch(`/api/automations?userId=${userId}`)
            const data = await res.json()
            if (res.ok) setAutomations(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error("Fetch error:", err)
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    useEffect(() => {
        if (userId) fetchAutomations()
    }, [userId, fetchAutomations])

    const handleDeleteRule = async (id: string) => {
        await fetch(`/api/automations?id=${id}`, { method: "DELETE" })
        fetchAutomations()
    }

    if (isSessionLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-background">
                <Loader size="md" />
            </div>
        )
    }

    if (!userId) {
        return (
            <div className="h-screen flex items-center justify-center bg-background text-muted-foreground">
                Please log in
            </div>
        )
    }

    const filteredAutomations = automations.filter(a => a.trigger_source === activeTab)
    const counts = {
        comment: automations.filter(a => a.trigger_source === 'comment').length,
        dm: automations.filter(a => a.trigger_source === 'dm').length,
        story: automations.filter(a => a.trigger_source === 'story').length,
    }

    const tabs = [
        { key: 'comment' as const, icon: <MessageCircle className="w-4 h-4" />, label: 'Comments', count: counts.comment },
        { key: 'dm' as const, icon: <Send className="w-4 h-4" />, label: 'DMs', count: counts.dm },
        { key: 'story' as const, icon: <Sparkles className="w-4 h-4" />, label: 'Stories', count: counts.story },
    ]

    const hasRightContent = (!isMobile && showCreateForm) || (!isMobile && showAiContext) || activeTab === 'dm'

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Consolidated Header with Tabs and Actions */}
                <div className="space-y-3">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary" />
                                Automation Rules
                            </h1>
                            <p className="text-muted-foreground text-xs mt-1">
                                Create keyword-triggered message and comment funnels.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            {/* Tabs Selector Aligned Right */}
                            <div className="flex gap-1 bg-[#0b0e15] p-1 rounded-sm border border-[#272a31] shadow-sm">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => {
                                            setActiveTab(tab.key)
                                            setShowCreateForm(false)
                                            setShowAiContext(false)
                                        }}
                                        className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-bold transition-all duration-200 ${
                                            activeTab === tab.key
                                                ? 'bg-[#3d4a5b] text-[#acb9ce] border border-[#e3ee42]/30 shadow-sm'
                                                : 'text-[#c8c8ae] hover:text-[#e0e2ec] hover:bg-[#32353c]/35'
                                        }`}
                                    >
                                        {tab.icon}
                                        <span className="inline-block">{tab.label}</span>
                                        {tab.count > 0 && (
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold ml-1 ${
                                                activeTab === tab.key ? 'bg-[#e3ee42]/20 text-[#e3ee42]' : 'bg-[#1d2027] text-[#c8c8ae]/70'
                                            }`}>
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Action Buttons far right (centered on mobile) */}
                            <div className="flex items-center justify-center sm:justify-end gap-2 w-full sm:w-auto">
                                {aiLoading ? (
                                    <Loader size="sm" />
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setShowAiContext(!showAiContext)
                                                setShowCreateForm(false)
                                            }}
                                            className={`p-2.5 rounded-sm border transition-all active:scale-95 flex items-center justify-center h-9 w-9 ${
                                                showAiContext
                                                    ? 'bg-[#e3ee42] border-[#e3ee42]/10 text-[#1b1d00]'
                                                    : 'bg-[#1d2027] border-[#272a31] text-[#c8c8ae] hover:text-[#e0e2ec] hover:bg-[#32353c]'
                                            }`}
                                            title="AI System Settings"
                                        >
                                            <Brain className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={handleToggleAI}
                                            disabled={aiToggling}
                                            className={`flex items-center gap-2 px-3 py-1.5 h-9 rounded-sm text-[10px] font-black tracking-wider uppercase transition-all border active:scale-95 ${
                                                aiEnabled
                                                    ? 'bg-[#e3ee42] border-[#e3ee42]/10 text-[#1b1d00] shadow-sm hover:brightness-110 font-bold'
                                                    : 'bg-[#1d2027] border-[#272a31] text-[#c8c8ae] hover:text-[#e0e2ec] hover:bg-[#32353c]'
                                            }`}
                                        >
                                            <Sparkles className={`w-3.5 h-3.5 ${aiToggling ? 'animate-pulse' : ''}`} />
                                            <span>{aiToggling ? '...' : aiEnabled ? 'AI AUTO-REPLY ON' : 'AI AUTO-REPLY OFF'}</span>
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => {
                                        setShowCreateForm(!showCreateForm)
                                        setShowAiContext(false)
                                    }}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 h-9 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 shadow-sm ${
                                        showCreateForm 
                                            ? 'bg-[#1d2027] text-[#c8c8ae] border border-[#272a31] hover:text-[#e0e2ec]' 
                                            : 'bg-[#e3ee42] text-[#1b1d00] hover:brightness-110 shadow-[0_4px_15px_rgba(227,238,66,0.15)]'
                                    }`}
                                >
                                    {showCreateForm ? (
                                        <>
                                            <X className="w-3.5 h-3.5" />
                                            <span>Close Editor</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-3.5 h-3.5" />
                                            <span>New Rule</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Thin yellow underline with left and right gap */}
                    <div className="px-4 md:px-8">
                        <div className="h-[1px] bg-[#e3ee42]" />
                    </div>
                </div>

                {/* 2-Column Responsive Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Column - Main Automations Trigger List */}
                    <div className={hasRightContent ? "lg:col-span-7 xl:col-span-8 space-y-6" : "lg:col-span-12 space-y-6"}>
                        <div className="relative min-h-[200px] w-full">
                            {isLoading && (
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/60 backdrop-blur-xs rounded-sm">
                                    <Loader size="md" />
                                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-3">Syncing rules...</p>
                                </div>
                            )}
                            <AutomationList
                                automations={filteredAutomations}
                                onDelete={handleDeleteRule}
                                userId={userId}
                                gridCols={hasRightContent ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"}
                            />
                        </div>
                    </div>

                    {/* Right Column - Forms, Settings and Managers */}
                    {hasRightContent && (
                        <div className="lg:col-span-5 xl:col-span-4 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            {!isMobile && showCreateForm && (
                                <div className="glass-card p-6 shadow-sm">
                                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
                                        <Plus className="w-4 h-4 text-primary" /> Create {activeTab.toUpperCase()} Rule
                                    </h3>
                                    <CreateRuleForm
                                        userId={userId}
                                        triggerSource={activeTab}
                                        onSuccess={() => {
                                            fetchAutomations()
                                            setShowCreateForm(false)
                                        }}
                                    />
                                </div>
                            )}

                            {!isMobile && showAiContext && (
                                <div className="glass-card p-6 shadow-sm space-y-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/5">
                                            <Brain className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-foreground block uppercase tracking-wider">AI Personality & Context</span>
                                            <span className="text-[10px] text-muted-foreground">Train the AI on how to handle incoming unmatched DMs.</span>
                                        </div>
                                    </div>
                                    <textarea
                                        value={aiContext}
                                        onChange={e => setAiContext(e.target.value)}
                                        placeholder={`e.g. This is a fitness coaching account. I sell online training programs (₹2999/mo). My tone is motivating but chill. If someone asks about pricing, tell them to DM for a free consultation. Never promise specific results.`}
                                        rows={6}
                                        className="w-full glass-textarea"
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleSaveAiContext}
                                            disabled={aiContextSaving}
                                            className="px-5 py-2.5 rounded-sm bg-[#e3ee42] text-[#1b1d00] hover:brightness-110 text-[10px] font-black uppercase tracking-wider transition-all disabled:opacity-50 shadow-sm active:scale-95"
                                        >
                                            {aiContextSaving ? 'Saving...' : aiContextSaved ? 'Saved ✓' : 'Save Personality'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'dm' && (
                                <div className="glass-card p-6 shadow-sm">
                                    <IceBreakersManager />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Modal for Rule Creation */}
            {isMobile && showCreateForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="glass-card max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 relative max-h-[95vh] overflow-y-auto">
                        <button
                            onClick={() => setShowCreateForm(false)}
                            className="absolute top-4.5 right-4.5 text-muted-foreground hover:text-foreground transition-colors p-1"
                        >
                            <X className="w-4.5 h-4.5" />
                        </button>
                        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4 border-b border-white/5 pb-2 flex items-center gap-2 pr-6">
                            <Plus className="w-4 h-4 text-primary" /> Create {activeTab.toUpperCase()} Rule
                        </h3>
                        <CreateRuleForm
                            userId={userId}
                            triggerSource={activeTab}
                            onSuccess={() => {
                                fetchAutomations()
                                setShowCreateForm(false)
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Mobile Modal for AI Personality & Context */}
            {isMobile && showAiContext && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="glass-card max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 relative max-h-[95vh] overflow-y-auto space-y-4">
                        <button
                            onClick={() => setShowAiContext(false)}
                            className="absolute top-4.5 right-4.5 text-muted-foreground hover:text-foreground transition-colors p-1"
                        >
                            <X className="w-4.5 h-4.5" />
                        </button>
                        <div className="flex items-center gap-2.5 pr-6 pb-2 border-b border-white/5">
                            <div className="w-8 h-8 rounded-lg bg-[#e3ee42]/10 flex items-center justify-center text-[#e3ee42] border border-[#e3ee42]/5">
                                <Brain className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-foreground block uppercase tracking-wider">AI Personality & Context</span>
                                <span className="text-[10px] text-muted-foreground">Train the AI on how to handle incoming unmatched DMs.</span>
                            </div>
                        </div>
                        <textarea
                            value={aiContext}
                            onChange={e => setAiContext(e.target.value)}
                            placeholder={`e.g. This is a fitness coaching account. I sell online training programs (₹2999/mo). My tone is motivating but chill. If someone asks about pricing, tell them to DM for a free consultation. Never promise specific results.`}
                            rows={6}
                            className="w-full glass-textarea"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveAiContext}
                                disabled={aiContextSaving}
                                className="px-5 py-2.5 rounded-sm bg-[#e3ee42] text-[#1b1d00] hover:brightness-110 text-[10px] font-black uppercase tracking-wider transition-all disabled:opacity-50 shadow-sm active:scale-95"
                            >
                                {aiContextSaving ? 'Saving...' : aiContextSaved ? 'Saved ✓' : 'Save Personality'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
