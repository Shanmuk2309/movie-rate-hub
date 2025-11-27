import { useState } from "react";
import { Loader2, Film } from "lucide-react";
import { MovieCard } from "@/components/MovieCard";
import { MovieDetail } from "@/components/MovieDetail";
import { useMovies } from "@/hooks/useMovies";
import type { MovieWithRating } from "@/types/movie";
import { SearchBar } from "./SearchBar";

export function MovieGrid() {
  const { data: movies, isLoading, error } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<MovieWithRating | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies =
    movies?.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Film className="h-12 w-12 text-muted-foreground" />
        <p className="text-destructive">Failed to load movies</p>
        <p className="text-sm text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {filteredMovies.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Film className="h-12 w-12 text-muted-foreground" />
          <p className="text-foreground font-medium">No movies found</p>
          <p className="text-sm text-muted-foreground">
            Try a different search term.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredMovies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => setSelectedMovie(movie)}
            index={index}
          />
        ))}
      </div>

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}