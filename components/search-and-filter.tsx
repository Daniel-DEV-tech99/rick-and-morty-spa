"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchAndFilterProps {
  initialName: string
  initialStatus: string
  initialSpecies: string
  initialGender: string
  currentPage: number
}

export function SearchAndFilter({
  initialName,
  initialStatus,
  initialSpecies,
  initialGender,
  currentPage,
}: SearchAndFilterProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [name, setName] = useState(initialName)
  const [status, setStatus] = useState(initialStatus)
  const [species, setSpecies] = useState(initialSpecies)
  const [gender, setGender] = useState(initialGender)
  const [isSearching, setIsSearching] = useState(false)

  const debouncedName = useDebounce(name, 500)

  // Update URL with search and filter parameters
  const updateURL = (params: Record<string, string | undefined>) => {
    const searchParams = new URLSearchParams()

    // Only add parameters that have values
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, value)
    })

    // Reset to page 1 when filters change
    if (
      currentPage > 1 &&
      (params.name !== initialName ||
        params.status !== initialStatus ||
        params.species !== initialSpecies ||
        params.gender !== initialGender)
    ) {
      searchParams.set("page", "1")
    } else if (currentPage > 1) {
      searchParams.set("page", currentPage.toString())
    }

    const query = searchParams.toString()
    const url = query ? `${pathname}?${query}` : pathname

    router.push(url)
    setIsSearching(false)
  }

  // Handle search input changes with debounce
  useEffect(() => {
    if (debouncedName !== initialName) {
      updateURL({
        name: debouncedName,
        status,
        species,
        gender,
      })
    }
  }, [debouncedName])

  // Handle status, species, and gender filter changes
  const handleFilterChange = (type: "status" | "species" | "gender", value: string) => {
    if (type === "status") setStatus(value)
    if (type === "species") setSpecies(value)
    if (type === "gender") setGender(value)

    updateURL({
      name,
      status: type === "status" ? value : status,
      species: type === "species" ? value : species,
      gender: type === "gender" ? value : gender,
    })
  }

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    setIsSearching(true)
  }

  // Clear all filters
  const clearFilters = () => {
    setName("")
    setStatus("")
    setSpecies("")
    setGender("")
    router.push(pathname)
  }

  // Check if any filters are active
  const hasActiveFilters = name || status || species || gender

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search characters by name..."
          value={name}
          onChange={handleSearchChange}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {isSearching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select value={status} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Status</SelectItem>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

        <Select value={species} onValueChange={(value) => handleFilterChange("species", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Species" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Species</SelectItem>
            <SelectItem value="human">Human</SelectItem>
            <SelectItem value="alien">Alien</SelectItem>
            <SelectItem value="humanoid">Humanoid</SelectItem>
            <SelectItem value="poopybutthole">Poopybutthole</SelectItem>
            <SelectItem value="mythological">Mythological</SelectItem>
            <SelectItem value="animal">Animal</SelectItem>
            <SelectItem value="robot">Robot</SelectItem>
            <SelectItem value="cronenberg">Cronenberg</SelectItem>
          </SelectContent>
        </Select>

        <Select value={gender} onValueChange={(value) => handleFilterChange("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Gender</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-center">
          <Button variant="outline" size="sm" onClick={clearFilters} className="flex items-center gap-1">
            <X className="h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
