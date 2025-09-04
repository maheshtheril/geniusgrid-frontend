"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold">Users</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.user_id}
              className="border-b hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <td className="p-2">{u.display_name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
