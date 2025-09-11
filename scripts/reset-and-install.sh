#!/bin/bash

# Complete reset and install script for digimoragheb monorepo
# This script performs a complete cleanup and fresh installation

set -e

echo "🔄 Starting complete reset and installation process..."
echo "=================================================="

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "📁 Working in: $PROJECT_ROOT"
echo ""

# Step 1: Reset/Cleanup
echo "🧹 STEP 1: Cleaning up existing files..."
echo "----------------------------------------"
bash "$SCRIPT_DIR/reset.sh"
echo ""

# Step 2: Install dependencies
echo "📦 STEP 2: Installing dependencies..."
echo "-------------------------------------"
bash "$SCRIPT_DIR/install.sh"
echo ""

echo "🎉 Complete reset and installation finished successfully!"
echo "=================================================="
echo ""
echo "🚀 Your monorepo is now clean and ready to use!"
echo ""
echo "💡 Quick start commands:"
echo "   pnpm dev          - Start all development servers"
echo "   pnpm build        - Build all packages"
echo "   pnpm lint         - Run linting across all packages"
echo ""
echo "📱 Available apps:"
echo "   - apps/web                    - Main web application"
echo "   - apps/application-expert     - Expert application"
echo ""
echo "📦 Available packages:"
echo "   - packages/ui                 - UI components (shadcn/ui)"
echo "   - packages/custom-ui          - Custom UI components"
echo "   - packages/eslint-config      - ESLint configurations"
echo "   - packages/typescript-config  - TypeScript configurations"
