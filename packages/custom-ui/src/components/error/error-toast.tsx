"use client"

import React, { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title?: string
  message: string
  duration?: number
  dismissible?: boolean
  timestamp?: number
}

interface ErrorToastProps {
  toast: Toast
  onDismiss: (id: string) => void
  className?: string
}

export function ErrorToast({ toast, onDismiss, className }: ErrorToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto dismiss
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.duration])

  const handleDismiss = () => {
    setIsLeaving(true)
    setTimeout(() => {
      onDismiss(toast.id)
    }, 300)
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />
      case 'error':
        return <AlertCircle className="h-5 w-5" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />
      case 'info':
        return <Info className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          container: "bg-green-50 border-green-200 text-green-800",
          icon: "text-green-500",
          button: "hover:bg-green-100"
        }
      case 'error':
        return {
          container: "bg-red-50 border-red-200 text-red-800",
          icon: "text-red-500",
          button: "hover:bg-red-100"
        }
      case 'warning':
        return {
          container: "bg-yellow-50 border-yellow-200 text-yellow-800",
          icon: "text-yellow-500",
          button: "hover:bg-yellow-100"
        }
      case 'info':
        return {
          container: "bg-blue-50 border-blue-200 text-blue-800",
          icon: "text-blue-500",
          button: "hover:bg-blue-100"
        }
      default:
        return {
          container: "bg-gray-50 border-gray-200 text-gray-800",
          icon: "text-gray-500",
          button: "hover:bg-gray-100"
        }
    }
  }

  const styles = getStyles()

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg",
        "transition-all duration-300 ease-in-out",
        "transform",
        isVisible && !isLeaving ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        styles.container,
        className
      )}
    >
      <div className={cn("flex-shrink-0 mt-0.5", styles.icon)}>
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        {toast.title && (
          <h4 className="text-sm font-semibold mb-1">{toast.title}</h4>
        )}
        <p className="text-sm">{toast.message}</p>
        {toast.timestamp && (
          <p className="text-xs opacity-75 mt-1">
            {new Date(toast.timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
      
      {toast.dismissible !== false && (
        <button
          onClick={handleDismiss}
          className={cn(
            "flex-shrink-0 p-1 rounded-full transition-colors",
            styles.button
          )}
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
