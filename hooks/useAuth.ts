"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

interface UseAuthOptions {
  redirectToLogin?: boolean;
  requiredRole?: string;
}

export function useAuth({ redirectToLogin = true, requiredRole }: UseAuthOptions = {}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get<User>("/auth/profile", { withCredentials: true });
        const u = res.data;
        setUser(u);

        // Role-based check (optional)
        if (requiredRole && !u.roles.includes(requiredRole)) {
          router.replace("/unauthorized");
        }
      } catch (err) {
        console.warn("❌ Auth check failed:", err);
        setUser(null);

        // If not logged in → redirect to login
        if (redirectToLogin) {
          router.replace("/login");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router, redirectToLogin, requiredRole]);

  return {
    user,
    loading,
    isLoggedIn: !!user,
    isAdmin: user?.roles.includes("admin") ?? false,
  };
}
