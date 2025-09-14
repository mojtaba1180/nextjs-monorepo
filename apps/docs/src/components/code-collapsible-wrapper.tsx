"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

interface CodeCollapsibleWrapperProps {
  className?: string
  children: React.ReactNode
}

export function CodeCollapsibleWrapper({ className, children }: CodeCollapsibleWrapperProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(true)

  return (
    <div className={cn("not-prose my-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? "Show code" : "Hide code"}
        </button>
      </div>
      
      {!isCollapsed && children}
    </div>
  )
}
