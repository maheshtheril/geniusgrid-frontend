// app/dashboard/admin/page.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/components/LogoutButton";

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth({ requiredRole: "Admin" });

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return <p>Redirecting...</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <LogoutButton />
      </div>
      <p>Hello Admin {user?.name}!</p>
    </div>
  );
}
