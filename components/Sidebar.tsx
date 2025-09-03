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

  useEffect(() => {
    api.get("/admin/menu").then((res) => setMenu(res.data));
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
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

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-white p-4 shadow-xl transition-transform dark:bg-slate-900 md:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <h1 className="mb-6 text-xl font-bold text-blue-600">GeniusGrid</h1>
      <div className="space-y-2">{renderMenu(menu)}</div>
    </aside>
  );
}
