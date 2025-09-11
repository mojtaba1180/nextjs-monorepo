# Scripts Documentation

این پوشه شامل اسکریپت‌های مفید برای مدیریت monorepo است.

## اسکریپت‌های موجود

### 1. `reset.sh`
پاک کردن کامل تمام فایل‌های build، node_modules و cache:

```bash
./scripts/reset.sh
```

**چه کارهایی انجام می‌دهد:**
- حذف تمام `node_modules` در root و تمام apps/packages
- حذف فایل‌های `pnpm-lock.yaml` و `pnpm-workspace.yaml`
- حذف پوشه `.turbo` (cache)
- حذف پوشه‌های build مثل `.next`, `dist`, `build`
- حذف فایل‌های TypeScript build info
- حذف فایل‌های log

### 2. `install.sh`
نصب مجدد تمام dependencies و build کردن پروژه:

```bash
./scripts/install.sh
```

**چه کارهایی انجام می‌دهد:**
- بررسی وجود pnpm و Node.js
- بررسی version requirements
- اجرای `pnpm install`
- اجرای `pnpm build`
- نمایش دستورات مفید

### 3. `reset-and-install.sh` (پیشنهادی)
اجرای کامل reset و install در یک دستور:

```bash
./scripts/reset-and-install.sh
```

این اسکریپت هر دو اسکریپت بالا رو به ترتیب اجرا می‌کنه.

## نحوه استفاده

### برای ریست کامل پروژه:
```bash
# روش 1: استفاده از اسکریپت ترکیبی (پیشنهادی)
./scripts/reset-and-install.sh

# روش 2: اجرای جداگانه
./scripts/reset.sh
./scripts/install.sh
```

### برای نصب ساده (بدون پاک کردن):
```bash
./scripts/install.sh
```

## پیش‌نیازها

- **Node.js**: نسخه 20 یا بالاتر
- **pnpm**: package manager اصلی پروژه
- **Git**: برای version control

### نصب pnpm:
```bash
npm install -g pnpm
```

## دستورات مفید بعد از نصب

```bash
# شروع development servers
pnpm dev

# build کردن تمام packages
pnpm build

# اجرای linting
pnpm lint

# فرمت کردن کد
pnpm format

# اضافه کردن app جدید
pnpm add-app
```

## ساختار پروژه

```
digimoragheb-monorepo/
├── apps/                    # اپلیکیشن‌ها
│   ├── web/                # اپلیکیشن اصلی وب
│   └── application-expert/ # اپلیکیشن متخصص
├── packages/               # پکیج‌های مشترک
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── custom-ui/          # کامپوننت‌های سفارشی
│   ├── eslint-config/      # تنظیمات ESLint
│   └── typescript-config/  # تنظیمات TypeScript
└── scripts/                # اسکریپت‌های مدیریتی
```

## عیب‌یابی

### مشکل: pnpm پیدا نمی‌شود
```bash
npm install -g pnpm
```

### مشکل: Node.js version پایین
```bash
# استفاده از nvm برای مدیریت Node.js
nvm install 20
nvm use 20
```

### مشکل: Permission denied
```bash
chmod +x scripts/*.sh
```