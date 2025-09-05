// lib/auth.ts
"use client";

import api from "@/lib/api";

/**
 * We use HttpOnly cookies for auth, so client JS cannot/should not
 * read or write the token directly. These shims keep legacy code compiling.
 */
export function getToken(): string | undefined {
  return undefined;
}

export function saveToken(_token: string) {
  // No-op: server sets HttpOnly cookie on /auth/login
}

export function clearToken() {
  try { localStorage.removeItem("token"); } catch {}
  try { localStorage.removeItem("userProfile"); } catch {}
  try { sessionStorage.clear(); } catch {}
}

/**
 * Centralized logout helper (client-safe).
 * Can be used directly in onClick={logout}.
 */
export async function logout() {
  try {
    // best-effort notify server (backend route exists)
    await api.post("/auth/logout", {}, { withCredentials: true });
  } catch {
    // ignore network/server errors
  } finally {
    // always clear client state
    clearToken();

    // client-side navigation without using hooks
    // replace so back-button won't return to protected route
    window.location.replace("/login");
  }
}
