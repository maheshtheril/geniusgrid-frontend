import api from "@/lib/api";
import { redirect } from "next/navigation";

/**
 * We use HttpOnly cookies for auth, so client JS cannot/should not
 * read or write the token directly. These shims keep legacy code compiling.
 */
export function getToken(): string | undefined {
  // HttpOnly cookie is not readable by JS; return undefined.
  return undefined;
}

export function saveToken(_token: string) {
  // No-op: server sets HttpOnly cookie on /auth/login
}

export function clearToken() {
  // No-op: server clears cookie on /auth/logout
}

/** Centralized logout helper */
export async function logout() {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true });
  } catch {
    // ignore
  } finally {
    redirect("/login");
  }
}
