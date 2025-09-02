"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/crm/contacts").then((res) => setContacts(res.data));
  }, []);

  return (
    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold">Contacts</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Account</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr
              key={c.contact_id}
              className="border-b hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.phone}</td>
              <td className="p-2">{c.account_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
