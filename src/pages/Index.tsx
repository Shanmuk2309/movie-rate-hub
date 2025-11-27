import { Header } from "@/components/Header";
import { MovieGrid } from "@/components/MovieGrid";
import { Film, Star, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border animate-fade-in">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm text-secondary-foreground">Recently Released</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground animate-fade-in animation-delay-100">
            Discover & Rate
            <span className="block text-gradient-gold">Great Cinema</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg animate-fade-in animation-delay-200">
            Explore the latest releases, share your ratings, and discover what audiences think about today's best films.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 animate-fade-in animation-delay-300">
            <div className="flex items-center gap-2">
              <Film className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">8+ Movies</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">Rate 0-10</span>
            </div>
          </div>
        </section>

        {/* Movies Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Browse Movies
            </h2>
          </div>
          
          <MovieGrid />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 CineRate. Your trusted movie rating platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
