// Server-only. Never import this from a component that also runs on the client.
// Reading `process.env` here is fine because this module is only ever pulled
// into server function bundles (Nitro/Cloudflare Workers env is mapped onto
// process.env by the Cloudflare Nitro preset).

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". Set it in .env for local dev, ` +
        `or as a Cloudflare Worker/Pages environment variable in production.`,
    );
  }
  return value;
}

export function getSupabaseUrl() {
  return required("SUPABASE_URL");
}

export function getSupabaseServiceRoleKey() {
  return required("SUPABASE_SERVICE_ROLE_KEY");
}

export function getSupabasePublishableKey() {
  return required("VITE_SUPABASE_PUBLISHABLE_KEY");
}

export function getAdminUsername() {
  return required("ADMIN_USERNAME");
}

export function getAdminPassword() {
  return required("ADMIN_PASSWORD");
}

export function getAdminSessionSecret() {
  const value = required("ADMIN_SESSION_SECRET");
  if (value.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters long.");
  }
  return value;
}
