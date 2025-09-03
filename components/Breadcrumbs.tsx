"use client";

import Link from "next/link";

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="mb-4 text-sm text-slate-600 dark:text-slate-300">
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? (
            <Link href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            item.label
          )}
          {i < items.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
}
