import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { getSession, useSession } from "@tanstack/react-start/server";
import { z } from "zod";
import { getAdminPassword, getAdminSessionSecret, getAdminUsername } from "./env.server";

type AdminSessionData = {
  isAdmin?: boolean;
};

function adminSessionConfig() {
  return {
    password: getAdminSessionSecret(),
    name: "makx_admin",
    maxAge: 60 * 60 * 8, // 8 hours
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

/** Throws if the current request doesn't have a valid admin session. Call this
 * at the top of every admin-only server function before touching Supabase.
 * Wrapped in createServerOnlyFn so files that import it (blogs.server.ts,
 * settings.server.ts) stay safe to reference from client-visible route
 * modules — the real body never ships to the client bundle. */
export const requireAdminSession = createServerOnlyFn(async () => {
  const session = await getSession<AdminSessionData>(adminSessionConfig());
  if (!session.data.isAdmin) {
    throw new Error("Not authenticated.");
  }
});

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

export const loginAdmin = createServerFn({ method: "POST" })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    // Constant-shape comparison isn't practical with plain string ===, and for
    // a single hardcoded admin credential pair the timing side-channel isn't
    // the realistic risk here — brute force is. See the rate-limiting note in
    // the project README for why this alone isn't enough for a public login.
    const validUsername = data.username === getAdminUsername();
    const validPassword = data.password === getAdminPassword();

    if (!validUsername || !validPassword) {
      throw new Error("Invalid username or password.");
    }

    const session = await useSession<AdminSessionData>(adminSessionConfig());
    await session.update({ isAdmin: true });
    return { ok: true as const };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSessionData>(adminSessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getSession<AdminSessionData>(adminSessionConfig());
  return { isAdmin: Boolean(session.data.isAdmin) };
});
