import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar({ onSearch }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for a movie..."
        className="pl-10 w-full"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}