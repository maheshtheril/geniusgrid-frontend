// lib/toast.ts
"use client"
import { toast } from "sonner"

// ✅ General purpose
export function notify(message: string) {
  toast(message)
}

// ✅ Success variant
export function notifySuccess(message: string) {
  toast.success(message)
}

// ✅ Error variant
export function notifyError(message: string) {
  toast.error(message)
}
