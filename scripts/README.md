# اسکریپت‌های Monorepo

این پوشه شامل اسکریپت‌های مفید برای مدیریت monorepo است.

## اضافه کردن اپ جدید

برای اضافه کردن یک اپ جدید به monorepo، از یکی از روش‌های زیر استفاده کنید:

### روش 1: استفاده از npm script
```bash
pnpm add-app my-new-app
```

### روش 2: استفاده از اسکریپت bash
```bash
./scripts/add-app.sh my-new-app
```

### روش 3: استفاده مستقیم از Node.js
```bash
node scripts/add-app.js my-new-app
```

## ویژگی‌های اسکریپت

اسکریپت `add-app` به صورت خودکار:

1. ✅ اپ Next.js جدید ایجاد می‌کند
2. ✅ تنظیمات monorepo را اعمال می‌کند
3. ✅ package.json را به‌روزرسانی می‌کند
4. ✅ ESLint config را تنظیم می‌کند
5. ✅ TypeScript config را تنظیم می‌کند
6. ✅ Next.js config را تنظیم می‌کند
7. ✅ از workspace UI package استفاده می‌کند (globals.css حذف می‌شود)
8. ✅ فایل providers.tsx برای theme management ایجاد می‌کند
9. ✅ فایل components.json برای shadcn/ui تنظیم می‌کند
10. ✅ پوشه‌های hooks و lib ایجاد می‌کند
11. ✅ صفحه نمونه با workspace UI components ایجاد می‌کند
12. ✅ Dependencies را نصب می‌کند

## قوانین نام‌گذاری

- نام اپ باید به فرمت `kebab-case` باشد
- مثال‌های صحیح: `my-app`, `user-dashboard`, `admin-panel`
- مثال‌های نادرست: `myApp`, `user_dashboard`, `Admin Panel`

## دستورات مفید بعد از ایجاد اپ

```bash
# اجرای اپ در حالت development
cd apps/my-new-app && pnpm dev

# یا از root directory:
pnpm --filter my-new-app dev

# build کردن اپ
pnpm --filter my-new-app build

# lint کردن
pnpm --filter my-new-app lint
```

## ساختار اپ ایجاد شده

```
apps/my-new-app/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx
│       └── favicon.ico
├── components/
│   └── providers.tsx
├── hooks/
├── lib/
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── next.config.ts
├── components.json
└── postcss.config.mjs
```

### فایل‌های مهم:

- **`components/providers.tsx`**: Theme provider برای dark/light mode
- **`components.json`**: تنظیمات shadcn/ui برای workspace
- **`src/app/layout.tsx`**: Layout اصلی با workspace UI و Providers
- **`src/app/page.tsx`**: صفحه نمونه با workspace UI components
