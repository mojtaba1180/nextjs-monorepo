#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if app name is provided
if [ $# -eq 0 ]; then
    echo -e "${RED}❌ لطفاً نام اپ را وارد کنید:${NC}"
    echo -e "${YELLOW}📝 مثال: ./scripts/add-app.sh my-new-app${NC}"
    exit 1
fi

APP_NAME=$1

# Validate app name (kebab-case)
if [[ ! $APP_NAME =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo -e "${RED}❌ نام اپ باید به فرمت kebab-case باشد (مثال: my-new-app)${NC}"
    exit 1
fi

APP_PATH="apps/$APP_NAME"

echo -e "${BLUE}🚀 شروع ایجاد اپ جدید: $APP_NAME${NC}"

# Check if app already exists
if [ -d "$APP_PATH" ]; then
    echo -e "${RED}❌ اپ با نام $APP_NAME قبلاً وجود دارد!${NC}"
    exit 1
fi

# Run the Node.js script
node scripts/add-app.js "$APP_NAME"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ اپ $APP_NAME با موفقیت ایجاد شد!${NC}"
    echo -e "${YELLOW}🎉 برای شروع development:${NC}"
    echo -e "${BLUE}   cd apps/$APP_NAME && pnpm dev${NC}"
else
    echo -e "${RED}❌ خطا در ایجاد اپ $APP_NAME${NC}"
    exit 1
fi
