import api from "@/lib/api";
import { redirect } from "next/navigation";

// Centralized logout helper
export async function logout() {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true });
  } catch (e) {
    console.warn("Logout request failed, continuing anyway:", e);
  } finally {
    // Clear local state if needed and send user to login
    redirect("/login");
  }
}
