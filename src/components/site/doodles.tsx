// Hand-drawn accent marks used on the Marketing page. Each is a plain
// stroke-based SVG (currentColor) so it can be recolored and animated
// with pure CSS — no icon library, no raster assets.
import { cn } from "@/lib/utils";

/** A loose circle a hand would draw around a word — slightly imperfect on purpose. */
export function ScribbleCircle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 70"
      fill="none"
      className={cn("doodle-draw", className)}
      aria-hidden="true"
    >
      <path
        d="M28 44C22 24 44 9 84 7C132 4.5 196 10 210 30C221 46 190 61 132 63.5C74 66 10 60 9 42C8.2 27 44 10 100 9"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A short curved arrow, e.g. pointing from a label toward a button. */
export function SquiggleArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 60"
      fill="none"
      className={cn("doodle-draw", className)}
      aria-hidden="true"
    >
      <path
        d="M4 6C24 6 60 8 68 26C74 39 54 44 40 40"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M52 30L41 41L54 49"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A small four-point sparkle/star, for punctuating a headline or corner. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 2C20.8 12 27.8 19.6 38 20.4C27.8 21.2 20.8 28.8 20 39C19.2 28.8 12.2 21.2 2 20.4C12.2 19.6 19.2 12 20 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** A wavy dashed connector, used between process steps like a storyboard line. */
export function SquiggleConnector({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 24"
      fill="none"
      preserveAspectRatio="none"
      className={cn("doodle-draw", className)}
      aria-hidden="true"
    >
      <path
        d="M2 12C14 -2 22 26 34 12C46 -2 54 26 66 12C78 -2 86 26 98 12"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
    </svg>
  );
}

/** A rough underline swipe, like a marker dragged once under a phrase. */
export function MarkerUnderline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 18"
      fill="none"
      preserveAspectRatio="none"
      className={cn("doodle-draw", className)}
      aria-hidden="true"
    >
      <path
        d="M3 12.5C40 6 130 3 197 9.5"
        pathLength="1"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A tiny doodled pin/tack, used on tilted cards to sell the "pinned note" feel. */
export function PinTack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="9" r="5.5" fill="currentColor" />
      <path d="M12 14L12 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
