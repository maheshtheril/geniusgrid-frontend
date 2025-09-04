"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    api.get("/crm/leads").then((res) => setLeads(res.data));
  }, []);

  return (
    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold">Leads</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.lead_id}
              className="border-b hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.email}</td>
              <td className="p-2">{lead.phone}</td>
              <td className="p-2">{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
