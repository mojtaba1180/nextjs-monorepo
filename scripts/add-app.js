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
      "react-dom": "^19.1.1",
      "tailwindcss": "^4.1.13",
      "tw-animate-css": "^1.0.0"
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

  // Step 6: Update globals.css
  console.log('🎨 تنظیم Tailwind CSS...');
  const globalsCssPath = path.join(appPath, 'src', 'app', 'globals.css');
  const globalsCss = `@import "tailwindcss";
@source "../../../apps/**/*.{ts,tsx}";
@source "../../../components/**/*.{ts,tsx}";
@source "../**/*.{ts,tsx}";

@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
  fs.writeFileSync(globalsCssPath, globalsCss);

  // Step 7: Install dependencies
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
