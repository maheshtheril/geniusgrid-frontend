"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

// Pass through all ThemeProviderProps
export function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />
}
