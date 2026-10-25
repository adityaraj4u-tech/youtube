"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { VideoGrid } from "@/components/video/video-grid";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  getChannelByHandle,
  getVideosByChannel,
  formatViewCount,
} from "@/data/mock";

export default function ChannelPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = use(params);
  const channel = getChannelByHandle(handle);
  const videos = channel ? getVideosByChannel(channel.id) : [];

  if (!channel) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Channel not found</h1>
            <Link
              href="/"
              className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden">
          {/* Banner */}
          <div className="relative h-32 w-full bg-muted sm:h-40 md:h-48">
            {channel.bannerUrl && (
              <Image
                src={channel.bannerUrl}
                alt=""
                fill
                className="object-cover"
                unoptimized
              />
            )}
          </div>

          {/* Channel header */}
          <div className="px-4 sm:px-6">
            <div className="flex flex-col gap-4 border-b border-border py-4 sm:flex-row sm:items-center">
              <Avatar
                src={channel.avatarUrl}
                alt={channel.name}
                size="xl"
                fallback={channel.name}
                className="-mt-12 border-4 border-background sm:-mt-16"
              />
              <div className="flex-1">
                <h1 className="flex items-center gap-2 text-2xl font-bold">
                  {channel.name}
                  {channel.verified && (
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                  )}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {channel.handle} · {formatViewCount(channel.subscriberCount)}{" "}
                  subscribers · {channel.videoCount} videos
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {channel.description}
                </p>
              </div>
              <Button>Subscribe</Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-border">
              <button className="border-b-2 border-foreground py-3 text-sm font-medium">
                Videos
              </button>
              <button className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                Playlists
              </button>
              <button className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                About
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <VideoGrid videos={videos} emptyMessage="No videos yet" />
          </div>
        </main>
      </div>
    </div>
  );
}
