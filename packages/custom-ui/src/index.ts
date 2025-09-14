// Export all custom components
export { CustomButton } from "./components/custom-button"
export type { CustomButtonProps } from "./components/custom-button"

// Export theme components
export { ThemeToggle, ThemeToggleWithText } from "./components/theme-toggle"
export type { ThemeToggleProps } from "./components/theme-toggle"

// Export examples
export { ErrorManagementExample } from "./components/examples/error-management-example"

// Export modal components
export { DialogModal, ResponsiveModal, ModalManager } from "./components/modal"

// Export error components
export { 
  FieldErrorDisplay, 
  AppErrorDisplay, 
  ErrorToast, 
  ToastContainer 
} from "./components/error"

// Export all contexts
export { 
  ErrorProvider, 
  useError, 
  useFieldError, 
  useAppError,
  ToastProvider, 
  useToast,
  ModalProvider, 
  useModalContext 
} from "./contexts"

// Export providers
export { CustomUIProvider } from "./providers/custom-ui-provider"
export type { CustomUIProviderProps } from "./providers/custom-ui-provider"

// Export form components
export { 
  FormProvider, 
  RHFInput, 
  RHFTextarea, 
  RHFSelect, 
  RHFCheckbox, 
  RHFButton,
  validationRules,
  formatters,
  commonValidations,
  combineValidations
} from "./components/form"

// Export constants
export { MESSAGES, getMessage } from "./constants"

// Export all custom hooks
export { useLocalStorage, useDebounce, useToggle, useModal } from "./hooks"

// Export types
export type { ModalConfig, ModalType, ModalState, ModalContextType } from "./types/modal"
export type { FieldError, AppError, ErrorContextType } from "./types/error"
export type { Toast, ToastType } from "./components/error/error-toast"

// Export map components
export { default as Map } from "./components/map/map"
export { default as MapLibre } from "./components/map/map-libre"

// Export pagination component
export { default as CustomPagination } from "./components/pagination"

// Export table component
export { default as CustomTable } from "./components/table"

// Re-export commonly used UI components for convenience
export { Button } from "@workspace/ui/components/button"
export { Card } from "@workspace/ui/components/card"
export { Input } from "@workspace/ui/components/input"
export { Badge } from "@workspace/ui/components/badge"
