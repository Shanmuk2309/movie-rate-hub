import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 10,
  size = "md",
  showValue = true,
  reviewCount,
  className,
}: StarRatingProps) {
  // Convert 0-10 rating to 0-5 stars
  const starRating = (rating / maxRating) * 5;
  const fullStars = Math.floor(starRating);
  const partialFill = starRating - fullStars;

  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => {
          const isFull = index < fullStars;
          const isPartial = index === fullStars && partialFill > 0;

          return (
            <div key={index} className="relative">
              {/* Background star (empty) */}
              <Star
                className={cn(sizeClasses[size], "text-muted-foreground/30")}
                fill="currentColor"
              />
              {/* Filled overlay */}
              {(isFull || isPartial) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isPartial ? `${partialFill * 100}%` : "100%" }}
                >
                  <Star
                    className={cn(sizeClasses[size], "text-primary")}
                    fill="currentColor"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className={cn("font-semibold text-foreground", textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-muted-foreground text-sm">
          ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}
