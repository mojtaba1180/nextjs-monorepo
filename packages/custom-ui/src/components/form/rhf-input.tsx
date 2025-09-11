"use client"

import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"
import { useFieldError } from "../../contexts/error-context"
import { FieldErrorDisplay } from "../error/field-error-display"

// ----------------------------------------------------------------------

type Props = Omit<React.ComponentProps<"input">, 'maxLength' | 'minLength' | 'required' | 'pattern'> & {
  name: string
  type?: string
  mode?: "card" | "phone" | "currency"
  label?: string
  helperText?: string
  required?: boolean
  className?: string
  // Validation rules
  pattern?: {
    value: RegExp
    message: string
  }
  minLength?: {
    value: number
    message: string
  }
  maxLength?: {
    value: number
    message: string
  }
  min?: {
    value: number
    message: string
  }
  max?: {
    value: number
    message: string
  }
  validate?: (value: any) => boolean | string
}

export function RHFInput({ 
  name, 
  type = "text", 
  mode, 
  label,
  helperText,
  required,
  className,
  ...other 
}: Props) {
  const { control, setValue } = useFormContext()
  
  // Safely use field error hook - it will work if ErrorProvider is available
  let globalErrors: any[] = []
  let removeError = (errorId: string) => {}
  
  try {
    const fieldErrorHook = useFieldError(name)
    globalErrors = fieldErrorHook.errors
    removeError = fieldErrorHook.removeError
  } catch (error) {
    // ErrorProvider not available, continue without global errors
    console.warn('ErrorProvider not found, global field errors will not be displayed')
  }

  // Extract validation rules from other props
  const {
    pattern,
    minLength,
    maxLength,
    min,
    max,
    validate,
    ...inputProps
  } = other

  // Combine validation rules
  const validationRules = {
    ...(required && { required: "This field is required" }),
    ...(pattern && { pattern }),
    ...(minLength && { minLength }),
    ...(maxLength && { maxLength }),
    ...(min && { min }),
    ...(max && { max }),
    ...(validate && { validate })
  }

  function formatCardNumber(value: string) {
    if (!value) return value
    return value
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
  }

  function formatPhoneNumber(value: string) {
    if (!value) return value
    const cleaned = value.replace(/\D/g, "")
    
    // Iranian phone number formatting
    if (cleaned.startsWith('98')) {
      const iranianNumber = cleaned.substring(2)
      if (iranianNumber.length === 10) {
        return `+98 ${iranianNumber.substring(0, 4)} ${iranianNumber.substring(4, 7)} ${iranianNumber.substring(7)}`
      }
    } else if (cleaned.startsWith('09')) {
      if (cleaned.length === 11) {
        return `${cleaned.substring(0, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7)}`
      }
    } else if (cleaned.startsWith('9')) {
      if (cleaned.length === 10) {
        return `0${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`
      }
    }
    
    return value
  }

  function formatCurrency(value: string) {
    if (!value) return value
    const number = parseFloat(value.replace(/[^0-9.-]+/g, ""))
    if (isNaN(number)) return value
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IRR"
    }).format(number)
  }

  const getFormattedValue = (value: string) => {
    switch (mode) {
      case "card":
        return formatCardNumber(value)
      case "phone":
        return formatPhoneNumber(value)
      case "currency":
        return formatCurrency(value)
      default:
        return type === "number" && value === "0" ? "" : value
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const inputValue = event.target.value
    
    switch (mode) {
      case "card":
        const plainValue = inputValue.replace(/\s/g, "")
        setValue(name, plainValue)
        break
      case "phone":
        const phoneValue = inputValue.replace(/\D/g, "")
        // Convert to standard Iranian format (09xxxxxxxxx)
        let formattedPhone = phoneValue
        if (phoneValue.startsWith('98')) {
          formattedPhone = '0' + phoneValue.substring(2)
        } else if (phoneValue.startsWith('9') && phoneValue.length === 10) {
          formattedPhone = '0' + phoneValue
        }
        setValue(name, formattedPhone)
        break
      case "currency":
        const currencyValue = inputValue.replace(/[^0-9.-]+/g, "")
        setValue(name, currencyValue)
        break
      default:
        if (type === "number") {
          field.onChange(String(inputValue))
        } else {
          field.onChange(inputValue)
        }
    }
  }

  return (
    // @ts-ignore
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="w-full space-y-2">
            {label && (
              <Label htmlFor={name} className="text-sm font-medium">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            )}
            {/* @ts-ignore */}
            <Input
              id={name}
              name={field.name}
              value={getFormattedValue(field.value || "")}
              onChange={(event) => handleChange(event, field)}
              onBlur={field.onBlur}
              type={type}
              className={cn(
                error && "border-red-500 focus:border-red-500",
                className
              )}
              {...inputProps}
            />
            {/* Show React Hook Form validation errors */}
            {error && (
              <p className="text-sm text-red-500">{error.message}</p>
            )}
            
            {/* Show global field errors */}
            {!error && globalErrors.map((globalError) => (
              <FieldErrorDisplay
                key={globalError.id}
                error={globalError}
                onDismiss={removeError}
                dismissible={globalError.dismissible}
                className="mt-1"
              />
            ))}
            
            {/* Show helper text when no errors */}
            {helperText && !error && globalErrors.length === 0 && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )
      }}
    />
  )
}
