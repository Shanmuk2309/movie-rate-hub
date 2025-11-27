import { useState } from "react";
import { Loader2, Film } from "lucide-react";
import { MovieCard } from "@/components/MovieCard";
import { MovieDetail } from "@/components/MovieDetail";
import { useMovies } from "@/hooks/useMovies";
import type { MovieWithRating } from "@/types/movie";

export function MovieGrid() {
  const { data: movies, isLoading, error } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<MovieWithRating | null>(null);

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

  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Film className="h-12 w-12 text-muted-foreground" />
        <p className="text-foreground font-medium">No movies found</p>
        <p className="text-sm text-muted-foreground">Check back soon for new releases</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie, index) => (
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
