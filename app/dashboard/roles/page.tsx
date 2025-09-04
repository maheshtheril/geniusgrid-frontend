"use client"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import { notify } from "@/lib/toast"

export default function RolesPage() {
  const [roles, setRoles] = useState<any[]>([])
  const [name, setName] = useState("")

  useEffect(() => {
    api.get("/admin/roles").then((res) => setRoles(res.data))
  }, [])

  async function createRole(e: any) {
    e.preventDefault()
    try {
      const res = await api.post("/admin/roles", { name })
      setRoles([...roles, res.data])
      setName("")
      notify.success("Role created!")
    } catch {
      notify.error("Error creating role")
    }
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold">Roles</h2>
      <form onSubmit={createRole} className="mb-4 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Role name"
          className="flex-1 rounded border p-2"
        />
        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {roles.map((r) => (
          <li
            key={r.role_id}
            className="rounded border p-2 dark:border-slate-700"
          >
            {r.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
