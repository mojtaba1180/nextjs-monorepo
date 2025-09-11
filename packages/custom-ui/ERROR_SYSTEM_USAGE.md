# Global Error Management System

این سیستم مدیریت خطا و پیام‌های global برای کل پروژه طراحی شده است.

## ویژگی‌ها

- ✅ مدیریت خطاهای field-level و app-level
- ✅ سیستم پیام‌های global و قابل تنظیم
- ✅ Toast notifications
- ✅ Error display components
- ✅ TypeScript support کامل
- ✅ React Hook Form integration

## نصب و راه‌اندازی

### 1. اضافه کردن Providers به App

```tsx
// app/layout.tsx یا _app.tsx
import { 
  ErrorProvider, 
  ToastProvider, 
  ToastContainer 
} from "@workspace/custom-ui"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ErrorProvider>
          <ToastProvider>
            {children}
            <ToastContainer position="top-right" />
          </ToastProvider>
        </ErrorProvider>
      </body>
    </html>
  )
}
```

### 2. استفاده در کامپوننت‌ها

```tsx
import { 
  useFieldError, 
  useAppError, 
  useToast,
  MESSAGES,
  getMessage 
} from "@workspace/custom-ui"

function MyComponent() {
  const { addFieldError, clearFieldErrors } = useFieldError('email')
  const { addAppError } = useAppError()
  const { success, error, warning, info } = useToast()

  const handleSubmit = async () => {
    try {
      // API call
      const result = await api.submit()
      success(getMessage('success.save'))
    } catch (err) {
      // Add field error
      addFieldError('email', {
        message: getMessage('validation.email.invalid'),
        type: 'validation',
        dismissible: true
      })
      
      // Add app error
      addAppError({
        message: getMessage('errors.network.connection'),
        type: 'network',
        dismissible: true
      })
      
      // Show toast
      error(getMessage('errors.form.submit'))
    }
  }

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
```

## استفاده از سیستم پیام‌ها

### 1. پیام‌های از پیش تعریف شده

```tsx
import { MESSAGES, getMessage } from "@workspace/custom-ui"

// استفاده مستقیم
const emailRequired = MESSAGES.validation.email.required

// استفاده با پارامتر
const minLengthMessage = getMessage('validation.text.minLength', { min: 8 })
```

### 2. اضافه کردن پیام‌های جدید

```tsx
// constants/messages.ts
export const MESSAGES = {
  // ... existing messages
  custom: {
    welcome: "Welcome to our application",
    goodbye: "Thank you for using our app"
  }
}
```

## مدیریت خطاها

### 1. Field Errors

```tsx
import { useFieldError } from "@workspace/custom-ui"

function MyForm() {
  const { addFieldError, removeFieldError, clearFieldErrors } = useFieldError('email')

  const handleValidation = () => {
    // Add error
    addFieldError('email', {
      message: 'Invalid email format',
      type: 'validation',
      dismissible: true
    })
    
    // Remove specific error
    removeFieldError('error-id')
    
    // Clear all errors for this field
    clearFieldErrors()
  }
}
```

### 2. App Errors

```tsx
import { useAppError } from "@workspace/custom-ui"

function MyComponent() {
  const { addAppError, removeAppError, clearAppErrors } = useAppError()

  const handleApiError = () => {
    addAppError({
      message: 'Server is not responding',
      type: 'server',
      dismissible: true,
      details: { status: 500 }
    })
  }
}
```

### 3. Toast Notifications

```tsx
import { useToast } from "@workspace/custom-ui"

function MyComponent() {
  const { success, error, warning, info, addToast } = useToast()

  const handleActions = () => {
    // Quick methods
    success('Operation completed successfully')
    error('Something went wrong')
    warning('Please check your input')
    info('New feature available')
    
    // Custom toast
    addToast({
      type: 'success',
      title: 'Success',
      message: 'Data saved successfully',
      duration: 5000,
      dismissible: true
    })
  }
}
```

## نمایش خطاها

### 1. Field Error Display

```tsx
import { FieldErrorDisplay } from "@workspace/custom-ui"

function MyField({ error }) {
  return (
    <div>
      <input />
      <FieldErrorDisplay
        error={error}
        onDismiss={(id) => removeError(id)}
        dismissible={true}
      />
    </div>
  )
}
```

### 2. App Error Display

```tsx
import { AppErrorDisplay } from "@workspace/custom-ui"

function ErrorList({ errors }) {
  return (
    <div>
      {errors.map(error => (
        <AppErrorDisplay
          key={error.id}
          error={error}
          onDismiss={(id) => removeError(id)}
        />
      ))}
    </div>
  )
}
```

## Integration با React Hook Form

```tsx
import { RHFInput, commonValidations } from "@workspace/custom-ui"

function MyForm() {
  return (
    <RHFInput
      name="email"
      type="email"
      label="Email"
      {...commonValidations.email}
      // Global errors automatically displayed
    />
  )
}
```

## تنظیمات Toast Container

```tsx
import { ToastContainer } from "@workspace/custom-ui"

// Different positions
<ToastContainer position="top-right" maxToasts={5} />
<ToastContainer position="bottom-left" maxToasts={3} />
<ToastContainer position="top-center" maxToasts={10} />
```

## Best Practices

1. **استفاده از پیام‌های از پیش تعریف شده**: همیشه از `MESSAGES` استفاده کنید
2. **Type Safety**: از TypeScript types استفاده کنید
3. **Error Handling**: خطاها را در سطح مناسب مدیریت کنید
4. **User Experience**: خطاها را dismissible کنید
5. **Performance**: از useCallback برای functions استفاده کنید

## مثال کامل

```tsx
import { 
  ErrorProvider, 
  ToastProvider, 
  ToastContainer,
  useFieldError,
  useAppError,
  useToast,
  MESSAGES,
  getMessage
} from "@workspace/custom-ui"

function App() {
  return (
    <ErrorProvider>
      <ToastProvider>
        <MyForm />
        <ToastContainer />
      </ToastProvider>
    </ErrorProvider>
  )
}

function MyForm() {
  const { addFieldError } = useFieldError('email')
  const { addAppError } = useAppError()
  const { success, error } = useToast()

  const handleSubmit = async (data) => {
    try {
      await api.submit(data)
      success(getMessage('success.save'))
    } catch (err) {
      if (err.field === 'email') {
        addFieldError('email', {
          message: getMessage('validation.email.invalid'),
          type: 'validation'
        })
      } else {
        addAppError({
          message: getMessage('errors.network.connection'),
          type: 'network'
        })
        error(getMessage('errors.form.submit'))
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```
