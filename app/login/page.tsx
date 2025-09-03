"use client"

import { useState } from "react"
import { notifyError, notifySuccess } from "@/lib/toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, slug }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        notifyError(data.error || "Login failed")
        return
      }

      notifySuccess("Login successful!")

      // Store JWT token for authenticated requests
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Redirect to dashboard
      window.location.href = "/dashboard"
    } catch (err) {
      notifyError("Server error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 space-y-4 rounded-lg shadow-md bg-card"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        <input
          type="text"
          placeholder="Tenant Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 font-semibold text-white rounded bg-primary disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}
