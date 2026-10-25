"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  X,
  Video,
  Bell,
  User,
  Moon,
  Sun,
  LogIn,
} from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { mockVideos } from "@/data/mock";

export function Header() {
  const router = useRouter();
  const {
    toggleSidebar,
    theme,
    setTheme,
    searchQuery,
    setSearchQuery,
    sidebarCollapsed,
    toggleSidebarCollapsed,
  } = useUIStore();

  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock auth state for Phase 1
  const isAuthenticated = false;
  const currentUser = null;

  const suggestions = localQuery.trim()
    ? mockVideos
        .filter((v) =>
          v.title.toLowerCase().includes(localQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = localQuery.trim();
    setSearchQuery(q);
    setShowSuggestions(false);
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const handleSuggestionClick = (title: string) => {
    setLocalQuery(title);
    setSearchQuery(title);
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(title)}`);
  };

  const clearSearch = () => {
    setLocalQuery("");
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-2 border-b border-border bg-background/95 px-2 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:gap-4 sm:px-4">
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (window.innerWidth < 1024) {
              toggleSidebar();
            } else {
              toggleSidebarCollapsed();
            }
          }}
          aria-label="Toggle sidebar"
          className="shrink-0"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Logo className="hidden sm:flex" />
        <Logo showText={false} className="sm:hidden" />
      </div>

      {/* Center: Search */}
      <div
        ref={searchRef}
        className={cn(
          "relative mx-auto flex max-w-2xl flex-1 items-center",
          isSearchExpanded ? "flex" : "hidden sm:flex"
        )}
      >
        <form onSubmit={handleSearch} className="flex w-full">
          <div className="relative flex w-full items-center">
            <input
              ref={inputRef}
              type="search"
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search"
              className="h-10 w-full rounded-l-full border border-border bg-secondary/50 px-4 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-background"
              aria-label="Search videos"
            />
            {localQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-12 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <Button
              type="submit"
              variant="secondary"
              className="h-10 rounded-l-none rounded-r-full border border-l-0 border-border px-5"
              aria-label="Submit search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-12 top-full z-50 mt-1 overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
            <ul role="listbox">
              {suggestions.map((video) => (
                <li key={video.id}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(video.title)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-accent"
                  >
                    <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{video.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mobile search toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="sm:hidden"
        onClick={() => setIsSearchExpanded(!isSearchExpanded)}
        aria-label="Toggle search"
      >
        {isSearchExpanded ? (
          <X className="h-5 w-5" />
        ) : (
          <Search className="h-5 w-5" />
        )}
      </Button>

      {/* Right: Actions */}
      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {isAuthenticated ? (
          <>
            <Link
              href="/upload"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent"
              aria-label="Create"
            >
              <Video className="h-5 w-5" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <button
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="User menu"
            >
              <Avatar
                src={undefined}
                alt="User"
                size="md"
                fallback="U"
              />
            </button>
          </>
        ) : (
          <Link
            href="/auth/sign-in"
            className="inline-flex h-8 items-center gap-2 rounded-full border border-border px-3 text-sm font-medium hover:bg-accent"
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Sign in</span>
          </Link>
        )}
      </div>
    </header>
  );
}
