import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Calendar, User, Clapperboard, Star } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { RatingSlider } from "@/components/RatingSlider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { MovieWithRating } from "@/types/movie";

interface MovieDetailProps {
  movie: MovieWithRating;
  onClose: () => void;
}

export function MovieDetail({ movie, onClose }: MovieDetailProps) {
  const [rating, setRating] = useState(7);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitReview = useMutation({
    mutationFn: async (rating: number) => {
      const { error } = await supabase
        .from("reviews")
        .insert({ movie_id: movie.id, rating });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie", movie.id] });
      toast({
        title: "Review Submitted!",
        description: `You rated "${movie.title}" ${rating}/10`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
      console.error("Review submission error:", error);
    },
  });

  const handleSubmit = () => {
    submitReview.mutate(rating);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] overflow-y-auto",
          "bg-card border border-border rounded-2xl shadow-2xl",
          "animate-scale-in"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="flex flex-col md:flex-row">
          {/* Poster */}
          <div className="relative md:w-1/3 shrink-0">
            {movie.poster_url ? (
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-full h-64 md:h-full object-cover md:rounded-l-2xl"
              />
            ) : (
              <div className="w-full h-64 md:h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center md:rounded-l-2xl">
                <span className="text-6xl font-display text-muted-foreground">
                  {movie.title.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:hidden" />
          </div>

          {/* Content */}
          <div className="flex-1 p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {movie.title}
              </h2>
              
              {movie.averageRating !== null && (
                <StarRating
                  rating={movie.averageRating}
                  size="lg"
                  reviewCount={movie.reviewCount}
                />
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{format(new Date(movie.release_date), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clapperboard className="h-4 w-4 text-primary" />
                <span>{movie.director}</span>
              </div>
            </div>

            {/* Synopsis */}
            {movie.synopsis && (
              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold text-foreground">Synopsis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.synopsis}
                </p>
              </div>
            )}

            {/* Cast */}
            <div className="space-y-3">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Cast
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.actors.map((actor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm border border-border"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            {/* Rating Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Rate This Movie
              </h3>
              
              <RatingSlider
                value={rating}
                onChange={setRating}
                disabled={submitReview.isPending}
              />

              <Button
                variant="cinema"
                size="lg"
                onClick={handleSubmit}
                disabled={submitReview.isPending}
                className="w-full"
              >
                {submitReview.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
