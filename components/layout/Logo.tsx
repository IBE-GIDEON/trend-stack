import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Trend Stack wordmark. A sharp angular mark (a "V" cut into a node graph) paired
 * with a two-weight wordmark — "Viz" carries the emphasis, "Stats" recedes.
 * Geometry only; no rounded corners.
 */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        width={36}
        height={36}
        alt="Trend Stack Logo"
        className="object-contain"
      />
      {!compact && (
        <span className="text-[15px] font-extrabold tracking-tight text-black dark:text-white">
          Trend Stack
        </span>
      )}
    </span>
  );
}
