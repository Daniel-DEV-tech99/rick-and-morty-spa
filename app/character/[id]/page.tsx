import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

async function getCharacter(id: string) {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) {
      if (res.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch character: ${res.status}`)
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching character:", error)
    throw new Error("Failed to load character data")
  }
}

export default async function CharacterPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: {
    from?: string
    name?: string
    status?: string
    species?: string
    gender?: string
  }
}) {
  const character = await getCharacter(params.id)

  if (!character) {
    notFound()
  }

  // Build the back URL with all search parameters
  const buildBackUrl = () => {
    const urlParams = new URLSearchParams()

    if (searchParams.from) urlParams.set("page", searchParams.from)
    if (searchParams.name) urlParams.set("name", searchParams.name)
    if (searchParams.status) urlParams.set("status", searchParams.status)
    if (searchParams.species) urlParams.set("species", searchParams.species)
    if (searchParams.gender) urlParams.set("gender", searchParams.gender)

    const query = urlParams.toString()
    return query ? `/?${query}` : "/"
  }

  const backUrl = buildBackUrl()

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={backUrl} className="inline-flex items-center mb-6 text-primary hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Characters
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{character.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge
                variant={
                  character.status.toLowerCase() === "alive"
                    ? "default"
                    : character.status.toLowerCase() === "dead"
                      ? "destructive"
                      : "secondary"
                }
              >
                {character.status}
              </Badge>
              <Badge variant="outline">{character.species}</Badge>
              {character.type && <Badge variant="outline">{character.type}</Badge>}
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1">Gender</h2>
                <p className="text-lg">{character.gender}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1">Origin</h2>
                <p className="text-lg">{character.origin.name}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1">Last Known Location</h2>
                <p className="text-lg">{character.location.name}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1">First Seen In</h2>
                <p className="text-lg">Episode {character.episode[0].split("/").pop()}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-1">Total Episodes</h2>
                <p className="text-lg">{character.episode.length}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button asChild>
              <Link href={backUrl}>Back to All Characters</Link>
            </Button>
            {character.episode && character.episode.length > 0 && (
              <Button variant="outline" asChild>
                <Link href={character.episode[0]}>View First Episode</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
