#!/bin/bash

# Install script for digimoragheb monorepo
# This script installs all dependencies using pnpm

set -e

echo "📦 Starting installation process..."

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "📁 Working in: $PROJECT_ROOT"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first:"
    echo "   npm install -g pnpm"
    echo "   or visit: https://pnpm.io/installation"
    exit 1
fi

# Check pnpm version
PNPM_VERSION=$(pnpm --version)
echo "🔧 Using pnpm version: $PNPM_VERSION"

# Check Node.js version
NODE_VERSION=$(node --version)
echo "🔧 Using Node.js version: $NODE_VERSION"

# Check if Node.js version meets requirements (>=20)
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
if [ "$NODE_MAJOR_VERSION" -lt 20 ]; then
    echo "⚠️  Warning: Node.js version $NODE_VERSION is below the recommended version 20"
    echo "   The project requires Node.js >=20"
fi

echo "🚀 Installing dependencies..."

# Install dependencies using pnpm
pnpm install

echo "🔨 Building packages..."

# Build all packages
pnpm build

echo "✅ Installation and build completed successfully!"
echo ""
echo "🎉 Your monorepo is ready to use!"
echo ""
echo "📋 Available commands:"
echo "   pnpm dev          - Start development servers"
echo "   pnpm build        - Build all packages"
echo "   pnpm lint         - Run linting"
echo "   pnpm format       - Format code with Prettier"
echo "   pnpm add-app      - Add a new app to the monorepo"
echo ""
echo "🚀 To start development, run: pnpm dev"
