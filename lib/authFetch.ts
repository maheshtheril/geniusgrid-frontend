// lib/authFetch.ts
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function authFetch(path: string, init: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) throw new Error("NO_TOKEN"); // handle by redirecting to /login

  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    // token invalid/expired → clear and bounce to login
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
  }
  return res;
}
