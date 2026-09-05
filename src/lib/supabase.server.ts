import { createClient } from "@supabase/supabase-js";
import { getSupabasePublishableKey, getSupabaseServiceRoleKey, getSupabaseUrl } from "./env.server";

// Server-only. The service-role client bypasses Row Level Security entirely,
// so it must never be imported into client-bundled code — only from
// `*.server.ts` files / createServerFn handlers, which stay on the server.

// Hand-written to match supabase_setup.sql, rather than generated via
// `supabase gen types typescript` — that needs the Supabase CLI linked to
// your project (an extra local setup + network step). This keeps
// `.insert()`/`.update()` calls type-checked against the real schema; if you
// add columns later, add them here too. Only the two tables this app
// actually touches are declared — Database still faithfully describes what
// exists in Postgres, just not every table you might add outside this app.
type Database = {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          cover_image_url: string | null;
          tags: string[];
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          content: string;
          cover_image_url?: string | null;
          tags?: string[];
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content?: string;
          cover_image_url?: string | null;
          tags?: string[];
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: { key: string; value: string; updated_at: string };
        Insert: { key: string; value: string; updated_at?: string };
        Update: { key?: string; value?: string; updated_at?: string };
        Relationships: [];
      };
      contact_inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          enquiry_type: string | null;
          message: string;
          source: string;
          status: "new" | "read" | "contacted" | "archived";
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          enquiry_type?: string | null;
          message: string;
          source?: string;
          status?: "new" | "read" | "contacted" | "archived";
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          enquiry_type?: string | null;
          message?: string;
          source?: string;
          status?: "new" | "read" | "contacted" | "archived";
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      marketing_services: {
        Row: {
          id: string;
          category: string;
          category_blurb: string;
          icon: string;
          title: string;
          body: string;
          sort_order: number;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          category_blurb?: string;
          icon: string;
          title: string;
          body: string;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          category_blurb?: string;
          icon?: string;
          title?: string;
          body?: string;
          sort_order?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

let adminClient: ReturnType<typeof createClient<Database>> | null = null;
let publicClient: ReturnType<typeof createClient<Database>> | null = null;

/** Full-access client using the service role key. Server-side use only. */
export function getSupabaseAdmin() {
  if (!adminClient) {
    adminClient = createClient<Database>(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

/**
 * Read-only client using the anon/publishable key, subject to the RLS
 * policies from supabase_setup.sql (only published blogs, only settings).
 * Used for the public resources/blogs pages via SSR loaders.
 */
export function getSupabasePublic() {
  if (!publicClient) {
    publicClient = createClient<Database>(getSupabaseUrl(), getSupabasePublishableKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return publicClient;
}
