"use client"

import * as React from "react"

import { useConfig } from "@/hooks/use-config"
import { Tabs } from "fumadocs-ui/components/tabs"

export function CodeTabs({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useConfig()

  const installationType = React.useMemo(() => {
    return config.installationType || "cli"
  }, [config])

  return (
    <Tabs
      defaultValue={installationType}
      className="relative mt-6 w-full"
    >
      {children}
    </Tabs>
  )
}
