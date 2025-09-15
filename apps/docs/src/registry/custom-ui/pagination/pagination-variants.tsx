"use client"

import { CustomPagination } from "@workspace/custom-ui"

export function PaginationVariantsDemo() {
  return (
    <div className="space-y-6">
      {/* 1. Small Page Count */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Small Page Count (≤6 pages)</h3>
        <div className="p-4 border rounded-lg">
          <CustomPagination
            totalPages={4}
            currentPage={2}
            onPageChange={() => {}}
          />
        </div>
      </div>

      {/* 2. Medium Page Count */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Medium Page Count (7-15 pages)</h3>
        <div className="p-4 border rounded-lg">
          <CustomPagination
            totalPages={12}
            currentPage={6}
            onPageChange={() => {}}
          />
        </div>
      </div>

      {/* 3. Large Page Count */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Large Page Count (15+ pages)</h3>
        <div className="p-4 border rounded-lg">
          <CustomPagination
            totalPages={50}
            currentPage={25}
            onPageChange={() => {}}
          />
        </div>
      </div>

      {/* 4. Near Beginning */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Near Beginning</h3>
        <div className="p-4 border rounded-lg">
          <CustomPagination
            totalPages={30}
            currentPage={3}
            onPageChange={() => {}}
          />
        </div>
      </div>

      {/* 5. Near End */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Near End</h3>
        <div className="p-4 border rounded-lg">
          <CustomPagination
            totalPages={30}
            currentPage={28}
            onPageChange={() => {}}
          />
        </div>
      </div>

      {/* 6. Middle Range */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Middle Range</h3>
        <div className="p-4 border rounded-lg">
          <CustomPagination
            totalPages={30}
            currentPage={15}
            onPageChange={() => {}}
          />
        </div>
      </div>

      {/* 7. Very Large Dataset */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Very Large Dataset</h3>
        <div className="p-4 border rounded-lg">
          <CustomPagination
            totalPages={100}
            currentPage={50}
            onPageChange={() => {}}
          />
        </div>
      </div>

      {/* 8. Single Page */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Single Page</h3>
        <div className="p-4 border rounded-lg">
          <CustomPagination
            totalPages={1}
            currentPage={1}
            onPageChange={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
