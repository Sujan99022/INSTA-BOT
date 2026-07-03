import Link from "next/link"
import Image from "next/image"
import { FileText, ArrowLeft, Mail, Shield, Activity, AlertTriangle, Trash2, Globe, Scale, HelpCircle } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
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
        
        {/* Last Updated Notice */}
        <div className="mb-6 text-center">
          <span className="inline-block font-mono text-xs uppercase tracking-widest bg-primary/10 px-3 py-1.5 text-primary border border-primary/20">
            Last Updated: July 3, 2026
          </span>
        </div>
        
        <div className="border border-white/[0.08] bg-gradient-to-r from-[#111319] to-[#0c0d12] p-8 md:p-12 mb-12 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 text-primary mb-4">
            <Scale className="w-8 h-8" />
            <span className="font-mono text-xs uppercase tracking-widest bg-primary/10 px-2.5 py-1 text-primary">
              Legal & Compliance
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-none">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl font-mono">
            These terms govern your use of DMPro, a SaaS platform developed and operated by Sudexhub.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 space-y-2 border-l border-white/[0.08] pl-4">
              <p className="text-xs font-mono uppercase text-slate-500 tracking-wider mb-4">Navigation</p>
              <a href="#introduction" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">1. Introduction</a>
              <a href="#description" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">2. Description of Service</a>
              <a href="#accounts" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">3. User Accounts & Eligibility</a>
              <a href="#acceptable-use" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">4. Acceptable Use</a>
              <a href="#meta-compliance" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">5. Meta API Compliance</a>
              <a href="#data-privacy" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">6. Data & Privacy</a>
              <a href="#payments" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">7. Payments & Billing</a>
              <a href="#disclaimers" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">8. Service Limitations</a>
              <a href="#termination" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">9. Termination</a>
              <a href="#changes" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">10. Changes to Terms</a>
              <a href="#governing-law" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">11. Governing Law</a>
              <a href="#contact" className="block text-xs font-mono text-slate-400 hover:text-primary transition-colors py-1">12. Contact</a>
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-12">
            
            <section id="introduction" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">01 /</span> Introduction
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  These Terms of Service govern your use of DMPro, a SaaS platform developed and operated by <strong>Sudexhub</strong>. By accessing or using DMPro, you agree to these terms.
                </p>
                <p>
                  Please read these Terms carefully before using the platform. If you do not agree with any part of these terms, you must not use DMPro or any related services.
                </p>
              </div>
            </section>

            <section id="description" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">02 /</span> Description of Service
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  DMPro allows businesses to connect their own Instagram Business accounts via official <strong>Meta APIs</strong> to configure automated messaging workflows. The platform provides tools for DM automation, comment auto-replies, story engagement, and analytics.
                </p>
                <p>
                  <strong>We do not own or control your Instagram account.</strong> You retain full ownership and control over your connected accounts at all times. DMPro acts solely as a processing conduit for the automation rules you explicitly configure and activate.
                </p>
              </div>
            </section>

            <section id="accounts" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">03 /</span> User Accounts & Eligibility
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  By creating an account on DMPro, you represent and warrant that:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>You are at least 18 years of age.</li>
                  <li>You own or have the legal authority to manage the Instagram Business account you connect.</li>
                  <li>All information you provide is accurate and complete.</li>
                  <li>You will maintain only one account per user.</li>
                  <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                </ul>
                <p>
                  DMPro reserves the right to verify account ownership and request additional information if needed.
                </p>
              </div>
            </section>

            <section id="acceptable-use" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">04 /</span> Acceptable Use
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  You agree to use DMPro in compliance with all applicable laws and regulations. You may NOT use DMPro for:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Sending spam or bulk unsolicited messages.</li>
                  <li>Harassment, abuse, or threatening behavior.</li>
                  <li>Any activity that violates <strong>Meta's Platform Policy</strong> or <strong>Instagram Community Guidelines</strong>.</li>
                  <li>Impersonating other individuals or entities.</li>
                  <li>Distributing malware or harmful content.</li>
                  <li>Any illegal or fraudulent activity.</li>
                </ul>
                <p>
                  Automation rules must be configured by the account owner or an authorized representative. You are solely responsible for the content and behavior of your automation workflows.
                </p>
              </div>
            </section>

            <section id="meta-compliance" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">05 /</span> Meta API Compliance
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  Users acknowledge that DMPro operates exclusively through official <strong>Meta Graph APIs</strong>. Your use of DMPro is subject to Meta's terms and policies.
                </p>
                <p>
                  You are responsible for ensuring your automation rules comply with Meta's platform policies, including:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Meta Platform Terms</li>
                  <li>Instagram Platform Policy</li>
                  <li>Meta Community Standards</li>
                  <li>Applicable data protection regulations</li>
                </ul>
                <p>
                  We may suspend or limit service if <strong>Meta reports policy violations</strong> associated with your account or if we reasonably believe your usage violates applicable terms.
                </p>
              </div>
            </section>

            <section id="data-privacy" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">06 /</span> Data & Privacy
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  Your privacy matters to us. Please refer to our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> at <strong>dmpro.in/privacy</strong> for detailed information about how we collect, use, process, and protect your data.
                </p>
                <p>
                  By using DMPro, you consent to the data practices described in our Privacy Policy. User data handling is governed entirely by that policy.
                </p>
              </div>
            </section>

            <section id="payments" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">07 /</span> Payments & Billing
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  DMPro is currently in <strong>free beta</strong>. There are no subscription fees or billing obligations at this time.
                </p>
                <p>
                  Billing terms and subscription plans will be added in future releases. Users will be notified in advance of any pricing changes.
                </p>
              </div>
            </section>

            <section id="disclaimers" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">08 /</span> Service Limitations & Disclaimers
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  DMPro is provided on an <strong>"as-is"</strong> and <strong>"as-available"</strong> basis. We make no warranties, express or implied, regarding the availability, reliability, or suitability of the service.
                </p>
                <p>
                  Specifically:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>We do not guarantee uninterrupted or error-free service.</li>
                  <li>We are not responsible for changes Meta makes to their APIs that affect platform functionality.</li>
                  <li>We are not liable for any damages arising from your use of DMPro.</li>
                  <li>We do not guarantee specific results, including follower growth or engagement metrics.</li>
                </ul>
              </div>
            </section>

            <section id="termination" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">09 /</span> Termination
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  We reserve the right to suspend or terminate accounts for violations of these Terms, Meta's policies, or applicable laws.
                </p>
                <p>
                  Users can disconnect their Instagram account at any time via their dashboard settings or through Meta's App settings page. Upon termination, your Meta access tokens will be revoked and your account data will be deleted in accordance with our Privacy Policy.
                </p>
              </div>
            </section>

            <section id="changes" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">10 /</span> Changes to Terms
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  We may update these Terms of Service from time to time. Changes will be posted on this page with an updated "Last Updated" date.
                </p>
                <p>
                  <strong>Continued use of DMPro after changes constitutes acceptance</strong> of the revised terms. We encourage you to review these terms periodically.
                </p>
                <p>
                  Material changes will be communicated via email or through platform notifications.
                </p>
              </div>
            </section>

            <section id="governing-law" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">11 /</span> Governing Law
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  These terms are governed by the laws of <strong>India</strong>. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.
                </p>
              </div>
            </section>

            <section id="contact" className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
                <span className="text-xs font-mono text-primary">12 /</span> Contact
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  Questions about these Terms? Contact us:
                </p>
                <div className="flex items-center gap-3 border border-white/[0.06] bg-white/[0.01] px-5 py-4 w-full sm:w-fit">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500">DMPro Support</p>
                    <a href="mailto:support@dmpro.in" className="text-white hover:text-primary font-mono text-sm">
                      support@dmpro.in
                    </a>
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
