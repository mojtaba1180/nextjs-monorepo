#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get app name from command line arguments
const appName = process.argv[2];

if (!appName) {
  console.error('❌ لطفاً نام اپ را وارد کنید:');
  console.log('📝 مثال: node scripts/add-app.js my-new-app');
  process.exit(1);
}

// Validate app name (kebab-case)
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(appName)) {
  console.error('❌ نام اپ باید به فرمت kebab-case باشد (مثال: my-new-app)');
  process.exit(1);
}

const appPath = path.join(__dirname, '..', 'apps', appName);

console.log(`🚀 شروع ایجاد اپ جدید: ${appName}`);

try {
  // Check if app already exists
  if (fs.existsSync(appPath)) {
    console.error(`❌ اپ با نام ${appName} قبلاً وجود دارد!`);
    process.exit(1);
  }

  // Step 1: Create Next.js app
  console.log('📦 ایجاد اپ Next.js...');
  execSync(
    `npx create-next-app@latest apps/${appName} --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --yes`,
    { stdio: 'inherit' }
  );

  // Step 2: Update package.json
  console.log('⚙️  به‌روزرسانی package.json...');
  const packageJsonPath = path.join(appPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const updatedPackageJson = {
    ...packageJson,
    name: appName,
    type: "module",
    scripts: {
      "dev": "next dev --turbopack",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "lint:fix": "next lint --fix",
      "typecheck": "tsc --noEmit"
    },
    dependencies: {
      "@workspace/ui": "workspace:*",
      "lucide-react": "^0.475.0",
      "next": "^15.4.5",
      "next-themes": "^0.4.6",
      "react": "^19.1.1",
      "react-dom": "^19.1.1"
    },
    devDependencies: {
      "@types/node": "^20.19.9",
      "@types/react": "^19.1.9",
      "@types/react-dom": "^19.1.7",
      "@workspace/eslint-config": "workspace:^",
      "@workspace/typescript-config": "workspace:*",
      "typescript": "^5.9.2"
    }
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(updatedPackageJson, null, 2));

  // Step 3: Update ESLint config
  console.log('🔧 تنظیم ESLint config...');
  const eslintConfigPath = path.join(appPath, 'eslint.config.mjs');
  const eslintConfig = `import { nextJsConfig } from "@workspace/eslint-config/next-js"

/** @type {import("eslint").Linter.Config} */
export default nextJsConfig
`;
  fs.writeFileSync(eslintConfigPath, eslintConfig);

  // Step 4: Update TypeScript config
  console.log('📝 تنظیم TypeScript config...');
  const tsconfigPath = path.join(appPath, 'tsconfig.json');
  const tsconfig = {
    "extends": "@workspace/typescript-config/nextjs.json",
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"],
        "@workspace/ui/*": ["../../packages/ui/src/*"]
      },
      "plugins": [
        {
          "name": "next"
        }
      ]
    },
    "include": [
      "next-env.d.ts",
      "next.config.ts",
      "**/*.ts",
      "**/*.tsx",
      ".next/types/**/*.ts"
    ],
    "exclude": ["node_modules"]
  };
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

  // Step 5: Update Next.js config
  console.log('⚡ تنظیم Next.js config...');
  const nextConfigPath = path.join(appPath, 'next.config.ts');
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
}

export default nextConfig
`;
  fs.writeFileSync(nextConfigPath, nextConfig);

  // Step 6: Remove globals.css and update layout.tsx to use workspace UI
  console.log('🎨 تنظیم workspace UI...');
  const globalsCssPath = path.join(appPath, 'src', 'app', 'globals.css');
  const layoutTsxPath = path.join(appPath, 'src', 'app', 'layout.tsx');
  
  // Remove globals.css file
  if (fs.existsSync(globalsCssPath)) {
    fs.unlinkSync(globalsCssPath);
  }
  
  // Update layout.tsx to use workspace UI and Providers
  const layoutContent = `import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "../../components/providers"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={\`\${fontSans.variable} \${fontMono.variable} font-sans antialiased\`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
`;
  fs.writeFileSync(layoutTsxPath, layoutContent);

  // Step 7: Create components directory and providers.tsx
  console.log('🔧 ایجاد فایل‌های اضافی...');
  const componentsDir = path.join(appPath, 'components');
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  const providersPath = path.join(componentsDir, 'providers.tsx');
  const providersContent = `"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  )
}
`;
  fs.writeFileSync(providersPath, providersContent);

  // Step 8: Create components.json
  const componentsJsonPath = path.join(appPath, 'components.json');
  const componentsJson = {
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": true,
    "tsx": true,
    "tailwind": {
      "config": "",
      "css": "../../packages/ui/src/styles/globals.css",
      "baseColor": "neutral",
      "cssVariables": true
    },
    "iconLibrary": "lucide",
    "aliases": {
      "components": "@/components",
      "hooks": "@/hooks",
      "lib": "@/lib",
      "utils": "@workspace/ui/lib/utils",
      "ui": "@workspace/ui/components"
    }
  };
  fs.writeFileSync(componentsJsonPath, JSON.stringify(componentsJson, null, 2));

  // Step 9: Create hooks and lib directories
  const hooksDir = path.join(appPath, 'hooks');
  const libDir = path.join(appPath, 'lib');
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
  }
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  // Step 10: Update page.tsx to use workspace UI components
  const pageTsxPath = path.join(appPath, 'src', 'app', 'page.tsx');
  const pageContent = `import { Button } from "@workspace/ui/components/button"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
      </div>
    </div>
  )
}
`;
  fs.writeFileSync(pageTsxPath, pageContent);

  // Step 11: Install dependencies
  console.log('📥 نصب dependencies...');
  execSync('pnpm install', { stdio: 'inherit' });

  console.log('✅ اپ جدید با موفقیت ایجاد شد!');
  console.log('');
  console.log('🎉 دستورات مفید:');
  console.log(`   cd apps/${appName} && pnpm dev`);
  console.log(`   pnpm --filter ${appName} dev`);
  console.log(`   pnpm --filter ${appName} build`);
  console.log(`   pnpm --filter ${appName} lint`);
  console.log('');
  console.log('🚀 برای شروع development:');
  console.log(`   cd apps/${appName} && pnpm dev`);

} catch (error) {
  console.error('❌ خطا در ایجاد اپ:', error.message);
  process.exit(1);
}
