import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Character Not Found</h2>
      <p className="text-muted-foreground mb-8">The character you're looking for doesn't exist in this dimension.</p>
      <Button asChild>
        <Link href="/">Return to All Characters</Link>
      </Button>
    </div>
  )
}
