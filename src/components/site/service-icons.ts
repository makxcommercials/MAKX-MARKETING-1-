import {
  Share2,
  Search,
  Megaphone,
  Palette,
  Video,
  Globe2,
  CreditCard,
  Sparkles,
  Compass,
  PenTool,
  Rocket,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

/** Keys here must match the `icon` column values in marketing_services. */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Share2,
  Search,
  Megaphone,
  Palette,
  Video,
  Globe2,
  CreditCard,
  Sparkles,
  Compass,
  PenTool,
  Rocket,
  BarChart3,
};

export const SERVICE_ICON_KEYS = Object.keys(SERVICE_ICONS);

export function getServiceIcon(key: string): LucideIcon {
  return SERVICE_ICONS[key] ?? Sparkles;
}
