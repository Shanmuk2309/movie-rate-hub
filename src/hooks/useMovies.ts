import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Movie, MovieWithRating } from "@/types/movie";

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async (): Promise<MovieWithRating[]> => {
      // Fetch all movies
      const { data: movies, error: moviesError } = await supabase
        .from("movies")
        .select("*")
        .order("release_date", { ascending: false });

      if (moviesError) throw moviesError;

      // Fetch all reviews
      const { data: reviews, error: reviewsError } = await supabase
        .from("reviews")
        .select("movie_id, rating");

      if (reviewsError) throw reviewsError;

      // Calculate average ratings
      const movieRatings = new Map<string, { total: number; count: number }>();
      
      reviews?.forEach((review) => {
        const existing = movieRatings.get(review.movie_id) || { total: 0, count: 0 };
        movieRatings.set(review.movie_id, {
          total: existing.total + Number(review.rating),
          count: existing.count + 1,
        });
      });

      // Combine movies with their ratings
      return (movies as Movie[]).map((movie) => {
        const ratingData = movieRatings.get(movie.id);
        return {
          ...movie,
          averageRating: ratingData ? ratingData.total / ratingData.count : null,
          reviewCount: ratingData?.count || 0,
        };
      });
    },
  });
}

export function useMovie(id: string) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: async (): Promise<MovieWithRating | null> => {
      const { data: movie, error: movieError } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (movieError) throw movieError;
      if (!movie) return null;

      const { data: reviews, error: reviewsError } = await supabase
        .from("reviews")
        .select("rating")
        .eq("movie_id", id);

      if (reviewsError) throw reviewsError;

      const reviewCount = reviews?.length || 0;
      const averageRating = reviewCount > 0
        ? reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviewCount
        : null;

      return {
        ...(movie as Movie),
        averageRating,
        reviewCount,
      };
    },
    enabled: !!id,
  });
}
