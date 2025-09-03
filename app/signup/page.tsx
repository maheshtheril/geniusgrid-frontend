"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import api from "@/lib/api";
import { notifyError, notifySuccess } from "@/lib/toast";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const [tenantName, setTenantName] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [region] = useState("asia"); // default region
  const [plan] = useState("free");   // default plan
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // 1️⃣ Create tenant + company + admin
      const tenantRes = await api.post("/admin/tenants", {
        name: tenantName,
        slug,
        region,
        plan,
      });

      const { tenant_id, user_id } = tenantRes.data;

      // 2️⃣ Create credentials for admin user
      await api.post("/auth/signup", {
        tenant_id,
        user_id,
        email,
        password: "Admin@123", // you can also add password field in form
      });

      notifySuccess("Tenant created! Redirecting to login...");
      setTimeout(() => (window.location.href = "/login"), 1000);
    } catch (err: any) {
      console.error(err);
      notifyError("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900">
        <div className="flex flex-col items-center text-center">
          <Image src="/logo.png" alt="GeniusGrid Logo" width={60} height={60} className="mb-4" />
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Create your GeniusGrid Workspace</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Each signup creates a new Tenant, Company, and Admin user 🚀
          </p>
        </div>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Tenant Name (e.g. Acme Corp)"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Slug (unique e.g. acme)"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-white hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Tenant"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </main>
  );
}
