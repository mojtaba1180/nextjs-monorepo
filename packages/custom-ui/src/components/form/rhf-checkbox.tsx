"use client"

import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"

// ----------------------------------------------------------------------

type Props = {
  name: string
  label?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  className?: string
  labelClassName?: string
}

export function RHFCheckbox({ 
  name, 
  label,
  helperText,
  required,
  disabled,
  className,
  labelClassName,
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
                className={cn(
                  error && "border-red-500",
                  className
                )}
                {...other}
              />
              {label && (
                <Label 
                  htmlFor={name} 
                  className={cn(
                    "text-sm font-medium cursor-pointer",
                    disabled && "text-gray-400 cursor-not-allowed",
                    labelClassName
                  )}
                >
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
              )}
            </div>
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
