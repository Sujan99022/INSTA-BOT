"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Plus, Trash2, Upload, Film, Link as LinkIcon, CheckCircle, FileJson, Instagram } from "lucide-react"
import { Loader } from "@/components/ui/loader"
import { toast } from "sonner"

// Initialize Authenticated Supabase Client
const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface ContentItem {
    id: string
    video_url: string
    caption: string
    sequence_index: number
    is_active: boolean
    cover_url?: string
}

interface ExternalMedia {
    id: string
    media_url: string
    caption: string
    thumbnail_url?: string
    media_type?: string
}

interface ContentPoolProps {
    userId: string
}

export function ContentPool({ userId }: ContentPoolProps) {
    const [items, setItems] = useState<ContentItem[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)

    // New Item State
    const [caption, setCaption] = useState("")
    const [files, setFiles] = useState<File[]>([])

    const [manualUrl, setManualUrl] = useState("")
    const [jsonInput, setJsonInput] = useState("")
    const [inputType, setInputType] = useState<"file" | "url" | "instagram" | "json">("file")
    const [isAdding, setIsAdding] = useState(false)
    const [progress, setProgress] = useState("")

    // Instagram Import State
    const [igMedia, setIgMedia] = useState<ExternalMedia[]>([])
    const [selectedIgMedia, setSelectedIgMedia] = useState<string[]>([])
    const [loadingIg, setLoadingIg] = useState(false)

    useEffect(() => {
        if (userId) loadPool()
    }, [userId])

    const loadPool = async () => {
        try {
            setLoading(true)
            const res = await fetch(`/api/scheduler/pool?userId=${userId}`)
            if (res.ok) {
                const data = await res.json()
                setItems(data)
            }
        } catch (err) {
            toast.error("Failed to load content pool")
        } finally {
            setLoading(false)
        }
    }

    const loadInstagramMedia = async () => {
        try {
            setLoadingIg(true)
            const res = await fetch(`/api/instagram/media?userId=${userId}`)
            if (res.ok) {
                const data = await res.json()
                const allImport = data.data || []
                const onlyReels = allImport.filter((m: any) => m.media_type === "VIDEO" || m.media_type === "REELS")
                setIgMedia(onlyReels)
            } else {
                toast.error("Failed to fetch media")
            }
        } catch (err) {
            toast.error("Error loading Instagram media")
        } finally {
            setLoadingIg(false)
        }
    }

    const toggleIgSelection = (id: string) => {
        if (selectedIgMedia.includes(id)) {
            setSelectedIgMedia(prev => prev.filter(x => x !== id))
        } else {
            setSelectedIgMedia(prev => [...prev, id])
        }
    }

    const selectAllMedia = () => {
        if (selectedIgMedia.length === igMedia.length) {
            setSelectedIgMedia([])
        } else {
            setSelectedIgMedia(igMedia.map(m => m.id))
        }
    }

    const handleUpload = async () => {
        setUploading(true)
        setProgress("")

        try {
            if (inputType === "json") {
                let parsed: any[] = []
                try {
                    parsed = JSON.parse(jsonInput)
                    if (!Array.isArray(parsed)) throw new Error("Root must be array")
                } catch (e) {
                    return toast.error("Invalid JSON format")
                }

                let successCount = 0
                for (let i = 0; i < parsed.length; i++) {
                    const item = parsed[i]
                    if (!item.video_url) continue
                    setProgress(`Importing ${i + 1}/${parsed.length}...`)

                    const res = await fetch('/api/scheduler/import-instagram', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId, videoUrl: item.video_url, caption: item.caption || caption })
                    })
                    if (res.ok) successCount++
                }
                toast.success(`Imported ${successCount} items from JSON`)
            }

            else if (inputType === "instagram") {
                const toImport = igMedia.filter(m => selectedIgMedia.includes(m.id))

                for (let i = 0; i < toImport.length; i++) {
                    const item = toImport[i]
                    let finalVideoUrl = item.media_url || item.thumbnail_url
                    const finalCoverUrl = item.thumbnail_url || item.media_url

                    setProgress(`Importing ${i + 1}/${toImport.length}...`)
                    const res = await fetch('/api/scheduler/import-instagram', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId,
                            videoUrl: finalVideoUrl,
                            caption: caption || item.caption,
                            coverUrl: finalCoverUrl
                        })
                    })
                }
                toast.success(`Import complete!`)
                setSelectedIgMedia([])
            }

            else if (inputType === "url") {
                if (!manualUrl) return toast.error("Enter URL")
                const res = await fetch('/api/scheduler/import-instagram', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, videoUrl: manualUrl, caption })
                })
                if (res.ok) {
                    toast.success("URL imported successfully")
                    setManualUrl("")
                } else {
                    toast.error("Import failed")
                }
            }

            else if (inputType === "file") {
                if (files.length === 0) return toast.error("No files selected")

                for (let i = 0; i < files.length; i++) {
                    const file = files[i]
                    setProgress(`Uploading ${i + 1}/${files.length}...`)

                    const fileExt = file.name.split('.').pop()
                    const fileName = `${userId}/${Date.now()}-${i}.${fileExt}`

                    const { error: uploadError } = await supabase.storage
                        .from('reels')
                        .upload(fileName, file)

                    if (uploadError) throw uploadError

                    const { data: { publicUrl } } = supabase.storage
                        .from('reels')
                        .getPublicUrl(fileName)

                    const finalCaption = caption || file.name.replace(/\.[^/.]+$/, "")

                    const res = await fetch('/api/scheduler/pool', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId,
                            video_url: publicUrl,
                            caption: finalCaption
                        })
                    })

                    if (!res.ok) throw new Error("Db Error")
                }
                toast.success(`Uploaded ${files.length} files`)
                setFiles([])
            }

            setManualUrl("")
            setJsonInput("")
            setCaption("")
            setIsAdding(false)
            loadPool()

        } catch (err: any) {
            toast.error("Process failed", { description: err.message })
        } finally {
            setUploading(false)
            setProgress("")
        }
    }

    const handleDelete = async (itemId: string) => {
        try {
            const res = await fetch(`/api/scheduler/pool?id=${itemId}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success("Clip removed")
                loadPool()
            }
        } catch (err) {
            toast.error("Failed to delete clip")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-foreground tracking-tight">Content Pool</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Manage and enqueue raw reels content for publishing.
                    </p>
                </div>
                <Button
                    onClick={() => setIsAdding(!isAdding)}
                    variant={isAdding ? "outline" : "default"}
                    className={`rounded-sm font-black uppercase text-xs tracking-wider transition-all active:scale-95 px-4 py-2 border-none cursor-pointer ${
                        isAdding
                            ? "bg-[#1a222a] border border-[#272a31] text-[#acb9ce] hover:bg-[#202933]"
                            : "bg-primary text-primary-foreground hover:brightness-110 shadow-[0_0_15px_rgba(227,238,66,0.15)]"
                    }`}
                >
                    {isAdding ? (
                        "Cancel"
                    ) : (
                        <>
                            <Plus className="w-4 h-4 mr-1.5" /> Add Clips
                        </>
                    )}
                </Button>
            </div>

            {isAdding && (
                <Card className="glass-card overflow-hidden border border-white/20 shadow-md">
                    <CardContent className="p-5 space-y-5">
                        <Tabs defaultValue="file" onValueChange={(v) => {
                            setInputType(v as any)
                            if (v === 'instagram') loadInstagramMedia()
                        }} className="w-full">
                            <TabsList className="grid w-full grid-cols-4 bg-[#0b0e15] p-1 rounded-sm border border-[#272a31] gap-1 h-auto">
                                <TabsTrigger value="file" className="rounded-sm py-2 text-[11px] font-bold transition-all data-[state=active]:bg-[#3d4a5b] data-[state=active]:text-[#acb9ce] data-[state=active]:border data-[state=active]:border-primary/30 text-[#c8c8ae] hover:text-[#e0e2ec] hover:bg-[#32353c]/35 cursor-pointer">Files</TabsTrigger>
                                <TabsTrigger value="instagram" className="rounded-sm py-2 text-[11px] font-bold transition-all data-[state=active]:bg-[#3d4a5b] data-[state=active]:text-[#acb9ce] data-[state=active]:border data-[state=active]:border-primary/30 text-[#c8c8ae] hover:text-[#e0e2ec] hover:bg-[#32353c]/35 cursor-pointer">My Reels</TabsTrigger>
                                <TabsTrigger value="url" className="rounded-sm py-2 text-[11px] font-bold transition-all data-[state=active]:bg-[#3d4a5b] data-[state=active]:text-[#acb9ce] data-[state=active]:border data-[state=active]:border-primary/30 text-[#c8c8ae] hover:text-[#e0e2ec] hover:bg-[#32353c]/35 cursor-pointer">Link</TabsTrigger>
                                <TabsTrigger value="json" className="rounded-sm py-2 text-[11px] font-bold transition-all data-[state=active]:bg-[#3d4a5b] data-[state=active]:text-[#acb9ce] data-[state=active]:border data-[state=active]:border-primary/30 text-[#c8c8ae] hover:text-[#e0e2ec] hover:bg-[#32353c]/35 cursor-pointer">JSON</TabsTrigger>
                            </TabsList>

                            {/* FILE UPLOAD */}
                            <TabsContent value="file" className="mt-4 outline-none">
                                <div className="border-2 border-dashed border-[#272a31] hover:border-primary/30 rounded-sm p-10 text-center bg-[#0b0e15] hover:bg-[#12161f]/50 transition-all duration-300 cursor-pointer relative group">
                                    <input
                                        type="file"
                                        multiple
                                        accept="video/mp4,video/quicktime"
                                        onChange={(e) => setFiles(Array.from(e.target.files || []))}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">
                                                {files.length > 0 ? `${files.length} files selected` : "Upload Reel Video"}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Drag & drop or click to browse MP4/MOV files
                                            </p>
                                        </div>
                                        {files.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1 justify-center max-h-[80px] overflow-y-auto z-20">
                                                {files.map((file, i) => (
                                                    <span key={i} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                                        {file.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* INSTAGRAM IMPORT */}
                            <TabsContent value="instagram" className="mt-4 outline-none">
                                {loadingIg ? (
                                    <div className="text-center py-12"><Loader size="md" /></div>
                                ) : (
                                    <MediaGrid media={igMedia} selected={selectedIgMedia} onToggle={toggleIgSelection} />
                                )}
                                <p className="text-xs text-muted-foreground mt-2 text-center font-medium">
                                    {selectedIgMedia.length} items selected
                                </p>
                            </TabsContent>

                            {/* URL LINK */}
                            <TabsContent value="url" className="mt-4 outline-none">
                                <div className="relative">
                                    <LinkIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="https://example.com/video.mp4"
                                        value={manualUrl}
                                        onChange={(e) => setManualUrl(e.target.value)}
                                        className="pl-10 glass-input w-full"
                                    />
                                </div>
                            </TabsContent>

                            {/* JSON IMPORT */}
                            <TabsContent value="json" className="mt-4 outline-none">
                                <Textarea
                                    placeholder='[ { "video_url": "...", "caption": "..." } ]'
                                    className="font-mono text-xs glass-textarea min-h-[150px] w-full"
                                    value={jsonInput}
                                    onChange={(e) => setJsonInput(e.target.value)}
                                />
                                <p className="text-[11px] text-muted-foreground mt-1.5 pl-1 leading-relaxed">
                                    Paste a JSON array of objects with <code className="bg-black/5 px-1 py-0.5 rounded text-foreground font-mono">video_url</code> and <code className="bg-black/5 px-1 py-0.5 rounded text-foreground font-mono">caption</code>.
                                </p>
                            </TabsContent>
                        </Tabs>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-muted-foreground/80 pl-1 uppercase tracking-wider">Shared Caption</label>
                            <Textarea
                                placeholder="Shared caption (optional). Overrides individual captions."
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                className="glass-textarea min-h-[90px] w-full"
                            />
                        </div>

                        <Button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="w-full bg-primary text-primary-foreground hover:brightness-110 py-6 rounded-sm font-black uppercase tracking-wider text-xs active:scale-[0.98] transition-transform shadow-[0_0_15px_rgba(227,238,66,0.15)] cursor-pointer border-none"
                        >
                            {uploading ? (
                                <>
                                    <Loader size="sm" className="mr-2" />
                                    {progress || "Processing..."}
                                </>
                            ) : (
                                "Start Import / Upload"
                            )}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {loading ? (
                <div className="text-center py-20">
                    <Loader size="lg" />
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-[#272a31] rounded-sm bg-[#191c23]/40">
                    <Film className="w-8 h-8 mx-auto text-muted-foreground/85 mb-3" />
                    <p className="text-sm font-semibold text-muted-foreground">No clips in the pool yet</p>
                    <p className="text-xs text-muted-foreground/75 mt-1">Click "Add Clips" to start building your queue.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((item, idx) => (
                        <div
                            key={item.id}
                            className="group relative glass-card overflow-hidden hover-lift border border-white/20 transition-all duration-300"
                        >
                            <div className="aspect-[9/16] bg-neutral-900 relative overflow-hidden">
                                <video
                                    src={item.video_url}
                                    poster={item.cover_url}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    muted
                                    playsInline
                                    loop
                                    onMouseOver={(e) => {
                                        try {
                                            (e.target as HTMLVideoElement).play().catch(() => {});
                                        } catch {}
                                    }}
                                    onMouseOut={(e) => {
                                        try {
                                            (e.target as HTMLVideoElement).pause();
                                        } catch {}
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                <Badge className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white border-none text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                    Queue #{item.sequence_index}
                                </Badge>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 pointer-events-none">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                                        <Film className="w-5 h-5 animate-pulse" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 space-y-3 bg-[#12161f] border-t border-[#1e252d]">
                                <p className="text-xs text-[#e0e2ec] font-semibold line-clamp-2 min-h-[32px] leading-relaxed">
                                    {item.caption || "No caption"}
                                </p>
                                <div className="flex justify-between items-center pt-2 border-t border-[#1e252d]">
                                    <span className="text-[10px] text-muted-foreground/80 font-bold uppercase tracking-wider">Active in Pool</span>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => handleDelete(item.id)}
                                        className="h-8 w-8 text-muted-foreground/60 hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

function MediaGrid({ media, selected, onToggle }: { media: ExternalMedia[], selected: string[], onToggle: (id: string) => void }) {
    if (media.length === 0) return <div className="text-center py-12 text-xs text-muted-foreground font-medium bg-black/5 rounded-2xl border border-black/5">No media found.</div>
    return (
        <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2">
            {media.map(item => {
                const isSelected = selected.includes(item.id)
                return (
                    <div
                        key={item.id}
                        onClick={() => onToggle(item.id)}
                        className={`
                            aspect-square relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300
                            ${isSelected ? 'border-primary shadow-sm shadow-primary/20 scale-[0.98]' : 'border-transparent hover:scale-102'}
                        `}
                    >
                        {item.media_type === "VIDEO" || item.media_type === "REELS" ? (
                            <video src={item.media_url} className="w-full h-full object-cover" />
                        ) : (
                            <img src={item.media_url || item.thumbnail_url} className="w-full h-full object-cover" />
                        )}
                        {isSelected && (
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-md">
                                    <CheckCircle className="w-5 h-5 fill-primary text-white border-none" />
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
