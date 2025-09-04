"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import api from "@/lib/api";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [menu, setMenu] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  // ✅ Load user roles from localStorage
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const parsed = JSON.parse(userStr);
        setRoles(parsed?.user?.roles || []);
      }
    } catch (err) {
      console.error("❌ Failed to parse user roles from localStorage:", err);
    }
  }, []);

  // ✅ Fetch menu from backend
  useEffect(() => {
    api
      .get("/admin/menu")
      .then((res) => setMenu(res.data))
      .catch((err) => {
        console.error("❌ Failed to load menu:", err);
      });
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ✅ Filter menu by roles
  const filterByRole = (items: any[]) => {
    return items
      .filter((item) => {
        // If no roles defined → show to all
        if (!item.roles || item.roles.length === 0) return true;
        // Show if user has at least one allowed role
        return item.roles.some((r: string) => roles.includes(r));
      })
      .map((item) => ({
        ...item,
        children: item.children ? filterByRole(item.children) : [],
      }));
  };

  const renderMenu = (items: any[]) => (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.menu_id}>
          <div
            className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            onClick={() => item.children?.length && toggleExpand(item.menu_id)}
          >
            <a href={item.path || "#"} className="flex items-center gap-2">
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </a>
            {item.children && item.children.length > 0 && (
              expanded.includes(item.menu_id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            )}
          </div>
          {item.children && expanded.includes(item.menu_id) && (
            <div className="ml-4">{renderMenu(item.children)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  // ✅ Apply role filtering before rendering
  const visibleMenu = filterByRole(menu);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-white p-4 shadow-xl transition-transform dark:bg-slate-900 md:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-blue-600">GeniusGrid</h1>
        <button
          onClick={() => setOpen(false)}
          className="rounded px-2 py-1 text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          ✕
        </button>
      </div>
      <div className="space-y-2">{renderMenu(visibleMenu)}</div>
    </aside>
  );
}
