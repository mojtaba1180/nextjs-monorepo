"use client"

import { useState } from "react"
import { CustomPagination } from "@workspace/custom-ui"

export function PaginationDemo() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)

  return (
    <div className="space-y-6">
      {/* 1. Basic Usage */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Usage</h3>
        <div className="p-4 border rounded-lg">
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* 2. Different Page Counts */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Different Page Counts</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Few pages (5 pages)</p>
            <CustomPagination
              totalPages={5}
              currentPage={3}
              onPageChange={() => {}}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Many pages (25 pages)</p>
            <CustomPagination
              totalPages={25}
              currentPage={12}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </div>

      {/* 3. Edge Cases */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Edge Cases</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">First page</p>
            <CustomPagination
              totalPages={10}
              currentPage={1}
              onPageChange={() => {}}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Last page</p>
            <CustomPagination
              totalPages={10}
              currentPage={10}
              onPageChange={() => {}}
            />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Single page</p>
            <CustomPagination
              totalPages={1}
              currentPage={1}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </div>

      {/* 4. Interactive Example */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Interactive Example</h3>
        <div className="p-4 border rounded-lg space-y-4">
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium">Total Pages:</label>
            <select
              value={totalPages}
              onChange={(e) => setTotalPages(Number(e.target.value))}
              className="px-3 py-1 border rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium">Current Page:</label>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="px-3 py-1 border rounded w-20"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Showing page {currentPage} of {totalPages}
          </div>
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* 5. Real-world Example */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Real-world Example</h3>
        <div className="p-4 border rounded-lg space-y-4">
          <div className="text-sm text-muted-foreground">
            Product Catalog - Page {currentPage} of {totalPages}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="p-3 border rounded bg-muted/20">
                <div className="h-20 bg-muted rounded mb-2"></div>
                <div className="text-sm">Product {((currentPage - 1) * 6) + i + 1}</div>
              </div>
            ))}
          </div>
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}
