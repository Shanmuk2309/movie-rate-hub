import { Calendar, Star } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { MovieWithRating } from "@/types/movie";

interface MovieCardProps {
  movie: MovieWithRating;
  onClick: () => void;
  index: number;
}

export function MovieCard({ movie, onClick, index }: MovieCardProps) {
  const releaseYear = format(new Date(movie.release_date), "yyyy");

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border",
        "transition-all duration-500 hover:scale-[1.02] hover:shadow-poster hover:border-primary/30",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        "animate-fade-in opacity-0"
      )}
      style={{ animationDelay: `${index * 75}ms` }}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        {movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <span className="text-4xl font-display text-muted-foreground">
              {movie.title.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        
        {/* Rating Badge */}
        {movie.averageRating !== null && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-background/90 backdrop-blur-sm px-2.5 py-1.5 shadow-lg">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm font-bold text-foreground">
              {movie.averageRating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Hover Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2 text-left group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{releaseYear}</span>
          <span className="text-border">•</span>
          <span>{movie.director}</span>
        </div>

        {movie.reviewCount > 0 && (
          <p className="text-xs text-muted-foreground">
            {movie.reviewCount} {movie.reviewCount === 1 ? "review" : "reviews"}
          </p>
        )}
      </div>
    </button>
  );
}
