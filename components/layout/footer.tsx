import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/40 py-8 px-4 text-center mt-20 relative z-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-mono text-slate-500">2026 Sudexhub. All rights reserved.</p>
        <div className="flex justify-center gap-x-6 gap-y-2 mt-3 flex-wrap">
          <Link href="/privacy" className="text-xs font-mono text-slate-400 hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-xs font-mono text-slate-400 hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-xs font-mono text-slate-400 hover:text-primary transition-colors">
            Contact
          </Link>
          <Link href="/about" className="text-xs font-mono text-slate-400 hover:text-primary transition-colors">
            About
          </Link>
        </div>
        <p className="text-[10px] font-mono text-slate-600 mt-3">Product by Sudexhub</p>
      </div>
    </footer>
  )
}
