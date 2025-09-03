// lib/toast.ts
"use client"
import { toast } from "sonner"

// Single entry point
export const notify = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast(message),
}
