"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import api from "@/lib/api";
import { notifyError, notifySuccess } from "@/lib/toast";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/login", { email, password });
      notifySuccess("Login successful! Redirecting...");
      setTimeout(() => (window.location.href = "/crm/leads"), 1000);
    } catch (err) {
      notifyError("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo.png" alt="GeniusGrid Logo" width={60} height={60} className="mb-4" />
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">GeniusGrid Login</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Welcome back! Please sign in.</p>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-white hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">Signup</Link>
        </p>
      </div>
    </main>
  );
}
