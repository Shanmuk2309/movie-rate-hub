export interface Movie {
  id: string;
  title: string;
  poster_url: string | null;
  actors: string[];
  director: string;
  release_date: string;
  synopsis: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  movie_id: string;
  rating: number;
  created_at: string;
}

export interface MovieWithRating extends Movie {
  averageRating: number | null;
  reviewCount: number;
}
