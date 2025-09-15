"use client"

import { Map } from "@workspace/custom-ui"
import { useState } from "react"

export function MapDemo() {
  const [selectedLocation, setSelectedLocation] = useState<{latitude: number, longitude: number} | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<string>("")

  const handleLocationSelect = (latitude: number, longitude: number) => {
    setSelectedLocation({ latitude, longitude })
  }

  const handleAddressSelect = (address: string, latitude: number, longitude: number) => {
    setSelectedAddress(address)
  }

  return (
    <div className="space-y-6">
      {/* 1. Basic Usage */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Usage</h3>
        <p className="text-sm text-muted-foreground">
          نقشه پایه با تنظیمات پیش‌فرض
        </p>
        <div className="p-4 border rounded-lg">
          <Map 
            style={{ width: "100%", height: 300 }}
            showConfirmButton={true}
            onLocationSelect={handleLocationSelect}
            onAddressSelect={handleAddressSelect}
          />
        </div>
      </div>

      {/* 2. Different Centers */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Different Centers</h3>
        <p className="text-sm text-muted-foreground">
          نقشه با مراکز مختلف
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">تهران</h4>
            <Map 
              center={{ latitude: 35.6892, longitude: 51.3890 }}
              zoom={12}
              style={{ width: "100%", height: 250 }}
              showConfirmButton={false}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">اصفهان</h4>
            <Map 
              center={{ latitude: 32.6546, longitude: 51.6680 }}
              zoom={12}
              style={{ width: "100%", height: 250 }}
              showConfirmButton={false}
            />
          </div>
        </div>
      </div>

      {/* 3. Different Sizes */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <p className="text-sm text-muted-foreground">
          نقشه با سایزهای مختلف
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Small (200px)</h4>
            <Map 
              style={{ width: "100%", height: 200 }}
              showConfirmButton={false}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Medium (300px)</h4>
            <Map 
              style={{ width: "100%", height: 300 }}
              showConfirmButton={false}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Large (400px)</h4>
            <Map 
              style={{ width: "100%", height: 400 }}
              showConfirmButton={false}
            />
          </div>
        </div>
      </div>

      {/* 4. Different Zoom Levels */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Different Zoom Levels</h3>
        <p className="text-sm text-muted-foreground">
          نقشه با سطوح زوم مختلف
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Zoom 8 (کشور)</h4>
            <Map 
              zoom={8}
              style={{ width: "100%", height: 250 }}
              showConfirmButton={false}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Zoom 13 (شهر)</h4>
            <Map 
              zoom={13}
              style={{ width: "100%", height: 250 }}
              showConfirmButton={false}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Zoom 18 (محله)</h4>
            <Map 
              zoom={18}
              style={{ width: "100%", height: 250 }}
              showConfirmButton={false}
            />
          </div>
        </div>
      </div>

      {/* 5. Interactive Example */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Interactive Example</h3>
        <p className="text-sm text-muted-foreground">
          نقشه تعاملی با نمایش اطلاعات انتخاب شده
        </p>
        <div className="p-4 border rounded-lg space-y-4">
          <Map 
            style={{ width: "100%", height: 350 }}
            showConfirmButton={true}
            onLocationSelect={handleLocationSelect}
            onAddressSelect={handleAddressSelect}
          />
          {selectedLocation && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">اطلاعات انتخاب شده:</h4>
              <div className="space-y-1 text-sm">
                <p><strong>عرض جغرافیایی:</strong> {selectedLocation.latitude.toFixed(6)}</p>
                <p><strong>طول جغرافیایی:</strong> {selectedLocation.longitude.toFixed(6)}</p>
                {selectedAddress && (
                  <p><strong>آدرس:</strong> {selectedAddress}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
