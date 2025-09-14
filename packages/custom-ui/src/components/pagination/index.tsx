// ============================================================================
// IMPORTS
// ============================================================================

    import {
        Pagination,
        PaginationContent,
        PaginationEllipsis,
        PaginationItem,
        PaginationLink,
        PaginationNext,
        PaginationPrevious,
    } from "@workspace/ui/components/pagination";
  
  // ============================================================================
  // TYPES & INTERFACES
  // ============================================================================
  
  interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }
  
  // ============================================================================
  // COMPONENT
  // ============================================================================
  
  const CustomPagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    // ============================================================================
    // FUNCTIONS
    // ============================================================================
  
    const getPagination = () => {
      const range = 2;
      let pages = [];
  
      if (totalPages <= 6) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
  
      pages.push(1);
  
      if (currentPage > range + 2) {
        pages.push("...");
      }
  
      for (
        let i = Math.max(currentPage - range, 2);
        i <= Math.min(currentPage + range, totalPages - 1);
        i++
      ) {
        pages.push(i);
      }
  
      if (currentPage < totalPages - range - 1) {
        pages.push("...");
      }
  
      if (totalPages > 1) {
        pages.push(totalPages);
      }
  
      return pages;
    };
  
    // ============================================================================
    // RENDER
    // ============================================================================
  
    return (
      <Pagination className="w-full mt-2">
        <PaginationContent className="w-full">
          <PaginationItem className="ml-auto">
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
  
          {getPagination().map((page, i) =>
            page === "..." ? (
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page as number);
                  }}
                  className={
                    page === currentPage ? "bg-primary/10 text-primary" : ""
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
  
          <PaginationItem className="mr-auto">
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  export default CustomPagination;