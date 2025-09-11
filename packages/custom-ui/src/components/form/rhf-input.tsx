"use client"

import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"

// ----------------------------------------------------------------------

type Props = Omit<React.ComponentProps<"input">, 'maxLength' | 'minLength' | 'required' | 'pattern'> & {
  name: string
  type?: string
  mode?: "card" | "phone" | "currency"
  label?: string
  helperText?: string
  required?: boolean
  className?: string
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
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return value
  }

  function formatCurrency(value: string) {
    if (!value) return value
    const number = parseFloat(value.replace(/[^0-9.-]+/g, ""))
    if (isNaN(number)) return value
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
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
        setValue(name, phoneValue)
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
              {...other}
            />
            {error && (
              <p className="text-sm text-red-500">{error.message}</p>
            )}
            {helperText && !error && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )
      }}
    />
  )
}
