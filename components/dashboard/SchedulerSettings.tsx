"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, AlertTriangle } from "lucide-react"
import { Loader } from "@/components/ui/loader"
import { toast } from "sonner"

interface SchedulerSettingsProps {
    userId: string
}

export function SchedulerSettings({ userId }: SchedulerSettingsProps) {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [enabled, setEnabled] = useState(false)
    const [interval, setInterval] = useState("240") // minutes
    const [startTime, setStartTime] = useState("09:00")
    const [endTime, setEndTime] = useState("21:00")

    // Status info
    const [nextRun, setNextRun] = useState<string | null>(null)
    const [currentIndex, setCurrentIndex] = useState(1)

    useEffect(() => {
        if (userId) loadSettings()
    }, [userId])

    const loadSettings = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/scheduler/config?userId=${userId}`)
            if (res.ok) {
                const data = await res.json()
                if (data) {
                    setEnabled(data.is_running)
                    setInterval(data.interval_minutes.toString())
                    setStartTime(data.start_time || "09:00")
                    setEndTime(data.end_time || "21:00")
                    setNextRun(data.next_run_at)
                    setCurrentIndex(data.current_sequence_index)
                }
            }
        } catch (err) {
            // ignore error if no config exists yet
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setSaving(true)
            const res = await fetch('/api/scheduler/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    is_running: enabled,
                    interval_minutes: parseInt(interval),
                    start_time: startTime,
                    end_time: endTime
                })
            })

            if (res.ok) {
                toast.success("Scheduler settings saved")
                loadSettings() // reload to get calculated next_run
            } else {
                toast.error("Failed to save settings")
            }
        } catch (err) {
            toast.error("Network error")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-4"><Loader size="md" /></div>

    return (
        <div className="space-y-6 glass-card p-6 border border-white/20">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" /> Scheduler Timing
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                        Define automated posting intervals and time window.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Label htmlFor="scheduler-toggle" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        {enabled ? "Active" : "Paused"}
                    </Label>
                    <Switch
                        id="scheduler-toggle"
                        checked={enabled}
                        onCheckedChange={setEnabled}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-black/5 pt-5">
                <div className="space-y-2">
                    <Label className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider block ml-1">Posting Frequency</Label>
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            value={parseInt(interval) / 60}
                            onChange={(e) => setInterval((parseFloat(e.target.value) * 60).toString())}
                            className="glass-input w-24 shrink-0"
                            min="0.5"
                            step="0.5"
                        />
                        <div className="flex items-center text-muted-foreground text-xs font-semibold">Hours between posts</div>
                    </div>
                    <p className="text-[9px] text-muted-foreground ml-1">
                        (Interval of {interval} minutes)
                    </p>
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider block ml-1">Daily Active Window</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="glass-input"
                        />
                        <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">to</span>
                        <Input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="glass-input"
                        />
                    </div>
                    <p className="text-[9px] text-muted-foreground ml-1">
                        Posts will only publish during this time window.
                    </p>
                </div>
            </div>

            {nextRun && (
                <div className="bg-[#12161f] border border-[#272a31] rounded-sm p-4.5 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                        <p className="text-xs text-[#acb9ce] font-bold leading-tight">
                            Next scheduled post: {new Date(nextRun).toLocaleString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground/85 font-bold uppercase tracking-wider mt-1">
                            Next Clip Index: #{currentIndex}
                        </p>
                    </div>
                </div>
            )}

            <div className="pt-4.5 border-t border-black/5 flex justify-end">
                <Button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground hover:brightness-110 font-black text-xs px-5 py-2 h-10 rounded-sm active:scale-95 transition-transform shadow-[0_0_15px_rgba(227,238,66,0.15)] cursor-pointer border-none">
                    {saving ? <Loader size="sm" className="mr-2" /> : "Save Settings"}
                </Button>
            </div>

            <div className="bg-[#191c23]/40 border border-dashed border-[#272a31] rounded-sm p-4 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-muted-foreground leading-normal font-medium">
                    Note: Reel rotation requires the application background queue runner to trigger. Ensure your cron hook or dashboard hits <code>/api/scheduler</code> periodically.
                </p>
            </div>
        </div>
    )
}
