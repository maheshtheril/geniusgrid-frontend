"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [slug, setSlug] = useState("geniusgrid");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, slug }),
      });

      // log status and text for debugging (remove in prod)
      if (!res.ok) {
        let body = {};
        try {
          body = await res.json();
        } catch (err) {
          // if JSON parse failed, try text
          const txt = await res.text().catch(() => "");
          console.error("Login error body (text):", txt);
          throw new Error(txt || `Login failed (status ${res.status})`);
        }
        console.error("Login error response:", body);
        throw new Error(body?.error || body?.message || `Login failed (status ${res.status})`);
      }

      const loginBody = await res.json();
      console.log("login response body:", loginBody);

      // accept multiple possible token keys
      let token = loginBody.token || loginBody.accessToken || loginBody.jwt || loginBody.data?.token;
      if (!token) {
        console.error("No token found in login response", loginBody);
        throw new Error("Login succeeded but no token returned by server");
      }

      // If server returns "Bearer <token>", strip it before storing/sending
      if (typeof token === "string" && token.toLowerCase().startsWith("bearer ")) {
        token = token.slice(7).trim();
      }

      localStorage.setItem("token", token);
      console.log("Stored token length:", token.length);

      // Fetch profile — pass Authorization header properly
      try {
        const p = await fetch(`${API}/auth/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          // if your API uses cookies/sessions, add credentials: 'include'
          // credentials: 'include',
        });

        if (p.ok) {
          const profile = await p.json();
          console.log("profile:", profile);
          localStorage.setItem("userProfile", JSON.stringify(profile));
        } else {
          const errBody = await p.text().catch(() => "");
          console.warn("Profile fetch failed:", p.status, errBody);
          // remove stale profile if any
          localStorage.removeItem("userProfile");
          // optionally throw to show error to user:
          // throw new Error(`Profile fetch failed: ${p.status}`);
        }
      } catch (profileErr) {
        console.warn("Profile fetch exception:", profileErr);
        localStorage.removeItem("userProfile");
      }

      router.replace("/dashboard");
    } catch (err: any) {
      console.error("Login flow error:", err);
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-xl font-semibold mb-6">Login</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-4 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Tenant Slug"
          className="border p-2 mb-6 w-full rounded"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
