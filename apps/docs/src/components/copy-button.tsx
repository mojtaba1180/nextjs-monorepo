"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

interface CopyButtonProps {
  value: string
  className?: string
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className={cn(
        "absolute top-2 right-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
        className
      )}
      title={copied ? "Copied!" : "Copy code"}
    >
      {copied ? "✓" : "📋"}
    </button>
  )
}
