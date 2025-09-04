"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ThemeProvider } from "@/components/theme-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const roles: string[] = user?.user?.roles || [];

      // Role-based access
      if (pathname.startsWith("/dashboard/admin") && !roles.includes("Admin")) {
        router.replace("/dashboard/user"); // non-admin → user dashboard
        return;
      }

      setLoading(false);
    } catch (e) {
      router.replace("/login"); // fallback if JSON parse fails
    }
  }, [router, pathname]);

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
