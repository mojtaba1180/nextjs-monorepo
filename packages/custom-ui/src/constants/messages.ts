// Global messages system for the entire application

export const MESSAGES = {
  // Common messages
  common: {
    required: "This field is required",
    invalid: "Invalid value",
    loading: "Loading...",
    success: "Operation completed successfully",
    error: "An error occurred",
    confirm: "Are you sure?",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    submit: "Submit",
    reset: "Reset",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    refresh: "Refresh",
    retry: "Retry",
    tryAgain: "Try again"
  },

  // Validation messages
  validation: {
    email: {
      required: "Email address is required",
      invalid: "Please enter a valid email address",
      format: "Please match the request format"
    },
    password: {
      required: "Password is required",
      minLength: "Password must be at least 8 characters",
      complexity: "Password must contain uppercase, lowercase, number and special character",
      mismatch: "Passwords do not match"
    },
    name: {
      required: "Name is required",
      minLength: "Name must be at least 2 characters",
      maxLength: "Name must be less than 50 characters"
    },
  phone: {
    required: "شماره تلفن الزامی است",
    invalid: "لطفاً شماره تلفن معتبر وارد کنید",
    format: "لطفاً شماره تلفن را در فرمت صحیح وارد کنید",
    iranian: "لطفاً شماره تلفن ایرانی معتبر وارد کنید"
  },
    url: {
      required: "URL is required",
      invalid: "Please enter a valid URL"
    },
    number: {
      required: "Number is required",
      min: "Value must be greater than or equal to {min}",
      max: "Value must be less than or equal to {max}",
      positive: "Value must be positive",
      integer: "Value must be an integer"
    },
    text: {
      required: "This field is required",
      minLength: "Minimum length is {min} characters",
      maxLength: "Maximum length is {max} characters"
    },
    file: {
      required: "File is required",
      size: "File size must be less than {maxSize}MB",
      type: "File type not supported",
      upload: "File upload failed"
    }
  },

  // Error messages
  errors: {
    network: {
      connection: "Network connection error",
      timeout: "Request timeout",
      offline: "You are offline",
      server: "Server error occurred"
    },
    auth: {
      login: "Login failed",
      logout: "Logout failed",
      unauthorized: "You are not authorized",
      forbidden: "Access denied",
      sessionExpired: "Session expired, please login again"
    },
    form: {
      submit: "Form submission failed",
      validation: "Please fix the validation errors",
      save: "Failed to save data",
      load: "Failed to load data"
    },
    api: {
      notFound: "Resource not found",
      conflict: "Resource already exists",
      badRequest: "Invalid request",
      internal: "Internal server error",
      maintenance: "Service is under maintenance"
    }
  },

  // Success messages
  success: {
    save: "Data saved successfully",
    delete: "Data deleted successfully",
    update: "Data updated successfully",
    create: "Data created successfully",
    login: "Login successful",
    logout: "Logout successful",
    register: "Registration successful",
    passwordReset: "Password reset email sent",
    emailVerified: "Email verified successfully"
  },

  // Info messages
  info: {
    noData: "No data available",
    empty: "This field is empty",
    optional: "This field is optional",
    comingSoon: "Coming soon",
    beta: "This feature is in beta",
    maintenance: "Scheduled maintenance in progress"
  },

  // Warning messages
  warning: {
    unsavedChanges: "You have unsaved changes",
    dataLoss: "This action may cause data loss",
    deprecated: "This feature is deprecated",
    beta: "This is a beta feature"
  }
} as const

// Helper function to get message with parameters
export const getMessage = (
  path: string, 
  params?: Record<string, string | number>
): string => {
  const keys = path.split('.')
  let message: any = MESSAGES
  
  for (const key of keys) {
    message = message?.[key]
    if (!message) return path
  }
  
  if (typeof message !== 'string') return path
  
  // Replace parameters in message
  if (params) {
    return message.replace(/\{(\w+)\}/g, (match, key) => {
      return params[key]?.toString() || match
    })
  }
  
  return message
}

// Type for message paths
export type MessagePath = 
  | 'common.required'
  | 'common.invalid'
  | 'validation.email.required'
  | 'validation.email.invalid'
  | 'validation.password.required'
  | 'validation.password.minLength'
  | 'validation.name.required'
  | 'validation.phone.required'
  | 'validation.phone.invalid'
  | 'errors.network.connection'
  | 'errors.auth.unauthorized'
  | 'success.save'
  | 'success.delete'
  | string // Allow any string for flexibility
