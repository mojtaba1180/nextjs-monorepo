"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { ModalConfig } from "../../types/modal"
import { cn } from "@workspace/ui/lib/utils"

interface DialogModalProps {
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

export function DialogModal({ config, isOpen, onClose }: DialogModalProps) {
  const { title, description, view, size = "md", closable = true, className } = config

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
