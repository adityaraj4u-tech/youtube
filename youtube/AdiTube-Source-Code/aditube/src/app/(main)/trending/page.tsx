"use client";

import { VideoGrid } from "@/components/video/video-grid";
import { mockVideos } from "@/data/mock";

export default function TrendingPage() {
  const trending = [...mockVideos].sort((a, b) => b.viewCount - a.viewCount).slice(0, 24);

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      <h1 className="text-2xl font-bold">Trending</h1>
      <VideoGrid videos={trending} />
    </div>
  );
}
