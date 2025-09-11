// Global error management types

export interface FieldError {
  id: string
  field: string
  message: string
  type: 'validation' | 'server' | 'custom'
  dismissible?: boolean
  timestamp?: number
}

export interface AppError {
  id: string
  message: string
  type: 'network' | 'server' | 'auth' | 'permission' | 'custom'
  dismissible?: boolean
  timestamp?: number
  details?: any
}

export interface ErrorContextType {
  // Field errors
  fieldErrors: Record<string, FieldError[]>
  addFieldError: (field: string, error: Omit<FieldError, 'id' | 'timestamp'>) => void
  removeFieldError: (field: string, errorId: string) => void
  clearFieldErrors: (field: string) => void
  clearAllFieldErrors: () => void
  
  // App errors
  appErrors: AppError[]
  addAppError: (error: Omit<AppError, 'id' | 'timestamp'>) => void
  removeAppError: (errorId: string) => void
  clearAppErrors: () => void
  
  // Global error state
  hasErrors: boolean
  hasFieldErrors: (field: string) => boolean
  getFieldErrors: (field: string) => FieldError[]
  getAppErrors: () => AppError[]
}
