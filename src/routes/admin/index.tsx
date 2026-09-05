import { useEffect, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { LayoutDashboard, FileText, Settings, LogOut, Loader2, Inbox, Megaphone } from "lucide-react";
import { checkAdminSession, loginAdmin, logoutAdmin } from "@/lib/admin-auth.server";
import { BlogManager } from "@/components/admin/BlogManager";
import { SettingsManager } from "@/components/admin/SettingsManager";
import { InquiriesManager } from "@/components/admin/InquiriesManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { fetchInquiriesAdmin } from "@/lib/inquiries.server";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
  loader: async () => checkAdminSession(),
  head: () => ({
    meta: [{ title: "Admin — MAKX Commercials" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function AdminPage() {
  const { isAdmin } = Route.useLoaderData();
  return isAdmin ? <AdminDashboard /> : <AdminLogin />;
}

function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await loginAdmin({ data: { username, password } });
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-navy px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-card p-8 shadow-soft"
      >
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-soft text-teal">
          <LayoutDashboard className="h-5 w-5" />
        </div>
        <h1 className="mt-5 font-display text-xl font-bold text-navy">Admin Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">MAKX Commercials site admin.</p>

        <div className="mt-6 grid gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Username
            </label>
            <input
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-teal px-5 py-2.5 text-sm font-semibold text-white shadow-teal disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Log in
        </button>
      </form>
    </div>
  );
}

function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"inquiries" | "services" | "blogs" | "settings">("inquiries");
  const [loggingOut, setLoggingOut] = useState(false);
  const [newCount, setNewCount] = useState<number | null>(null);

  useEffect(() => {
    // Lightweight — just for the sidebar badge, real detail loads inside
    // InquiriesManager itself. Re-checked whenever the tab changes so the
    // badge clears after the admin reads new inquiries.
    fetchInquiriesAdmin()
      .then((rows) => setNewCount(rows.filter((r) => r.status === "new").length))
      .catch(() => setNewCount(null));
  }, [tab]);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logoutAdmin();
      await router.invalidate();
    } finally {
      setLoggingOut(false);
    }
  }

  const tabs = [
    { id: "inquiries" as const, label: "Inquiries", icon: Inbox, badge: newCount },
    { id: "services" as const, label: "Services", icon: Megaphone, badge: null },
    { id: "blogs" as const, label: "Blogs", icon: FileText, badge: null },
    { id: "settings" as const, label: "Settings", icon: Settings, badge: null },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-soft text-teal">
              <LayoutDashboard className="h-4 w-4" />
            </span>
            <span className="font-display text-base font-bold text-navy">MAKX Admin</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-1.5 rounded-full border border-input px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-red-300 hover:text-red-600 disabled:opacity-60"
          >
            {loggingOut ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LogOut className="h-3.5 w-3.5" />}
            Log out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap gap-1.5 rounded-full border border-border bg-card p-1.5 w-fit">
          {tabs.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                tab === id ? "gradient-teal text-white shadow-teal" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {Boolean(badge) && (
                <span
                  className={cn(
                    "grid h-4.5 min-w-4.5 place-items-center rounded-full px-1 text-[0.62rem] font-bold",
                    tab === id ? "bg-white/25 text-white" : "bg-flame text-white",
                  )}
                >
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          {tab === "inquiries" ? (
            <InquiriesManager />
          ) : tab === "services" ? (
            <ServicesManager />
          ) : tab === "blogs" ? (
            <BlogManager />
          ) : (
            <SettingsManager />
          )}
        </div>
      </div>
    </div>
  );
}
