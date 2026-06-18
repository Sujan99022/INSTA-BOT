"use client"

import { useState, useEffect } from "react"
import { useInstagramSession } from "@/hooks/use-instagram-session"
import { toast } from "sonner"
import { 
  Settings, User, Bell, Shield, Palette, Check, AlertTriangle, 
  LogOut, RefreshCw, CheckCircle2, Info, Eye, EyeOff
} from "lucide-react"
import { Loader } from "@/components/ui/loader"
import { useAppearance } from "@/context/appearance-context"

export default function SettingsPage() {
  const { userId, username, isLoading: isSessionLoading, logout } = useInstagramSession()
  const { appearance, updateAppearance, ACCENT_COLORS } = useAppearance()
  
  // Tab navigation state
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "privacy" | "appearance">("profile")

  // Profile Tab state
  const [displayName, setDisplayName] = useState("")
  const [revealUserId, setRevealUserId] = useState(false)

  // Notifications Tab state
  const [notifPrefs, setNotifPrefs] = useState({
    new_dm: true,
    automation_trigger: true,
    ai_reply: false,
    weekly_summary: false,
    system_alerts: true,
  })

  // Privacy Tab state
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [isClearingRules, setIsClearingRules] = useState(false)

  // Load configuration from local storage on mount
  useEffect(() => {
    // 1. Profile display name
    const savedName = localStorage.getItem("dmpro_display_name")
    if (savedName) setDisplayName(savedName)

    // 2. Notification preferences
    const savedPrefs = localStorage.getItem("dmpro_notif_prefs")
    if (savedPrefs) {
      try {
        setNotifPrefs(JSON.parse(savedPrefs))
      } catch (e) {
        console.error("Failed to parse notifications storage settings:", e)
      }
    }
  }, [])

  // Update appearance state and save to local storage
  const handleUpdateAppearance = (updates: Partial<typeof appearance>) => {
    updateAppearance(updates)
    toast.success("Appearance configurations updated")
  }

  // Save display name action
  const handleSaveProfile = () => {
    localStorage.setItem("dmpro_display_name", displayName)
    toast.success("Display name saved successfully")
  }

  // Toggle notification item
  const handleToggleNotif = (key: keyof typeof notifPrefs) => {
    const updated = { ...notifPrefs, [key]: !notifPrefs[key] }
    setNotifPrefs(updated)
    localStorage.setItem("dmpro_notif_prefs", JSON.stringify(updated))
    toast.success("Notification preferences updated")
  }

  // Trigger Instagram OAuth authorization (same construction as LandingPage)
  const handleReconnectInstagram = () => {
    const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || ""
    const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || 
      `${window.location.origin}/api/instagram/callback`
    const scope = "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights"
    
    if (!appId) {
      toast.error("System Configuration Error: NEXT_PUBLIC_INSTAGRAM_APP_ID is not configured.")
      return
    }

    toast.loading("Redirecting to Instagram authorization...")
    const authUrl = `https://www.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}#weblink`
    window.location.href = authUrl
  }

  // Danger Zone: Clear all automation rules sequentially
  const handleClearAllAutomations = async () => {
    if (!userId) {
      toast.error("No active user session detected.")
      return
    }
    setIsClearingRules(true)
    const toastId = toast.loading("Clearing all automations...")
    
    try {
      // 1. Fetch user's automation rules
      const res = await fetch(`/api/automations?userId=${userId}`)
      if (!res.ok) throw new Error("Failed to retrieve automations database entries.")
      const rules = await res.json()

      if (!Array.isArray(rules) || rules.length === 0) {
        toast.dismiss(toastId)
        toast.info("No active automations found to delete.")
        setShowClearConfirm(false)
        return
      }

      // 2. Loop delete sequentially
      let deletedCount = 0
      for (const rule of rules) {
        const delRes = await fetch(`/api/automations?id=${rule.id}`, {
          method: "DELETE"
        })
        if (delRes.ok) deletedCount++
      }

      toast.dismiss(toastId)
      toast.success(`Cleared ${deletedCount} automation rules from database.`)
      setShowClearConfirm(false)
    } catch (e: any) {
      console.error(e)
      toast.dismiss(toastId)
      toast.error(`Operation failed: ${e.message || "Unknown server response"}`)
    } finally {
      setIsClearingRules(false)
    }
  }

  // Mask user ID helper
  const getMaskedUserId = () => {
    if (!userId) return "N/A"
    if (revealUserId) return userId
    return `${userId.slice(0, 6)}******${userId.slice(-4)}`
  }

  if (isSessionLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader size="sm" />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-xl md:text-2xl font-black text-foreground flex items-center gap-2 uppercase tracking-tight">
            <Settings className="w-5 h-5 text-primary" />
            System Control Panel
          </h1>
          <p className="text-muted-foreground text-xs mt-0.5">
            Configure system states, user profiles, API authorizations, and visual layout.
          </p>
        </div>

        {/* Layout Wrapper */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          
          {/* Tab Rail (Desktop: Sidebar, Mobile: Horizontal buttons) */}
          <div className="w-full md:w-64 shrink-0 flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none border-b md:border-b-0 md:border-r border-border md:pr-4">
            
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-bold shrink-0 rounded-none transition-all ${
                activeTab === "profile"
                  ? "bg-primary/10 text-primary border-b-2 md:border-b-0 md:border-l-2 border-l-0 border-primary"
                  : "text-muted-foreground hover:bg-[#1d2027] hover:text-foreground border-b-2 md:border-b-0 md:border-l-2 border-l-0 border-transparent"
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>

            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-bold shrink-0 rounded-none transition-all ${
                activeTab === "notifications"
                  ? "bg-primary/10 text-primary border-b-2 md:border-b-0 md:border-l-2 border-l-0 border-primary"
                  : "text-muted-foreground hover:bg-[#1d2027] hover:text-foreground border-b-2 md:border-b-0 md:border-l-2 border-l-0 border-transparent"
              }`}
            >
              <Bell className="w-4 h-4" />
              Notifications
            </button>

            <button
              onClick={() => setActiveTab("privacy")}
              className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-bold shrink-0 rounded-none transition-all ${
                activeTab === "privacy"
                  ? "bg-primary/10 text-primary border-b-2 md:border-b-0 md:border-l-2 border-l-0 border-primary"
                  : "text-muted-foreground hover:bg-[#1d2027] hover:text-foreground border-b-2 md:border-b-0 md:border-l-2 border-l-0 border-transparent"
              }`}
            >
              <Shield className="w-4 h-4" />
              Privacy & Security
            </button>

            <button
              onClick={() => setActiveTab("appearance")}
              className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-bold shrink-0 rounded-none transition-all ${
                activeTab === "appearance"
                  ? "bg-primary/10 text-primary border-b-2 md:border-b-0 md:border-l-2 border-l-0 border-primary"
                  : "text-muted-foreground hover:bg-[#1d2027] hover:text-foreground border-b-2 md:border-b-0 md:border-l-2 border-l-0 border-transparent"
              }`}
            >
              <Palette className="w-4 h-4" />
              Appearance
            </button>

          </div>

          {/* Active Panel Content */}
          <div className="flex-1 w-full min-w-0">
            
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                
                {/* User Identity Box */}
                <div className="glass-card p-4 sm:p-6 border border-white/10 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                  <div className="w-20 h-20 rounded-none bg-primary/15 border-2 border-primary flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(227,238,66,0.15)]">
                    <span className="font-poppins text-3xl font-black text-primary">
                      {username ? username.charAt(0).toUpperCase() : "?"}
                    </span>
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h2 className="font-poppins font-semibold text-lg text-foreground truncate">
                        @{username || "unauthorized_user"}
                      </h2>
                      <span className="self-center sm:self-auto text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        ACTIVE SYNC
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Instagram Professional Business Account Node.
                    </p>
                    <div className="pt-2 text-[10px] text-muted-foreground font-mono flex flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-start">
                      <span>Node ID: <code className="text-[#c8c8ae]">CH_IG_NODE_AUTO</code></span>
                      <span>Auth Status: <code className="text-emerald-400">VERIFIED</code></span>
                    </div>
                  </div>
                </div>

                {/* Profile Settings Form */}
                <div className="glass-card p-4 sm:p-6 border border-white/10 space-y-4">
                  <h3 className="font-bold text-sm text-foreground uppercase tracking-wider border-b border-border pb-2">
                    Profile Configurations
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider font-bold text-muted-foreground">
                      Display Name
                    </label>
                    <input
                      type="text"
                      className="glass-input w-full"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Sujan's Studio"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      Used for user-facing greetings, alerts, and system notifications.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-primary text-primary-foreground hover:brightness-110 font-bold text-xs uppercase tracking-wider py-2.5 px-5 transition-all cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </div>

                {/* Instagram Integration Card */}
                <div className="glass-card p-4 sm:p-6 border border-white/10 space-y-4">
                  <h3 className="font-bold text-sm text-foreground uppercase tracking-wider border-b border-border pb-2">
                    Instagram API Sync Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#0b0e15] border border-border p-3 flex flex-col justify-between">
                      <span className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">
                        Instagram User ID
                      </span>
                      <div className="flex items-center justify-between mt-1">
                        <code className="text-xs font-mono font-bold text-foreground">
                          {getMaskedUserId()}
                        </code>
                        <button
                          onClick={() => setRevealUserId(!revealUserId)}
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                          title={revealUserId ? "Hide ID" : "Reveal ID"}
                        >
                          {revealUserId ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#0b0e15] border border-border p-3 flex flex-col justify-between">
                      <span className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">
                        Session Node Version
                      </span>
                      <div className="text-xs font-bold text-foreground mt-1">
                        DMPRO Core Engine v2.4 (Stable)
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleReconnectInstagram}
                      className="w-full bg-[#1d2027] border border-[#272a31] hover:bg-[#32353c]/50 text-foreground font-bold text-xs uppercase tracking-wider py-3 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Reconnect Instagram Node
                    </button>
                    <p className="text-[9px] text-muted-foreground/80 mt-2 text-center">
                      If automation runs delay, re-trigger permissions sync to authorize API limits.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === "notifications" && (
              <div className="glass-card p-4 sm:p-6 border border-white/10 space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-foreground uppercase tracking-wider border-b border-border pb-2">
                    Event Subscriptions
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Manage callback alerts when events are pushed from the Instagram Graph Webhook pipeline.
                  </p>
                </div>

                <div className="divide-y divide-[#1d2027]">
                  
                  {/* Row 1 */}
                  <div className="settings-row">
                    <div className="pr-4">
                      <h4 className="text-xs font-bold text-foreground">New DM Received</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Trigger alerts immediately when a customer starts a new chat thread.
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggleNotif("new_dm")}
                      className={`settings-toggle shrink-0 ${notifPrefs.new_dm ? "settings-toggle-checked" : ""}`}
                    >
                      <span className="settings-toggle-knob" />
                    </button>
                  </div>

                  {/* Row 2 */}
                  <div className="settings-row">
                    <div className="pr-4">
                      <h4 className="text-xs font-bold text-foreground">Automation Triggered</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Notify system when a keyword trigger successfully executes a command path.
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggleNotif("automation_trigger")}
                      className={`settings-toggle shrink-0 ${notifPrefs.automation_trigger ? "settings-toggle-checked" : ""}`}
                    >
                      <span className="settings-toggle-knob" />
                    </button>
                  </div>

                  {/* Row 3 */}
                  <div className="settings-row">
                    <div className="pr-4">
                      <h4 className="text-xs font-bold text-foreground">AI Auto-Reply Sent</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Send a status notification every time Groq AI replies autonomously to customer queries.
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggleNotif("ai_reply")}
                      className={`settings-toggle shrink-0 ${notifPrefs.ai_reply ? "settings-toggle-checked" : ""}`}
                    >
                      <span className="settings-toggle-knob" />
                    </button>
                  </div>

                  {/* Row 4 */}
                  <div className="settings-row">
                    <div className="pr-4">
                      <h4 className="text-xs font-bold text-foreground">Weekly Performance Summary</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Deliver a weekly analytical report detailing leads captured and automated conversions.
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggleNotif("weekly_summary")}
                      className={`settings-toggle shrink-0 ${notifPrefs.weekly_summary ? "settings-toggle-checked" : ""}`}
                    >
                      <span className="settings-toggle-knob" />
                    </button>
                  </div>

                  {/* Row 5 */}
                  <div className="settings-row">
                    <div className="pr-4">
                      <h4 className="text-xs font-bold text-foreground">Critical System Alerts</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Receive immediate high-priority indicators for token expiry, rate limits, or API anomalies.
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggleNotif("system_alerts")}
                      className={`settings-toggle shrink-0 ${notifPrefs.system_alerts ? "settings-toggle-checked" : ""}`}
                    >
                      <span className="settings-toggle-knob" />
                    </button>
                  </div>

                </div>

                <div className="bg-[#0b0e15] border border-border p-4 flex gap-3 items-start">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Preferences are stored on the active client profile and synced into page rendering configurations. If you use multiple devices, notifications can be adjusted on each browser independently.
                  </p>
                </div>

              </div>
            )}

            {/* PRIVACY & SECURITY TAB */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                
                {/* Active Session info */}
                <div className="glass-card p-4 sm:p-6 border border-white/10 space-y-4">
                  <div>
                    <h3 className="font-bold text-sm text-foreground uppercase tracking-wider border-b border-border pb-2">
                      Active Authorization Session
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Current connection token information verifying secure connection.
                    </p>
                  </div>

                  <div className="flex items-center justify-between bg-[#0b0e15] border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-foreground">@{username || "User"} (Authorized)</h4>
                        <p className="text-[9px] text-muted-foreground uppercase font-mono tracking-widest mt-0.5">Token Active</p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-bold text-xs uppercase tracking-wider py-1.5 px-3 transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                {/* Scope Lists */}
                <div className="glass-card p-4 sm:p-6 border border-white/10 space-y-4">
                  <h3 className="font-bold text-sm text-foreground uppercase tracking-wider border-b border-border pb-2">
                    Granted OAuth Scopes
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <code className="text-[11px] font-mono font-bold text-foreground">instagram_business_basic</code>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Read basic metadata, profile node, and media assets.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <code className="text-[11px] font-mono font-bold text-foreground">instagram_business_manage_messages</code>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Access direct messages for automated AI replies and manual inbox.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <code className="text-[11px] font-mono font-bold text-foreground">instagram_business_manage_comments</code>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Moderate comments on business posts and trigger auto-replies.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <code className="text-[11px] font-mono font-bold text-foreground">instagram_business_content_publish</code>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Schedule and queue automated publishing of reels and stories.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <code className="text-[11px] font-mono font-bold text-foreground">instagram_business_manage_insights</code>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Extract analytics, engagement counts, and metric data logs.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="glass-card p-4 sm:p-6 border-destructive/20 bg-destructive/5 space-y-4">
                  <div className="flex items-center gap-2 text-destructive border-b border-destructive/10 pb-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <h3 className="font-bold text-sm uppercase tracking-wider">
                      Danger Zone
                    </h3>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Clear all rules */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/25 p-4 border border-destructive/10">
                      <div className="max-w-md">
                        <h4 className="text-xs font-bold text-foreground">Clear All Automations</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Permanently delete all configured automation rules from the cloud database. This action is immediate and non-reversible.
                        </p>
                      </div>
                      
                      {!showClearConfirm ? (
                        <button
                          onClick={() => setShowClearConfirm(true)}
                          className="bg-destructive/10 border border-destructive/30 hover:bg-destructive/20 text-destructive font-black text-xs uppercase tracking-wider py-2.5 px-4 shrink-0 cursor-pointer"
                        >
                          Clear Rules
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            disabled={isClearingRules}
                            onClick={handleClearAllAutomations}
                            className="bg-destructive text-destructive-foreground hover:brightness-110 font-bold text-[10px] uppercase tracking-wider py-2 px-3 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            {isClearingRules ? "Clearing..." : "Yes, Clear"}
                          </button>
                          <button
                            disabled={isClearingRules}
                            onClick={() => setShowClearConfirm(false)}
                            className="bg-[#1d2027] border border-border text-foreground font-bold text-[10px] uppercase tracking-wider py-2 px-3 hover:bg-[#32353c]/50 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Disconnect Node */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/25 p-4 border border-destructive/10">
                      <div className="max-w-md">
                        <h4 className="text-xs font-bold text-foreground">Disconnect Platform Node</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Disconnect authorization token, flush session cache, and log out of the DMPRO engine dashboard immediately.
                        </p>
                      </div>
                      <button
                        onClick={logout}
                        className="bg-destructive text-destructive-foreground hover:brightness-110 font-black text-xs uppercase tracking-wider py-2.5 px-4 shrink-0 cursor-pointer"
                      >
                        Disconnect Node
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* APPEARANCE TAB */}
            {activeTab === "appearance" && (
              <div className="glass-card p-4 sm:p-6 border border-white/10 space-y-6">
                
                {/* Brand Color Theme Swatches */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-foreground uppercase tracking-wider border-b border-border pb-2">
                      Accent Color Swatch
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Choose primary branding accent color. All icons, active components, and custom triggers update dynamically.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {ACCENT_COLORS.map((color) => {
                      const isActive = appearance.accent === color.hex
                      return (
                        <button
                          key={color.hex}
                          onClick={() => handleUpdateAppearance({ accent: color.hex })}
                          className={`w-10 h-10 border-2 transition-all duration-150 relative shrink-0 cursor-pointer flex items-center justify-center`}
                          style={{ 
                            backgroundColor: color.hex,
                            borderColor: isActive ? "#ffffff" : "transparent"
                          }}
                          title={color.name}
                        >
                          {isActive && (
                            <span 
                              className="absolute inset-0 flex items-center justify-center"
                              style={{ color: color.fg }}
                            >
                              <Check className="w-5 h-5 stroke-[3]" />
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Sidebar Density */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-foreground uppercase tracking-wider border-b border-border pb-2">
                      Sidebar Density
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Alter navigation spacing and layout compaction to match screen space preferences.
                    </p>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleUpdateAppearance({ density: "comfortable" })}
                      className={`flex-1 border text-xs uppercase tracking-wider font-bold py-2.5 transition-all cursor-pointer ${
                        appearance.density === "comfortable"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border bg-[#0b0e15] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Comfortable
                    </button>
                    
                    <button
                      onClick={() => handleUpdateAppearance({ density: "compact" })}
                      className={`flex-1 border text-xs uppercase tracking-wider font-bold py-2.5 transition-all cursor-pointer ${
                        appearance.density === "compact"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border bg-[#0b0e15] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Compact
                    </button>
                  </div>
                </div>

                {/* Transition Animations */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-foreground uppercase tracking-wider border-b border-border pb-2">
                      Motion Transitions
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Configure dynamic hover lifts, page sliding effects, and loading bar micro-animations.
                    </p>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleUpdateAppearance({ animate: true })}
                      className={`flex-1 border text-xs uppercase tracking-wider font-bold py-2.5 transition-all cursor-pointer ${
                        appearance.animate
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border bg-[#0b0e15] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Enabled
                    </button>
                    
                    <button
                      onClick={() => handleUpdateAppearance({ animate: false })}
                      className={`flex-1 border text-xs uppercase tracking-wider font-bold py-2.5 transition-all cursor-pointer ${
                        !appearance.animate
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border bg-[#0b0e15] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Disabled
                    </button>
                  </div>
                </div>

                {/* Diagnostic configuration output (Premium Industrial Look) */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">
                    Diagnostic Output Code
                  </span>
                  <div className="bg-[#0b0e15] border border-border p-3 rounded-none">
                    <pre className="text-[10px] font-mono text-[#c8c8ae] overflow-x-auto leading-relaxed">
                      {JSON.stringify({
                        accent_color: appearance.accent,
                        density_mode: appearance.density,
                        motion_effects: appearance.animate ? "enabled" : "disabled",
                        client_platform: "browser_agent_v2.4",
                        document_classes: [
                          appearance.density === "compact" ? "density-compact" : null,
                          !appearance.animate ? "animations-disabled" : null
                        ].filter(Boolean)
                      }, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* Reset button */}
                <div className="pt-2 border-t border-[#1d2027] flex justify-end">
                  <button
                    onClick={() => handleUpdateAppearance({ accent: "#e3ee42", density: "comfortable", animate: true })}
                    className="bg-transparent border border-border hover:bg-[#1d2027] text-muted-foreground hover:text-foreground font-bold text-xs uppercase tracking-wider py-2 px-4 transition-colors cursor-pointer"
                  >
                    Reset System Defaults
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}
