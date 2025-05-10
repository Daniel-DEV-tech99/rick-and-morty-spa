"use client"

import { useRouter, usePathname } from "next/navigation"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  searchParams: {
    name?: string
    status?: string
    species?: string
    gender?: string
  }
}

export function PaginationControls({ currentPage, totalPages, searchParams }: PaginationControlsProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Create URL with current search/filter params and new page
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams()

    // Add current search and filter params
    if (searchParams.name) params.set("name", searchParams.name)
    if (searchParams.status) params.set("status", searchParams.status)
    if (searchParams.species) params.set("species", searchParams.species)
    if (searchParams.gender) params.set("gender", searchParams.gender)

    // Add page number
    params.set("page", pageNumber.toString())

    return `${pathname}?${params.toString()}`
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    router.push(createPageURL(page))
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 0) return []

    const pageNumbers = []

    // Always show first page
    pageNumbers.push(1)

    // Calculate range around current page
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pageNumbers.push("ellipsis-start")
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push("ellipsis-end")
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col items-center my-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={createPageURL(Math.max(1, currentPage - 1))}
              onClick={(e) => {
                if (currentPage > 1) {
                  e.preventDefault()
                  handlePageChange(currentPage - 1)
                }
              }}
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {pageNumbers.map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={`page-${page}`}>
                <PaginationLink
                  href={createPageURL(page)}
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(Number(page))
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              href={createPageURL(Math.min(totalPages, currentPage + 1))}
              onClick={(e) => {
                if (currentPage < totalPages) {
                  e.preventDefault()
                  handlePageChange(currentPage + 1)
                }
              }}
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
