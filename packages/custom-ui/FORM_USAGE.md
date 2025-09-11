# Hook Form System Usage Guide

## Overview

The hook form system provides a comprehensive set of React Hook Form components with built-in validation, formatting, and error handling. It's designed to work seamlessly with the existing UI components.

## Setup

### 1. Install Dependencies

```bash
pnpm add react-hook-form
```

### 2. Import Components

```tsx
import { 
  FormProvider, 
  RHFInput, 
  RHFTextarea, 
  RHFSelect, 
  RHFCheckbox, 
  RHFButton,
  validationRules,
  formatters,
  commonValidations 
} from "@workspace/custom-ui"
```

## Components

### FormProvider

Wrapper component that provides form context to all child components.

```tsx
import { useForm } from "react-hook-form"

const methods = useForm()
const onSubmit = (data) => console.log(data)

<FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
  {/* Form components */}
</FormProvider>
```

### RHFInput

Enhanced input component with validation and formatting.

```tsx
<RHFInput
  name="email"
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  required
  {...commonValidations.email}
/>
```

**Props:**
- `name`: Field name (required)
- `label`: Field label
- `mode`: Formatting mode (`"card"`, `"phone"`, `"currency"`)
- `helperText`: Help text below input
- `required`: Show required indicator
- All standard input props

**Formatting Modes:**
- `card`: Formats as "1234 5678 9012 3456"
- `phone`: Formats as "(123) 456-7890"
- `currency`: Formats as "$123.45"

### RHFTextarea

Enhanced textarea component with character counting.

```tsx
<RHFTextarea
  name="message"
  label="Message"
  placeholder="Enter your message"
  maxLength={500}
  showCharCount
  helperText="Optional message"
/>
```

**Props:**
- `name`: Field name (required)
- `label`: Field label
- `maxLength`: Maximum character limit
- `showCharCount`: Show character counter
- `helperText`: Help text below textarea
- All standard textarea props

### RHFSelect

Enhanced select component with options.

```tsx
<RHFSelect
  name="country"
  label="Country"
  placeholder="Select your country"
  options={[
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" }
  ]}
  required
/>
```

**Props:**
- `name`: Field name (required)
- `label`: Field label
- `placeholder`: Placeholder text
- `options`: Array of `{value, label}` objects
- `required`: Show required indicator
- `disabled`: Disable the select

### RHFCheckbox

Enhanced checkbox component.

```tsx
<RHFCheckbox
  name="agreeToTerms"
  label="I agree to the terms and conditions"
  required
/>
```

**Props:**
- `name`: Field name (required)
- `label`: Checkbox label
- `required`: Show required indicator
- `disabled`: Disable the checkbox

### RHFButton

Enhanced button component with loading states.

```tsx
<RHFButton 
  type="submit" 
  loading={isSubmitting}
  loadingText="Saving..."
>
  Submit Form
</RHFButton>
```

**Props:**
- `loading`: Show loading state
- `loadingText`: Text to show when loading
- All standard button props

## Validation

### Built-in Validation Rules

```tsx
import { validationRules, commonValidations } from "@workspace/custom-ui"

// Individual rules
const emailValidation = validationRules.email("Custom email message")
const requiredValidation = validationRules.required("This field is required")

// Common combinations
const emailField = commonValidations.email
const passwordField = commonValidations.password
const nameField = commonValidations.name
```

### Available Validation Rules

- `required(message)`: Required field validation
- `email(message)`: Email format validation
- `minLength(min, message)`: Minimum length validation
- `maxLength(max, message)`: Maximum length validation
- `min(min, message)`: Minimum value validation
- `max(max, message)`: Maximum value validation
- `pattern(regex, message)`: Custom pattern validation
- `phone(message)`: Phone number validation
- `url(message)`: URL format validation
- `password(message)`: Strong password validation

### Custom Validation

```tsx
const customValidation = {
  ...validationRules.required("Name is required"),
  ...validationRules.minLength(2, "Name must be at least 2 characters"),
  validate: {
    noNumbers: (value) => !/\d/.test(value) || "Name cannot contain numbers"
  }
}

<RHFInput name="name" {...customValidation} />
```

## Formatting

### Built-in Formatters

```tsx
import { formatters } from "@workspace/custom-ui"

// Format card number
const formattedCard = formatters.cardNumber("1234567890123456")
// Result: "1234 5678 9012 3456"

// Format phone number
const formattedPhone = formatters.phoneNumber("1234567890")
// Result: "(123) 456-7890"

// Format currency
const formattedCurrency = formatters.currency("123.45")
// Result: "$123.45"

// Remove formatting
const plainValue = formatters.removeFormatting("$123.45")
// Result: "123.45"
```

## Complete Example

```tsx
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

interface FormData {
  name: string
  email: string
  message: string
  country: string
  agreeToTerms: boolean
}

export function ContactForm() {
  const methods = useForm<FormData>()
  
  const onSubmit = (data: FormData) => {
    console.log("Form data:", data)
  }

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <RHFInput
          name="name"
          label="Full Name"
          required
          {...commonValidations.name}
        />
        
        <RHFInput
          name="email"
          type="email"
          label="Email"
          required
          {...commonValidations.email}
        />
        
        <RHFSelect
          name="country"
          label="Country"
          options={[
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" }
          ]}
          required
        />
        
        <RHFTextarea
          name="message"
          label="Message"
          maxLength={500}
          showCharCount
        />
        
        <RHFCheckbox
          name="agreeToTerms"
          label="I agree to the terms"
          required
        />
        
        <RHFButton type="submit">
          Submit
        </RHFButton>
      </div>
    </FormProvider>
  )
}
```

## Best Practices

1. **Use TypeScript**: Define interfaces for your form data
2. **Validation**: Use built-in validation rules for common cases
3. **Error Handling**: Components automatically show validation errors
4. **Accessibility**: All components include proper ARIA attributes
5. **Performance**: Use `useForm` with proper default values
6. **Formatting**: Use formatting modes for better UX (phone, card, currency)

## Styling

All components inherit styling from the base UI components and can be customized using the `className` prop:

```tsx
<RHFInput
  name="email"
  className="border-blue-500 focus:border-blue-600"
  label="Email"
/>
```
