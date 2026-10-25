"use client";

import Link from "next/link";
import Image from "next/image";
import { MoreVertical, CheckCircle2 } from "lucide-react";
import { Video } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { formatViewCount, formatDuration, formatRelativeTime } from "@/data/mock";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: Video;
  className?: string;
  layout?: "grid" | "list";
}

export function VideoCard({ video, className, layout = "grid" }: VideoCardProps) {
  if (layout === "list") {
    return (
      <div className={cn("group flex gap-3", className)}>
        <Link
          href={`/watch/${video.id}`}
          className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-xl bg-muted sm:w-48"
        >
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="192px"
            unoptimized
          />
          <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {formatDuration(video.durationSeconds)}
          </span>
        </Link>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Link href={`/watch/${video.id}`}>
            <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-primary">
              {video.title}
            </h3>
          </Link>
          <Link
            href={`/channel/${video.channel?.handle?.replace("@", "") || video.channelId}`}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            {video.channel?.name}
            {video.channel?.verified && (
              <CheckCircle2 className="h-3 w-3 text-muted-foreground" />
            )}
          </Link>
          <p className="text-xs text-muted-foreground">
            {formatViewCount(video.viewCount)} views · {formatRelativeTime(video.publishedAt)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className={cn("group flex flex-col gap-2", className)}>
      <Link
        href={`/watch/${video.id}`}
        className="relative aspect-video overflow-hidden rounded-xl bg-muted"
      >
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized
        />
        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
          {formatDuration(video.durationSeconds)}
        </span>
      </Link>

      <div className="flex gap-3">
        <Link
          href={`/channel/${video.channel?.handle?.replace("@", "") || video.channelId}`}
          className="shrink-0"
        >
          <Avatar
            src={video.channel?.avatarUrl}
            alt={video.channel?.name || "Channel"}
            size="md"
            fallback={video.channel?.name}
          />
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-1">
            <Link href={`/watch/${video.id}`}>
              <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-primary">
                {video.title}
              </h3>
            </Link>
            <button
              className="shrink-0 rounded-full p-1 opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100"
              aria-label="More options"
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <Link
            href={`/channel/${video.channel?.handle?.replace("@", "") || video.channelId}`}
            className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <span>{video.channel?.name}</span>
            {video.channel?.verified && (
              <CheckCircle2 className="h-3 w-3 shrink-0" />
            )}
          </Link>

          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatViewCount(video.viewCount)} views ·{" "}
            {formatRelativeTime(video.publishedAt)}
          </p>
        </div>
      </div>
    </article>
  );
}

export function VideoCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-video animate-pulse rounded-xl bg-muted" />
      <div className="flex gap-3">
        <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
