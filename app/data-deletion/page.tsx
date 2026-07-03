import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export default function DataDeletionPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const confirmationCode = searchParams.id || "N/A"

  return (
    <div className="min-h-screen flex flex-col bg-[#08090c] text-slate-100 font-sans selection:bg-primary/30 selection:text-primary">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b202c_1px,transparent_1px),linear-gradient(to_bottom,#1b202c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

      {/* Header */}
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

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="max-w-xl w-full border border-white/[0.08] bg-gradient-to-b from-[#111319] to-[#0c0d12] p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-4">
            Data Deletion Successful
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
            Your data deletion request has been processed successfully. All associated personal data, authentication tokens, and rule settings have been permanently removed from our servers in compliance with Meta's policies.
          </p>

          <div className="bg-black/40 border border-white/10 p-4 rounded-sm inline-block min-w-[250px] mb-8">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
              Confirmation Code
            </p>
            <p className="font-mono text-lg text-primary select-all">
              {confirmationCode}
            </p>
          </div>

          <div>
            <Link 
              href="/"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider py-3 px-8 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
