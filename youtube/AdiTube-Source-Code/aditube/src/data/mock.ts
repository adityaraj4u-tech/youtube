import { Channel, Video, User, Comment } from "@/types";

export const mockUsers: User[] = [
  {
    id: "u1",
    username: "techmaster",
    displayName: "Tech Master",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=techmaster",
    bio: "Exploring the future of technology",
    verified: true,
    subscriberCount: 1250000,
    createdAt: "2020-03-15T10:00:00Z",
  },
  {
    id: "u2",
    username: "musicvibes",
    displayName: "Music Vibes",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=musicvibes",
    bio: "Daily dose of great music",
    verified: true,
    subscriberCount: 890000,
    createdAt: "2019-07-22T14:30:00Z",
  },
  {
    id: "u3",
    username: "codewithme",
    displayName: "Code With Me",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=codewithme",
    bio: "Learn to code, one project at a time",
    verified: true,
    subscriberCount: 2100000,
    createdAt: "2018-11-05T09:15:00Z",
  },
  {
    id: "u4",
    username: "traveldiaries",
    displayName: "Travel Diaries",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=traveldiaries",
    bio: "Around the world in 80 videos",
    verified: false,
    subscriberCount: 456000,
    createdAt: "2021-01-18T16:45:00Z",
  },
  {
    id: "u5",
    username: "gamingpro",
    displayName: "Gaming Pro",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=gamingpro",
    bio: "Pro gaming tips and gameplay",
    verified: true,
    subscriberCount: 3200000,
    createdAt: "2017-05-30T11:20:00Z",
  },
  {
    id: "u6",
    username: "scienceexplained",
    displayName: "Science Explained",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=scienceexplained",
    bio: "Making science accessible to everyone",
    verified: true,
    subscriberCount: 780000,
    createdAt: "2020-09-12T08:00:00Z",
  },
  {
    id: "u7",
    username: "cookwithlove",
    displayName: "Cook With Love",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=cookwithlove",
    bio: "Delicious recipes from around the world",
    verified: false,
    subscriberCount: 340000,
    createdAt: "2021-06-25T13:10:00Z",
  },
  {
    id: "u8",
    username: "fitlife",
    displayName: "Fit Life",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=fitlife",
    bio: "Fitness, health, and wellness",
    verified: true,
    subscriberCount: 1500000,
    createdAt: "2019-02-14T07:30:00Z",
  },
];

export const mockChannels: Channel[] = mockUsers.map((user) => ({
  id: `ch-${user.id}`,
  ownerId: user.id,
  handle: `@${user.username}`,
  name: user.displayName,
  description: user.bio || "",
  avatarUrl: user.avatarUrl,
  bannerUrl: `https://picsum.photos/seed/${user.id}/1280/200`,
  subscriberCount: user.subscriberCount,
  videoCount: Math.floor(Math.random() * 200) + 20,
  verified: user.verified,
  createdAt: user.createdAt,
}));

const sampleVideoUrls = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
];

const categories = [
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
  "Comedy",
];

const titles = [
  "Building a Modern Web App from Scratch in 2025",
  "The Future of AI: What You Need to Know",
  "Epic Gaming Moments That Went Viral",
  "10 Must-Visit Destinations in Europe",
  "Mastering React Hooks in 30 Minutes",
  "How Quantum Computing Will Change Everything",
  "Best Workout Routine for Beginners",
  "Cooking the Perfect Pasta Carbonara",
  "Understanding Climate Change Science",
  "Top 10 Indie Games of the Year",
  "Learn TypeScript in One Hour",
  "Street Food Tour in Bangkok",
  "The Art of Minimalist Living",
  "Breaking News: Major Tech Announcement",
  "Funny Moments Compilation 2025",
  "How to Build Your First Mobile App",
  "Deep Dive into Machine Learning",
  "Travel Vlog: Solo Trip to Japan",
  "Professional Photography Tips",
  "Live Coding Session: Building a Chat App",
  "The History of Video Games",
  "Healthy Meal Prep for the Week",
  "Space Exploration Updates",
  "Stand-up Comedy Special Highlights",
  "Web Development Best Practices 2025",
];

