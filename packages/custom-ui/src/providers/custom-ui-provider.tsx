"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { 
  ModalProvider, 
  ErrorProvider,
  ToastProvider
} from "../contexts"
import { ModalManager } from "../components/modal"
import { ToastContainer } from "../components/error"

export interface CustomUIProviderProps {
  children: React.ReactNode
  themeConfig?: {
    attribute?: "class" | "data-theme" | "data-mode"
    defaultTheme?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
    enableColorScheme?: boolean
  }
  toastConfig?: {
    position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
  }
}

export function CustomUIProvider({ 
  children, 
  themeConfig = {},
  toastConfig = {}
}: CustomUIProviderProps) {
  const {
    attribute = "class",
    defaultTheme = "system",
    enableSystem = true,
    disableTransitionOnChange = true,
    enableColorScheme = true
  } = themeConfig

  const {
    position = "top-right"
  } = toastConfig

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      enableColorScheme={enableColorScheme}
    >
      <ErrorProvider>
        <ToastProvider>
          <ModalProvider>
            {children}
            <ModalManager />
            <ToastContainer position={position} />
          </ModalProvider>
        </ToastProvider>
      </ErrorProvider>
    </NextThemesProvider>
  )
}
