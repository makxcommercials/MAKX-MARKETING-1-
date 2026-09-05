const WHATSAPP_NUMBER = "919301144388";

export const BRAND = {
  name: "MAKX Commercials",
  tagline: "One team, two paths — pick the one that's you.",
  // Primary call number
  phone: "+91 93011 44388",
  phoneHref: "tel:+919301144388",
  // WhatsApp number
  whatsappNumber: "+91 93011 44388",
  email: "mayank@makxcommercials.in",
  address: "12/14 Chandralok Colony, Rau, Indore, Madhya Pradesh",
} as const;

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WA = {
  default: waLink("Hi MAKX Commercials, I want to know more about your services."),
  hero: waLink("Hi MAKX Commercials, I would like to get a free consultation."),
  contact: waLink("Hi MAKX Commercials, I would like to discuss my business requirements."),
} as const;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  BRAND.address,
)}`;

export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=12%2F14+Chandralok+Colony%2C+Rau%2C+Indore%2C+Madhya+Pradesh&output=embed";

export const CALENDLY_URL = "https://calendly.com/makxcommercials/30min";

export const WEB3FORMS_ACCESS_KEY = "45ab7a7b-22b1-409d-ad9c-60146d2631ae";

// Primary/top navigation. Testimonials and About are intentionally not here —
// they're still fully live routes, just surfaced from FOOTER_LINKS instead
// (see Footer.tsx), per the site's "don't clutter the top nav" direction.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Indian Services", href: "/indian-services" },
  { label: "International Services", href: "/international-services" },
  { label: "Marketing", href: "/marketing" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

// Secondary links — still real pages, surfaced via the footer's "Company" column.
export const FOOTER_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
];

export const SOCIALS = {
  instagram: "https://www.instagram.com/CommercialsMAKX/",
  linkedin: "https://www.linkedin.com/search/results/companies/?keywords=MAKX%20Commercials",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
};
