"use client"

import { ContentPool } from "@/components/dashboard/ContentPool"
import { SchedulerSettings } from "@/components/dashboard/SchedulerSettings"
import { useInstagramSession } from "@/hooks/use-instagram-session"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { Loader } from "@/components/ui/loader"

export default function PublisherPage() {
    const { userId, isLoading } = useInstagramSession()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader size="md" />
            </div>
        )
    }

    if (!userId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
                <h2 className="text-xl font-semibold text-foreground mb-2">Login Required</h2>
                <p className="text-muted-foreground text-sm">Please connect your Instagram account to access this feature.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-20 p-4 md:p-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-xl md:text-2xl font-bold gradient-text w-fit flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Reels Publisher
                </h1>
                <p className="text-muted-foreground text-xs">
                    Upload content and schedule automated rotation for consistent engagement.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 space-y-5">
                    <ContentPool userId={userId} />
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-5">
                        <SchedulerSettings userId={userId} />

                        <Card className="glass-card p-5 border border-[#1e252d] rounded-sm bg-gradient-to-b from-[#161c22] to-[#101418]">
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-wider text-[#e3ee42] flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Automation Tips
                                </h3>
                                <div className="space-y-2.5 text-[11px] text-muted-foreground">
                                    <p>• <strong className="text-white">Consistency is Key:</strong> Set a comfortable interval like 4-6 hours to keep your feed active.</p>
                                    <p>• <strong className="text-white">Mix it Up:</strong> Add at least 5-10 clips to avoid repetitive content.</p>
                                    <p>• <strong className="text-white">Monitor:</strong> Check your Instagram insights to see which time windows perform best and adjust your schedule.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
