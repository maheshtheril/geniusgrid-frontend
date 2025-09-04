"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function TenantsPage() {
  const [tenants, setTenants] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/tenants").then((res) => setTenants(res.data));
  }, []);

  return (
    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold">Tenants</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Slug</th>
            <th className="p-2">Plan</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((t) => (
            <tr
              key={t.tenant_id}
              className="border-b hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <td className="p-2">{t.name}</td>
              <td className="p-2">{t.slug}</td>
              <td className="p-2">{t.plan}</td>
              <td className="p-2">{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
