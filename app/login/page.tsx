"use client";

import { useState } from "react";
import api from "@/lib/api"; // central axios instance
import { notifySuccess, notifyError } from "@/lib/toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Call backend login with slug
      const res = await api.post("/auth/login", { email, password, slug });
      const data = res.data;

      if (!data?.token) {
        notifyError(data.error || "Login failed");
        return;
      }

      notifySuccess("Login successful!");

      // ✅ Store session
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ Redirect based on role
      const roles = data.user?.roles || [];
      if (roles.includes("Admin")) {
        window.location.href = "/dashboard/admin";
      } else {
        window.location.href = "/dashboard/user";
      }
    } catch (err: any) {
      console.error("Login error:", err);
      notifyError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 rounded-lg bg-card p-6 shadow"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        {/* Tenant Slug field */}
        <input
          type="text"
          placeholder="Tenant Slug (e.g. geniusgrid)"
          value={slug}
          onChange={(e) => setSlug(e.target.value.trim().toLowerCase())}
          required
          className="w-full rounded border p-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-primary py-2 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
