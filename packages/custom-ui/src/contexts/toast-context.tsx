"use client"

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react'
import { Toast, ToastType } from '../components/error/error-toast'

interface ToastState {
  toasts: Toast[]
}

type ToastAction =
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }
  | { type: 'CLEAR_TOASTS' }

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      }
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      }
    case 'CLEAR_TOASTS':
      return {
        ...state,
        toasts: []
      }
    default:
      return state
  }
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id' | 'timestamp'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
  success: (message: string, title?: string) => void
  error: (message: string, title?: string) => void
  warning: (message: string, title?: string) => void
  info: (message: string, title?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] })

  const generateId = useCallback(() => {
    return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }, [])

  const addToast = useCallback((toast: Omit<Toast, 'id' | 'timestamp'>) => {
    const newToast: Toast = {
      ...toast,
      id: generateId(),
      timestamp: Date.now()
    }
    dispatch({ type: 'ADD_TOAST', payload: newToast })
  }, [generateId])

  const removeToast = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id })
  }, [])

  const clearToasts = useCallback(() => {
    dispatch({ type: 'CLEAR_TOASTS' })
  }, [])

  const success = useCallback((message: string, title?: string) => {
    addToast({
      type: 'success',
      message,
      title,
      duration: 5000
    })
  }, [addToast])

  const error = useCallback((message: string, title?: string) => {
    addToast({
      type: 'error',
      message,
      title,
      duration: 7000
    })
  }, [addToast])

  const warning = useCallback((message: string, title?: string) => {
    addToast({
      type: 'warning',
      message,
      title,
      duration: 6000
    })
  }, [addToast])

  const info = useCallback((message: string, title?: string) => {
    addToast({
      type: 'info',
      message,
      title,
      duration: 5000
    })
  }, [addToast])

  const contextValue: ToastContextType = {
    toasts: state.toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
