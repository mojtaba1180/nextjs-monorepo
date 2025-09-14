"use client"

import { Button } from "@workspace/ui/components/button"
import { CustomButton, useToggle, useLocalStorage, useModal, ErrorManagementExample, Map, ThemeToggle, ThemeToggleWithText, CustomPagination, CustomTable } from "@workspace/custom-ui"
import { FormExample } from "@/components/form-example"
import { useState } from "react"

export default function Page() {
  const [isToggled, toggle] = useToggle(false)
  const [name, setName, removeName] = useLocalStorage("user-name", "")
  const [inputValue, setInputValue] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<{latitude: number, longitude: number} | null>(null)
  const [selectedAddress, setSelectedAddress] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [tableCurrentPage, setTableCurrentPage] = useState(1)
  const { openModal, closeModal } = useModal()

  // Sample data for table
  const sampleTableData = [
    { id: 1, name: "احمد محمدی", email: "ahmad@example.com", role: "مدیر", status: "فعال" },
    { id: 2, name: "فاطمه احمدی", email: "fateme@example.com", role: "کاربر", status: "غیرفعال" },
    { id: 3, name: "علی رضایی", email: "ali@example.com", role: "ویرایشگر", status: "فعال" },
    { id: 4, name: "زهرا کریمی", email: "zahra@example.com", role: "کاربر", status: "فعال" },
    { id: 5, name: "محمد حسینی", email: "mohammad@example.com", role: "مدیر", status: "غیرفعال" },
    { id: 6, name: "نرگس موسوی", email: "narges@example.com", role: "کاربر", status: "فعال" },
    { id: 7, name: "حسن نوری", email: "hasan@example.com", role: "ویرایشگر", status: "فعال" },
    { id: 8, name: "مریم صادقی", email: "maryam@example.com", role: "کاربر", status: "غیرفعال" },
  ]

  const tableColumns = [
    { key: "name", label: "نام" },
    { key: "email", label: "ایمیل" },
    { key: "role", label: "نقش" },
    { 
      key: "status", 
      label: "وضعیت",
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === "فعال" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {value}
        </span>
      )
    },
  ]

  return (
    <div className="min-h-svh">
      <div className="flex flex-col items-center justify-center gap-8 p-8">
        <div className="flex items-center justify-between w-full max-w-4xl">
          <h1 className="text-2xl font-bold">Modal System Demo</h1>
          <div className="flex gap-2">
            <ThemeToggle />
            <ThemeToggleWithText />
          </div>
        </div>
        
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

        {/* Theme Toggle Examples */}
        <div className="w-full space-y-6">
          <h2 className="text-lg font-semibold">Theme Toggle Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Icon Only Theme Toggle */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">Icon Only Theme Toggle</h3>
              <div className="flex gap-4 items-center">
                <ThemeToggle />
                <ThemeToggle variant="ghost" />
                <ThemeToggle variant="secondary" />
                <ThemeToggle size="sm" />
                <ThemeToggle size="lg" />
              </div>
              <p className="text-sm text-muted-foreground">
                Different variants and sizes of icon-only theme toggle
              </p>
            </div>

            {/* Text Theme Toggle */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">Text Theme Toggle</h3>
              <div className="flex gap-4 items-center">
                <ThemeToggleWithText />
                <ThemeToggleWithText variant="ghost" />
                <ThemeToggleWithText variant="secondary" />
                <ThemeToggleWithText size="sm" />
                <ThemeToggleWithText size="lg" />
              </div>
              <p className="text-sm text-muted-foreground">
                Theme toggle with text labels showing current theme
              </p>
            </div>
          </div>

          {/* Theme Toggle in Different Contexts */}
          <div className="space-y-4">
            <h3 className="text-md font-medium">Theme Toggle in Different Contexts</h3>
            
            {/* In Card */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Settings Card</h4>
                  <p className="text-sm text-muted-foreground">Toggle theme from settings</p>
                </div>
                <ThemeToggle />
              </div>
            </div>

            {/* In Navigation */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Navigation</span>
                  <span className="text-sm text-muted-foreground">Home</span>
                  <span className="text-sm text-muted-foreground">About</span>
                </div>
                <ThemeToggleWithText size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Example */}
        <div className="w-full">
          <FormExample />
        </div>

        {/* Error Management Example */}
        <div className="w-full">
          <ErrorManagementExample />
        </div>

        {/* Map Examples */}
        <div className="w-full space-y-6">
          <h2 className="text-lg font-semibold">Map Components</h2>
          
        
          {/* Inline Map Example */}
          <div className="space-y-2">
            <h3 className="text-md font-medium">Inline Map</h3>
            <div className="border rounded-lg overflow-hidden">
              <Map
                center={{ latitude: 35.6892, longitude: 51.3890 }} // تهران
                zoom={12}
                style={{ width: "100%", height: 400 }}
                onLocationSelect={(lat: number, lng: number) => {
                  setSelectedLocation({ latitude: lat, longitude: lng })
                  console.log("Selected location:", lat, lng)
                }}
                onAddressSelect={(address: string, lat: number, lng: number) => {
                  setSelectedAddress(address)
                  console.log("Selected address:", address, lat, lng)
                }}
                showConfirmButton={true}
              />
            </div>
            
            {/* Display selected location info */}
            {selectedLocation && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Selected Location:</h4>
                <p className="text-sm text-gray-600">
                  Latitude: {selectedLocation.latitude.toFixed(6)}
                </p>
                <p className="text-sm text-gray-600">
                  Longitude: {selectedLocation.longitude.toFixed(6)}
                </p>
                {selectedAddress && (
                  <p className="text-sm text-gray-600 mt-1">
                    Address: {selectedAddress}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Map in Modal Example */}
          <div className="space-y-2">
            <h3 className="text-md font-medium">Map in Modal</h3>
            <CustomButton 
              onClick={() => openModal({
                id: "map-modal-example",
                type: "dialog",
                title: "Map Selection",
                description: "Select a location on the map",
                view: (
                  <div className="space-y-4">
                    <Map
                      center={{ latitude: 36.2605, longitude: 59.6168 }} // مشهد
                      zoom={13}
                      style={{ width: "100%", height: 400 }}
                      onLocationSelect={(lat: number, lng: number) => {
                        setSelectedLocation({ latitude: lat, longitude: lng })
                        console.log("Modal map location:", lat, lng)
                      }}
                      onAddressSelect={(address: string, lat: number, lng: number) => {
                        setSelectedAddress(address)
                        console.log("Modal map address:", address, lat, lng)
                      }}
                      showConfirmButton={true}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => closeModal("map-modal-example")}>
                        Close
                      </Button>
                      <Button size="sm" variant="outline">
                        Use Location
                      </Button>
                    </div>
                  </div>
                ),
                size: "xl"
              })}
            >
              Open Map in Modal
            </CustomButton>
          </div>
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

        {/* Pagination Example */}
        <div className="w-full space-y-6">
          <h2 className="text-lg font-semibold">Pagination Component</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">Custom Pagination</h3>
              <p className="text-sm text-muted-foreground">
                Current Page: {currentPage} of 10
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <CustomPagination
                totalPages={10}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>This pagination component includes:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Previous/Next navigation buttons</li>
                <li>Smart page number display with ellipsis</li>
                <li>Responsive design</li>
                <li>Custom styling for active page</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Table Example */}
        <div className="w-full space-y-6">
          <h2 className="text-lg font-semibold">Table Component</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">Custom Table with Pagination</h3>
              <p className="text-sm text-muted-foreground">
                Showing {sampleTableData.length} users
              </p>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <CustomTable
                data={sampleTableData}
                columns={tableColumns}
                pageSize={4}
                totalPages={Math.ceil(sampleTableData.length / 4)}
                currentPage={tableCurrentPage}
                onSort={(key) => {
                  console.log("Sort by:", key)
                }}
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>This table component includes:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Row selection with checkboxes</li>
                <li>Custom column rendering</li>
                <li>Built-in pagination</li>
                <li>Sort functionality (click column headers)</li>
                <li>Empty state handling</li>
                <li>RTL support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
