# Nexus Framework

A comprehensive monorepo framework built on top of shadcn/ui with custom components, API management, and development tools.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

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

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
