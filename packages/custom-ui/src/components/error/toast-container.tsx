"use client"

import React from 'react'
import { useToast } from '../../contexts/toast-context'
import { ErrorToast } from './error-toast'

interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxToasts?: number
  className?: string
}

export function ToastContainer({ 
  position = 'top-right', 
  maxToasts = 5,
  className 
}: ToastContainerProps) {
  const { toasts, removeToast } = useToast()

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4'
      case 'top-left':
        return 'top-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2'
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2'
      default:
        return 'top-4 right-4'
    }
  }

  // Limit number of toasts
  const visibleToasts = toasts.slice(-maxToasts)

  if (visibleToasts.length === 0) {
    return null
  }

  return (
    <div
      className={`
        fixed z-50 flex flex-col gap-2 w-80 max-w-sm
        ${getPositionClasses()}
        ${className || ''}
      `}
    >
      {visibleToasts.map((toast) => (
        <ErrorToast
          key={toast.id}
          toast={toast}
          onDismiss={removeToast}
        />
      ))}
    </div>
  )
}
