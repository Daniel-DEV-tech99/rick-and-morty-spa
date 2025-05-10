import { Skeleton } from "@/components/ui/skeleton"

export default function CharacterLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-40 mb-6" />

      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="aspect-square rounded-xl" />

        <div className="space-y-6">
          <div>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>

          <Skeleton className="h-64 w-full rounded-xl" />

          <div className="flex gap-4">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </div>
  )
}
