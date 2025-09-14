"use client"

import { CustomButton } from "@workspace/custom-ui"

export function CustomButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 flex-wrap">
        <CustomButton variant="default">Default</CustomButton>
        <CustomButton variant="destructive">Destructive</CustomButton>
        <CustomButton variant="outline">Outline</CustomButton>
        <CustomButton variant="secondary">Secondary</CustomButton>
        <CustomButton variant="ghost">Ghost</CustomButton>
        <CustomButton variant="link">Link</CustomButton>
      </div>
      
      <div className="flex items-center gap-4 flex-wrap">
        <CustomButton size="sm">Small</CustomButton>
        <CustomButton size="md">Medium</CustomButton>
        <CustomButton size="lg">Large</CustomButton>
      </div>
    </div>
  )
}
