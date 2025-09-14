"use client"

import React from "react"
import { CustomButton } from "@workspace/custom-ui"

export function CustomButtonVariantsDemo() {
  return (
    <div className="space-y-6">
      {/* Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button Variants</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Default</h4>
            <CustomButton variant="default" className="w-full">
              Default Button
            </CustomButton>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Destructive</h4>
            <CustomButton variant="destructive" className="w-full">
              Destructive
            </CustomButton>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Outline</h4>
            <CustomButton variant="outline" className="w-full">
              Outline
            </CustomButton>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Secondary</h4>
            <CustomButton variant="secondary" className="w-full">
              Secondary
            </CustomButton>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Ghost</h4>
            <CustomButton variant="ghost" className="w-full">
              Ghost
            </CustomButton>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Link</h4>
            <CustomButton variant="link" className="w-full">
              Link
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Button Sizes</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Small</h4>
            <CustomButton size="sm">Small</CustomButton>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Medium</h4>
            <CustomButton size="md">Medium</CustomButton>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Large</h4>
            <CustomButton size="lg">Large</CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
}