function randomDate(start: Date, end: Date): string {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export const mockVideos: Video[] = Array.from({ length: 48 }, (_, i) => {
  const channel = mockChannels[i % mockChannels.length];
  const category = categories[i % categories.length];
  const duration = Math.floor(Math.random() * 1200) + 60;
  const publishedAt = randomDate(new Date("2024-01-01"), new Date());

  return {
    id: `vid-${i + 1}`,
    channelId: channel.id,
    title: titles[i % titles.length] + (i >= titles.length ? ` (${Math.floor(i / titles.length) + 1})` : ""),
    description: `This is a detailed description for "${titles[i % titles.length]}". In this video, we explore interesting topics related to ${category.toLowerCase()}. Subscribe for more content like this! Leave a comment below with your thoughts.`,
    thumbnailUrl: `https://picsum.photos/seed/video${i + 1}/640/360`,
    videoUrl: sampleVideoUrls[i % sampleVideoUrls.length],
    category,
    tags: [category.toLowerCase(), "tutorial", "2025", channel.name.toLowerCase().replace(/\s/g, "")],
    visibility: "public",
    durationSeconds: duration,
    viewCount: Math.floor(Math.random() * 5000000) + 1000,
    likeCount: Math.floor(Math.random() * 200000) + 100,
    dislikeCount: Math.floor(Math.random() * 5000),
    commentCount: Math.floor(Math.random() * 10000) + 10,
    publishedAt,
    createdAt: publishedAt,
    channel,
  };
});

export const mockComments: Comment[] = [
  {
    id: "c1",
    videoId: "vid-1",
    userId: "u2",
    content: "This was incredibly helpful! Thanks for the clear explanations.",
    likeCount: 245,
    createdAt: "2025-10-20T14:30:00Z",
    updatedAt: "2025-10-20T14:30:00Z",
    user: mockUsers[1],
  },
  {
    id: "c2",
    videoId: "vid-1",
    userId: "u4",
    content: "I've been waiting for a video like this. Subscribed!",
    likeCount: 89,
    createdAt: "2025-10-21T09:15:00Z",
    updatedAt: "2025-10-21T09:15:00Z",
    user: mockUsers[3],
  },
  {
    id: "c3",
    videoId: "vid-1",
    userId: "u5",
    parentCommentId: "c1",
    content: "Same here! The section about performance optimization was gold.",
    likeCount: 34,
    createdAt: "2025-10-21T11:00:00Z",
    updatedAt: "2025-10-21T11:00:00Z",
    user: mockUsers[4],
  },
  {
    id: "c4",
    videoId: "vid-1",
    userId: "u6",
    content: "Could you make a follow-up video on advanced patterns?",
    likeCount: 156,
    createdAt: "2025-10-22T16:45:00Z",
    updatedAt: "2025-10-22T16:45:00Z",
    user: mockUsers[5],
  },
];

export function formatViewCount(count: number): string {
  if (count >= 1_000_000_000) return `${(count / 1_000_000_000).toFixed(1)}B`;
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) return `${diffYear} year${diffYear > 1 ? "s" : ""} ago`;
  if (diffMonth > 0) return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;
  if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  return "Just now";
}

export function getVideosByCategory(category: string): Video[] {
  if (category === "All") return mockVideos;
  return mockVideos.filter((v) => v.category === category);
}

export function searchVideos(query: string): Video[] {
  const q = query.toLowerCase().trim();
  if (!q) return mockVideos;
  return mockVideos.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.channel?.name.toLowerCase().includes(q) ||
      v.tags.some((t) => t.includes(q)) ||
      v.category.toLowerCase().includes(q)
  );
}

export function getVideoById(id: string): Video | undefined {
  return mockVideos.find((v) => v.id === id);
}

export function getRelatedVideos(video: Video, limit = 12): Video[] {
  return mockVideos
    .filter((v) => v.id !== video.id && (v.category === video.category || v.channelId === video.channelId))
    .slice(0, limit);
}

export function getChannelById(id: string): Channel | undefined {
  return mockChannels.find((c) => c.id === id);
}

export function getChannelByHandle(handle: string): Channel | undefined {
  const clean = handle.startsWith("@") ? handle : `@${handle}`;
  return mockChannels.find((c) => c.handle === clean || c.handle === handle);
}

export function getVideosByChannel(channelId: string): Video[] {
  return mockVideos.filter((v) => v.channelId === channelId);
}
