"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@workspace/ui/components/drawer"
import { ModalConfig } from "../../types/modal"
import { cn } from "@workspace/ui/lib/utils"
import { useIsMobile } from "@workspace/ui/hooks/use-mobile"

interface ResponsiveModalProps {
  config: ModalConfig
  isOpen: boolean
  onClose: () => void
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md", 
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4"
}

export function ResponsiveModal({ config, isOpen, onClose }: ResponsiveModalProps) {
  const { title, description, view, size = "md", closable = true, className } = config
  const isMobile = useIsMobile()

  if (isMobile) {
    // Mobile: Use Drawer
    return (
      <Drawer open={isOpen} onOpenChange={closable ? onClose : undefined}>
        <DrawerContent className={cn("max-h-[85vh]", className)}>
          {(title || description) && (
            <DrawerHeader className="text-left">
              {title && <DrawerTitle>{title}</DrawerTitle>}
              {description && <DrawerDescription>{description}</DrawerDescription>}
            </DrawerHeader>
          )}
          <div className="px-4 pb-4 overflow-y-auto">
            {view}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  // Desktop: Use Dialog
  return (
    <Dialog open={isOpen} onOpenChange={closable ? onClose : undefined}>
      <DialogContent 
        className={cn(
          sizeClasses[size],
          className
        )}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div className="mt-4">
          {view}
        </div>
      </DialogContent>
    </Dialog>
  )
}
