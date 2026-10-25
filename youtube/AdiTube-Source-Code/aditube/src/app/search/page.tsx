"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { VideoGrid } from "@/components/video/video-grid";
import { searchVideos } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sortOptions = [
  { id: "relevance", label: "Relevance" },
  { id: "newest", label: "Upload date" },
  { id: "views", label: "View count" },
  { id: "likes", label: "Rating" },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sort, setSort] = useState("relevance");

  const results = useMemo(() => {
    let videos = searchVideos(query);
    switch (sort) {
      case "newest":
        videos = [...videos].sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
        break;
      case "views":
        videos = [...videos].sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "likes":
        videos = [...videos].sort((a, b) => b.likeCount - a.likeCount);
        break;
    }
    return videos;
  }, [query, sort]);

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-medium">
          {query ? (
            <>
              Results for <span className="font-semibold">&quot;{query}&quot;</span>
              <span className="ml-2 text-sm text-muted-foreground">
                ({results.length} videos)
              </span>
            </>
          ) : (
            "Search videos"
          )}
        </h1>
        <div className="flex gap-1">
          {sortOptions.map((opt) => (
            <Button
              key={opt.id}
              variant={sort === opt.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSort(opt.id)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>
      <VideoGrid
        videos={results}
        emptyMessage={
          query
            ? `No results found for "${query}"`
            : "Enter a search term to find videos"
        }
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">
          <Suspense
            fallback={
              <div className="p-6 text-muted-foreground">Loading results...</div>
            }
          >
            <SearchResults />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
