"use client"

import { Map } from "@workspace/custom-ui"
import { useState } from "react"

export function MapVariantsDemo() {
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
      {/* 1. With Confirm Button */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">With Confirm Button</h3>
        <p className="text-sm text-muted-foreground">
          نقشه با دکمه تایید مکان و نمایش آدرس
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

      {/* 2. Without Confirm Button */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Without Confirm Button</h3>
        <p className="text-sm text-muted-foreground">
          نقشه بدون دکمه تایید - فقط برای نمایش
        </p>
        <div className="p-4 border rounded-lg">
          <Map 
            style={{ width: "100%", height: 300 }}
            showConfirmButton={false}
          />
        </div>
      </div>

      {/* 3. With Custom Address */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">With Custom Address</h3>
        <p className="text-sm text-muted-foreground">
          نقشه با آدرس از پیش تعریف شده
        </p>
        <div className="p-4 border rounded-lg">
          <Map 
            style={{ width: "100%", height: 300 }}
            showConfirmButton={true}
            address="تهران، خیابان ولیعصر، پلاک 123"
            onLocationSelect={handleLocationSelect}
            onAddressSelect={handleAddressSelect}
          />
        </div>
      </div>

      {/* 4. Different Cities */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Different Cities</h3>
        <p className="text-sm text-muted-foreground">
          نقشه شهرهای مختلف ایران
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">رشت (پیش‌فرض)</h4>
            <Map 
              center={{ latitude: 37.2809, longitude: 49.5924 }}
              zoom={13}
              style={{ width: "100%", height: 200 }}
              showConfirmButton={false}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">مشهد</h4>
            <Map 
              center={{ latitude: 36.2605, longitude: 59.6168 }}
              zoom={13}
              style={{ width: "100%", height: 200 }}
              showConfirmButton={false}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">شیراز</h4>
            <Map 
              center={{ latitude: 29.5918, longitude: 52.5837 }}
              zoom={13}
              style={{ width: "100%", height: 200 }}
              showConfirmButton={false}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">تبریز</h4>
            <Map 
              center={{ latitude: 38.0808, longitude: 46.2919 }}
              zoom={13}
              style={{ width: "100%", height: 200 }}
              showConfirmButton={false}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">کرمان</h4>
            <Map 
              center={{ latitude: 30.2839, longitude: 57.0834 }}
              zoom={13}
              style={{ width: "100%", height: 200 }}
              showConfirmButton={false}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">اهواز</h4>
            <Map 
              center={{ latitude: 31.3183, longitude: 48.6706 }}
              zoom={13}
              style={{ width: "100%", height: 200 }}
              showConfirmButton={false}
            />
          </div>
        </div>
      </div>

      {/* 5. Custom Styling */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Custom Styling</h3>
        <p className="text-sm text-muted-foreground">
          نقشه با استایل‌های سفارشی
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">با Border</h4>
            <Map 
              style={{ width: "100%", height: 250, border: "2px solid #3b82f6", borderRadius: "8px" }}
              showConfirmButton={false}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">با Shadow</h4>
            <Map 
              style={{ width: "100%", height: 250, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
              showConfirmButton={false}
            />
          </div>
        </div>
      </div>

      {/* 6. Interactive with State */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Interactive with State</h3>
        <p className="text-sm text-muted-foreground">
          نقشه تعاملی با مدیریت state کامل
        </p>
        <div className="p-4 border rounded-lg space-y-4">
          <Map 
            style={{ width: "100%", height: 350 }}
            showConfirmButton={true}
            onLocationSelect={handleLocationSelect}
            onAddressSelect={handleAddressSelect}
          />
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-900">اطلاعات انتخاب شده:</h4>
            {selectedLocation ? (
              <div className="space-y-1 text-sm text-blue-800">
                <p><strong>عرض جغرافیایی:</strong> {selectedLocation.latitude.toFixed(6)}</p>
                <p><strong>طول جغرافیایی:</strong> {selectedLocation.longitude.toFixed(6)}</p>
                {selectedAddress && (
                  <p><strong>آدرس:</strong> {selectedAddress}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-blue-600">هنوز مکانی انتخاب نشده است</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
