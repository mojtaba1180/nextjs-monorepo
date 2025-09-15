"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { FormProvider, RHFInput, RHFTextarea, RHFSelect, RHFCheckbox, RHFButton } from "@workspace/custom-ui"

export function FormVariantsDemo() {
  const methods = useForm({
    defaultValues: {
      input: "",
      textarea: "",
      select: "",
      checkbox: false
    }
  })

  const onSubmit = (data: any) => {
    console.log("Form variants submitted:", data)
  }

  return (
    <div className="space-y-6">
      {/* Input Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input Variants</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <RHFInput
                name="input"
                label="Default Input"
                placeholder="Default style"
              />
              
              <RHFInput
                name="input"
                label="Required Input"
                placeholder="Required field"
                required
              />
              
              <RHFInput
                name="input"
                label="Disabled Input"
                placeholder="Disabled field"
                disabled
              />
              
              <RHFInput
                name="input"
                label="With Helper Text"
                placeholder="Field with helper text"
                helperText="This is helper text"
              />
            </div>
          </FormProvider>
        </div>
      </div>

      {/* Textarea Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Textarea Variants</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <RHFTextarea
                name="textarea"
                label="Default Textarea"
                placeholder="Default textarea"
                rows={3}
              />
              
              <RHFTextarea
                name="textarea"
                label="With Character Count"
                placeholder="Textarea with character count"
                maxLength={200}
                showCharCount
                rows={3}
              />
              
              <RHFTextarea
                name="textarea"
                label="Disabled Textarea"
                placeholder="Disabled textarea"
                disabled
                rows={3}
              />
              
              <RHFTextarea
                name="textarea"
                label="Required Textarea"
                placeholder="Required textarea"
                required
                rows={3}
              />
            </div>
          </FormProvider>
        </div>
      </div>

      {/* Select Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select Variants</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <RHFSelect
                name="select"
                label="Default Select"
                placeholder="Choose an option"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" }
                ]}
              />
              
              <RHFSelect
                name="select"
                label="Required Select"
                placeholder="Choose required option"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" }
                ]}
                required
              />
              
              <RHFSelect
                name="select"
                label="Disabled Select"
                placeholder="Disabled select"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" }
                ]}
                disabled
              />
              
              <RHFSelect
                name="select"
                label="Select with Disabled Options"
                placeholder="Some options disabled"
                options={[
                  { value: "option1", label: "Available Option" },
                  { value: "option2", label: "Disabled Option", disabled: true },
                  { value: "option3", label: "Another Available Option" }
                ]}
              />
            </div>
          </FormProvider>
        </div>
      </div>

      {/* Checkbox Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Checkbox Variants</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <RHFCheckbox
                name="checkbox"
                label="Default Checkbox"
              />
              
              <RHFCheckbox
                name="checkbox"
                label="Required Checkbox"
                required
              />
              
              <RHFCheckbox
                name="checkbox"
                label="Disabled Checkbox"
                disabled
              />
              
              <RHFCheckbox
                name="checkbox"
                label="Checkbox with Helper Text"
                helperText="This checkbox has helper text"
              />
            </div>
          </FormProvider>
        </div>
      </div>

      {/* Button Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button Variants</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex gap-2">
                <RHFButton type="submit">
                  Submit Button
                </RHFButton>
                
                <RHFButton type="button">
                  Outline Button
                </RHFButton>
                
                <RHFButton type="button">
                  Secondary Button
                </RHFButton>
              </div>
              
              <div className="flex gap-2">
                <RHFButton type="button" disabled>
                  Disabled Button
                </RHFButton>
                
                <RHFButton type="button" loading>
                  Loading Button
                </RHFButton>
                
                <RHFButton type="button" loading loadingText="Processing...">
                  Custom Loading Text
                </RHFButton>
              </div>
            </div>
          </FormProvider>
        </div>
      </div>

      {/* Form Layout Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Form Layout Variants</h3>
        
        <div className="space-y-4">
          {/* Horizontal Layout */}
          <div className="p-4 border rounded-lg">
            <h4 className="text-md font-medium mb-3">Horizontal Layout</h4>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  name="input"
                  label="First Name"
                  placeholder="Enter first name"
                  required
                />
                <RHFInput
                  name="input"
                  label="Last Name"
                  placeholder="Enter last name"
                  required
                />
                <RHFInput
                  name="input"
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <RHFInput
                  name="input"
                  label="Phone"
                  placeholder="Enter phone"
                />
              </div>
            </FormProvider>
          </div>

          {/* Vertical Layout */}
          <div className="p-4 border rounded-lg">
            <h4 className="text-md font-medium mb-3">Vertical Layout</h4>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <RHFInput
                  name="input"
                  label="Username"
                  placeholder="Enter username"
                  required
                />
                <RHFInput
                  name="input"
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <RHFInput
                  name="input"
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  required
                />
                <RHFCheckbox
                  name="checkbox"
                  label="I agree to the terms and conditions"
                  required
                />
              </div>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
