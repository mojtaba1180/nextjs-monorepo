# Nexus Framework

A comprehensive monorepo framework built on top of shadcn/ui with custom components, API management, and development tools.

## 🚀 Features

- **🎨 Custom UI Components** - Enhanced components built on shadcn/ui
- **🔧 Framework Package** - Complete API management with React Query
- **📚 Documentation** - Built-in docs with Fumadocs
- **⚡ TypeScript** - Full TypeScript support across all packages
- **🔄 Monorepo** - Organized workspace with shared packages

## 📦 Packages

- `@workspace/ui` - Base UI components (shadcn/ui)
- `@workspace/custom-ui` - Enhanced custom components
- `@workspace/framework` - API management and data fetching
- `@workspace/eslint-config` - Shared ESLint configuration
- `@workspace/typescript-config` - Shared TypeScript configuration

## 🛠️ Usage

### Adding components

To add components to your app, run the following command:

```bash
pnpm dlx shadcn@latest add button -c apps/your-app
```

### Using components

Import components from the workspace packages:

```tsx
import { Button } from "@workspace/ui/components/button"
import { CustomButton } from "@workspace/custom-ui"
import { useGenericQuery } from "@workspace/framework"
```

### Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build all packages
pnpm build
```
