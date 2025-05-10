import { CharacterCard } from "@/components/character-card";
import { PaginationControls } from "@/components/pagination-controls";
import { SearchAndFilter } from "@/components/search-and-filter";
import { Suspense } from "react";
import { CharactersLoading } from "@/components/characters-loading";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

async function getCharacters(params: {
  page?: string;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}) {
  const { page = "1", name, status, species, gender } = params;

  // Build query string from parameters
  const queryParams = new URLSearchParams();
  queryParams.append("page", page);
  if (name) queryParams.append("name", name);
  if (status) queryParams.append("status", status);
  if (species) queryParams.append("species", species);
  if (gender) queryParams.append("gender", gender);

  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?${queryParams.toString()}`
    );
    if (!res.ok) {
      if (res.status === 404) {
        // API returns 404 when no results match the filters
        return { results: [], info: { pages: 0, count: 0 } };
      }
      throw new Error(`Failed to fetch characters: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching characters:", error);
    return { results: [], info: { pages: 0, count: 0 }, error: true };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: {
    page?: string;
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
  };
}) {
  const data = await getCharacters(searchParams);
  const characters = data.results || [];
  const info = data.info || { pages: 0, count: 0 };
  const hasError = data.error;
  const currentPage = Number(searchParams.page) || 1;
  const noResults = characters.length === 0 && !hasError;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Rick and Morty Universe</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Explore characters from the multiverse of Rick and Morty. Search,
          filter, and click on any character to view more details.
        </p>

        <SearchAndFilter
          initialName={searchParams.name || ""}
          initialStatus={searchParams.status || ""}
          initialSpecies={searchParams.species || ""}
          initialGender={searchParams.gender || ""}
          currentPage={currentPage}
        />
      </div>

      {hasError && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was a problem fetching the characters. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {noResults && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">No characters found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      <Suspense fallback={<CharactersLoading />}>
        {characters.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  searchParams={searchParams}
                />
              ))}
            </div>

            <PaginationControls
              currentPage={currentPage}
              totalPages={info.pages}
              searchParams={searchParams}
            />

            <div className="text-center text-sm text-muted-foreground mt-4">
              Showing {characters.length} of {info.count} characters
            </div>
          </>
        )}
      </Suspense>
    </main>
  );
}
