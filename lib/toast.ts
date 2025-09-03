// lib/toast.ts
"use client"
import { toast } from "sonner"

// ✅ General purpose
export function notify(message: string, type: "success" | "error" = "success") {
  if (type === "error") {
    toast.error(message)
  } else {
    toast.success(message)
  }
}


// ✅ Success variant
export function notifySuccess(message: string) {
  toast.success(message)
}

// ✅ Error variant
export function notifyError(message: string) {
  toast.error(message)
}
