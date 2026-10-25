import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg",
        className
      )}
    >
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-white"
          aria-hidden="true"
        >
          <path
            d="M8 5.14v14l11-7-11-7z"
            fill="currentColor"
          />
        </svg>
      </div>
      {showText && (
        <span className="text-xl font-bold tracking-tight text-foreground">
          Adi<span className="text-primary">Tube</span>
        </span>
      )}
    </Link>
  );
}
