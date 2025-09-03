"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ThemeProvider } from "@/components/ui/theme-provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen w-full bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="px-4 pt-2">
            <Breadcrumbs />
          </div>
          <main className="flex-1 overflow-y-auto px-4 pb-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
