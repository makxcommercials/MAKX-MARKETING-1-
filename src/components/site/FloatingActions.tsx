import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { WA } from "./data";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.04 3.2c-7.06 0-12.8 5.73-12.8 12.79 0 2.25.59 4.45 1.72 6.39L3.2 28.8l6.6-1.72a12.78 12.78 0 0 0 6.24 1.6h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.04a12.7 12.7 0 0 0-9.05-3.75Zm0 23.3h-.01c-1.87 0-3.7-.5-5.3-1.45l-.38-.23-3.92 1.03 1.05-3.82-.25-.39a10.6 10.6 0 0 1-1.63-5.65c0-5.87 4.78-10.64 10.65-10.64 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.11 7.53c0 5.87-4.77 10.5-10.84 10.5Zm5.84-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.18-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.6-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-navy shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:text-teal",
          showTop ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>

      <a
        href={WA.default}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with MAKX Commercials on WhatsApp"
        className="pulse-ring group grid h-14 w-14 place-items-center rounded-full gradient-teal text-white shadow-lift ring-1 ring-white/20 transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
      >
        <WhatsAppIcon className="h-7 w-7 transition-transform duration-300 group-hover:rotate-12" />
      </a>
    </div>
  );
}
