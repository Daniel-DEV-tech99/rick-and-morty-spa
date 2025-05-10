"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-4 mb-6">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        We encountered an error while loading the data. This could be due to a network issue or a problem with the API.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        <Button variant="outline" asChild>
          <a href="/">Go to Home</a>
        </Button>
      </div>
    </div>
  )
}
