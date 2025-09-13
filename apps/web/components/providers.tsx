"use client"

import * as React from "react"
import { CustomUIProvider } from "@workspace/custom-ui"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CustomUIProvider
      themeConfig={{
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        disableTransitionOnChange: true,
        enableColorScheme: true
      }}
      toastConfig={{
        position: "top-right"
      }}
    >
      {children}
    </CustomUIProvider>
  )
}
