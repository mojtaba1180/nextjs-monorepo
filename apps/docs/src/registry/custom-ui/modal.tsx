"use client"

import React from "react"
import { DialogModal, ResponsiveModal, ModalManager } from "@workspace/custom-ui"
import { useModalContext } from "@workspace/custom-ui"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"

// Demo component for modal functionality
function ModalDemoContent() {
  const { openModal, closeModal } = useModalContext()

  const openDialogModal = () => {
    openModal({
      id: "demo-dialog",
      type: "dialog",
      title: "Dialog Modal",
      description: "This is a dialog modal example",
      size: "md",
      closable: true,
      view: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Enter your message" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => closeModal("demo-dialog")}>
              Cancel
            </Button>
            <Button onClick={() => closeModal("demo-dialog")}>
              Submit
            </Button>
          </div>
        </div>
      )
    })
  }

  const openResponsiveModal = () => {
    openModal({
      id: "demo-responsive",
      type: "responsive",
      title: "Responsive Modal",
      description: "This modal adapts to mobile and desktop",
      size: "lg",
      closable: true,
      view: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>
                Update your profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => closeModal("demo-responsive")}>
                  Cancel
                </Button>
                <Button onClick={() => closeModal("demo-responsive")}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    })
  }

  const openLargeModal = () => {
    openModal({
      id: "demo-large",
      type: "dialog",
      title: "Large Modal",
      description: "This is a large modal with more content",
      size: "xl",
      closable: true,
      view: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input id="street" placeholder="123 Main St" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="10001" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => closeModal("demo-large")}>
              Cancel
            </Button>
            <Button onClick={() => closeModal("demo-large")}>
              Save Profile
            </Button>
          </div>
        </div>
      )
    })
  }

  const openNonClosableModal = () => {
    openModal({
      id: "demo-non-closable",
      type: "dialog",
      title: "Processing...",
      description: "Please wait while we process your request",
      size: "sm",
      closable: false,
      view: (
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground text-center">
            This modal cannot be closed by clicking outside or pressing escape
          </p>
        </div>
      )
    })
    
    // Auto close after 3 seconds
    setTimeout(() => {
      closeModal("demo-non-closable")
    }, 3000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={openDialogModal} className="w-full">
          Open Dialog Modal
        </Button>
        <Button onClick={openResponsiveModal} variant="outline" className="w-full">
          Open Responsive Modal
        </Button>
        <Button onClick={openLargeModal} variant="secondary" className="w-full">
          Open Large Modal
        </Button>
        <Button onClick={openNonClosableModal} variant="destructive" className="w-full">
          Open Non-Closable Modal
        </Button>
      </div>
      
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-2">Modal Types:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• <strong>Dialog Modal:</strong> Standard modal dialog for desktop</li>
          <li>• <strong>Responsive Modal:</strong> Adapts to mobile (drawer) and desktop (dialog)</li>
          <li>• <strong>Large Modal:</strong> Extra large modal for complex forms</li>
          <li>• <strong>Non-Closable:</strong> Modal that cannot be closed by user interaction</li>
        </ul>
      </div>
    </div>
  )
}

export function ModalDemo() {
  return (
    <div className="space-y-6">
      <ModalDemoContent />
      <ModalManager />
    </div>
  )
}
