"use client";

import { Video } from "@/types";
import { VideoCard, VideoCardSkeleton } from "./video-card";

interface VideoGridProps {
  videos: Video[];
  loading?: boolean;
  emptyMessage?: string;
}

export function VideoGrid({
  videos,
  loading = false,
  emptyMessage = "No videos found",
}: VideoGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-muted-foreground">{emptyMessage}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try a different category or search term
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
