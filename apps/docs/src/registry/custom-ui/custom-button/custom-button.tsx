"use client"

import React from "react"
import { CustomButton } from "@workspace/custom-ui"

export function CustomButtonDemo() {
  return (
    <div className="space-y-6">
      {/* 1. Basic Usage */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Usage</h3>
        <div className="p-4 border rounded-lg">
          <CustomButton>
            Click me
          </CustomButton>
        </div>
      </div>

      {/* 2. Variants */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Variants</h3>
        <div className="flex gap-2 flex-wrap">
          <CustomButton variant="default">Default</CustomButton>
          <CustomButton variant="destructive">Destructive</CustomButton>
          <CustomButton variant="outline">Outline</CustomButton>
          <CustomButton variant="secondary">Secondary</CustomButton>
          <CustomButton variant="ghost">Ghost</CustomButton>
          <CustomButton variant="link">Link</CustomButton>
        </div>
      </div>

      {/* 3. Sizes */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex gap-2 items-center">
          <CustomButton size="sm">Small</CustomButton>
          <CustomButton size="md">Medium</CustomButton>
          <CustomButton size="lg">Large</CustomButton>
        </div>
      </div>

      {/* 4. States */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">States</h3>
        <div className="flex gap-2">
          <CustomButton disabled>Disabled</CustomButton>
          <CustomButton loading>Loading</CustomButton>
        </div>
      </div>

      {/* 5. Interactive Example */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Interactive Example</h3>
        <div className="p-4 border rounded-lg space-y-4">
          <p className="text-sm text-muted-foreground">
            Click the buttons below to see different actions:
          </p>
          <div className="flex gap-2 flex-wrap">
            <CustomButton onClick={() => alert("Default clicked!")}>
              Default Action
            </CustomButton>
            <CustomButton variant="destructive" onClick={() => alert("Destructive clicked!")}>
              Delete Action
            </CustomButton>
            <CustomButton variant="outline" onClick={() => alert("Outline clicked!")}>
              Secondary Action
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
}
