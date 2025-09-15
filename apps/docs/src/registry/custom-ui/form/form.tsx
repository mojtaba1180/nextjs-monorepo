"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { FormProvider, RHFInput, RHFTextarea, RHFSelect, RHFCheckbox, RHFButton } from "@workspace/custom-ui"
import { validationRules, commonValidations } from "@workspace/custom-ui"

export function FormDemo() {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      country: "",
      newsletter: false
    }
  })

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data)
  }

  return (
    <div className="space-y-6">
      {/* 1. Basic Usage */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Usage</h3>
        <div className="p-4 border rounded-lg">
          <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <RHFInput
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                required
                {...commonValidations.name}
              />
              <RHFInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
                {...commonValidations.email}
              />
              <RHFButton type="submit">Submit</RHFButton>
            </div>
          </FormProvider>
        </div>
      </div>

      {/* 2. Form with All Components */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Complete Form Example</h3>
        <div className="p-4 border rounded-lg">
          <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <RHFInput
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                required
                {...commonValidations.name}
              />
              
              <RHFInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                required
                {...commonValidations.email}
              />
              
              <RHFInput
                name="phone"
                label="Phone Number"
                mode="phone"
                placeholder="Enter your phone number"
                required
                {...commonValidations.phone}
                helperText="Enter Iranian phone number"
              />
              
              <RHFSelect
                name="country"
                label="Country"
                placeholder="Select your country"
                options={[
                  { value: "iran", label: "Iran" },
                  { value: "usa", label: "United States" },
                  { value: "uk", label: "United Kingdom" },
                  { value: "canada", label: "Canada" }
                ]}
                required
              />
              
              <RHFTextarea
                name="message"
                label="Message"
                placeholder="Enter your message"
                rows={4}
                maxLength={500}
                showCharCount
                helperText="Maximum 500 characters"
              />
              
              <RHFCheckbox
                name="newsletter"
                label="Subscribe to newsletter"
                helperText="Receive updates about our products"
              />
              
              <div className="flex gap-2">
                <RHFButton type="submit" loadingText="Submitting...">
                  Submit Form
                </RHFButton>
                <RHFButton type="button" variant="outline">
                  Cancel
                </RHFButton>
              </div>
            </div>
          </FormProvider>
        </div>
      </div>

      {/* 3. Input Types and Modes */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Input Types and Modes</h3>
        <div className="p-4 border rounded-lg">
          <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RHFInput
                name="text"
                label="Text Input"
                placeholder="Regular text input"
              />
              
              <RHFInput
                name="number"
                label="Number Input"
                type="number"
                placeholder="Enter number"
                {...validationRules.min(0, "Must be positive")}
              />
              
              <RHFInput
                name="card"
                label="Card Number"
                mode="card"
                placeholder="1234 5678 9012 3456"
                {...validationRules.pattern(/^\d{16}$/, "Enter 16-digit card number")}
              />
              
              <RHFInput
                name="currency"
                label="Amount"
                mode="currency"
                placeholder="0"
                {...validationRules.min(0, "Amount must be positive")}
              />
            </div>
          </FormProvider>
        </div>
      </div>

      {/* 4. Validation States */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Validation States</h3>
        <div className="p-4 border rounded-lg">
          <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <RHFInput
                name="required_field"
                label="Required Field"
                placeholder="This field is required"
                required
                helperText="This field must be filled"
              />
              
              <RHFInput
                name="email_validation"
                label="Email Validation"
                type="email"
                placeholder="Enter valid email"
                {...validationRules.email("Please enter a valid email address")}
              />
              
              <RHFInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter strong password"
                {...validationRules.password("Password must be at least 8 characters with uppercase, lowercase, number and special character")}
              />
              
              <RHFTextarea
                name="long_text"
                label="Long Text"
                placeholder="Enter text with length validation"
                maxLength={100}
                showCharCount
                {...validationRules.minLength(10, "Minimum 10 characters required")}
              />
            </div>
          </FormProvider>
        </div>
      </div>

      {/* 5. Interactive Form */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Interactive Form</h3>
        <div className="p-4 border rounded-lg">
          <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <RHFInput
                name="dynamic_field"
                label="Dynamic Field"
                placeholder="Type something here"
                helperText="This field updates in real-time"
              />
              
              <RHFSelect
                name="dynamic_select"
                label="Dynamic Select"
                placeholder="Choose an option"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2", disabled: true },
                  { value: "option3", label: "Option 3" }
                ]}
              />
              
              <div className="flex gap-2">
                <RHFButton 
                  type="button" 
                  onClick={() => methods.setValue("dynamic_field", "Prefilled value")}
                >
                  Fill Field
                </RHFButton>
                <RHFButton 
                  type="button" 
                  variant="outline"
                  onClick={() => methods.reset()}
                >
                  Reset Form
                </RHFButton>
                <RHFButton type="submit">
                  Submit
                </RHFButton>
              </div>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
