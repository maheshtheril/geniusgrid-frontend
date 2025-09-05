"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // 1. Check token
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    // 2. Get profile
    const raw = localStorage.getItem("userProfile");
    if (raw) setProfile(JSON.parse(raw));
  }, [router]);

  if (!profile) return <p>Loading...</p>;

  // 3. Show dashboard depending on role
  if (profile.roles?.includes("Admin")) {
    return <h1>Welcome Admin {profile.name}</h1>;
  } else {
    return <h1>Welcome User {profile.name}</h1>;
  }
}
