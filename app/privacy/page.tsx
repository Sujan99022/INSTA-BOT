import Link from "next/link"
import Image from "next/image"
import { Shield, ArrowLeft, Mail, FileText, CheckCircle2, AlertTriangle, Trash2, Globe } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#08090c] text-slate-100 font-sans selection:bg-[#e3ee42]/30 selection:text-[#e3ee42]">
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
            <span className="font-poppins text-lg tracking-wider font-semibold text-white group-hover:text-[#e3ee42] transition-colors">
              DMPRO.in
            </span>
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-[#e3ee42] border border-white/10 hover:border-[#e3ee42]/30 px-3 py-1.5 transition-all bg-white/[0.02]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        
        {/* Title Hero */}
        <div className="border border-white/[0.08] bg-gradient-to-r from-[#111319] to-[#0c0d12] p-8 md:p-12 mb-12 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#e3ee42]/5 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 text-[#e3ee42] mb-4">
            <Shield className="w-8 h-8" />
            <span className="font-mono text-xs uppercase tracking-widest bg-[#e3ee42]/10 px-2.5 py-1 text-[#e3ee42]">
              Compliant & Secure
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-none">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl font-mono">
            Last Updated: June 17, 2026. This policy outlines how DMPRO.in ("we", "our") collects, protects, uses, and deletes your data when using our Instagram automation services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Quick Navigation Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 space-y-2 border-l border-white/[0.08] pl-4">
              <p className="text-xs font-mono uppercase text-slate-500 tracking-wider mb-4">Navigation</p>
              <a href="#introduction" className="block text-xs font-mono text-slate-400 hover:text-[#e3ee42] transition-colors py-1">1. Scope & Intro</a>
              <a href="#meta-data" className="block text-xs font-mono text-slate-400 hover:text-[#e3ee42] transition-colors py-1">2. Data We Collect</a>
              <a href="#data-usage" className="block text-xs font-mono text-slate-400 hover:text-[#e3ee42] transition-colors py-1">3. How We Use Data</a>
              <a href="#data-storage" className="block text-xs font-mono text-slate-400 hover:text-[#e3ee42] transition-colors py-1">4. Storage & Security</a>
              <a href="#third-parties" className="block text-xs font-mono text-slate-400 hover:text-[#e3ee42] transition-colors py-1">5. Third Parties</a>
              <a href="#data-deletion" className="block text-xs font-mono text-amber-400 hover:text-[#e3ee42] transition-colors py-1 font-bold">6. Data Deletion</a>
              <a href="#rights" className="block text-xs font-mono text-slate-400 hover:text-[#e3ee42] transition-colors py-1">7. Your Rights</a>
              <a href="#contact" className="block text-xs font-mono text-slate-400 hover:text-[#e3ee42] transition-colors py-1">8. Support & Contact</a>
            </div>
          </aside>

          {/* Policy Detail Sections */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Section 1 */}
            <section id="introduction" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-[#e3ee42]">01 /</span> Scope & Introduction
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  Welcome to DMPRO.in. We take your privacy very seriously. This Privacy Policy describes how we collect, process, store, and secure information when you connect your Instagram Professional/Business accounts to our service.
                </p>
                <p>
                  By connecting your account or utilizing DMPRO.in, you consent to the collection and use of information in accordance with this policy. If you do not agree with any terms of this policy, please do not use the application or connect your accounts.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="meta-data" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-[#e3ee42]">02 /</span> Information We Collect
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  To provide automated responses, ice breakers, message queues, and dashboard analytics, DMPRO.in accesses specific data from your connected Instagram Professional accounts via the official Meta Graph API. This includes:
                </p>
                <ul className="list-none space-y-2.5 pl-1 my-4">
                  <li className="flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#e3ee42] shrink-0 mt-0.5" />
                    <span><strong>Account Information:</strong> Instagram Business ID, username, page identifier, profile picture, and access tokens needed to communicate with Meta APIs.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#e3ee42] shrink-0 mt-0.5" />
                    <span><strong>Messaging Data:</strong> Incoming Direct Messages (DMs), comments, message sender IDs, conversation timestamps, and reply logs necessary to execute your configured automation rules.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#e3ee42] shrink-0 mt-0.5" />
                    <span><strong>User Metadata:</strong> Details you provide during signup, including email address (via login), and billing parameters handled via Stripe.</span>
                  </li>
                </ul>
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 text-amber-200/90 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-mono leading-relaxed">
                    <strong>Note:</strong> We do not collect or store your Instagram passwords. Access is granted solely through official Meta secure OAuth tokens, which you can revoke at any time.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="data-usage" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-[#e3ee42]">03 /</span> How We Use Your Data
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  We only process your data to fulfill your specific instructions and requests within the platform. Specifically, your data is used for:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Triggering auto-replies to specific keywords or comments as set up by you.</li>
                  <li>Rendering your analytics dashboard (number of active rules, messages processed, audience counts).</li>
                  <li>Managing message queues, ice-breakers, and scheduler triggers.</li>
                  <li>Providing customer support and debugging connection or webhook issues.</li>
                  <li>Preventing abuse and ensuring compliance with Meta Platform Policies.</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section id="data-storage" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-[#e3ee42]">04 /</span> Data Storage, Security & Retention
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  Your account tokens, rules, messages, and settings are stored securely in dedicated PostgreSQL databases managed through <strong>Supabase</strong>. 
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Security:</strong> All databases are protected behind row-level security (RLS), and database connections use SSL encryption. Official access tokens are encrypted.</li>
                  <li><strong>Retention:</strong> We retain your settings and message records for as long as your account is active. If you delete your account or revoke access, your data is permanently purged.</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="third-parties" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-[#e3ee42]">05 /</span> Third-Party Services & Data Sharing
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We share data only with the following sub-processors required to run the service:
                </p>
                <ul className="list-none space-y-2 pl-1">
                  <li className="flex gap-2.5">
                    <Globe className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
                    <span><strong>Meta Platforms Inc.</strong> (Graph API used to receive messages and send responses).</span>
                  </li>
                  <li className="flex gap-2.5">
                    <Globe className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
                    <span><strong>Supabase Inc.</strong> (Infrastructure provider hosting our databases and authentication).</span>
                  </li>
                  <li className="flex gap-2.5">
                    <Globe className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
                    <span><strong>Stripe</strong> (Payment processor handling billing. We do not store or process card numbers directly).</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 (Meta Deletion Instruction Compliance) */}
            <section id="data-deletion" className="border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.02] to-transparent p-6 space-y-4">
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2.5 pb-2 border-b border-amber-500/10">
                <Trash2 className="w-5 h-5 shrink-0" />
                Meta Data Deletion Request Instructions
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed font-mono">
                <p>
                  To comply with Meta Platform Policies regarding User Data, we provide a complete self-service data deletion process. You can request the deletion of your account and all associated Facebook/Instagram data at any time.
                </p>
                <p className="font-sans font-semibold text-white">To delete your data from DMPRO.in:</p>
                <ol className="list-decimal pl-5 font-sans space-y-2">
                  <li>Log in to your <strong>DMPRO.in</strong> dashboard.</li>
                  <li>Navigate to the <strong>Settings</strong> tab.</li>
                  <li>Scroll to the bottom and click <strong>Delete Account & Revoke Tokens</strong>.</li>
                  <li>Confirm the action. All access tokens, automation rules, message logs, and cache will be permanently and immediately removed from our database.</li>
                </ol>
                <p className="font-sans font-semibold text-white mt-4">Alternative Method (Via Facebook settings):</p>
                <ol className="list-decimal pl-5 font-sans space-y-2">
                  <li>Go to your Facebook Profile's <strong>Settings & Privacy</strong> &rarr; <strong>Settings</strong>.</li>
                  <li>Click <strong>Apps and Websites</strong> on the left menu.</li>
                  <li>Locate <strong>DMPRO</strong> and click <strong>Remove</strong>.</li>
                  <li>This immediately revokes our access token. We will receive a deletion webhook and delete all your user data within 24 hours.</li>
                </ol>
                <p className="font-sans text-xs text-slate-400">
                  If you have any questions or require manual data purging, contact us directly at <a href="mailto:support@dmpro.in" className="text-[#e3ee42] underline">support@dmpro.in</a> with your Instagram handle.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="rights" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-[#e3ee42]">07 /</span> Your Rights & Access
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  You have the right to request access to the data we hold about your business account, request corrections, or request complete removal. Since all configurations are visible on your dashboard, you can view, edit, and delete any rules, schedules, or items directly.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="contact" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-[#e3ee42]">08 /</span> Support & Contact
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  For any privacy-related inquiries, data access requests, or verification questions, please contact our support team:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3 border border-white/[0.06] bg-white/[0.01] px-5 py-4 w-full sm:w-fit">
                    <Mail className="w-5 h-5 text-[#e3ee42]" />
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Email Address</p>
                      <a href="mailto:support@dmpro.in" className="text-white hover:text-[#e3ee42] font-mono text-sm">
                        support@dmpro.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border border-white/[0.06] bg-white/[0.01] px-5 py-4 w-full sm:w-fit">
                    <FileText className="w-5 h-5 text-[#e3ee42]" />
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Legal Name</p>
                      <span className="text-white font-mono text-sm">
                        DMPRO.in Operations
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-black/40 py-8 px-4 text-center mt-20 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 DMPRO.in. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <Link href="/privacy" className="text-slate-300">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
