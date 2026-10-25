export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio?: string;
  verified?: boolean;
  subscriberCount: number;
  createdAt: string;
}

export interface Channel {
  id: string;
  ownerId: string;
  handle: string;
  name: string;
  description: string;
  bannerUrl?: string;
  avatarUrl: string;
  subscriberCount: number;
  videoCount: number;
  verified?: boolean;
  createdAt: string;
}

export interface Video {
  id: string;
  channelId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  tags: string[];
  visibility: "public" | "unlisted" | "private";
  durationSeconds: number;
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  publishedAt: string;
  createdAt: string;
  // Joined data
  channel?: Channel;
}

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  parentCommentId?: string | null;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  replies?: Comment[];
}

export interface Playlist {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  visibility: "public" | "unlisted" | "private";
  videoCount: number;
  createdAt: string;
  thumbnailUrl?: string;
}

export type Category =
  | "All"
  | "Music"
  | "Gaming"
  | "Coding"
  | "Education"
  | "Technology"
  | "Travel"
  | "Entertainment"
  | "Sports"
  | "News"
  | "Science"
  | "Cooking"
  | "Fashion"
  | "Comedy";

export const CATEGORIES: Category[] = [
  "All",
  "Music",
  "Gaming",
  "Coding",
  "Education",
  "Technology",
  "Travel",
  "Entertainment",
  "Sports",
  "News",
  "Science",
  "Cooking",
  "Fashion",
  "Comedy",
];
