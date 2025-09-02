"use client";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const user = { name: "Admin User", email: "admin@geniusgrid.com" }; // TODO: wire from auth context

  return (
    <nav className="flex items-center justify-between border-b bg-white px-4 py-2 shadow-sm dark:bg-slate-900">
      <div />
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium md:block">{user.name}</span>
        </div>
      </div>
    </nav>
  );
}
