"use client"

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
import { DialogModal } from "./dialog-modal"

interface ResponsiveModalProps {
  config: ModalConfig
  isOpen: boolean
  onClose: () => void
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
            <DrawerHeader className=" rtl:text-right ltr:text-left">
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

  // Desktop: Use DialogModal
  return (
    <DialogModal 
      config={config}
      isOpen={isOpen}
      onClose={onClose}
    />
  )
}
