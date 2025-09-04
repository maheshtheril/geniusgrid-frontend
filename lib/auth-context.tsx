"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { getToken, saveToken, clearToken } from "./auth";

type User = {
  userId: string;
  name: string;
  email: string;
  roles: string[];
};

const AuthContext = createContext<{
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}>({
  user: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function fetchProfile() {
    try {
      const res = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setUser(res.data);
    } catch {
      clearToken();
      setUser(null);
    }
  }

  async function login(email: string, password: string) {
      const res = await api.post("/auth/login", { email, password });
    saveToken(res.data.token);
    await fetchProfile();
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  useEffect(() => {
    if (getToken()) fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
