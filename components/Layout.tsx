"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { Search, Sun, Moon, Bell, Menu } from "lucide-react";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  // Breadcrumbs from path
  const crumbs = pathname.split("/").filter(Boolean);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Main content wrapper */}
        <div className="flex flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-center gap-3">
              {/* Mobile toggle */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setOpen(!open)}
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Logo */}
              <Image
                src="/logo.png"
                alt="GeniusGrid Logo"
                width={28}
                height={28}
                className="hidden md:block"
              />

              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                <span className="text-blue-600">Home</span>
                {crumbs.map((c, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span>/</span>
                    <span className="capitalize">{c}</span>
                  </span>
                ))}
              </nav>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search…"
                  className="rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Notifications */}
              <button className="relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={() => setDark(!dark)}
                className="rounded-full border p-2 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                {dark ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-slate-600 dark:text-slate-200" />
                )}
              </button>

              {/* User avatar */}
              <div className="flex items-center gap-2">
                <Image
                  src="/avatar1.png"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
