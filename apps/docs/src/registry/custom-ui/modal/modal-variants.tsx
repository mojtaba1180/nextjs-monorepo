"use client"

import React from "react"
import { useModalContext } from "@workspace/custom-ui"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

export function ModalVariantsDemo() {
  const { openModal, closeModal } = useModalContext()

  const openDialogModal = () => {
    openModal({
      id: "dialog-variant",
      type: "dialog",
      title: "Dialog Modal",
      description: "Standard dialog modal for desktop",
      size: "md",
      closable: true,
      view: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This is a standard dialog modal that works well on desktop devices.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => closeModal("dialog-variant")}>
              Close
            </Button>
          </div>
        </div>
      )
    })
  }

  const openResponsiveModal = () => {
    openModal({
      id: "responsive-variant",
      type: "responsive",
      title: "Responsive Modal",
      description: "Adapts to mobile (drawer) and desktop (dialog)",
      size: "lg",
      closable: true,
      view: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Responsive Modal</CardTitle>
              <CardDescription>
                This modal adapts to different screen sizes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                On desktop: Shows as a dialog modal
                On mobile: Shows as a drawer from bottom
              </p>
            </CardContent>
          </Card>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => closeModal("responsive-variant")}>
              Close
            </Button>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium">Dialog Modal</h4>
          <p className="text-sm text-muted-foreground">
            Standard modal dialog for desktop devices
          </p>
          <Button onClick={openDialogModal} className="w-full">
            Open Dialog Modal
          </Button>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Responsive Modal</h4>
          <p className="text-sm text-muted-foreground">
            Adapts to mobile (drawer) and desktop (dialog)
          </p>
          <Button onClick={openResponsiveModal} variant="outline" className="w-full">
            Open Responsive Modal
          </Button>
        </div>
      </div>
    </div>
  )
}
