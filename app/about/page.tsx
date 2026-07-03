import Link from "next/link"
import Image from "next/image"
import { Info, ArrowLeft, Target, Cpu, Shield, BarChart3, CheckCircle2, Building2, Mail } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#08090c] text-slate-100 font-sans selection:bg-primary/30 selection:text-primary">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b202c_1px,transparent_1px),linear-gradient(to_bottom,#1b202c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/[0.06] bg-[#08090c]/80 px-4 md:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logo.png" 
              alt="DMPRO Logo" 
              width={32} 
              height={32} 
              className="object-contain"
            />
            <span className="font-poppins text-lg tracking-wider font-semibold text-white group-hover:text-primary transition-colors">
              DMPRO.in
            </span>
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-primary border border-white/10 hover:border-primary/30 px-3 py-1.5 transition-all bg-white/[0.02]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        
        <div className="border border-white/[0.08] bg-gradient-to-r from-[#111319] to-[#0c0d12] p-8 md:p-12 mb-12 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 text-primary mb-4">
            <Info className="w-8 h-8" />
            <span className="font-mono text-xs uppercase tracking-widest bg-primary/10 px-2.5 py-1 text-primary">
              About Us
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-none">
            About DMPro
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl font-mono">
            DMPro is a SaaS platform built by Sudexhub to help businesses and creators automate their Instagram customer engagement using official Meta APIs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
              <Target className="w-5 h-5 text-primary" />
              Our Mission
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              To simplify customer communication while respecting user privacy and platform compliance. We believe businesses should have access to smart engagement tools without compromising on security, transparency, or ethical standards.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
              <Cpu className="w-5 h-5 text-primary" />
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-white/[0.08] bg-white/[0.02] p-6">
                <span className="font-mono text-[9px] text-primary border border-primary/30 px-1.5 py-0.5">STEP 01</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mt-3 mb-2">Connect</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Connect your Instagram Business account securely via <strong className="text-white">Meta OAuth</strong>.
                </p>
              </div>
              <div className="border border-white/[0.08] bg-white/[0.02] p-6">
                <span className="font-mono text-[9px] text-primary border border-primary/30 px-1.5 py-0.5">STEP 02</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mt-3 mb-2">Configure</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Configure response rules in your dashboard for DMs, comments, and stories.
                </p>
              </div>
              <div className="border border-white/[0.08] bg-white/[0.02] p-6">
                <span className="font-mono text-[9px] text-primary border border-primary/30 px-1.5 py-0.5">STEP 03</span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mt-3 mb-2">Engage</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Engage with customers instantly and efficiently while maintaining full control.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
              <Shield className="w-5 h-5 text-primary" />
              Built With
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-white/[0.06] bg-white/[0.01] px-5 py-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Official Meta Graph API</p>
                  <p className="text-[10px] text-slate-500">Platform-compliant integration</p>
                </div>
              </div>
              <div className="border border-white/[0.06] bg-white/[0.01] px-5 py-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Secure Infrastructure by Supabase</p>
                  <p className="text-[10px] text-slate-500">Encrypted & protected data</p>
                </div>
              </div>
              <div className="border border-white/[0.06] bg-white/[0.01] px-5 py-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">Payments Powered by Stripe</p>
                  <p className="text-[10px] text-slate-500">Secure transaction processing</p>
                </div>
              </div>
            </div>
          </section>

          <section className="border border-white/[0.08] bg-gradient-to-r from-[#111319] to-[#0c0d12] p-8">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-bold text-white">Company</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              <strong>Sudexhub</strong> — Building engagement tools for modern businesses. We specialize in developing SaaS platforms that leverage official APIs to help businesses streamline customer engagement, communication, and workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 border border-white/[0.06] bg-white/[0.01] px-5 py-4 w-full sm:w-fit">
                <BarChart3 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Website</p>
                  <a href="https://www.sudexhub.com" target="_blank" className="text-white hover:text-primary font-mono text-sm">
                    www.sudexhub.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 border border-white/[0.06] bg-white/[0.01] px-5 py-4 w-full sm:w-fit">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Email</p>
                  <a href="mailto:support@dmpro.in" className="text-white hover:text-primary font-mono text-sm">
                    support@dmpro.in
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
