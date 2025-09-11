"use client"

import React from 'react'
import { X, AlertCircle, AlertTriangle, WifiOff, Shield, Server } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'
import { AppError } from '../../types/error'

interface AppErrorDisplayProps {
  error: AppError
  onDismiss?: (errorId: string) => void
  dismissible?: boolean
  className?: string
  showIcon?: boolean
}

export function AppErrorDisplay({
  error,
  onDismiss,
  dismissible = true,
  className,
  showIcon = true
}: AppErrorDisplayProps) {
  const getIcon = () => {
    switch (error.type) {
      case 'network':
        return <WifiOff className="h-5 w-5" />
      case 'server':
        return <Server className="h-5 w-5" />
      case 'auth':
        return <Shield className="h-5 w-5" />
      case 'permission':
        return <AlertTriangle className="h-5 w-5" />
      case 'custom':
        return <AlertCircle className="h-5 w-5" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  const getStyles = () => {
    switch (error.type) {
      case 'network':
        return {
          container: "bg-orange-50 border-orange-200 text-orange-800",
          icon: "text-orange-500",
          button: "hover:bg-orange-100"
        }
      case 'server':
        return {
          container: "bg-red-50 border-red-200 text-red-800",
          icon: "text-red-500",
          button: "hover:bg-red-100"
        }
      case 'auth':
        return {
          container: "bg-yellow-50 border-yellow-200 text-yellow-800",
          icon: "text-yellow-500",
          button: "hover:bg-yellow-100"
        }
      case 'permission':
        return {
          container: "bg-purple-50 border-purple-200 text-purple-800",
          icon: "text-purple-500",
          button: "hover:bg-purple-100"
        }
      case 'custom':
        return {
          container: "bg-blue-50 border-blue-200 text-blue-800",
          icon: "text-blue-500",
          button: "hover:bg-blue-100"
        }
      default:
        return {
          container: "bg-red-50 border-red-200 text-red-800",
          icon: "text-red-500",
          button: "hover:bg-red-100"
        }
    }
  }

  const handleDismiss = () => {
    if (onDismiss && dismissible) {
      onDismiss(error.id)
    }
  }

  const styles = getStyles()

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border",
        "shadow-sm transition-all duration-200",
        styles.container,
        className
      )}
    >
      {showIcon && (
        <div className={cn("flex-shrink-0 mt-0.5", styles.icon)}>
          {getIcon()}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold capitalize">
            {error.type} Error
          </h4>
          {error.timestamp && (
            <span className="text-xs opacity-75">
              {new Date(error.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
        
        <p className="text-sm mt-1">{error.message}</p>
        
        {error.details && (
          <details className="mt-2">
            <summary className="text-xs cursor-pointer opacity-75 hover:opacity-100">
              Show details
            </summary>
            <pre className="text-xs mt-1 p-2 bg-black/5 rounded overflow-auto">
              {JSON.stringify(error.details, null, 2)}
            </pre>
          </details>
        )}
      </div>
      
      {dismissible && onDismiss && (
        <button
          onClick={handleDismiss}
          className={cn(
            "flex-shrink-0 p-1 rounded-full transition-colors",
            styles.button
          )}
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
