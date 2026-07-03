import Link from "next/link"
import Image from "next/image"
import { Mail, ArrowLeft, MessageSquare, Clock, Building2, Send } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export default function ContactPage() {
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
            <MessageSquare className="w-8 h-8" />
            <span className="font-mono text-xs uppercase tracking-widest bg-primary/10 px-2.5 py-1 text-primary">
              Get in Touch
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-none">
            Contact Us
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl font-mono">
            Have questions about DMPro or need support? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-4 border-b border-white/[0.06] mb-6">
                <Send className="w-5 h-5 text-primary" />
                Send Us a Message
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your name"
                    className="glass-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="glass-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="How can we help you?"
                    className="glass-textarea w-full"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider py-3 px-8 rounded-none hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-white/[0.06] bg-white/[0.01] p-5">
              <Mail className="w-5 h-5 text-primary mb-2" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Email</h3>
              <a href="mailto:support@dmpro.in" className="text-sm font-mono text-primary hover:underline">
                support@dmpro.in
              </a>
            </div>

            <div className="border border-white/[0.06] bg-white/[0.01] p-5">
              <Clock className="w-5 h-5 text-primary mb-2" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Response Time</h3>
              <p className="text-xs font-mono text-slate-300">
                We typically respond within 24-48 hours.
              </p>
            </div>

            <div className="border border-white/[0.06] bg-white/[0.01] p-5">
              <Building2 className="w-5 h-5 text-primary mb-2" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Company</h3>
              <p className="text-xs font-mono text-slate-300">
                DMPro is a product of <strong className="text-white">Sudexhub</strong>.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
