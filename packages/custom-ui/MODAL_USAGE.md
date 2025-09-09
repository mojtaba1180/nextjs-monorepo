# Modal System Usage Guide

## Overview

The modal system provides a flexible way to manage modals in your React applications with two types of modals:

1. **Dialog Modal**: Always displays as a centered dialog
2. **Responsive Modal**: Adapts to screen size (drawer on mobile, dialog on desktop)

## Setup

### 1. Add ModalProvider to your app

```tsx
import { ModalProvider, ModalManager } from "@workspace/custom-ui"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      {children}
      <ModalManager />
    </ModalProvider>
  )
}
```

### 2. Use the useModal hook

```tsx
import { useModal } from "@workspace/custom-ui"

function MyComponent() {
  const { openModal, closeModal, closeAllModals, isModalOpen } = useModal()
  
  // Your component logic
}
```

## API Reference

### ModalConfig

```tsx
interface ModalConfig {
  id: string                    // Unique identifier for the modal
  type: "dialog" | "responsive" // Modal type
  title?: string               // Modal title
  description?: string         // Modal description
  view: ReactNode             // Modal content
  size?: "sm" | "md" | "lg" | "xl" | "full" // Modal size
  closable?: boolean          // Whether modal can be closed (default: true)
  onClose?: () => void        // Callback when modal closes
  className?: string          // Custom CSS classes
  overlayClassName?: string   // Custom overlay CSS classes
}
```

### useModal Hook

```tsx
const {
  openModal,      // (config: ModalConfig) => void
  closeModal,     // (id: string) => void
  closeAllModals, // () => void
  isModalOpen,    // (id: string) => boolean
  modals          // Record<string, ModalState>
} = useModal()
```

## Examples

### Basic Dialog Modal

```tsx
const { openModal, closeModal } = useModal()

const openDialog = () => {
  openModal({
    id: "my-dialog",
    type: "dialog",
    title: "Confirm Action",
    description: "Are you sure you want to proceed?",
    view: (
      <div className="space-y-4">
        <p>This action cannot be undone.</p>
        <div className="flex gap-2">
          <Button onClick={() => closeModal("my-dialog")}>
            Cancel
          </Button>
          <Button variant="destructive">
            Confirm
          </Button>
        </div>
      </div>
    ),
    size: "md"
  })
}
```

### Responsive Modal

```tsx
const openResponsiveModal = () => {
  openModal({
    id: "responsive-form",
    type: "responsive",
    title: "User Settings",
    description: "Update your profile information",
    view: (
      <form className="space-y-4">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <div className="flex gap-2">
          <Button type="submit">Save</Button>
          <Button variant="outline" onClick={() => closeModal("responsive-form")}>
            Cancel
          </Button>
        </div>
      </form>
    ),
    size: "lg"
  })
}
```

### Modal with Custom Styling

```tsx
openModal({
  id: "custom-modal",
  type: "dialog",
  title: "Custom Styled Modal",
  view: <div>Custom content</div>,
  className: "border-2 border-blue-500",
  overlayClassName: "bg-blue-500/20",
  size: "xl"
})
```

### Non-closable Modal

```tsx
openModal({
  id: "loading-modal",
  type: "dialog",
  title: "Processing...",
  view: <div>Please wait while we process your request.</div>,
  closable: false,
  size: "sm"
})
```

## Best Practices

1. **Unique IDs**: Always use unique IDs for your modals
2. **Type Safety**: Use TypeScript for better development experience
3. **Accessibility**: The modals are built with accessibility in mind
4. **Responsive Design**: Use responsive modals for forms and complex content
5. **Cleanup**: Always close modals when actions are completed

## Size Reference

- `sm`: Small modal (max-width: 384px)
- `md`: Medium modal (max-width: 448px) - Default
- `lg`: Large modal (max-width: 512px)
- `xl`: Extra large modal (max-width: 576px)
- `full`: Full width modal with margins
