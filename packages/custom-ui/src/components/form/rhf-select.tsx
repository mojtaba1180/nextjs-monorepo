"use client"

import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"

// ----------------------------------------------------------------------

type Option = {
  value: string | number
  label: string
  disabled?: boolean
}

type Props = {
  name: string
  label?: string
  placeholder?: string
  options: Option[]
  helperText?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export function RHFSelect({ 
  name, 
  label,
  placeholder = "Select an option...",
  options,
  helperText,
  required,
  disabled,
  className,
  ...other 
}: Props) {
  const { control } = useFormContext()

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
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger 
                className={cn(
                  error && "border-red-500 focus:border-red-500",
                  className
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={String(option.value)}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
