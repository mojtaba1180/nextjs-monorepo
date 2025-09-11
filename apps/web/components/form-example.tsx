"use client"

import React from "react"
import { useForm } from "react-hook-form"
import {
  FormProvider,
  RHFInput,
  RHFTextarea,
  RHFSelect,
  RHFCheckbox,
  RHFButton,
  commonValidations 
} from "@workspace/custom-ui"
import { Button } from "@workspace/ui/components/button"

// Form data type
interface FormData {
  name: string
  email: string 
  phone: string
  cardNumber: string
  country: string
  message: string
  agreeToTerms: boolean
}

export function FormExample() {
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "", 
      phone: "",
      cardNumber: "",
      country: "",
      message: "",
      agreeToTerms: false
    }
  })

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    alert("Form submitted successfully! Check console for data.")
  }

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "ir", label: "Iran" }
  ]

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Hook Form Example</h2>
        <p className="text-gray-600">Complete form with validation and formatting</p>
      </div>

      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
        <div className="space-y-6">
          {/* Basic Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RHFInput
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              required
              {...commonValidations.name}
            />

            <RHFInput
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              helperText="We will not share your email." // ✅ پراپرتی برای رفع خطا و بهبود UX اضافه شد
              {...commonValidations.email}
            />
          </div>

          {/* Phone and Card Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RHFInput
              name="phone"
              type="tel"
              label="شماره تلفن"
              placeholder="شماره تلفن خود را وارد کنید (مثال: 09123456789)"
              mode="phone"
              {...commonValidations.phone}
            />

            <RHFInput
              name="cardNumber"
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              mode="card"
              helperText="Enter your 16-digit card number"
            />
          </div>

          {/* Select Field */}
          <RHFSelect
            name="country"
            label="Country"
            placeholder="Select your country"
            options={countryOptions}
            required
            helperText="Choose your country of residence"
          />

          {/* Textarea */}
          <RHFTextarea
            name="message"
            label="Message"
            placeholder="Tell us about yourself..."
            maxLength={500}
            showCharCount
            helperText="Optional message about yourself"
          />

          {/* Checkbox */}
          <RHFCheckbox
            name="agreeToTerms"
            label="I agree to the terms and conditions"
            required
          />

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <RHFButton type="submit" className="flex-1">
              Submit Form
            </RHFButton>

            <Button
              type="button"
              variant="outline"
              onClick={() => methods.reset()}
              className="flex-1"
            >
              Reset Form
            </Button>
          </div>
        </div>
      </FormProvider>

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