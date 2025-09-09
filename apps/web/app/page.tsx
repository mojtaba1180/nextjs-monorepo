"use client"

import { Button } from "@workspace/ui/components/button"
import { CustomButton, useToggle, useLocalStorage, useModal } from "@workspace/custom-ui"
import { useState } from "react"

export default function Page() {
  const [isToggled, toggle] = useToggle(false)
  const [name, setName, removeName] = useLocalStorage("user-name", "")
  const [inputValue, setInputValue] = useState("")
  const { openModal, closeModal } = useModal()

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-bold">Modal System Demo</h1>
        
        {/* Modal Examples */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Modal Examples</h2>
          
          {/* Dialog Modal */}
          <CustomButton 
            onClick={() => openModal({
              id: "dialog-example",
              type: "dialog",
              title: "Dialog Modal",
              description: "This is a simple dialog modal example",
              view: (
                <div className="space-y-4">
                  <p>This is the content of the dialog modal.</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => closeModal("dialog-example")}>
                      Close
                    </Button>
                    <Button size="sm" variant="outline">
                      Action
                    </Button>
                  </div>
                </div>
              ),
              size: "md"
            })}
          >
            Open Dialog Modal
          </CustomButton>
          
          {/* Responsive Modal */}
          <CustomButton 
            onClick={() => openModal({
              id: "responsive-example",
              type: "responsive",
              title: "Responsive Modal",
              description: "This modal becomes a drawer on mobile and dialog on desktop",
              view: (
                <div className="space-y-4">
                  <p>This modal adapts to screen size:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>On mobile: Shows as a drawer from bottom</li>
                    <li>On desktop: Shows as a centered dialog</li>
                  </ul>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => closeModal("responsive-example")}>
                      Close
                    </Button>
                    <Button size="sm" variant="outline">
                      Save
                    </Button>
                  </div>
                </div>
              ),
              size: "lg"
            })}
          >
            Open Responsive Modal
          </CustomButton>
          
          {/* Large Modal */}
          <CustomButton 
            onClick={() => openModal({
              id: "large-example",
              type: "dialog",
              title: "Large Modal",
              description: "This is a large modal with more content",
              view: (
                <div className="space-y-4">
                  <p>This is a large modal example with more content.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded">
                      <h3 className="font-semibold">Section 1</h3>
                      <p className="text-sm text-gray-600">Some content here</p>
                    </div>
                    <div className="p-4 border rounded">
                      <h3 className="font-semibold">Section 2</h3>
                      <p className="text-sm text-gray-600">More content here</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => closeModal("large-example")}>
                      Close
                    </Button>
                    <Button size="sm" variant="outline">
                      Cancel
                    </Button>
                    <Button size="sm">
                      Confirm
                    </Button>
                  </div>
                </div>
              ),
              size: "xl"
            })}
          >
            Open Large Modal
          </CustomButton>
        </div>
        
        {/* Original Button */}
        <Button size="sm">Original Button</Button>
        
        {/* Custom Button */}
        <CustomButton size="sm">Custom Button</CustomButton>
        
        {/* Toggle Hook Demo */}
        <div className="flex flex-col items-center gap-2">
          <CustomButton 
            variant={isToggled ? "destructive" : "outline"}
            onClick={toggle}
          >
            {isToggled ? "ON" : "OFF"}
          </CustomButton>
          <p className="text-sm text-gray-600">
            Toggle State: {isToggled ? "ON" : "OFF"}
          </p>
        </div>
        
        {/* LocalStorage Hook Demo */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="px-3 py-1 border rounded"
            />
            <CustomButton 
              size="sm" 
              onClick={() => setName(inputValue)}
              disabled={!inputValue}
            >
              Save
            </CustomButton>
            <CustomButton 
              size="sm" 
              variant="outline"
              onClick={removeName}
            >
              Clear
            </CustomButton>
          </div>
          {name && (
            <p className="text-sm text-gray-600">
              Saved Name: {name}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
