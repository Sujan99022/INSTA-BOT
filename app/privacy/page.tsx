import Link from "next/link"
import Image from "next/image"
import { Shield, ArrowLeft, Mail, FileText, CheckCircle2, AlertTriangle, Trash2, Globe, Activity } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#08090c] text-slate-100 font-sans selection:bg-primary/30 selection:text-primary">
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
      <main className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        
        {/* Title Hero */}
        <div className="border border-white/[0.08] bg-gradient-to-r from-[#111319] to-[#0c0d12] p-8 md:p-12 mb-12 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 text-primary mb-4">
            <Shield className="w-8 h-8" />
            <span className="font-mono text-xs uppercase tracking-widest bg-primary/10 px-2.5 py-1 text-primary">
              Compliant & Secure
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-none">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl font-mono">
            Last Updated: July 3, 2026. DMPro is a SaaS platform developed and operated by Sudexhub. Your privacy, security, and trust are our highest priorities. Because we use official Meta APIs to help you manage your Instagram interactions, we design everything around a simple principle: <strong>Your data belongs to you.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Quick Navigation Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 space-y-2 border-l border-white/[0.08] pl-4">
              <p className="text-xs font-mono uppercase text-slate-500 tracking-wider mb-4">Navigation</p>
              <a href="#introduction" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">1. Scope & Intro</a>
              <a href="#no-storage" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">2. No-Storage Principle</a>
              <a href="#meta-data" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">3. Data We Access</a>
              <a href="#data-usage" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">4. How We Use Data</a>
              <a href="#data-storage" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">5. Storage & Security</a>
              <a href="#third-parties" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">6. Third Parties</a>
              <a href="#data-retention" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">7. Data Retention</a>
              <a href="#children-privacy" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">8. Children's Privacy</a>
              <a href="#international-transfers" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">9. International Transfers</a>
              <a href="#data-deletion" className="block text-xs font-mono text-amber-400 hover:text-primary transition-colors py-1 font-bold">10. Data Deletion</a>
              <a href="#contact" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">11. Support & Contact</a>
            </div>
          </aside>

          {/* Policy Detail Sections */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Section 1 */}
            <section id="introduction" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">01 /</span> Scope & Introduction
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  Welcome to DMPro, a SaaS platform developed and operated by Sudexhub. Your privacy, security, and trust are our highest priorities. Because we use official Meta APIs to help you manage your Instagram interactions, we design everything around a simple principle: <strong>Your data belongs to you.</strong>
                </p>
                <p>
                  DMPro does not manage client Meta Business portfolios. Customers connect their own Instagram Business accounts and configure automations themselves. We do not rent, sell, or permanently store your private conversations. We only process what you ask us to, strictly based on your explicit consent.
                </p>
                <p>
                  This Privacy Policy explains how DMPro handles information when you securely connect your Instagram Business accounts to our platform via official Meta authentication.
                </p>
                <p>
                  By connecting your account, you authorize DMPro to process your configured automation rules in compliance with this policy. If you do not agree with these terms, please do not connect your accounts or use the service.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="no-storage" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">02 /</span> Data Processing & Consent-First Principle
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  Unlike traditional platforms that log and keep your data, DMPRO.in operates on a <strong>transient processing model</strong>:
                </p>
                <ul className="list-none space-y-2.5 pl-1 my-4">
                  <li className="flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>No Automatic Content Triggering:</strong> We never automatically scan, modify, or send messages without a specific trigger rule created and activated by you.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>No Permanent Message Storage:</strong> We do not keep a permanent archive or history of your Instagram Direct Messages (DMs). Messages are processed in real-time to execute your rules and are not stored on our servers once delivered.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>No Password Collection:</strong> We never ask for, see, or store your Instagram or Facebook passwords. Access is granted entirely via Meta’s official, secure OAuth tokens, which you can revoke at any single moment.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="meta-data" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">03 /</span> Information We Access (With Your Permission)
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  To execute the specific keyword auto-replies, comment responses, and dashboard stats you request, we access the following minimal data points via the official <strong>Meta Graph API</strong>:
                </p>
                <ul className="list-none space-y-2.5 pl-1 my-4">
                  <li className="flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Account Profiles:</strong> Instagram Business ID, username, page identifier, and profile picture to display your connected account in your dashboard.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Real-Time Message Routing:</strong> Incoming keywords, comments, or sender IDs. This data is processed <em>in real-time</em> to send your automated reply and is not saved to a long-term database.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span><strong>Account Metadata:</strong> Your signup email address (for account login) and secure billing tokens managed by Stripe.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section id="data-usage" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">04 /</span> How We Use Your Data
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  We act strictly as a processing conduit for your instructions. We use incoming data streams exclusively to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Trigger auto-replies to the exact keywords or comments you configure.</li>
                  <li>Display real-time analytics on your active dashboard (e.g., number of active rules, live counter of total messages processed).</li>
                  <li>Provide requested customer support and troubleshoot connection errors.</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="data-storage" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">05 /</span> Data Security & Infrastructure
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  While we do not store your messaging history, we do need to remember your account settings, active rules, and secure Meta access tokens.
                </p>
                <div className="p-4 bg-primary/5 border border-primary/20 text-slate-300 flex gap-3">
                  <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed">
                    <strong>Security Guardrails:</strong> All configuration data is stored in dedicated PostgreSQL databases managed through Supabase. Your official Meta access tokens are fully encrypted, protected behind Row-Level Security (RLS), and transmitted using SSL encryption.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="third-parties" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">06 /</span> Third-Party Sub-Processors
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  We do not sell, trade, or share your information. We only route data through trusted infrastructure partners required to make the service work:
                </p>
                <ul className="list-none space-y-2 pl-1">
                  <li className="flex gap-2.5">
                    <Globe className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
                    <span><strong>Meta Platforms Inc.:</strong> The official Graph API used to receive your incoming triggers and send your requested responses.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <Globe className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
                    <span><strong>Supabase Inc.:</strong> Our secure infrastructure provider hosting your account settings and authentication.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <Globe className="w-4 h-4 text-slate-500 shrink-0 mt-1" />
                    <span><strong>Stripe:</strong> Our certified payment processor. We never see or store your credit card numbers.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section id="data-retention" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">07 /</span> Data Retention Period
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  Your <strong>Meta access tokens</strong> and <strong>automation settings</strong> are retained only while your account is active. We retain this configuration data solely to operate the automation rules you have set up.
                </p>
                <p>
                  Upon account deletion — whether initiated by you via the dashboard or triggered through Meta's app removal process — <strong>all data is permanently purged within 24 hours</strong>. This includes access tokens, automation rules, analytics data, and any stored configuration settings.
                </p>
                <p>
                  We do not retain backups of your data beyond this period. Once deleted, data cannot be recovered.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="children-privacy" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">08 /</span> Children's Privacy
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  DMPro is <strong>not intended for users under 18 years of age</strong>. We do not knowingly collect, use, or store personal information from children or minors.
                </p>
                <p>
                  If we become aware that a user under 18 is using DMPro, we will take immediate steps to terminate the account and delete any associated data. If you believe a minor is using our service, please contact us at <a href="mailto:support@dmpro.in" className="text-primary hover:underline font-mono">support@dmpro.in</a>.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="international-transfers" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">09 /</span> International Transfers
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  Your data is processed and stored via <strong>Supabase infrastructure</strong>, which may involve data centers located in various regions worldwide.
                </p>
                <p>
                  By using DMPro and providing your data, you consent to the transfer, storage, and processing of your information in locations where Supabase and its sub-processors maintain servers and facilities.
                </p>
                <p>
                  We ensure that appropriate safeguards are in place to protect your data in accordance with applicable data protection laws, regardless of where it is processed.
                </p>
              </div>
            </section>

            {/* Section 10 (Meta Deletion Instruction Compliance) */}
            <section id="data-deletion" className="border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.02] to-transparent p-6 space-y-4">
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2.5 pb-2 border-b border-amber-500/10">
                <Trash2 className="w-5 h-5 shrink-0" />
                Meta Data Deletion Instructions (On-Demand Clean Up)
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  We fully support your right to be forgotten. If you decide to stop using DMPRO.in, you can completely erase your footprint instantly.
                </p>
                
                <p className="font-semibold text-white mt-4">Method 1: Instant Self-Service (Via DMPRO Dashboard)</p>
                <ol className="list-decimal pl-5 space-y-2 font-sans">
                  <li>Log into your <strong>DMPRO.in</strong> dashboard.</li>
                  <li>Navigate to the <strong>Settings</strong> tab.</li>
                  <li>Scroll to the bottom and click <strong>Delete Account & Revoke Tokens</strong>.</li>
                  <li>Confirm. This immediately and permanently purges your access tokens, automation settings, and analytical logs from our system.</li>
                </ol>

                <p className="font-semibold text-white mt-4">Method 2: App Removal (Via Facebook/Instagram)</p>
                <ol className="list-decimal pl-5 space-y-2 font-sans">
                  <li>Go to your Facebook Profile’s <strong>Settings & Privacy</strong> &rarr; <strong>Settings</strong>.</li>
                  <li>Click <strong>Apps and Websites</strong> on the left-hand menu.</li>
                  <li>Locate <strong>DMPRO</strong> and click <strong>Remove</strong>.</li>
                  <li>Meta will notify our system via a secure webhook, and we will automatically delete any remaining user data and configuration blocks within 24 hours.</li>
                </ol>
                
                <p className="text-xs text-slate-400 mt-4">
                  For manual purge requests, you can always reach us at <a href="mailto:support@dmpro.in" className="text-primary underline font-mono">support@dmpro.in</a> with your Instagram handle.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section id="contact" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">11 /</span> About Sudexhub & Contact
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  DMPro is a product of <strong>Sudexhub</strong>, a technology company specializing in building automation and engagement tools for businesses and creators.
                </p>
                <p>
                  Sudexhub develops SaaS platforms that leverage official APIs to help businesses streamline customer engagement, communication, and workflow automation.
                </p>
                <div className="p-4 border border-white/[0.08] bg-white/[0.02] space-y-2">
                  <p className="font-semibold text-white text-xs uppercase tracking-wider">Sudexhub Contact Details</p>
                  <p className="text-xs">Website: <a href="https://www.sudexhub.com" target="_blank" className="text-primary hover:underline font-mono">www.sudexhub.com</a></p>
                  <p className="text-xs">Email: <a href="mailto:sales@sudexhub.com" className="text-primary hover:underline font-mono">sales@sudexhub.com</a></p>
                  <p className="text-xs">Instagram: <a href="https://instagram.com/sudex_hub" target="_blank" className="text-primary hover:underline font-mono">@sudex_hub</a></p>
                  <p className="text-xs">Facebook: <a href="https://www.facebook.com/p/Sudexhub-61586681325088/" target="_blank" className="text-primary hover:underline font-mono">Sudexhub</a></p>
                </div>
                <p>
                  If you have any questions about this Privacy Policy, your rights, or Meta API compliance, please reach out to us:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3 border border-white/[0.06] bg-white/[0.01] px-5 py-4 w-full sm:w-fit">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500">DMPro Support</p>
                      <a href="mailto:support@dmpro.in" className="text-white hover:text-primary font-mono text-sm">
                        support@dmpro.in
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border border-white/[0.06] bg-white/[0.01] px-5 py-4 w-full sm:w-fit">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Product By</p>
                      <span className="text-white font-mono text-sm">
                        Sudexhub
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}
