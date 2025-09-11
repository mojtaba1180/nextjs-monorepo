"use client"

import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Textarea } from "@workspace/ui/components/textarea"
import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"

// ----------------------------------------------------------------------

type Props = React.ComponentProps<"textarea"> & {
  name: string
  label?: string
  helperText?: string
  required?: boolean
  maxLength?: number
  showCharCount?: boolean
}

export function RHFTextarea({ 
  name, 
  label,
  helperText,
  required,
  maxLength,
  showCharCount = false,
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
        const currentLength = field.value?.length || 0
        
        return (
          <div className="w-full space-y-2">
            {label && (
              <Label htmlFor={name} className="text-sm font-medium">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            )}
            {/* @ts-ignore */}
            <Textarea
              id={name}
              {...field}
              className={cn(
                error && "border-red-500 focus:border-red-500",
                className
              )}
              maxLength={maxLength}
              {...other}
            />
            <div className="flex justify-between items-center">
              <div>
                {error && (
                  <p className="text-sm text-red-500">{error.message}</p>
                )}
                {helperText && !error && (
                  <p className="text-sm text-gray-500">{helperText}</p>
                )}
              </div>
              {showCharCount && maxLength && (
                <p className="text-xs text-gray-400">
                  {currentLength}/{maxLength}
                </p>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}
