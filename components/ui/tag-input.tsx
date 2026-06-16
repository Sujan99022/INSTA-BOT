"use client"

import { useState, KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface TagInputProps {
    value: string[] // Array of tags
    onChange: (tags: string[]) => void
    placeholder?: string
    className?: string
}

export function TagInput({ value, onChange, placeholder, className }: TagInputProps) {
    const [inputValue, setInputValue] = useState("")

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            addTag()
        } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
            // Remove last tag on backspace if input is empty
            removeTag(value.length - 1)
        }
    }

    const addTag = () => {
        const trimmed = inputValue.trim().toLowerCase()
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed])
            setInputValue("")
        }
    }

    const removeTag = (index: number) => {
        onChange(value.filter((_, i) => i !== index))
    }

    return (
        <div className={`flex flex-wrap gap-2 p-2.5 rounded-2xl border border-border bg-input hover:border-muted-foreground/30 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-200 ${className}`}>
            {value.map((tag, index) => (
                <Badge
                    key={index}
                    variant="secondary"
                    className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 pl-2.5 pr-1 py-1 text-xs font-semibold gap-1.5 rounded-xl shadow-xs"
                >
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="hover:bg-primary/20 rounded-md p-0.5 transition-colors text-primary/70 hover:text-primary"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </Badge>
            ))}
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={addTag}
                placeholder={value.length === 0 ? placeholder : ""}
                className="flex-1 min-w-[120px] border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm px-1 text-foreground"
            />
        </div>
    )
}
