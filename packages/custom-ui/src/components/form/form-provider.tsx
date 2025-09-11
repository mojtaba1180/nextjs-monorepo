"use client"

import React from "react"
import { FormProvider as Form, UseFormReturn, FieldValues } from "react-hook-form"

// ----------------------------------------------------------------------

type Props<T extends FieldValues = FieldValues> = {
  children: React.ReactNode
  methods: UseFormReturn<T, any, T>
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void> | void
  className?: string | undefined
}

export function FormProvider<T extends FieldValues = FieldValues>({ children, onSubmit, methods, className }: Props<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </Form>
  )
}
