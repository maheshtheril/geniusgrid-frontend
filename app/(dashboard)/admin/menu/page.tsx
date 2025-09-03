"use client"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import { notify } from "@/lib/toast"

export default function MenuPage() {
  const [items, setItems] = useState<any[]>([])
  const [label, setLabel] = useState("")

  useEffect(() => {
    api.get("/admin/menu").then((res) => setItems(res.data))
  }, [])

  async function addMenu(e: any) {
    e.preventDefault()
    try {
      const res = await api.post("/admin/menu", { label })
      setItems([...items, res.data])
      setLabel("")
      notify.success("Menu item added!")
    } catch {
      notify.error("Error adding menu")
    }
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow dark:bg-slate-900">
      <h2 className="mb-4 text-lg font-semibold">Menu Config</h2>
      <form onSubmit={addMenu} className="mb-4 flex gap-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Menu label"
          className="flex-1 rounded border p-2"
        />
        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {items.map((i) => (
          <li
            key={i.menu_id}
            className="rounded border p-2 dark:border-slate-700"
          >
            {i.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
