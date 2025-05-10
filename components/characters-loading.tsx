import { Skeleton } from "@/components/ui/skeleton"

export function CharactersLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <Skeleton className="h-64 w-full rounded-b-none" />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
          <div className="p-4 pt-0">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
