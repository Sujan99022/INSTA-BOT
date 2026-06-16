"use client"

import { Settings, Sparkles, User, Bell, Shield, Palette } from "lucide-react"

const settingsSections = [
    {
        icon: <User className="w-4 h-4" />,
        title: "Profile",
        description: "Manage your account details and Instagram connection.",
        coming: false,
    },
    {
        icon: <Bell className="w-4 h-4" />,
        title: "Notifications",
        description: "Configure email and in-app notification preferences.",
        coming: true,
    },
    {
        icon: <Shield className="w-4 h-4" />,
        title: "Privacy & Security",
        description: "Manage permissions, data retention, and security settings.",
        coming: true,
    },
    {
        icon: <Palette className="w-4 h-4" />,
        title: "Appearance",
        description: "Customize the look and feel of your dashboard.",
        coming: true,
    },
]

export default function SettingsPage() {
    return (
        <div className="p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                        <Settings className="w-5 h-5 text-primary" />
                        Settings
                    </h1>
                    <p className="text-muted-foreground text-xs mt-0.5">
                        Manage your account and application preferences.
                    </p>
                </div>

                <div className="space-y-3">
                    {settingsSections.map((section) => (
                        <div
                            key={section.title}
                            className="glass-card hover-lift p-5 border border-white/20 group cursor-pointer"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-primary shrink-0 border border-primary/5">
                                    {section.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm text-foreground">{section.title}</h3>
                                        {section.coming && (
                                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/5 text-muted-foreground/85 border border-black/5">
                                                Soon
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="glass-card p-5 border border-white/20 bg-gradient-to-r from-primary/5 to-accent/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-none bg-primary/10 flex items-center justify-center border border-primary/25">
                            <img src="/logo.png" alt="DMPRO.in Logo" className="w-6 h-6 object-contain" />
                        </div>
                        <div>
                            <h3 className="font-poppins font-semibold text-sm text-foreground">DMPRO.in Pro</h3>
                            <p className="text-xs text-muted-foreground">You&apos;re on the free plan. Upgrade for advanced features.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
