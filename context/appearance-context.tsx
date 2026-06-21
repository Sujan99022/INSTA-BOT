"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export const ACCENT_COLORS = [
  { hex: "#e3ee42", name: "Neon Yellow", fg: "#1b1d00" },
  { hex: "#82cfff", name: "Sky Blue", fg: "#00344b" },
  { hex: "#b89cff", name: "Electric Purple", fg: "#211047" },
  { hex: "#ffaa42", name: "Sunset Orange", fg: "#4a2100" },
  { hex: "#e0e2ec", name: "Muted Silver", fg: "#1b1b1f" }
]

export interface AppearancePrefs {
  accent: string
  density: string
  animate: boolean
}

const defaultPrefs: AppearancePrefs = {
  accent: "#e3ee42",
  density: "comfortable",
  animate: true
}

interface AppearanceContextType {
  appearance: AppearancePrefs
  updateAppearance: (updates: Partial<AppearancePrefs>) => void
  ACCENT_COLORS: typeof ACCENT_COLORS
}

const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined)

export const applyAppearanceProperties = (prefs: AppearancePrefs) => {
  if (typeof window === "undefined") return
  const root = document.documentElement
  
  // Find active color config
  const activeColor = ACCENT_COLORS.find(c => c.hex === prefs.accent) || ACCENT_COLORS[0]
  
  // Apply accent colors dynamically
  root.style.setProperty("--primary", activeColor.hex)
  root.style.setProperty("--primary-foreground", activeColor.fg)
  root.style.setProperty("--ring", activeColor.hex)

  // Apply sidebar density class
  if (prefs.density === "compact") {
    root.classList.add("density-compact")
  } else {
    root.classList.remove("density-compact")
  }

  // Apply transition blocker class
  if (!prefs.animate) {
    root.classList.add("animations-disabled")
  } else {
    root.classList.remove("animations-disabled")
  }
}

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<AppearancePrefs>(defaultPrefs)

  // Load configuration from local storage on mount
  useEffect(() => {
    const savedAppearance = localStorage.getItem("dmpro_appearance")
    if (savedAppearance) {
      try {
        const parsed = JSON.parse(savedAppearance)
        const merged = { ...defaultPrefs, ...parsed }
        setAppearance(merged)
        applyAppearanceProperties(merged)
      } catch (e) {
        console.error("Failed to parse appearance storage settings:", e)
        applyAppearanceProperties(defaultPrefs)
      }
    } else {
      applyAppearanceProperties(defaultPrefs)
    }
  }, [])

  const updateAppearance = (updates: Partial<AppearancePrefs>) => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.add("theme-changing")
    }

    setAppearance((current) => {
      const updated = { ...current, ...updates }
      localStorage.setItem("dmpro_appearance", JSON.stringify(updated))
      applyAppearanceProperties(updated)
      return updated
    })

    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.remove("theme-changing")
        })
      })
    }
  }

  return (
    <AppearanceContext.Provider value={{ appearance, updateAppearance, ACCENT_COLORS }}>
      {children}
    </AppearanceContext.Provider>
  )
}

export function useAppearance() {
  const context = useContext(AppearanceContext)
  if (context === undefined) {
    throw new Error("useAppearance must be used within an AppearanceProvider")
  }
  return context
}
