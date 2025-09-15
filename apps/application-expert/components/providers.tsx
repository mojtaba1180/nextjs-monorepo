"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { FrameworkProvider } from "@workspace/framework"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FrameworkProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </FrameworkProvider>
  )
}
