import { Film } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent shadow-gold">
            <Film className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              CineRate
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Your Movie Rating Hub
            </p>
          </div>
        </div>
        
        <nav className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Discover & Rate Movies
          </span>
        </nav>
      </div>
    </header>
  );
}
