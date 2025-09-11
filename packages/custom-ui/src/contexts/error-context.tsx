"use client"

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react'
import { FieldError, AppError, ErrorContextType } from '../types/error'

// Error state type
interface ErrorState {
  fieldErrors: Record<string, FieldError[]>
  appErrors: AppError[]
}

// Error actions
type ErrorAction =
  | { type: 'ADD_FIELD_ERROR'; payload: { field: string; error: FieldError } }
  | { type: 'REMOVE_FIELD_ERROR'; payload: { field: string; errorId: string } }
  | { type: 'CLEAR_FIELD_ERRORS'; payload: { field: string } }
  | { type: 'CLEAR_ALL_FIELD_ERRORS' }
  | { type: 'ADD_APP_ERROR'; payload: { error: AppError } }
  | { type: 'REMOVE_APP_ERROR'; payload: { errorId: string } }
  | { type: 'CLEAR_APP_ERRORS' }

// Error reducer
const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case 'ADD_FIELD_ERROR': {
      const { field, error } = action.payload
      const existingErrors = state.fieldErrors[field] || []
      return {
        ...state,
        fieldErrors: {
          ...state.fieldErrors,
          [field]: [...existingErrors, error]
        }
      }
    }

    case 'REMOVE_FIELD_ERROR': {
      const { field, errorId } = action.payload
      const existingErrors = state.fieldErrors[field] || []
      return {
        ...state,
        fieldErrors: {
          ...state.fieldErrors,
          [field]: existingErrors.filter(error => error.id !== errorId)
        }
      }
    }

    case 'CLEAR_FIELD_ERRORS': {
      const { field } = action.payload
      const newFieldErrors = { ...state.fieldErrors }
      delete newFieldErrors[field]
      return {
        ...state,
        fieldErrors: newFieldErrors
      }
    }

    case 'CLEAR_ALL_FIELD_ERRORS':
      return {
        ...state,
        fieldErrors: {}
      }

    case 'ADD_APP_ERROR': {
      const { error } = action.payload
      return {
        ...state,
        appErrors: [...state.appErrors, error]
      }
    }

    case 'REMOVE_APP_ERROR': {
      const { errorId } = action.payload
      return {
        ...state,
        appErrors: state.appErrors.filter(error => error.id !== errorId)
      }
    }

    case 'CLEAR_APP_ERRORS':
      return {
        ...state,
        appErrors: []
      }

    default:
      return state
  }
}

// Create context
const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

// Error Provider Props
interface ErrorProviderProps {
  children: ReactNode
}

// Error Provider Component
export function ErrorProvider({ children }: ErrorProviderProps) {
  const [state, dispatch] = useReducer(errorReducer, {
    fieldErrors: {},
    appErrors: []
  })

  // Generate unique ID
  const generateId = useCallback(() => {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }, [])

  // Field error methods
  const addFieldError = useCallback((field: string, error: Omit<FieldError, 'id' | 'timestamp'>) => {
    const newError: FieldError = {
      ...error,
      id: generateId(),
      timestamp: Date.now()
    }
    dispatch({ type: 'ADD_FIELD_ERROR', payload: { field, error: newError } })
  }, [generateId])

  const removeFieldError = useCallback((field: string, errorId: string) => {
    dispatch({ type: 'REMOVE_FIELD_ERROR', payload: { field, errorId } })
  }, [])

  const clearFieldErrors = useCallback((field: string) => {
    dispatch({ type: 'CLEAR_FIELD_ERRORS', payload: { field } })
  }, [])

  const clearAllFieldErrors = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_FIELD_ERRORS' })
  }, [])

  // App error methods
  const addAppError = useCallback((error: Omit<AppError, 'id' | 'timestamp'>) => {
    const newError: AppError = {
      ...error,
      id: generateId(),
      timestamp: Date.now()
    }
    dispatch({ type: 'ADD_APP_ERROR', payload: { error: newError } })
  }, [generateId])

  const removeAppError = useCallback((errorId: string) => {
    dispatch({ type: 'REMOVE_APP_ERROR', payload: { errorId } })
  }, [])

  const clearAppErrors = useCallback(() => {
    dispatch({ type: 'CLEAR_APP_ERRORS' })
  }, [])

  // Computed values
  const hasErrors = Object.keys(state.fieldErrors).length > 0 || state.appErrors.length > 0

  const hasFieldErrors = useCallback((field: string) => {
    return (state.fieldErrors[field] || []).length > 0
  }, [state.fieldErrors])

  const getFieldErrors = useCallback((field: string) => {
    return state.fieldErrors[field] || []
  }, [state.fieldErrors])

  const getAppErrors = useCallback(() => {
    return state.appErrors
  }, [state.appErrors])

  const contextValue: ErrorContextType = {
    fieldErrors: state.fieldErrors,
    addFieldError,
    removeFieldError,
    clearFieldErrors,
    clearAllFieldErrors,
    appErrors: state.appErrors,
    addAppError,
    removeAppError,
    clearAppErrors,
    hasErrors,
    hasFieldErrors,
    getFieldErrors,
    getAppErrors
  }

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  )
}

// Hook to use error context
export function useError(): ErrorContextType {
  const context = useContext(ErrorContext)
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}

// Hook for field-specific errors
export function useFieldError(field: string) {
  const { getFieldErrors, removeFieldError, clearFieldErrors, hasFieldErrors } = useError()
  
  return {
    errors: getFieldErrors(field),
    hasErrors: hasFieldErrors(field),
    removeError: (errorId: string) => removeFieldError(field, errorId),
    clearErrors: () => clearFieldErrors(field)
  }
}

// Hook for app errors
export function useAppError() {
  const { appErrors, addAppError, removeAppError, clearAppErrors } = useError()
  
  return {
    errors: appErrors,
    addError: addAppError,
    removeError: removeAppError,
    clearErrors: clearAppErrors
  }
}
