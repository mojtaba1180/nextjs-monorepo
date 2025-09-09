"use client"

import { Button } from "@workspace/ui/components/button"
import { CustomButton, useToggle, useLocalStorage } from "@workspace/custom-ui"
import { useState } from "react"

export default function Page() {
  const [isToggled, toggle] = useToggle(false)
  const [name, setName, removeName] = useLocalStorage("user-name", "")
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-bold">Hello World</h1>
        
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
