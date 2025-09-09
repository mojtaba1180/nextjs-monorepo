"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ModalProvider, ModalManager } from "@workspace/custom-ui"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <ModalProvider>
        {children}
        <ModalManager />
      </ModalProvider>
    </NextThemesProvider>
  )
}
