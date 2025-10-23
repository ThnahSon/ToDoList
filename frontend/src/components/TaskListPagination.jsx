import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const TaskListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  page,
  totalPages,
}) => {
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 1) return [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page, "...", totalPages);
      }
    }

    return pages;
  };

  const pagesToShow = generatePages();

  if (totalPages <= 1) return null;

  return (
    <div className="w-full lg:w-auto flex justify-center">
      <div className={cn(
        "bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl",
        "shadow-lg border-2 border-gray-200",
        "px-3 sm:px-4 py-2 sm:py-3"
      )}>
        <Pagination>
          <PaginationContent className="gap-1 sm:gap-2">
            {/* First Page - Hidden on mobile */}
            <PaginationItem className="hidden sm:block">
              <button
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
                className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  "hover:bg-purple-50 hover:text-purple-600 hover:scale-110",
                  page === 1 && "opacity-50 cursor-not-allowed"
                )}
              >
                <ChevronsLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </PaginationItem>

            {/* Previous */}
            <PaginationItem>
              <PaginationPrevious
                onClick={page === 1 ? undefined : handlePrev}
                className={cn(
                  "cursor-pointer transition-all duration-300",
                  "hover:bg-purple-50 hover:text-purple-600 rounded-xl",
                  "px-2 sm:px-3",
                  page === 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {pagesToShow.map((p, index) => (
              <PaginationItem key={index} className={cn(
                p === "..." && "hidden sm:block"
              )}>
                {p === "..." ? (
                  <PaginationEllipsis className="text-gray-400" />
                ) : (
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => {
                      if (p !== page) handlePageChange(p);
                    }}
                    className={cn(
                      "cursor-pointer transition-all duration-300 rounded-xl",
                      "w-8 h-8 sm:w-10 sm:h-10",
                      "text-sm sm:text-base font-medium",
                      p === page
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:shadow-lg scale-110"
                        : "hover:bg-purple-50 hover:text-purple-600 hover:scale-105"
                    )}
                  >
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                onClick={page === totalPages ? undefined : handleNext}
                className={cn(
                  "cursor-pointer transition-all duration-300",
                  "hover:bg-purple-50 hover:text-purple-600 rounded-xl",
                  "px-2 sm:px-3",
                  page === totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>

            {/* Last Page - Hidden on mobile */}
            <PaginationItem className="hidden sm:block">
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={page === totalPages}
                className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  "hover:bg-purple-50 hover:text-purple-600 hover:scale-110",
                  page === totalPages && "opacity-50 cursor-not-allowed"
                )}
              >
                <ChevronsRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TaskListPagination;