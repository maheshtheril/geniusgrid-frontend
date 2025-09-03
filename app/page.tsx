"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-10 shadow-2xl dark:bg-slate-900">
        {/* Logo + Title */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.png" // place your logo file in /public/logo.png
            alt="GeniusGrid Logo"
            width={80}
            height={80}
            className="mb-4"
          />
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            GeniusGrid
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
            Your Next-Gen ERP Platform 🚀
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-6">
          <Link
            href="/login"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white shadow-lg transition hover:scale-105"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-xl border-2 border-blue-600 px-6 py-3 text-blue-600 shadow-lg transition hover:scale-105 hover:bg-blue-50 dark:hover:bg-slate-800"
          >
            Signup
          </Link>
        </div>

        {/* Quick Links Grid */}
        <div className="mt-10 grid grid-cols-2 gap-6">
          <Link
            href="/crm/leads"
            className="rounded-2xl border bg-gradient-to-br from-white to-slate-50 p-6 text-center shadow hover:scale-105 hover:shadow-lg dark:from-slate-800 dark:to-slate-900"
          >
            <h3 className="text-lg font-semibold text-blue-600">CRM – Leads</h3>
            <p className="mt-1 text-sm text-slate-500">Manage new leads</p>
          </Link>
          <Link
            href="/crm/deals"
            className="rounded-2xl border bg-gradient-to-br from-white to-slate-50 p-6 text-center shadow hover:scale-105 hover:shadow-lg dark:from-slate-800 dark:to-slate-900"
          >
            <h3 className="text-lg font-semibold text-indigo-600">
              CRM – Deals
            </h3>
            <p className="mt-1 text-sm text-slate-500">Track pipelines</p>
          </Link>
          <Link
            href="/admin/tenants"
            className="rounded-2xl border bg-gradient-to-br from-white to-slate-50 p-6 text-center shadow hover:scale-105 hover:shadow-lg dark:from-slate-800 dark:to-slate-900"
          >
            <h3 className="text-lg font-semibold text-green-600">
              Admin – Tenants
            </h3>
            <p className="mt-1 text-sm text-slate-500">Multi-tenant control</p>
          </Link>
          <Link
            href="/admin/users"
            className="rounded-2xl border bg-gradient-to-br from-white to-slate-50 p-6 text-center shadow hover:scale-105 hover:shadow-lg dark:from-slate-800 dark:to-slate-900"
          >
            <h3 className="text-lg font-semibold text-purple-600">
              Admin – Users
            </h3>
            <p className="mt-1 text-sm text-slate-500">Manage user roles</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
