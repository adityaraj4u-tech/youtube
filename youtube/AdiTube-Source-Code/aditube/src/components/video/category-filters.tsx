"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/types";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CategoryFilters() {
  const { selectedCategory, setSelectedCategory } = useUIStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 hidden bg-background/80 backdrop-blur sm:flex"
        aria-label="Scroll categories left"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div
        ref={scrollRef}
        className="hide-scrollbar flex gap-2 overflow-x-auto px-1 py-1 sm:px-8"
      >
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              selectedCategory === category
                ? "bg-foreground text-background"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 hidden bg-background/80 backdrop-blur sm:flex"
        aria-label="Scroll categories right"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
