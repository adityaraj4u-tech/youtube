"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Clapperboard,
  Users,
  History,
  Video,
  Clock,
  ThumbsUp,
  ListVideo,
  Flame,
  Music,
  Gamepad2,
  GraduationCap,
  Cpu,
  Newspaper,
  Settings,
  HelpCircle,
  MessageSquare,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";

const mainNav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shorts", label: "Shorts", icon: Clapperboard },
  { href: "/subscriptions", label: "Subscriptions", icon: Users },
];

const libraryNav = [
  { href: "/history", label: "History", icon: History },
  { href: "/your-videos", label: "Your videos", icon: Video },
  { href: "/watch-later", label: "Watch Later", icon: Clock },
  { href: "/liked", label: "Liked videos", icon: ThumbsUp },
  { href: "/playlists", label: "Playlists", icon: ListVideo },
];

const exploreNav = [
  { href: "/trending", label: "Trending", icon: Flame },
  { href: "/?category=Music", label: "Music", icon: Music },
  { href: "/?category=Gaming", label: "Gaming", icon: Gamepad2 },
  { href: "/?category=Education", label: "Education", icon: GraduationCap },
  { href: "/?category=Technology", label: "Technology", icon: Cpu },
  { href: "/?category=News", label: "News", icon: Newspaper },
];

const bottomNav = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help", icon: HelpCircle },
  { href: "/feedback", label: "Send feedback", icon: MessageSquare },
];

function NavItem({
  href,
  label,
  icon: Icon,
  collapsed,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  collapsed?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.split("?")[0]) && href !== "/";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
        collapsed && "justify-center px-2"
      )}
      title={collapsed ? label : undefined}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useUIStore();

  const closeMobile = () => setSidebarOpen(false);

  const content = (
    <div className="flex h-full flex-col overflow-y-auto py-2">
      <nav className="flex flex-col gap-0.5 px-2">
        {mainNav.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            collapsed={sidebarCollapsed}
            onClick={closeMobile}
          />
        ))}
      </nav>

      <hr className="my-3 border-border" />

      <nav className="flex flex-col gap-0.5 px-2">
        {!sidebarCollapsed && (
          <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Library
          </h3>
        )}
        {libraryNav.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            collapsed={sidebarCollapsed}
            onClick={closeMobile}
          />
        ))}
      </nav>

      <hr className="my-3 border-border" />

      <nav className="flex flex-col gap-0.5 px-2">
        {!sidebarCollapsed && (
          <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Explore
          </h3>
        )}
        {exploreNav.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            collapsed={sidebarCollapsed}
            onClick={closeMobile}
          />
        ))}
      </nav>

      <hr className="my-3 border-border" />

      <nav className="mt-auto flex flex-col gap-0.5 px-2">
        {bottomNav.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            collapsed={sidebarCollapsed}
            onClick={closeMobile}
          />
        ))}
      </nav>

      {!sidebarCollapsed && (
        <div className="mt-4 px-5 text-xs text-muted-foreground">
          <p>© 2025 AdiTube</p>
          <p className="mt-1">A modern video platform</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 border-r border-sidebar-border bg-sidebar transition-all duration-300 lg:block",
          sidebarCollapsed ? "w-[72px]" : "w-60"
        )}
      >
        {content}
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-sidebar shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-border px-3">
              <span className="text-lg font-semibold">Menu</span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={closeMobile}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
