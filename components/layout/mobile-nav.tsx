"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { useState } from "react"

export interface MobileNavProps {
    username?: string
    avatarUrl?: string | null
    onLogout?: () => void
}

export function MobileNav({ username, avatarUrl, onLogout }: MobileNavProps) {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-foreground/70 hover:text-foreground hover:bg-black/5">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r border-sidebar-border bg-sidebar/90 backdrop-blur-2xl w-60">
                <Sidebar
                    className="h-full border-none bg-transparent w-full"
                    username={username}
                    avatarUrl={avatarUrl}
                    onLogout={onLogout}
                    onNavigate={() => setOpen(false)}
                />
            </SheetContent>
        </Sheet>
    )
}
