// Form utility functions for validation and formatting

// ----------------------------------------------------------------------

// Validation rules
export const validationRules = {
  required: (message = "This field is required") => ({
    required: message
  }),
  
  email: (message = "Please enter a valid email address") => ({
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message
    }
  }),
  
  minLength: (min: number, message?: string) => ({
    minLength: {
      value: min,
      message: message || `Minimum length is ${min} characters`
    }
  }),
  
  maxLength: (max: number, message?: string) => ({
    maxLength: {
      value: max,
      message: message || `Maximum length is ${max} characters`
    }
  }),
  
  min: (min: number, message?: string) => ({
    min: {
      value: min,
      message: message || `Minimum value is ${min}`
    }
  }),
  
  max: (max: number, message?: string) => ({
    max: {
      value: max,
      message: message || `Maximum value is ${max}`
    }
  }),
  
  pattern: (pattern: RegExp, message: string) => ({
    pattern: {
      value: pattern,
      message
    }
  }),
  
  phone: (message = "Please enter a valid phone number") => ({
    pattern: {
      value: /^[\+]?[1-9][\d]{0,15}$/,
      message
    }
  }),
  
  url: (message = "Please enter a valid URL") => ({
    pattern: {
      value: /^https?:\/\/.+/,
      message
    }
  }),
  
  password: (message = "Password must be at least 8 characters with uppercase, lowercase, number and special character") => ({
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message
    }
  })
}

// ----------------------------------------------------------------------

// Formatting functions
export const formatters = {
  // Format card number with spaces
  cardNumber: (value: string) => {
    if (!value) return value
    return value
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
  },
  
  // Format phone number
  phoneNumber: (value: string) => {
    if (!value) return value
    const cleaned = value.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return value
  },
  
  // Format currency
  currency: (value: string, currency = "USD") => {
    if (!value) return value
    const number = parseFloat(value.replace(/[^0-9.-]+/g, ""))
    if (isNaN(number)) return value
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(number)
  },
  
  // Format percentage
  percentage: (value: string) => {
    if (!value) return value
    const number = parseFloat(value)
    if (isNaN(number)) return value
    return `${number}%`
  },
  
  // Remove formatting (get plain value)
  removeFormatting: (value: string) => {
    return value.replace(/[^\d.-]/g, "")
  }
}

// ----------------------------------------------------------------------

// Common validation combinations
export const commonValidations = {
  email: {
    ...validationRules.email()
  },
  
  password: {
    ...validationRules.minLength(8, "Password must be at least 8 characters"),
    ...validationRules.password()
  },
  
  name: {
    ...validationRules.minLength(2, "Name must be at least 2 characters"),
    ...validationRules.maxLength(50, "Name must be less than 50 characters")
  },
  
  phone: {
    ...validationRules.phone()
  },
  
  url: {
    ...validationRules.url()
  }
}

// ----------------------------------------------------------------------

// Helper function to combine validation rules
export const combineValidations = (...rules: any[]) => {
  return rules.reduce((acc, rule) => ({ ...acc, ...rule }), {})
}
