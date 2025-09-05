"use client";

import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/lib/auth";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuth({ redirectToLogin: true });

  return (
    <div className="flex items-center justify-between bg-card p-4 shadow">
      <button onClick={onMenuClick} className="text-lg font-bold">
        ☰
      </button>

      <h1 className="text-xl font-semibold">GeniusGrid ERP</h1>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-700">
            {user.name} ({user.email})
          </span>
        )}
        <button
          onClick={logout}
          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
