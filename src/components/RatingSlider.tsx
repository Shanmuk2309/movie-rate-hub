import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function RatingSlider({ value, onChange, disabled }: RatingSliderProps) {
  const getRatingLabel = (rating: number) => {
    if (rating === 0) return "Not Rated";
    if (rating <= 2) return "Poor";
    if (rating <= 4) return "Below Average";
    if (rating <= 5) return "Average";
    if (rating <= 6) return "Above Average";
    if (rating <= 7) return "Good";
    if (rating <= 8) return "Great";
    if (rating <= 9) return "Excellent";
    return "Masterpiece";
  };

  const getRatingColor = (rating: number) => {
    if (rating <= 3) return "text-destructive";
    if (rating <= 5) return "text-muted-foreground";
    if (rating <= 7) return "text-foreground";
    return "text-primary";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Your Rating</span>
        <div className="text-right">
          <span className={cn("text-3xl font-display font-bold", getRatingColor(value))}>
            {value.toFixed(1)}
          </span>
          <span className="text-muted-foreground text-lg">/10</span>
        </div>
      </div>
      
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={10}
        min={0}
        step={0.5}
        disabled={disabled}
        className="py-2"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span className={cn("font-medium", getRatingColor(value))}>
          {getRatingLabel(value)}
        </span>
        <span>10</span>
      </div>
    </div>
  );
}
