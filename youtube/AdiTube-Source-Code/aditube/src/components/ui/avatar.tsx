import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fallback?: string;
}

const sizeClasses = {
  sm: "h-6 w-6 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-24 w-24 text-2xl",
};

export function Avatar({
  src,
  alt = "Avatar",
  size = "md",
  className,
  fallback,
}: AvatarProps) {
  const initials = fallback
    ? fallback
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-muted",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={
            size === "xl"
              ? "96px"
              : size === "lg"
                ? "48px"
                : size === "md"
                  ? "36px"
                  : "24px"
          }
          unoptimized
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-secondary text-secondary-foreground font-medium">
          {initials}
        </span>
      )}
    </div>
  );
}
