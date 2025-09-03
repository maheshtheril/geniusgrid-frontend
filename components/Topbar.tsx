"use client";

import { Menu } from "lucide-react";

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4 dark:bg-slate-900">
      <button onClick={onMenuClick} className="md:hidden">
        <Menu className="h-6 w-6" />
      </button>
      <h1 className="text-lg font-bold">GeniusGrid</h1>
      <div className="flex items-center space-x-4">
        {/* Placeholder avatar */}
        <span className="h-8 w-8 rounded-full bg-slate-300 dark:bg-slate-700" />
      </div>
    </header>
  );
}
