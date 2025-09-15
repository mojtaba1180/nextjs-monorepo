"use client"

import { CustomTable } from "@workspace/custom-ui"

export function TableDemo() {
  const sampleData = [
    { id: 1, name: "احمد محمدی", email: "ahmad@example.com", role: "مدیر" },
    { id: 2, name: "فاطمه احمدی", email: "fateme@example.com", role: "کاربر" },
    { id: 3, name: "علی رضایی", email: "ali@example.com", role: "ادمین" },
    { id: 4, name: "زهرا کریمی", email: "zahra@example.com", role: "کاربر" },
    { id: 5, name: "محمد حسینی", email: "mohammad@example.com", role: "مدیر" },
  ]

  const columns = [
    {
      key: "name",
      label: "نام",
    },
    {
      key: "email", 
      label: "ایمیل",
    },
    {
      key: "role",
      label: "نقش",
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === "مدیر" ? "bg-blue-100 text-blue-800" :
          value === "ادمین" ? "bg-green-100 text-green-800" :
          "bg-gray-100 text-gray-800"
        }`}>
          {value}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Usage</h3>
        <div className="p-4 border rounded-lg">
          <CustomTable
            data={sampleData}
            columns={columns}
            pageSize={3}
            totalPages={2}
            currentPage={1}
          />
        </div>
      </div>
    </div>
  )
}
