#!/bin/bash

# Reset script for digimoragheb monorepo
# This script removes all node_modules, build artifacts, and cache files

set -e

echo "🧹 Starting cleanup process..."

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo "📁 Working in: $PROJECT_ROOT"

# Function to remove directories safely
remove_dir() {
    if [ -d "$1" ]; then
        echo "🗑️  Removing: $1"
        rm -rf "$1"
    fi
}

# Function to remove files safely
remove_file() {
    if [ -f "$1" ]; then
        echo "🗑️  Removing: $1"
        rm -f "$1"
    fi
}

# Remove root node_modules
remove_dir "node_modules"

# Remove pnpm lock files (keep workspace config)
remove_file "pnpm-lock.yaml"
# Note: pnpm-workspace.yaml should NOT be removed as it defines workspace structure

# Remove .turbo cache
remove_dir ".turbo"

# Remove all node_modules in apps
echo "📱 Cleaning apps..."
for app_dir in apps/*/; do
    if [ -d "$app_dir" ]; then
        app_name=$(basename "$app_dir")
        echo "  🧹 Cleaning app: $app_name"
        remove_dir "${app_dir}node_modules"
        remove_dir "${app_dir}.next"
        remove_dir "${app_dir}dist"
        remove_dir "${app_dir}build"
        remove_dir "${app_dir}.turbo"
    fi
done

# Remove all node_modules in packages
echo "📦 Cleaning packages..."
for package_dir in packages/*/; do
    if [ -d "$package_dir" ]; then
        package_name=$(basename "$package_dir")
        echo "  🧹 Cleaning package: $package_name"
        remove_dir "${package_dir}node_modules"
        remove_dir "${package_dir}dist"
        remove_dir "${package_dir}build"
        remove_dir "${package_dir}.turbo"
    fi
done

# Remove other common build/cache directories
echo "🧽 Cleaning other cache files..."
remove_dir ".next"
remove_dir "dist"
remove_dir "build"
remove_dir ".cache"
remove_dir ".parcel-cache"
remove_dir ".vite"

# Remove TypeScript build info
find . -name "*.tsbuildinfo" -type f -delete 2>/dev/null || true

# Remove log files
find . -name "*.log" -type f -delete 2>/dev/null || true

echo "✅ Cleanup completed successfully!"
echo "💡 Run './scripts/install.sh' to reinstall all dependencies"
