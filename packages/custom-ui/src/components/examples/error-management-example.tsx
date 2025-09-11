"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { FormProvider } from '../form/form-provider'
import { RHFInput } from '../form/rhf-input'
import { commonValidations } from '../form/form-utils'
import { useError, useAppError } from '../../contexts/error-context'
import { useToast } from '../../contexts/toast-context'
import { MESSAGES, getMessage } from '../../constants/messages'
import { Button } from '@workspace/ui/components/button'

interface FormData {
  name: string
  email: string
  phone: string
}

export function ErrorManagementExample() {
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  })

  const { addFieldError, clearFieldErrors } = useError()
  const { addError: addAppError, clearErrors: clearAppErrors } = useAppError()
  const { success, error, warning, info } = useToast()

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate validation error
      if (data.email === 'invalid@test.com') {
        addFieldError('email', {
          field: 'email',
          message: getMessage('validation.email.invalid'),
          type: 'validation',
          dismissible: true
        })
        return
      }

      // Simulate server error
      if (data.name === 'error') {
        addAppError({
          message: getMessage('errors.network.connection'),
          type: 'network',
          dismissible: true,
          details: { status: 500 }
        })
        return
      }

      // Success case
      success(getMessage('success.save'))
      console.log('Form submitted:', data)
      
    } catch (err) {
      error(getMessage('errors.form.submit'))
    }
  }

  const handleTestErrors = () => {
    // Test different types of errors
    addFieldError('email', {
      field: 'email',
      message: 'This is a test field error',
      type: 'validation',
      dismissible: true
    })

    addAppError({
      message: 'This is a test app error',
      type: 'server',
      dismissible: true
    })

    warning('This is a warning message')
    info('This is an info message')
  }

  const handleClearErrors = () => {
    clearFieldErrors('email')
    clearAppErrors()
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Error Management System Demo</h2>
        <p className="text-gray-600">Test the global error management system</p>
      </div>

      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <RHFInput
            name="name"
            label="Full Name"
            placeholder="Enter your name (try 'error' for app error)"
            required
            {...commonValidations.name}
          />

          <RHFInput
            name="email"
            type="email"
            label="Email Address"
            placeholder="Enter your email (try 'invalid@test.com' for field error)"
            {...commonValidations.email}
          />

          <RHFInput
            name="phone"
            type="tel"
            label="شماره تلفن"
            placeholder="شماره تلفن خود را وارد کنید (مثال: 09123456789)"
            mode="phone"
            {...commonValidations.phone}
          />

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Submit Form
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleTestErrors}
              className="flex-1"
            >
              Test Errors
            </Button>
            
            <Button
              type="button"
              variant="destructive"
              onClick={handleClearErrors}
              className="flex-1"
            >
              Clear Errors
            </Button>
          </div>
        </div>
      </FormProvider>

      {/* Test different message types */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Test Messages</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => success('Success message!')}
          >
            Success Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => error('Error message!')}
          >
            Error Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => warning('Warning message!')}
          >
            Warning Toast
          </Button>
          <Button
            variant="outline"
            onClick={() => info('Info message!')}
          >
            Info Toast
          </Button>
        </div>
      </div>

      {/* Form State Display */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Form State (for debugging)</h3>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(methods.watch(), null, 2)}
        </pre>
      </div>
    </div>
  )
}
