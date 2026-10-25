"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  MoreHorizontal,
  CheckCircle2,
  Bell,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { VideoCard } from "@/components/video/video-card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  getVideoById,
  getRelatedVideos,
  formatViewCount,
  formatRelativeTime,
  mockComments,
} from "@/data/mock";
import { cn } from "@/lib/utils";

export default function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const video = getVideoById(id);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  if (!video) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Video not found</h1>
            <p className="mt-2 text-muted-foreground">
              This video may have been removed or is unavailable.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const related = getRelatedVideos(video);
  const comments = mockComments.filter((c) => c.videoId === video.id || c.videoId === "vid-1");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden p-4 lg:p-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
            {/* Main column */}
            <div className="min-w-0 flex-1">
              {/* Video Player */}
              <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
                <video
                  key={video.id}
                  src={video.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full"
                  poster={video.thumbnailUrl}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video info */}
              <div className="mt-3 space-y-3">
                <h1 className="text-xl font-semibold leading-tight sm:text-2xl">
                  {video.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/channel/${video.channel?.handle?.replace("@", "")}`}
                    >
                      <Avatar
                        src={video.channel?.avatarUrl}
                        alt={video.channel?.name || ""}
                        size="lg"
                        fallback={video.channel?.name}
                      />
                    </Link>
                    <div>
                      <Link
                        href={`/channel/${video.channel?.handle?.replace("@", "")}`}
                        className="flex items-center gap-1 font-medium hover:text-primary"
                      >
                        {video.channel?.name}
                        {video.channel?.verified && (
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {formatViewCount(video.channel?.subscriberCount || 0)}{" "}
                        subscribers
                      </p>
                    </div>
                    <Button
                      variant={subscribed ? "secondary" : "default"}
                      size="sm"
                      className="ml-2"
                      onClick={() => setSubscribed(!subscribed)}
                    >
                      {subscribed ? (
                        <>
                          <Bell className="h-4 w-4" />
                          Subscribed
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </Button>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="flex overflow-hidden rounded-full bg-secondary">
                      <button
                        onClick={() => {
                          setLiked(!liked);
                          if (disliked) setDisliked(false);
                        }}
                        className={cn(
                          "flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent",
                          liked && "text-primary"
                        )}
                      >
                        <ThumbsUp
                          className={cn("h-4 w-4", liked && "fill-current")}
                        />
                        {formatViewCount(video.likeCount + (liked ? 1 : 0))}
                      </button>
                      <div className="w-px bg-border" />
                      <button
                        onClick={() => {
                          setDisliked(!disliked);
                          if (liked) setLiked(false);
                        }}
                        className={cn(
                          "flex items-center gap-1.5 px-4 py-2 text-sm transition-colors hover:bg-accent",
                          disliked && "text-primary"
                        )}
                      >
                        <ThumbsDown
                          className={cn("h-4 w-4", disliked && "fill-current")}
                        />
                      </button>
                    </div>

                    <Button variant="secondary" size="sm" className="gap-1.5">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="secondary" size="sm" className="gap-1.5">
                      <Bookmark className="h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="secondary" size="icon-sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <div className="rounded-xl bg-secondary/50 p-3">
                  <p className="text-sm font-medium">
                    {formatViewCount(video.viewCount)} views ·{" "}
                    {formatRelativeTime(video.publishedAt)}
                  </p>
                  <p
                    className={cn(
                      "mt-2 whitespace-pre-wrap text-sm",
                      !showFullDesc && "line-clamp-2"
                    )}
                  >
                    {video.description}
                  </p>
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="mt-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {showFullDesc ? "Show less" : "Show more"}
                  </button>
                </div>

                {/* Comments */}
                <div className="mt-6">
                  <h2 className="mb-4 text-lg font-semibold">
                    {comments.length} Comments
                  </h2>
                  <div className="mb-6 flex gap-3">
                    <Avatar size="md" fallback="Y" />
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 border-b border-border bg-transparent py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar
                          src={comment.user?.avatarUrl}
                          alt={comment.user?.displayName}
                          size="md"
                          fallback={comment.user?.displayName}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {comment.user?.displayName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatRelativeTime(comment.createdAt)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm">{comment.content}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <button className="flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground hover:bg-accent">
                              <ThumbsUp className="h-3.5 w-3.5" />
                              {comment.likeCount}
                            </button>
                            <button className="rounded-full px-2 py-1 text-xs text-muted-foreground hover:bg-accent">
                              Reply
                            </button>
                          </div>
                          {comment.replies?.map((reply) => (
                            <div key={reply.id} className="mt-3 flex gap-3">
                              <Avatar
                                src={reply.user?.avatarUrl}
                                size="sm"
                                fallback={reply.user?.displayName}
                              />
                              <div>
                                <span className="text-sm font-medium">
                                  {reply.user?.displayName}
                                </span>
                                <p className="text-sm">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related videos */}
            <aside className="w-full shrink-0 lg:w-96">
              <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
                Related videos
              </h2>
              <div className="flex flex-col gap-3">
                {related.map((v) => (
                  <VideoCard key={v.id} video={v} layout="list" />
                ))}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
