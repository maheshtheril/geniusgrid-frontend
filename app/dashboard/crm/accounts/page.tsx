"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/crm/accounts").then((res) => setAccounts(res.data));
  }, []);

  return (
    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold">Accounts</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Industry</th>
            <th className="p-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr
              key={acc.account_id}
              className="border-b hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <td className="p-2">{acc.name}</td>
              <td className="p-2">{acc.industry}</td>
              <td className="p-2">
                {new Date(acc.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
