"use client";

import { useMemo } from "react";
import { CategoryFilters } from "@/components/video/category-filters";
import { VideoGrid } from "@/components/video/video-grid";
import { useUIStore } from "@/store/ui-store";
import { getVideosByCategory } from "@/data/mock";

export default function HomePage() {
  const { selectedCategory } = useUIStore();

  const videos = useMemo(
    () => getVideosByCategory(selectedCategory),
    [selectedCategory]
  );

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      <CategoryFilters />
      <VideoGrid
        videos={videos}
        emptyMessage={`No videos in ${selectedCategory}`}
      />
    </div>
  );
}
