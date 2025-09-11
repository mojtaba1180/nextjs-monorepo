"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { 
  ModalProvider, 
  ModalManager,
  ErrorProvider,
  ToastProvider,
  ToastContainer
} from "@workspace/custom-ui"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <ErrorProvider>
        <ToastProvider>
          <ModalProvider>
            {children}
            <ModalManager />
            <ToastContainer position="top-right" />
          </ModalProvider>
        </ToastProvider>
      </ErrorProvider>
    </NextThemesProvider>
  )
}
