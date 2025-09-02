"use client";
import { useState } from "react";
import api from "@/lib/api";
import { saveToken } from "@/lib/auth";
import { notify } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [tenantName, setTenantName] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSignup(e: any) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", {
        tenantName,
        slug,
        email,
        password
      });
      saveToken(res.data.token);
      notify("Tenant created!");
      router.push("/dashboard");
    } catch (err: any) {
      notify("Signup failed: " + err.message, "error");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
      <form onSubmit={handleSignup} className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">
        <h2 className="mb-4 text-xl font-bold">Signup</h2>
        <input
          className="mb-2 w-full rounded border p-2"
          placeholder="Tenant Name"
          value={tenantName}
          onChange={(e) => setTenantName(e.target.value)}
        />
        <input
          className="mb-2 w-full rounded border p-2"
          placeholder="Slug (unique id)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <input
          className="mb-2 w-full rounded border p-2"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="mb-2 w-full rounded border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
          Signup
        </button>
      </form>
    </div>
  );
}
