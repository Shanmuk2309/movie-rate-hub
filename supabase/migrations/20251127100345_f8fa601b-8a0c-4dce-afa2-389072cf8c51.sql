-- Create movies table
CREATE TABLE public.movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  poster_url TEXT,
  actors TEXT[] NOT NULL DEFAULT '{}',
  director VARCHAR(255) NOT NULL,
  release_date DATE NOT NULL,
  synopsis TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  movie_id UUID NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
  rating DECIMAL(3,1) NOT NULL CHECK (rating >= 0 AND rating <= 10),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Movies are publicly readable
CREATE POLICY "Movies are viewable by everyone" 
ON public.movies 
FOR SELECT 
USING (true);

-- Reviews are publicly readable
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews 
FOR SELECT 
USING (true);

-- Anyone can submit reviews (anonymous reviews allowed)
CREATE POLICY "Anyone can submit reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster movie lookups
CREATE INDEX idx_reviews_movie_id ON public.reviews(movie_id);
CREATE INDEX idx_movies_release_date ON public.movies(release_date DESC);

-- Insert sample movies
INSERT INTO public.movies (title, poster_url, actors, director, release_date, synopsis) VALUES
('Dune: Part Two', 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg', ARRAY['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Josh Brolin', 'Austin Butler'], 'Denis Villeneuve', '2024-03-01', 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.'),
('Oppenheimer', 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', ARRAY['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.', 'Florence Pugh'], 'Christopher Nolan', '2023-07-21', 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'),
('The Batman', 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', ARRAY['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Jeffrey Wright', 'Colin Farrell'], 'Matt Reeves', '2022-03-04', 'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.'),
('Everything Everywhere All at Once', 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', ARRAY['Michelle Yeoh', 'Stephanie Hsu', 'Ke Huy Quan', 'Jamie Lee Curtis', 'James Hong'], 'Daniel Kwan', '2022-03-25', 'A middle-aged Chinese immigrant is swept up in an insane adventure where she alone can save existence.'),
('Interstellar', 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', ARRAY['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine', 'Matt Damon'], 'Christopher Nolan', '2014-11-07', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.'),
('Inception', 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg', ARRAY['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy', 'Marion Cotillard'], 'Christopher Nolan', '2010-07-16', 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.'),
('Parasite', 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', ARRAY['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik', 'Park So-dam'], 'Bong Joon-ho', '2019-05-30', 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.'),
('The Godfather', 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', ARRAY['Marlon Brando', 'Al Pacino', 'James Caan', 'Robert Duvall', 'Diane Keaton'], 'Francis Ford Coppola', '1972-03-24', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.');