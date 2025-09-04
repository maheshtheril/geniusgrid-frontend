"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (e) {
      // even if logout call fails, push to login to be safe
      console.warn("Logout error (continuing to login):", e);
    } finally {
      setLoading(false);
      router.replace("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`rounded px-3 py-2 bg-gray-200 hover:bg-gray-300 ${className}`}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
