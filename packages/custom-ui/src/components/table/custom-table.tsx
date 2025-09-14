// ============================================================================
// IMPORTS
// ============================================================================

import type React from "react";
import { useEffect, useState } from "react";


import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import CustomPagination from "../pagination";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Column<T = any> {
  key: string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface CustomTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  onSort?: (key: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

function CustomTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 5,
  totalItems,
  totalPages,
  currentPage = 1,
  onSort,
}: CustomTableProps<T>) {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================

  const [localPage, setLocalPage] = useState(currentPage);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    setLocalPage(currentPage);
  }, [currentPage]);

  // ============================================================================
  // FUNCTIONS
  // ============================================================================

  const paginatedData = data.slice(
    (localPage - 1) * pageSize,
    localPage * pageSize
  );

  const toggleRowSelection = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="w-full p-4 shadow-sm rtl">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">
              <Checkbox
                checked={
                  paginatedData.length > 0 &&
                  selectedRows.size === paginatedData.length
                }
                onCheckedChange={() => {
                  if (selectedRows.size === paginatedData.length) {
                    setSelectedRows(new Set());
                  } else {
                    const allSelected = paginatedData.map(
                      (_, i) => i + (localPage - 1) * pageSize
                    );
                    setSelectedRows(new Set(allSelected));
                  }
                }}
              />
            </TableHead>
            {columns.map((col) => (
              <TableHead
                className="text-right"
                key={col.key}
                onClick={() => onSort?.(col.key)}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => {
              const globalIndex = index + (localPage - 1) * pageSize;
              return (
                <TableRow key={globalIndex}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(globalIndex)}
                      onCheckedChange={() => toggleRowSelection(globalIndex)}
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      <div className="overflow-hidden">
                        {col.render
                          ? col.render((row as any)[col.key], row)
                          : (row as any)[col.key]}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-[50vh] text-center"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 mb-2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span className="text-gray-500 font-medium">موردی یافت نشد</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages && totalPages > 1 && (
        <CustomPagination
          totalPages={totalPages}
          currentPage={localPage}
          onPageChange={setLocalPage}
        />
      )}
    </div>
  );
}

export default CustomTable;