"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import api from "@/lib/api";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/menu").then((res) => setMenu(res.data));
  }, []);

  const renderMenu = (items: any[]) => (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.menu_id}>
          <a
            href={item.path || "#"}
            className="flex items-center rounded-lg px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </a>
          {item.children && item.children.length > 0 && (
            <div className="ml-4">{renderMenu(item.children)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="absolute left-4 top-4 z-50 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-white p-4 shadow dark:bg-slate-900 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative`}
      >
        <h1 className="mb-6 text-xl font-bold text-blue-600">GeniusGrid</h1>
        {renderMenu(menu)}
      </aside>
    </>
  );
}
