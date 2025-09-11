"use client"

import React from "react"
import { useFormContext } from "react-hook-form"
import { Button } from "@workspace/ui/components/button"

// ----------------------------------------------------------------------

type Props = {
  loading?: boolean
  loadingText?: string
  disabled?: boolean
  children?: React.ReactNode
  type?: "button" | "submit" | "reset"
  className?: string
  onClick?: () => void
}

export function RHFButton({ 
  loading = false,
  loadingText = "Loading...",
  disabled,
  children,
  type = "button",
  className,
  onClick,
  ...other 
}: Props) {
  const { formState: { isSubmitting } } = useFormContext()
  
  const isLoading = loading || isSubmitting

  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      className={className}
      onClick={onClick}
      {...other}
    >
      {isLoading ? loadingText : children}
    </Button>
  )
}
