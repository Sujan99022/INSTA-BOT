"use client"

import { useState } from "react"
import { Sparkles, X, Zap, Play, Database, Shield, Activity, TrendingUp, Cpu, RefreshCw, BarChart3, HelpCircle } from "lucide-react"

export function LandingPage() {
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [simTrigger, setSimTrigger] = useState("comment")
  const [simInput, setSimInput] = useState("price")
  const [simOutput, setSimOutput] = useState("Sending the discount link to your DMs right now! 🚀")

  const handleLogin = () => {
    const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || ""
    const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || 
      `${window.location.origin}/api/instagram/callback`
    const scope = "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights"
    
    if (!appId) {
      alert("System Configuration Error: NEXT_PUBLIC_INSTAGRAM_APP_ID is not configured.")
      return
    }

    const authUrl = `https://www.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`
    window.location.href = authUrl
  }

  return (
    <div className="min-h-screen bg-[#10131a] text-[#e0e2ec] overflow-x-hidden selection:bg-primary/20 relative">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] z-0" />

      {/* Watch Demo Modal */}
      {showDemoModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4 py-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl rounded-none bg-[#1d2027] border border-[#272a31] p-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-[#e3ee42] mb-3">
              <Play className="w-4.5 h-4.5 shrink-0" />
              <span className="font-mono text-[9px] uppercase tracking-widest bg-[#e3ee42]/10 px-2.5 py-1 text-[#e3ee42]">
                DMPRO Protocols
              </span>
            </div>
            <h2 className="text-lg font-bold text-foreground uppercase tracking-wider mb-1">System Walkthrough & Demos</h2>
            <p className="text-[10px] text-muted-foreground leading-relaxed mb-6 max-w-xl">
              Watch step-by-step video walkthroughs showing how to implement industrial-grade Instagram DM automations, train your AI assistant, and manage the content scheduler.
            </p>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1 */}
              <div className="border border-[#272a31] bg-[#0b0e15] p-3 flex flex-col justify-between group hover:border-[#e3ee42]/30 transition-all duration-300">
                <div className="relative aspect-video bg-[#13171e] flex items-center justify-center border border-[#1f2229] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e15]/90 to-transparent opacity-60 z-10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] z-0" />
                  
                  {/* Play Button Overlay */}
                  <button className="w-12 h-12 rounded-none bg-[#e3ee42] text-[#1b1d00] flex items-center justify-center shadow-lg active:scale-95 transition-all z-20 group-hover:scale-110 cursor-pointer">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>

                  <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded-none border border-white/10 text-[9px] font-mono text-slate-300 z-20">
                    1:45
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <span className="text-[8px] font-mono text-emerald-400 bg-emerald-400/5 border border-emerald-400/10 px-1.5 py-0.2 uppercase w-fit block">
                    Core Feature
                  </span>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-[#e3ee42] transition-colors uppercase tracking-wide">
                    1. Comment Auto-Replies Setup
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    Trigger instant DM funnels when users comment specific keywords under your feed posts or reels.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border border-[#272a31] bg-[#0b0e15] p-3 flex flex-col justify-between group hover:border-[#e3ee42]/30 transition-all duration-300">
                <div className="relative aspect-video bg-[#13171e] flex items-center justify-center border border-[#1f2229] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e15]/90 to-transparent opacity-60 z-10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] z-0" />
                  
                  <button className="w-12 h-12 rounded-none bg-[#e3ee42] text-[#1b1d00] flex items-center justify-center shadow-lg active:scale-95 transition-all z-20 group-hover:scale-110 cursor-pointer">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>

                  <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded-none border border-white/10 text-[9px] font-mono text-slate-300 z-20">
                    2:30
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <span className="text-[8px] font-mono text-[#e3ee42] bg-[#e3ee42]/5 border border-[#e3ee42]/10 px-1.5 py-0.2 uppercase w-fit block">
                    AI Integration
                  </span>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-[#e3ee42] transition-colors uppercase tracking-wide">
                    2. Training Your AI Assistant
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    Configure your system personality prompt to automatically handle custom user pricing queries and catalog details.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="border border-[#272a31] bg-[#0b0e15] p-3 flex flex-col justify-between group hover:border-[#e3ee42]/30 transition-all duration-300">
                <div className="relative aspect-video bg-[#13171e] flex items-center justify-center border border-[#1f2229] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e15]/90 to-transparent opacity-60 z-10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] z-0" />
                  
                  <button className="w-12 h-12 rounded-none bg-[#e3ee42] text-[#1b1d00] flex items-center justify-center shadow-lg active:scale-95 transition-all z-20 group-hover:scale-110 cursor-pointer">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>

                  <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded-none border border-white/10 text-[9px] font-mono text-slate-300 z-20">
                    3:15
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <span className="text-[8px] font-mono text-cyan-400 bg-cyan-400/5 border border-cyan-400/10 px-1.5 py-0.2 uppercase w-fit block">
                    Content Pool
                  </span>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-[#e3ee42] transition-colors uppercase tracking-wide">
                    3. Publisher & Rotator Engine
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    Schedule automated video postings and queue them into the rotating media cache with delay parameters.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="border border-[#272a31] bg-[#0b0e15] p-3 flex flex-col justify-between group hover:border-[#e3ee42]/30 transition-all duration-300">
                <div className="relative aspect-video bg-[#13171e] flex items-center justify-center border border-[#1f2229] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e15]/90 to-transparent opacity-60 z-10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] z-0" />
                  
                  <button className="w-12 h-12 rounded-none bg-[#e3ee42] text-[#1b1d00] flex items-center justify-center shadow-lg active:scale-95 transition-all z-20 group-hover:scale-110 cursor-pointer">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>

                  <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded-none border border-white/10 text-[9px] font-mono text-slate-300 z-20">
                    2:10
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <span className="text-[8px] font-mono text-purple-400 bg-purple-400/5 border border-purple-400/10 px-1.5 py-0.2 uppercase w-fit block">
                    Inbox Control
                  </span>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-[#e3ee42] transition-colors uppercase tracking-wide">
                    4. Unified Conversations Desk
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    Monitor live chats, review message delivery metrics, and toggle bot override control seamlessly.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-40 backdrop-blur-xl bg-[#10131a]/90 border-b border-[#272a31]/40 flex justify-between items-center px-4 md:px-8 h-16">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="DMPRO.in Logo" className="w-8 h-8 object-contain" />
          <h1 className="font-poppins text-lg font-semibold text-primary leading-none">DMPRO.in</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogin}
            className="bg-[#e3ee42] text-[#1b1d00] font-black uppercase text-[10px] tracking-wider rounded-none hover:brightness-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(227,238,66,0.15)] px-4 py-2 cursor-pointer"
          >
            SIGN IN
          </button>
        </div>
      </header>

      <main className="pt-16 pb-24 relative z-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative px-4 md:px-8 pt-24 pb-28 flex flex-col items-center text-center overflow-hidden border-b border-[#272a31]/40">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img 
              src="/hero-immersive.png" 
              alt="DMPRO.in Network Control Background" 
              className="w-full h-full object-cover opacity-15"
            />
            {/* Gradients to blend into dark page canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#10131a]/85 via-transparent to-[#10131a] z-10" />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#10131a] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#10131a] to-transparent z-10" />
            {/* Fine scanner line overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] opacity-15 pointer-events-none z-10" />
          </div>

          <div className="relative z-20 w-full max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#1d2027]/90 border border-[#272a31] mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">System Online</span>
            </div>
            <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight text-foreground mb-6">
              AUTOMATE YOUR<br/><span className="font-poppins font-semibold text-primary italic">DMPRO.in</span>
            </h2>
            <p className="text-sm text-[#e0e2ec] max-w-md mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              High-density operational control. Scale your digital storefront with industrial precision and real-time synchronization.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button
                onClick={handleLogin}
                className="bg-primary text-[#1b1d00] font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-none shadow-[0_0_20px_rgba(227,238,66,0.25)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                GET STARTED
              </button>
              <button
                onClick={() => setShowDemoModal(true)}
                className="border border-[#272a31] bg-[#1d2027]/75 text-foreground font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-none flex items-center justify-center gap-2 hover:bg-[#32353c]/90 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-primary" />
                WATCH DEMO
              </button>
            </div>
          </div>
        </section>

        {/* Key Metrics Bento */}
        <section className="px-4 md:px-8 mb-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="steam-card p-6 rounded-none flex flex-col justify-between aspect-square border border-[#272a31] relative overflow-hidden group">
              <div className="flex justify-between items-start z-10">
                <Database className="text-primary w-8 h-8" />
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-500/25 px-1.5 py-0.5 uppercase">Sync Live</span>
              </div>
              
              {/* Mini SVG Sparkline Chart */}
              <div className="w-full h-24 my-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e3ee42" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#e3ee42" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  {/* Grid Lines */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="#272a31" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#272a31" strokeDasharray="3,3" strokeWidth="0.5" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="#272a31" strokeDasharray="3,3" strokeWidth="0.5" />
                  {/* Area */}
                  <path d="M 0 40 L 0 35 Q 20 28 40 30 T 80 12 L 100 5 L 100 40 Z" fill="url(#metricGrad)" />
                  {/* Line */}
                  <path d="M 0 35 Q 20 28 40 30 T 80 12 L 100 5" fill="none" stroke="#e3ee42" strokeWidth="1.5" />
                  {/* Pulsing indicator node */}
                  <circle cx="100" cy="5" r="2.5" fill="#e3ee42" className="animate-ping origin-center" />
                  <circle cx="100" cy="5" r="1.5" fill="#e3ee42" />
                </svg>
              </div>

              <div className="z-10">
                <div className="bg-primary px-2.5 py-1 inline-block text-[#1b1d00] font-black text-2xl leading-none mb-2 rounded-none">
                  2.8M+
                </div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Units Processed</div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="steam-card p-6 rounded-none flex-1 flex flex-col justify-between border border-[#272a31] relative overflow-hidden group">
                <div className="flex justify-between items-start mb-2">
                  <Activity className="text-primary w-5 h-5" />
                  <div className="bg-primary px-2 py-0.5 text-[#1b1d00] font-black text-xs rounded-none">98.2%</div>
                </div>
                
                {/* Horizontal Bar progress */}
                <div className="space-y-1 my-3">
                  <div className="flex justify-between text-[8px] font-mono text-muted-foreground">
                    <span>QUEUE PROCESSORS</span>
                    <span className="text-[#e3ee42]">OPTIMAL</span>
                  </div>
                  <div className="h-2 bg-[#0b0e15] border border-[#272a31] relative overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#e3ee42]/40 to-[#e3ee42] transition-all duration-1000 w-[98.2%]"></div>
                  </div>
                  <div className="flex justify-between text-[7px] font-mono text-muted-foreground/60">
                    <span>RESPONSE: 0.18s</span>
                    <span>PACKETS: 409,112/s</span>
                  </div>
                </div>

                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Efficiency</div>
              </div>

              <div className="steam-card p-6 rounded-none flex-1 flex flex-col justify-between border border-[#272a31] relative overflow-hidden group">
                <div className="flex justify-between items-start mb-2">
                  <TrendingUp className="text-primary w-5 h-5" />
                  <div className="bg-primary px-2 py-0.5 text-[#1b1d00] font-black text-xs rounded-none">+112%</div>
                </div>
                
                {/* Mini bar chart */}
                <div className="flex items-end justify-between h-12 my-2 gap-1 px-1">
                  {[25, 40, 35, 55, 45, 75, 95].map((h, idx) => (
                    <div key={idx} className="flex-1 bg-[#0b0e15] border border-[#272a31] h-full relative overflow-hidden">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-primary/45 group-hover:bg-primary transition-all duration-500" 
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Conversion Boost</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pipeline Section */}
        <section className="px-4 md:px-8 mb-20 max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#bac7dd]">Automation Pipeline</h3>
            <div className="h-[1px] bg-[#272a31] flex-grow ml-4 mb-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Handshake Link", desc: "Securely link your Instagram Business profile via official Graph API tokens in 2 minutes." },
              { step: "02", title: "Triggers & Keys", desc: "Define keyword filters, story mentions, or comment triggers that launch replies." },
              { step: "03", title: "AI Dispatch", desc: "Our engine executes customized message variations with randomized latencies." },
              { step: "04", title: "Track & Optimize", desc: "Monitor conversions, lead generation, and response speed directly in the panel." }
            ].map((p, i) => (
              <div key={i} className="steam-card p-5 border border-[#272a31] relative rounded-none">
                <span className="font-mono text-[9px] text-[#e3ee42] border border-[#e3ee42]/30 px-1.5 py-0.5 absolute top-5 right-5">STEP {p.step}</span>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 mt-4">{p.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Simulator */}
        <section className="px-4 md:px-8 mb-20 max-w-4xl mx-auto">
          <div className="steam-card border border-[#272a31] p-6 md:p-8 rounded-none">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-foreground">Rule Simulator</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">Test real-time workflow logic and responses below</p>
              </div>
              <div className="flex gap-1 bg-[#0b0e15] p-1 border border-[#272a31]">
                {["comment", "story", "keyword"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSimTrigger(t)
                      if (t === "comment") {
                        setSimInput("price")
                        setSimOutput("Sending the discount link to your DMs right now! 🚀")
                      } else if (t === "story") {
                        setSimInput("@mention")
                        setSimOutput("Thanks for the shoutout! Here is a free access pass 🎁")
                      } else {
                        setSimInput("BOOK")
                        setSimOutput("Booking confirmed. Checking slots for your session...")
                      }
                    }}
                    className={`px-3 py-1 text-[9px] font-bold uppercase transition-all duration-200 cursor-pointer ${
                      simTrigger === t
                        ? "bg-primary text-[#1b1d00]"
                        : "text-[#c8c8ae] hover:text-[#e0e2ec]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-[#0b0e15] border border-[#272a31] p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest block mb-2">Incoming Trigger Event</span>
                  <div className="space-y-3">
                    <div className="bg-[#1d2027] p-3 border border-[#272a31]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-4 h-4 bg-primary/20 border border-primary/30 rounded-none flex items-center justify-center text-[8px] font-bold text-primary">IG</div>
                        <span className="text-[9px] font-bold text-foreground">@lead_prospect</span>
                      </div>
                      <p className="text-[11px] text-[#e0e2ec]">
                        {simTrigger === "comment" && `Comments: "What is the ${simInput}?"`}
                        {simTrigger === "story" && `Mentions you in a story: "${simInput}"`}
                        {simTrigger === "keyword" && `DMs you the keyword: "${simInput}"`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#272a31]/60">
                  <span className="text-[8px] font-mono text-[#e3ee42] block mb-1">SIMULATION ENGINE ACTIVE</span>
                  <p className="text-[9px] text-muted-foreground leading-relaxed">The system automatically matches criteria and executes the callback event thread.</p>
                </div>
              </div>

              <div className="bg-[#0b0e15] border border-[#272a31] p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[1px] h-full bg-primary/20"></div>
                <div>
                  <span className="text-[8px] font-mono text-[#e3ee42] uppercase tracking-widest block mb-2">Automated Callback Sent</span>
                  <div className="space-y-3">
                    <div className="bg-[#1d2027] p-3 border border-[#272a31] relative">
                      <div className="flex items-center gap-2 mb-1.5">
                        <img src="/logo.png" className="w-3.5 h-3.5 object-contain" />
                        <span className="text-[9px] font-poppins font-semibold text-[#e3ee42]">DMPRO.in Bot</span>
                      </div>
                      <p className="text-[11px] text-[#e0e2ec] italic">"{simOutput}"</p>
                      <div className="absolute right-3 bottom-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span className="text-[8px] font-mono text-emerald-400">SENT</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#272a31]/60 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-muted-foreground">LATENCY: 1.2s</span>
                  <span className="text-[9px] font-mono text-muted-foreground">SUCCESS: 100%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="px-4 md:px-8 mb-20 max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#bac7dd]">Advanced Modules</h3>
            <div className="h-[1px] bg-[#272a31] flex-grow ml-4 mb-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="steam-card rounded-none overflow-hidden group border border-[#272a31]">
              <div className="h-40 relative">
                <img
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  alt="Smart Automations Node"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-1sKfE9nDIQBp2GxGQC54tpUJBQLbdzWGq3K3Ruy7PjN-V800vMhfdHQFJ-M5yseX424mSpukAs9FirSnSmcVmlb79N5nT8RyZstjmLtKUOdZijh_FeHyG41DIH-wG-jLAS--iQ2H8owBW3U9YOJMfiKr95xnip9MGRdeQ8fXgjhVHXFdTrltEUBiPihSuo21dZJ-ZPWSjW5Q3R-zlvXbbtWdxLlEIvqM3CinOJDVCEvvw0Ce1hMpZslv0f0zVw-aSRu38781VtI_"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171a21] to-transparent"></div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Smart Automations</h4>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Self-correcting workflow logic that adapts to real-time market fluctuations.</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="steam-card rounded-none overflow-hidden group border border-[#272a31]">
              <div className="h-40 relative">
                <img
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  alt="Real-time Analytics Feed"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx2RR7DWmOZTiLXsb34E4IUqx8Derzr5Mls5-P63JMFf3WLdplxAhuYw42s5SHHs6BfKXpZ1qozyUs05PiDnPouGj-JZ6VWHambzi0C4wATJxyn-Hs_vpROlmncvcdqVYiuYUkh3xkPQ4WaTiZsuiYSjBL-kYhGOyPLjXSeAvIEA-VlQ1rVLWY2RZMzOA95EdCknMwnHSg8GeJUwTA_HK_2TOAp35SgHiAoHS1GlZNpA3OB_XAIvXoue8kgrxXe8V_dAH3MJngXeg6"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171a21] to-transparent"></div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Real-time Analytics</h4>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Low-latency data streams delivering sub-second insights into engine performance.</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="steam-card rounded-none overflow-hidden group border border-[#272a31]">
              <div className="h-40 relative">
                <img
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  alt="Multi-channel Sync Threads"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5tWxDOv0zbAU9Sl3qx3Cy1efvxLSB-sOIRMVCe5rsfRv44x7hUHRM4eUE-Yy1gVECeS-B9jPTHwOLAwfeYkr3ryJnmGgoXYM_-O1k3SsJnvYoMPcCftApK8G0qjSrUoW5rq0REcGYFAvjJ_4V1ov0zu5roYv_Okcqhlz123dHEUhvYkGykEuMqoDXL_wPSHp5MMT8KEo0tl7lma17obwiAPpMOMzF1SF9PSM9OsVcUQE5F-MyfMKfAN0JoPRkY0-Sf34kadfsq5PZ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171a21] to-transparent"></div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Multi-channel Sync</h4>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Seamless unification across all distribution nodes with zero-lag propagation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Control Center Features */}
        <section className="px-4 md:px-8 mb-20 max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#bac7dd]">System Features</h3>
            <div className="h-[1px] bg-[#272a31] flex-grow ml-4 mb-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="steam-card p-6 border border-[#272a31] flex gap-4 rounded-none">
              <Zap className="text-primary w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Story Mentions & Auto DMs</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Turn user mentions of your brand in Instagram Stories into instant, private DM conversations containing links, coupons, or personalized greetings.
                </p>
              </div>
            </div>
            <div className="steam-card p-6 border border-[#272a31] flex gap-4 rounded-none">
              <Database className="text-primary w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Reels Content Auto-Publisher</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Schedule, queue, and auto-publish video reels to your profile. Combine post uploads with automatic comment triggers to capture leads while you sleep.
                </p>
              </div>
            </div>
            <div className="steam-card p-6 border border-[#272a31] flex gap-4 rounded-none">
              <Activity className="text-primary w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Ice Breakers & FAQ Bots</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Display preset greeting buttons when a prospect first opens your message box. Instantly answer common inquiries about pricing, scheduling, or features.
                </p>
              </div>
            </div>
            <div className="steam-card p-6 border border-[#272a31] flex gap-4 rounded-none">
              <BarChart3 className="text-primary w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Integrated Live Inbox</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Don't lose human touch. Manage all active threads from a single, dark-themed control center. Read, write, and step in to chat manually at any time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Scale Section */}
        <section className="bg-[#1d2027]/50 px-4 md:px-8 py-16 border-y border-[#272a31] max-w-5xl mx-auto mb-20">
          <h3 className="font-sans text-2xl font-black uppercase text-foreground mb-8">
            BUILT FOR <br/><span className="text-primary italic">INDUSTRIAL SCALE</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-[#0b0e15] rounded-none flex items-center justify-center border border-[#272a31]">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Automated Re-balancing</h5>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Dynamic resource allocation that shifts with processing demand spikes.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-[#0b0e15] rounded-none flex items-center justify-center border border-[#272a31]">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Enterprise Security</h5>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Military-grade encryption protocols protecting your internal growth data.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-[#0b0e15] rounded-none flex items-center justify-center border border-[#272a31]">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Open API Integration</h5>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Standardized endpoints for seamless connection to your existing stack.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans Grid */}
        <section className="px-4 md:px-8 mb-20 max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#bac7dd]">Service Subscriptions</h3>
            <div className="h-[1px] bg-[#272a31] flex-grow ml-4 mb-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="steam-card p-6 border border-[#272a31] rounded-none flex flex-col justify-between min-h-[350px]">
              <div>
                <span className="font-mono text-[8px] text-muted-foreground tracking-widest uppercase">STAGE 01</span>
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mt-1 mb-2">Engine Starter</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-6">Perfect for influencers and creators seeking basic comment filters and greetings.</p>
                <div className="font-black text-3xl text-[#e3ee42] mb-6">$19<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-2 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                  <li className="flex items-center gap-2">✓ 1 connected account</li>
                  <li className="flex items-center gap-2">✓ 3 active automation rules</li>
                  <li className="flex items-center gap-2">✓ 1,000 auto-replies/mo</li>
                  <li className="flex items-center gap-2">✓ Basic analytics log</li>
                </ul>
              </div>
              <button onClick={handleLogin} className="w-full bg-[#1d2027] border border-[#272a31] hover:bg-[#32353c]/50 text-foreground font-bold text-xs uppercase tracking-wider py-3 mt-8 transition-colors cursor-pointer">
                Deploy Starter
              </button>
            </div>

            <div className="steam-card p-6 border border-[#e3ee42] rounded-none flex flex-col justify-between min-h-[350px] relative shadow-[0_0_20px_rgba(227,238,66,0.08)]">
              <div className="absolute top-0 right-6 bg-[#e3ee42] text-[#1b1d00] font-black text-[8px] px-2 py-0.5 uppercase tracking-widest">Recommended</div>
              <div>
                <span className="font-mono text-[8px] text-[#e3ee42] tracking-widest uppercase">STAGE 02</span>
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mt-1 mb-2">Pro Velocity</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-6">Full operation scaling. Highly recommended for active commercial profiles and storefronts.</p>
                <div className="font-black text-3xl text-[#e3ee42] mb-6">$39<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-2 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                  <li className="flex items-center gap-2 text-foreground">✓ Unlimited active rules</li>
                  <li className="flex items-center gap-2 text-foreground">✓ Unlimited auto-replies</li>
                  <li className="flex items-center gap-2 text-foreground">✓ Advanced lead analytics</li>
                  <li className="flex items-center gap-2 text-foreground">✓ Reels auto-publisher</li>
                  <li className="flex items-center gap-2 text-foreground">✓ Priority message pool</li>
                </ul>
              </div>
              <button onClick={handleLogin} className="w-full bg-primary text-[#1b1d00] hover:brightness-110 font-bold text-xs uppercase tracking-wider py-3 mt-8 transition-all shadow-[0_0_12px_rgba(227,238,66,0.15)] cursor-pointer">
                Scale Pro
              </button>
            </div>

            <div className="steam-card p-6 border border-[#272a31] rounded-none flex flex-col justify-between min-h-[350px]">
              <div>
                <span className="font-mono text-[8px] text-muted-foreground tracking-widest uppercase">STAGE 03</span>
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mt-1 mb-2">Enterprise Scale</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-6">Dedicated agency clusters. Run multiple brands with zero performance bottlenecking.</p>
                <div className="font-black text-3xl text-[#e3ee42] mb-6">$99<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-2 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                  <li className="flex items-center gap-2">✓ Up to 10 connected profiles</li>
                  <li className="flex items-center gap-2">✓ Dedicated webhook clusters</li>
                  <li className="flex items-center gap-2">✓ Multi-member workspaces</li>
                  <li className="flex items-center gap-2">✓ 24/7 priority support SLA</li>
                </ul>
              </div>
              <button onClick={handleLogin} className="w-full bg-[#1d2027] border border-[#272a31] hover:bg-[#32353c]/50 text-foreground font-bold text-xs uppercase tracking-wider py-3 mt-8 transition-colors cursor-pointer">
                Deploy Enterprise
              </button>
            </div>
          </div>
        </section>

        {/* Technical FAQ */}
        <section className="px-4 md:px-8 mb-20 max-w-3xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#bac7dd]">System FAQ</h3>
            <div className="h-[1px] bg-[#272a31] flex-grow ml-4 mb-2"></div>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "Is DMPRO.in officially approved by Instagram?",
                a: "Yes. DMPRO.in operates entirely via the official Meta Instagram Graph API. We do not engage in unauthorized scraping or private API emulation, ensuring your professional profile remains 100% compliant and secure."
              },
              {
                q: "How do I retrieve the required access token?",
                a: "Simply sign up, and we'll guide you through connecting your profile. If you prefer manual setup, you can generate a token in the Meta Developer Console under the Instagram API section and paste it into our secure link handshake."
              },
              {
                q: "Can I customize the reply time delay?",
                a: "Yes. You can configure rules to send responses immediately or add randomized delays (e.g. 5-30 seconds) to simulate natural human typing speeds and optimize delivery rates."
              },
              {
                q: "What types of interactions can I automate?",
                a: "You can automate replies to comments on your posts and Reels, Story mentions of your handle, direct messages containing specific keywords, and initial greetings (Ice Breakers)."
              }
            ].map((faq, i) => (
              <div key={i} className="steam-card border border-[#272a31] rounded-none">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-[#1d2027]/30 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">{faq.q}</span>
                  <span className="text-[#e3ee42] font-mono text-xs">{activeFaq === i ? "[-]" : "[+]"}</span>
                </button>
                {activeFaq === i && (
                  <div className="p-4 pt-0 border-t border-[#272a31]/40 text-[11px] text-muted-foreground leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 md:px-8 py-20 text-center max-w-2xl mx-auto">
          <div className="steam-card p-10 rounded-none border border-[#272a31] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-primary"></div>
            <h3 className="font-sans text-2xl font-black mb-4 text-[#e0e2ec] uppercase">READY TO ENGAGE<br/>THE ENGINE?</h3>
            <p className="text-xs text-muted-foreground mb-8 leading-relaxed">Secure your slot in the next automation cycle. Deployment takes less than 5 minutes.</p>
            <button
              onClick={handleLogin}
              className="w-full bg-primary text-[#1b1d00] font-black uppercase text-xs tracking-wider py-4 rounded-none shadow-[0_0_20px_rgba(227,238,66,0.3)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              INITIALIZE SETUP
            </button>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="px-4 md:px-8 py-8 border-t border-[#272a31] text-center max-w-5xl mx-auto">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">© 2024 DMPRO.in Operations</p>
          <div className="flex justify-center gap-6 mt-4">
            <a className="text-[10px] text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-wider" href="#">SYSTEM STATUS</a>
            <a className="text-[10px] text-[#e3ee42] hover:underline transition-colors font-bold uppercase tracking-wider" href="/privacy">PRIVACY POLICY</a>
            <a className="text-[10px] text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-wider" href="#">SUPPORT</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
