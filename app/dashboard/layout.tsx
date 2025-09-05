"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ThemeProvider } from "@/components/theme-provider";

type UserProfile =
  | {
      id: string;
      email: string;
      name?: string;
      // When fetched from /auth/profile (recommended)
      roles?: string[];              // ["Administrator", "CRM Manager", ...]
      permissions?: string[];        // ["*", "crm.lead.read", ...]
    }
  | {
      // When you previously stored full login response
      user?: {
        id: string;
        email: string;
        name?: string;
        roles?: any;                 // could be array of objects from SQL join
      };
      permissions?: string[];
    };

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Normalize various possible shapes into simple flags
  const { isAdmin } = useMemo(() => {
    if (!profile) return { isAdmin: false };

    // If profile came from /auth/profile
    const perms = (profile as any)?.permissions as string[] | undefined;
    const rolesStr = (profile as any)?.roles as string[] | undefined;

    // If profile was the older login response
    const loginUser = (profile as any)?.user as any | undefined;
    const loginRoles = loginUser?.roles;

    const hasStar = Array.isArray(perms) && perms.includes("*");

    const roleNames: string[] = [];
    if (Array.isArray(rolesStr)) {
      roleNames.push(...rolesStr);
    }
    if (Array.isArray(loginRoles)) {
      // loginRoles might be array of strings OR array of { key, name, permissions }
      for (const r of loginRoles) {
        if (typeof r === "string") roleNames.push(r);
        else if (r?.name) roleNames.push(r.name);
        if (r?.key === "admin") roleNames.push("Admin");
      }
    }

    const hasAdminRole = roleNames.some((r) =>
      String(r).toLowerCase().includes("admin")
    );

    return { isAdmin: Boolean(hasStar || hasAdminRole) };
  }, [profile]);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/login");
          return;
        }

        // Try cached profile first (keep both keys for compatibility)
        const cached =
          localStorage.getItem("user") || localStorage.getItem("userProfile");

        if (cached) {
          const p = JSON.parse(cached) as UserProfile;
          if (!cancelled) setProfile(p);
        } else {
          // Fetch live profile from backend
          const res = await fetch(`${API}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
            // no credentials needed for localStorage JWT approach
          });

          if (!res.ok) {
            // token invalid/expired
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("userProfile");
            router.replace("/login");
            return;
          }

          const data = await res.json();
          // Store canonically as "userProfile"
          localStorage.setItem("userProfile", JSON.stringify(data));
          if (!cancelled) setProfile(data);
        }

        // Route guard: block non-admins from /dashboard/admin/*
        const isAdminPath = pathname.startsWith("/dashboard/admin");
        if (isAdminPath && !isAdmin) {
          router.replace("/dashboard"); // or "/dashboard/user"
          return;
        }

        if (!cancelled) setLoading(false);
      } catch {
        // Any parse/fetch error ⇒ go to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userProfile");
        router.replace("/login");
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
    // include isAdmin so we re-evaluate when profile loads
  }, [router, pathname, isAdmin]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen w-full bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Navigation Bar */}
          <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

          {/* Breadcrumbs */}
          <div className="px-4 pt-2">
            <Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }]} />
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto px-4 pb-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
