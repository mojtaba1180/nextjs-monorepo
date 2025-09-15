# @workspace/custom-ui

A custom UI component library built on top of `@workspace/ui` that provides enhanced and customized components for the Nexus Framework.

## Features

- 🎨 Custom components with enhanced styling
- 🔧 Built on top of the base UI library
- 📦 TypeScript support
- 🚀 Easy to use and extend

## Installation

This package is part of the monorepo workspace and is automatically available to all apps.

## Usage

### Components

```tsx
import { CustomButton } from "@workspace/custom-ui"

export function MyComponent() {
  return (
    <div>
      <CustomButton size="sm">Small Button</CustomButton>
      <CustomButton size="md">Medium Button</CustomButton>
      <CustomButton size="lg">Large Button</CustomButton>
    </div>
  )
}
```

### Hooks

```tsx
import { useToggle, useLocalStorage, useDebounce } from "@workspace/custom-ui"

export function MyComponent() {
  const [isOpen, toggle] = useToggle(false)
  const [name, setName] = useLocalStorage("user-name", "")
  const debouncedValue = useDebounce(inputValue, 500)
  
  return (
    <div>
      <button onClick={toggle}>
        {isOpen ? "Close" : "Open"}
      </button>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
    </div>
  )
}
```

## Available Components

### CustomButton

An enhanced button component with custom styling and animations.

**Props:**
- `size`: "sm" | "md" | "lg" (default: "md")
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" (default: "default")
- All standard button HTML attributes

## Available Hooks

### useToggle

A hook for managing boolean state with a toggle function.

```tsx
const [isOpen, toggle, setIsOpen] = useToggle(false)
```

### useLocalStorage

A hook for managing localStorage with React state synchronization.

```tsx
const [value, setValue, removeValue] = useLocalStorage("key", initialValue)
```

### useDebounce

A hook that debounces a value with a specified delay.

```tsx
const debouncedValue = useDebounce(value, 500)
```

## Development

```bash
# Build the package
pnpm build

# Watch for changes
pnpm dev

# Lint
pnpm lint
```

## Adding New Components

1. Create your component in `src/components/`
2. Export it from `src/index.ts`
3. Build the package
4. Use it in your apps!
