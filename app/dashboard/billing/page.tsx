"use client"

import { Cpu, Zap, Network, CheckCircle2, MinusCircle, ArrowRight, PhoneCall, HelpCircle } from "lucide-react"

export default function BillingPage() {
    return (
        <div className="space-y-12 max-w-6xl mx-auto pb-20 p-4 md:p-8">
            {/* Hero Heading Section */}
            <div className="text-center">
                <div className="inline-block px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 rounded-sm">
                    Subscription Matrices
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase text-[#e0e2ec] mb-4 tracking-tight">
                    Scaling <span className="font-poppins font-semibold text-primary glow-text">DMPRO.in</span> Infrastructure
                </h2>
                <p className="text-[#c8c8ae] text-xs md:text-sm max-w-2xl mx-auto opacity-80 leading-relaxed">
                    Deploy high-density growth nodes and multi-channel synchronization with our industrial-grade tiers. Engineered for performance and reliability at scale.
                </p>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-6">
                
                {/* Tier 1: Starter Engine */}
                <div className="steam-card p-8 flex flex-col relative overflow-hidden group rounded-sm border border-transparent">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                        <Cpu className="w-16 h-16 text-slate-400" />
                    </div>
                    <div className="mb-8">
                        <h3 className="text-[12px] font-bold text-[#c8c8ae] uppercase tracking-widest mb-2">Starter Engine</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-[#e0e2ec]">$149</span>
                            <span className="text-[#c8c8ae] text-[10px] font-semibold">/MO</span>
                        </div>
                    </div>
                    
                    <div className="industrial-divider mb-8"></div>
                    
                    <ul className="space-y-4 mb-10 flex-1">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs text-[#e0e2ec] opacity-90">5 AI Growth Nodes</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs text-[#e0e2ec] opacity-90">Daily Analytics Report</span>
                        </li>
                        <li className="flex items-start gap-3 text-[#c8c8ae]/40">
                            <MinusCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                            <span className="text-xs">Manual Channel Sync</span>
                        </li>
                        <li className="flex items-start gap-3 text-[#c8c8ae]/40">
                            <MinusCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                            <span className="text-xs">Standard Support</span>
                        </li>
                    </ul>
                    <button className="w-full py-3 bg-[#e0e2ec] hover:bg-white text-black font-black uppercase text-xs tracking-wider rounded-sm active:scale-[0.98] transition-all cursor-pointer">
                        Initialize
                    </button>
                </div>

                {/* Tier 2: Pro Velocity (Highlighted) */}
                <div className="steam-card pro-highlight p-8 flex flex-col relative overflow-hidden scale-105 z-10 rounded-sm">
                    {/* Most Popular Badge */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-sm shadow-sm">
                        <span className="text-[#303300] text-[9px] font-black uppercase tracking-tighter">Most Popular</span>
                    </div>
                    <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                        <Zap className="w-16 h-16 text-primary" />
                    </div>
                    <div className="mt-4 mb-8">
                        <h3 className="text-[12px] font-bold text-primary glow-text uppercase tracking-widest mb-2">Pro Velocity</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-[#e0e2ec]">$499</span>
                            <span className="text-[#c8c8ae] text-[10px] font-semibold">/MO</span>
                        </div>
                    </div>
                    
                    <div className="industrial-divider mb-8 bg-primary/20"></div>
                    
                    <ul className="space-y-4 mb-10 flex-1">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5 fill-primary/10" />
                            <span className="text-xs text-[#e0e2ec] font-bold">25 AI Growth Nodes</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5 fill-primary/10" />
                            <span className="text-xs text-[#e0e2ec]">Real-time Analytics</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5 fill-primary/10" />
                            <span className="text-xs text-[#e0e2ec]">Multi-channel Sync</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5 fill-primary/10" />
                            <span className="text-xs text-[#e0e2ec]">API Access (v2)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5 fill-primary/10" />
                            <span className="text-xs text-[#e0e2ec]">Priority Uplink</span>
                        </li>
                    </ul>
                    <button className="w-full py-4 bg-primary hover:brightness-110 text-[#1b1d00] font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(199,209,35,0.4)] active:scale-[0.98] transition-all cursor-pointer border-none">
                        Deploy Pro
                    </button>
                </div>

                {/* Tier 3: Enterprise Scale */}
                <div className="steam-card p-8 flex flex-col relative overflow-hidden group rounded-sm border border-transparent">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                        <Network className="w-16 h-16 text-slate-400" />
                    </div>
                    <div className="mb-8">
                        <h3 className="text-[12px] font-bold text-[#c8c8ae] uppercase tracking-widest mb-2">Enterprise Scale</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-[#e0e2ec]">$1,299</span>
                            <span className="text-[#c8c8ae] text-[10px] font-semibold">/MO</span>
                        </div>
                    </div>
                    
                    <div className="industrial-divider mb-8"></div>
                    
                    <ul className="space-y-4 mb-10 flex-1">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs text-[#e0e2ec] opacity-90">Unlimited Growth Nodes</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs text-[#e0e2ec] opacity-90">Custom Data Pipelines</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs text-[#e0e2ec] opacity-90">White-label Interface</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs text-[#e0e2ec] opacity-90">Dedicated Node Architect</span>
                        </li>
                    </ul>
                    <button className="w-full py-3 border-2 border-[#c8c8ae] hover:bg-[#c8c8ae] hover:text-black text-[#e0e2ec] font-black uppercase text-xs tracking-wider rounded-sm active:scale-[0.98] transition-all cursor-pointer">
                        Request Quote
                    </button>
                </div>
            </div>

            {/* Footer Compare & Custom Tiers Section */}
            <div className="mt-16 flex flex-col items-center gap-8">
                <button className="text-primary hover:underline text-[12px] font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                    Compare all features <ArrowRight className="w-3.5 h-3.5" />
                </button>
                
                <div className="w-full industrial-divider"></div>
                
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 p-10 steam-card border-none bg-[#191c23] rounded-sm">
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold text-[#e0e2ec] mb-2">Need more scale?</h4>
                        <p className="text-xs text-[#c8c8ae]">Customized infrastructure solutions for global networks and high-frequency deployment.</p>
                    </div>
                    <button className="px-8 py-3 bg-[#3d4a5b] text-[#acb9ce] font-black uppercase tracking-widest text-xs hover:bg-[#32353c] active:scale-95 transition-all cursor-pointer rounded-sm border-none whitespace-nowrap">
                        Contact Architects
                    </button>
                </div>
            </div>
        </div>
    )
}
