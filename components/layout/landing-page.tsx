"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, X, Zap, Play, Database, Shield, Activity, TrendingUp, Cpu, RefreshCw, BarChart3, HelpCircle } from "lucide-react"

export function LandingPage() {
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const handleLogin = () => {
    const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || ""
    const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI || 
      `${window.location.origin}/api/instagram/callback`
    const scope = "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights"
    
    if (!appId) {
      alert("System Configuration Error: NEXT_PUBLIC_INSTAGRAM_APP_ID is not configured.")
      return
    }

    const authUrl = `https://www.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}#weblink`
    window.location.href = authUrl
  }

  return (
    <div className="min-h-screen bg-[#10131a] text-[#e0e2ec] overflow-x-hidden selection:bg-primary/20 relative">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] z-0" />

      {/* Watch Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4 py-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-none bg-[#1d2027] border border-[#272a31] p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
            <Play className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-lg font-bold text-foreground uppercase tracking-wider mb-2">Demo Videos Coming Soon</h2>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Step-by-step walkthrough videos are in production and will be available here shortly.
            </p>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4 py-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-none bg-[#1d2027] border border-[#272a31] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSupportModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Contact & Support</h3>
            <div className="space-y-3 text-[11px] text-muted-foreground">
              <div className="p-3 border border-[#272a31] bg-[#0b0e15]">
                <p className="font-bold text-foreground uppercase tracking-wider mb-1">DMPro Support</p>
                <p>Email: <a href="mailto:support@dmpro.in" className="text-primary hover:underline">support@dmpro.in</a></p>
              </div>
              <div className="p-3 border border-[#272a31] bg-[#0b0e15]">
                <p className="font-bold text-foreground uppercase tracking-wider mb-1">Product by SuDeX HuB</p>
                <p>Mail: <a href="mailto:sales@sudexhub.com" className="text-primary hover:underline">sales@sudexhub.com</a></p>
                <p>Instagram: <a href="https://instagram.com/sudex_hub" target="_blank" className="text-primary hover:underline">@sudex_hub</a></p>
                <p>Facebook: <a href="https://www.facebook.com/p/Sudexhub-61586681325088/" target="_blank" className="text-primary hover:underline">Sudexhub</a></p>
                <p>Web: <a href="https://www.sudexhub.com" target="_blank" className="text-primary hover:underline">www.sudexhub.com</a></p>
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
            className="bg-primary text-primary-foreground font-black uppercase text-[10px] tracking-wider rounded-none hover:brightness-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(227,238,66,0.15)] px-4 py-2 cursor-pointer"
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
              AUTOMATE YOUR<br/><span className="font-poppins font-semibold text-primary italic">CUSTOMER ENGAGEMENT</span>
            </h2>
            <p className="text-sm text-[#e0e2ec] max-w-md mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Reliable, real-time communication management. Streamline your public business mentions and manage customer threads with official, platform-compliant precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button
                onClick={handleLogin}
                className="bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-none shadow-[0_0_20px_rgba(227,238,66,0.25)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
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



        {/* About DMPro Section */}
        <section className="px-4 md:px-8 mb-20 max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#bac7dd]">About DMPro</h3>
            <div className="h-[1px] bg-[#272a31] flex-grow ml-4 mb-2"></div>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            DMPro is a SaaS platform developed and operated by Sudexhub. Businesses and creators connect their own Instagram Business accounts using official Meta authentication and configure automated engagement workflows directly inside the platform.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="steam-card p-4 border border-[#272a31] rounded-none text-center">
              <span className="text-primary text-sm font-bold">✓</span>
              <h4 className="text-[10px] font-bold text-foreground uppercase tracking-wider mt-1">Official Meta Integration</h4>
            </div>
            <div className="steam-card p-4 border border-[#272a31] rounded-none text-center">
              <span className="text-primary text-sm font-bold">✓</span>
              <h4 className="text-[10px] font-bold text-foreground uppercase tracking-wider mt-1">Customer-controlled Automation</h4>
            </div>
            <div className="steam-card p-4 border border-[#272a31] rounded-none text-center">
              <span className="text-primary text-sm font-bold">✓</span>
              <h4 className="text-[10px] font-bold text-foreground uppercase tracking-wider mt-1">Secure Account Connection</h4>
            </div>
            <div className="steam-card p-4 border border-[#272a31] rounded-none text-center">
              <span className="text-primary text-sm font-bold">✓</span>
              <h4 className="text-[10px] font-bold text-foreground uppercase tracking-wider mt-1">Privacy-focused Design</h4>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-4 md:px-8 mb-20 max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#bac7dd]">How It Works</h3>
            <div className="h-[1px] bg-[#272a31] flex-grow ml-4 mb-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Connect Instagram Business Account", desc: "Securely link your Instagram Business profile using official Meta API authentication." },
              { step: "02", title: "Configure Automation Rules", desc: "Define automation rules for comments, DMs, and story mentions to match your engagement goals." },
              { step: "03", title: "Enable Automated Engagement", desc: "Users configure automated reply workflows and messaging templates for customer engagement." },
              { step: "04", title: "Monitor & Optimize", desc: "Track conversations and performance metrics directly within your dashboard." }
            ].map((p, i) => (
              <div key={i} className="steam-card p-5 border border-[#272a31] relative rounded-none">
                <span className="font-mono text-[9px] text-primary border border-primary/30 px-1.5 py-0.5 absolute top-5 right-5">STEP {p.step}</span>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 mt-4">{p.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>



        {/* Feature Cards */}
        <section className="px-4 md:px-8 mb-20 max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#bac7dd]">Advanced Modules</h3>
            <div className="h-[1px] bg-[#272a31] flex-grow ml-4 mb-2"></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="steam-card rounded-none overflow-hidden group border border-[#272a31]">
              <div className="h-40 relative bg-gradient-to-br from-primary/5 to-[#171a21] flex items-center justify-center">
                <Cpu className="w-12 h-12 text-primary/30" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Cpu className="w-5 h-5 text-primary" />
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Smart Automations</h4>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Custom automation workflows</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="steam-card rounded-none overflow-hidden group border border-[#272a31]">
              <div className="h-40 relative bg-gradient-to-br from-primary/5 to-[#171a21] flex items-center justify-center">
                <BarChart3 className="w-12 h-12 text-primary/30" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Real-time Analytics</h4>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Real-time dashboard insights</p>
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
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Story Mentions & Compliant Replies</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Engage with customers who actively tag your brand. In strict accordance with platform policies and user consent, route public Instagram Story mentions into secure, private conversations to share safe content links, verified updates, or personalized greetings.
                </p>
              </div>
            </div>
            <div className="steam-card p-6 border border-[#272a31] flex gap-4 rounded-none">
              <BarChart3 className="text-primary w-6 h-6 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Integrated Live Inbox</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Prioritize authentic human interaction. Manage your active, consented chat threads from a single, centralized control center. Monitor conversations and seamlessly transition to manual live chat at any time to maintain a secure user experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data & Privacy Section */}
        <section className="bg-[#1d2027]/50 px-4 md:px-8 py-16 border-y border-[#272a31] max-w-5xl mx-auto mb-20">
          <h3 className="font-sans text-2xl font-black uppercase text-foreground mb-8">
            DATA &amp; <br/><span className="text-primary italic">PRIVACY</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-[#0b0e15] rounded-none flex items-center justify-center border border-[#272a31]">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Official API Processing</h5>
                <p className="text-[11px] text-muted-foreground leading-relaxed">DMPro processes interactions through official Meta APIs to deliver automation features.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-[#0b0e15] rounded-none flex items-center justify-center border border-[#272a31]">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Limited Data Storage</h5>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Message content is not permanently stored unless required for platform functionality.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-[#0b0e15] rounded-none flex items-center justify-center border border-[#272a31]">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Usage-based Analytics</h5>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Analytics are generated from operational usage metrics.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#272a31]/40 text-center">
            <p className="text-[11px] text-muted-foreground leading-relaxed">Users retain control of connected accounts and automation settings.</p>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="px-4 md:px-8 mb-20 max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#bac7dd]">Built for Responsible Automation</h3>
            <div className="h-[1px] bg-[#272a31] flex-grow ml-4 mb-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="steam-card p-5 border border-[#272a31] rounded-none text-center">
              <span className="text-primary text-lg font-bold">✓</span>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mt-2">Official Meta Authentication</h4>
            </div>
            <div className="steam-card p-5 border border-[#272a31] rounded-none text-center">
              <span className="text-primary text-lg font-bold">✓</span>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mt-2">User-authorized Account Access</h4>
            </div>
            <div className="steam-card p-5 border border-[#272a31] rounded-none text-center">
              <span className="text-primary text-lg font-bold">✓</span>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mt-2">Customer-controlled Automation</h4>
            </div>
            <div className="steam-card p-5 border border-[#272a31] rounded-none text-center">
              <span className="text-primary text-lg font-bold">✓</span>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mt-2">Privacy-first Design</h4>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
            DMPro enables users to automate customer engagement using their own connected Instagram Business accounts.
          </p>
        </section>


        {/* Pricing Plans Grid
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
                <div className="font-black text-3xl text-primary mb-6">$19<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
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

            <div className="steam-card p-6 border border-primary rounded-none flex flex-col justify-between min-h-[350px] relative shadow-[0_0_20px_rgba(227,238,66,0.08)]">
              <div className="absolute top-0 right-6 bg-primary text-primary-foreground font-black text-[8px] px-2 py-0.5 uppercase tracking-widest">Recommended</div>
              <div>
                <span className="font-mono text-[8px] text-primary tracking-widest uppercase">STAGE 02</span>
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mt-1 mb-2">Pro Velocity</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-6">Full operation scaling. Highly recommended for active commercial profiles and storefronts.</p>
                <div className="font-black text-3xl text-primary mb-6">$39<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                <ul className="space-y-2 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                  <li className="flex items-center gap-2 text-foreground">✓ Unlimited active rules</li>
                  <li className="flex items-center gap-2 text-foreground">✓ Unlimited auto-replies</li>
                  <li className="flex items-center gap-2 text-foreground">✓ Advanced lead analytics</li>
                  <li className="flex items-center gap-2 text-foreground">✓ Reels auto-publisher</li>
                  <li className="flex items-center gap-2 text-foreground">✓ Priority message pool</li>
                </ul>
              </div>
              <button onClick={handleLogin} className="w-full bg-primary text-primary-foreground hover:brightness-110 font-bold text-xs uppercase tracking-wider py-3 mt-8 transition-all shadow-[0_0_12px_rgba(227,238,66,0.15)] cursor-pointer">
                Scale Pro
              </button>
            </div>

            <div className="steam-card p-6 border border-[#272a31] rounded-none flex flex-col justify-between min-h-[350px]">
              <div>
                <span className="font-mono text-[8px] text-muted-foreground tracking-widest uppercase">STAGE 03</span>
                <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mt-1 mb-2">Enterprise Scale</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-6">Dedicated agency clusters. Run multiple brands with zero performance bottlenecking.</p>
                <div className="font-black text-3xl text-primary mb-6">$99<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
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
        */}

        {/* Technical FAQ */}
        <section className="px-4 md:px-8 mb-20 max-w-3xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#bac7dd]">System FAQ</h3>
            <div className="h-[1px] bg-[#272a31] flex-grow ml-4 mb-2"></div>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "FAQ 01 | IS DMPRO.IN OFFICIALLY COMPLIANT WITH THE PLATFORM?",
                a: "Yes. DMPRO.IN interacts strictly with official platform Graph API endpoints. Our system is built entirely within required developer guidelines to ensure all live conversation monitoring is secure, authorized, and completely compliant with platform safety and data privacy policies."
              },
              {
                q: "FAQ 02 | HOW DO I CONNECT MY INSTAGRAM BUSINESS ACCOUNT?",
                a: "You do not need to manually handle complex security access keys. Simply link your compatible Business account securely via the official, secure platform login window during onboarding. Our system handles the live connection seamlessly without ever tracking or storing your login credentials on our servers."
              },
              {
                q: "FAQ 03 | CAN I CUSTOMIZE THE REPLY TIME DELAY?",
                a: "Our system features built-in natural delivery pacing that aligns strictly with official platform best practices. This ensures responses flow at a secure, stable rate to maintain an authentic user experience and keep your profile fully compliant with standard messaging regulations."
              },
              {
                q: "FAQ 04 | WHAT TYPES OF INTERACTIONS ARE SUPPORTED?",
                a: "You can safely configure compliant replies for public story mentions where users explicitly tag your business profile. All automation is entirely pull-based—meaning it only triggers after a customer actively initiates an interaction—ensuring a 100% consent-driven and secure communication flow."
              }
            ].map((faq, i) => (
              <div key={i} className="steam-card border border-[#272a31] rounded-none">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-[#1d2027]/30 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">{faq.q}</span>
                  <span className="text-primary font-mono text-xs">{activeFaq === i ? "[-]" : "[+]"}</span>
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
            <h3 className="font-sans text-2xl font-black mb-4 text-[#e0e2ec] uppercase">Connect Your Instagram<br/>Business Account</h3>
            <p className="text-xs text-muted-foreground mb-8 leading-relaxed">Secure setup using official Meta authentication.</p>
            <button
              onClick={handleLogin}
              className="w-full bg-primary text-primary-foreground font-black uppercase text-xs tracking-wider py-4 rounded-none shadow-[0_0_20px_rgba(227,238,66,0.3)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              GET STARTED
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 md:px-8 py-10 border-t border-[#272a31] text-center max-w-5xl mx-auto">
          <p className="text-xs font-mono text-slate-500">          © 2026 Sudexhub. All rights reserved.</p>
          <div className="flex justify-center gap-x-6 gap-y-2 mt-3 flex-wrap">
            <Link href="/privacy" className="text-xs font-mono text-slate-400 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs font-mono text-slate-400 hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-xs font-mono text-slate-400 hover:text-primary transition-colors">Contact</Link>
            <Link href="/about" className="text-xs font-mono text-slate-400 hover:text-primary transition-colors">About</Link>
          </div>
          <p className="text-[10px] font-mono text-slate-600 mt-3">Product by Sudexhub</p>
        </footer>
      </main>
    </div>
  )
}
