"use client"

import React from 'react'
import { X, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'
import { FieldError } from '../../types/error'

interface FieldErrorDisplayProps {
  error: FieldError
  onDismiss?: (errorId: string) => void
  dismissible?: boolean
  className?: string
  showIcon?: boolean
}

export function FieldErrorDisplay({
  error,
  onDismiss,
  dismissible = true,
  className,
  showIcon = true
}: FieldErrorDisplayProps) {
  const getIcon = () => {
    switch (error.type) {
      case 'validation':
        return <AlertCircle className="h-4 w-4" />
      case 'server':
        return <AlertTriangle className="h-4 w-4" />
      case 'custom':
        return <Info className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getIconColor = () => {
    switch (error.type) {
      case 'validation':
        return 'text-red-500'
      case 'server':
        return 'text-orange-500'
      case 'custom':
        return 'text-blue-500'
      default:
        return 'text-red-500'
    }
  }

  const handleDismiss = () => {
    if (onDismiss && dismissible) {
      onDismiss(error.id)
    }
  }

  return (
    <div
      className={cn(
        "flex items-start gap-2 p-2 rounded-md text-sm",
        "bg-red-50 border border-red-200 text-red-700",
        className
      )}
    >
      {showIcon && (
        <div className={cn("flex-shrink-0 mt-0.5", getIconColor())}>
          {getIcon()}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{error.message}</p>
        {error.timestamp && (
          <p className="text-xs text-red-500 mt-1">
            {new Date(error.timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
      
      {dismissible && onDismiss && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-red-100 rounded-full transition-colors"
          aria-label="Dismiss error"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}
